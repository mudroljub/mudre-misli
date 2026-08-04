import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const quotesDir = path.join(rootDir, 'data', 'quotes');
const outputFile = path.join(rootDir, 'data', 'sources', 'source-map.json');

const romanToNumber = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
};

const files = (await fs.readdir(quotesDir))
  .filter((file) => file.endsWith('.json'))
  .sort();

const totalBySource = new Map();
const authorsBySource = new Map();
let totalQuotes = 0;

for (const file of files) {
  const filePath = path.join(quotesDir, file);
  const content = JSON.parse(await fs.readFile(filePath, 'utf8'));

  if (!Array.isArray(content)) {
    throw new Error(`${file} does not contain an array`);
  }

  for (const entry of content) {
    totalQuotes += 1;
    const source = String(entry.source || '').trim();
    if (!source) {
      continue;
    }

    totalBySource.set(source, (totalBySource.get(source) || 0) + 1);

    if (!authorsBySource.has(source)) {
      authorsBySource.set(source, new Set());
    }

    if (entry.author) {
      authorsBySource.get(source).add(entry.author);
    }
  }
}

const parseDiogenRefs = (source) => {
  const marker = 'Diogen Laertije, Životi i mišljenja znamenitih filozofa, ';
  if (!source.startsWith(marker)) {
    return {
      work: null,
      refsRaw: null,
      refs: [],
      books: [],
    };
  }

  const refsRaw = source.slice(marker.length).trim();
  const refs = refsRaw
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean);

  const books = new Set();
  const bookRegex = /\b([IVX]+)\./g;
  for (const ref of refs) {
    for (const match of ref.matchAll(bookRegex)) {
      const roman = match[1];
      if (romanToNumber[roman]) {
        books.add(roman);
      }
    }
  }

  return {
    work: 'Diogenes Laertius, Lives of Eminent Philosophers',
    refsRaw,
    refs,
    books: [...books],
  };
};

const sourceMap = [...totalBySource.entries()]
  .map(([source, count]) => {
    const parsed = parseDiogenRefs(source);

    return {
      source,
      count,
      authors: [...(authorsBySource.get(source) || [])].sort((a, b) =>
        a.localeCompare(b, 'sr')
      ),
      work: parsed.work,
      refsRaw: parsed.refsRaw,
      refs: parsed.refs,
      books: parsed.books
        .sort((a, b) => romanToNumber[a] - romanToNumber[b])
        .map((roman) => ({
          roman,
          number: romanToNumber[roman],
          enFile: `data/sources/diogenes-laertius/en/book_${romanToNumber[roman]}.txt`,
          elFile: `data/sources/diogenes-laertius/el/${String(
            romanToNumber[roman] + 1
          ).padStart(2, '0')}.txt`,
        })),
    };
  })
  .sort((a, b) => b.count - a.count || a.source.localeCompare(b.source, 'sr'));

const output = {
  generatedAt: new Date().toISOString(),
  sourceRoot: 'data/sources',
  totalQuotes,
  totalQuoteFiles: files.length,
  totalUniqueSources: sourceMap.length,
  items: sourceMap,
};

await fs.writeFile(outputFile, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

console.log(`Generated ${outputFile} (${sourceMap.length} unique sources)`);