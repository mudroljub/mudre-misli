import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceFile = path.join(rootDir, 'data', 'sources', 'interslavic.json');
const args = process.argv.slice(2);

const readOption = (name, fallback) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
};

const compactOption = (name) => {
  const prefix = `${name}:`;
  return args.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
};

const language = compactOption('lang') || readOption('--lang', null);
const limitValue = Number.parseInt(compactOption('limit') || readOption('--limit', '20'), 10);
const limit = Number.isFinite(limitValue) && limitValue > 0 ? limitValue : 20;
const exact = args.includes('exact') || args.includes('--exact');
const optionValues = new Set(['--lang', '--limit']);
const queryParts = [];

for (let index = 0; index < args.length; index += 1) {
  if (optionValues.has(args[index])) {
    index += 1;
  } else if (
    args[index] !== 'exact' &&
    !args[index].startsWith('lang:') &&
    !args[index].startsWith('limit:') &&
    !args[index].startsWith('--')
  ) {
    queryParts.push(args[index]);
  }
}

const query = queryParts.join(' ').trim();

if (!query) {
  console.log('Upotreba: npm run search:interslavic -- <reč> [lang:sr] [exact] [limit:20]');
  process.exit(1);
}

const normalize = (value) =>
  String(value ?? '')
    .toLocaleLowerCase('sr')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đð]/g, 'd')
    .replace(/ł/g, 'l')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();

const source = JSON.parse(await fs.readFile(sourceFile, 'utf8'));
const [header, ...rows] = source.wordList;
const columns = Object.fromEntries(header.map((name, index) => [name, index]));
const languageColumns = ['ru', 'be', 'uk', 'pl', 'cs', 'sk', 'sl', 'hr', 'sr', 'mk', 'bg'];

if (language && !languageColumns.includes(language) && language !== 'isv' && language !== 'en') {
  console.error(`Nepoznat jezik „${language}“. Dostupno: isv, en, ${languageColumns.join(', ')}`);
  process.exit(1);
}

const searchColumns = language ? [language] : ['isv', 'en', 'sr'];
const normalizedQuery = normalize(query);

const rank = (value) => {
  const normalizedValue = normalize(value);
  if (!normalizedValue || (exact && normalizedValue !== normalizedQuery)) return null;
  if (normalizedValue === normalizedQuery) return 0;
  if (normalizedValue.startsWith(`${normalizedQuery} `) || normalizedValue.startsWith(normalizedQuery)) return 1;
  if (normalizedValue.split(' ').includes(normalizedQuery)) return 2;
  if (normalizedValue.includes(normalizedQuery)) return 3;
  return null;
};

const matches = [];
for (const row of rows) {
  const ranks = searchColumns
    .map((column) => rank(row[columns[column]]))
    .filter((value) => value !== null);

  if (ranks.length === 0) continue;

  matches.push({
    rank: Math.min(...ranks),
    isv: row[columns.isv],
    vrsta: row[columns.partOfSpeech],
    en: row[columns.en],
    sr: row[columns.sr],
    ...(language && !['isv', 'en', 'sr'].includes(language)
      ? { [language]: row[columns[language]] }
      : {}),
  });
}

matches.sort((left, right) =>
  left.rank - right.rank || left.isv.localeCompare(right.isv, 'sr'),
);

const results = matches.slice(0, limit).map(({ rank: _rank, ...result }) => result);
console.log(`Upit: „${query}“ · rezultata: ${matches.length} · prikazano: ${results.length}`);
console.table(results);
