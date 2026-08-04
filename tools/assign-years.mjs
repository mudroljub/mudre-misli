import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const authorsPath = path.join(rootDir, 'data', 'authors.json');
const quotesDir = path.join(rootDir, 'data', 'quotes');

const TARGET_TYPES = new Set(['bio', 'anecdote']);
const BIRTH_MARKERS = /\brođen\b|\brođena\b|\brodio\b|\bроди\b|\bродисѧ\b|\bроди сѧ\b/i;
const DEATH_MARKERS = /\bumro\b|\bumrla\b|\bsmrt\b|\bpred smrt\b|\bпогреб\b|\bсахран\b|\bсконча\b|\bпогин\b|\bkukut\b|\bubijen\b|\bосуђен на смрт\b/i;

const roundToInt = (value) => Math.round(value);

const buildText = (item) => `${item.sr || ''} ${item.stsl || ''}`;

const assignYearsWithAnchors = (items, born, died) => {
  const n = items.length;
  if (n === 0) return;

  const anchors = new Map();

  for (let i = 0; i < n; i += 1) {
    const text = buildText(items[i]);

    if (BIRTH_MARKERS.test(text)) {
      anchors.set(i, born);
    }

    if (DEATH_MARKERS.test(text)) {
      anchors.set(i, died);
    }
  }

  if (n === 1) {
    if (anchors.has(0)) {
      items[0].year = anchors.get(0);
    } else {
      items[0].year = roundToInt((born + died) / 2);
    }
    return;
  }

  if (!anchors.has(0)) {
    anchors.set(0, born);
  }

  if (!anchors.has(n - 1)) {
    anchors.set(n - 1, died);
  }

  const ordered = [...anchors.entries()]
    .sort((left, right) => left[0] - right[0])
    .map(([index, year]) => [index, Math.min(died, Math.max(born, year))]);

  for (let i = 1; i < ordered.length; i += 1) {
    if (ordered[i][1] < ordered[i - 1][1]) {
      ordered[i][1] = ordered[i - 1][1];
    }
  }

  for (let s = 0; s < ordered.length - 1; s += 1) {
    const [startIndex, startYear] = ordered[s];
    const [endIndex, endYear] = ordered[s + 1];

    if (startIndex === endIndex) {
      items[startIndex].year = startYear;
      continue;
    }

    const span = endIndex - startIndex;
    for (let i = startIndex; i <= endIndex; i += 1) {
      const ratio = (i - startIndex) / span;
      items[i].year = roundToInt(startYear + (endYear - startYear) * ratio);
    }
  }
};

const main = async () => {
  const authors = JSON.parse(await fs.readFile(authorsPath, 'utf8'));
  const files = (await fs.readdir(quotesDir))
    .filter((file) => file.endsWith('.json'))
    .sort();

  let changedFiles = 0;
  let changedEntries = 0;

  for (const file of files) {
    const filePath = path.join(quotesDir, file);
    const rows = JSON.parse(await fs.readFile(filePath, 'utf8'));

    if (!Array.isArray(rows)) {
      throw new Error(`${file} does not contain an array`);
    }

    const authorName = rows.find((row) => row?.author)?.author;
    if (!authorName) {
      continue;
    }

    const meta = authors[authorName];
    if (!meta || typeof meta.born !== 'number' || typeof meta.died !== 'number') {
      continue;
    }

    const targets = rows.filter((row) => TARGET_TYPES.has(row.type));
    if (!targets.length) {
      continue;
    }

    const before = targets.map((row) => row.year);
    assignYearsWithAnchors(targets, meta.born, meta.died);

    let fileChanged = false;
    for (let i = 0; i < targets.length; i += 1) {
      if (before[i] !== targets[i].year) {
        fileChanged = true;
        changedEntries += 1;
      }
    }

    if (!fileChanged) {
      continue;
    }

    changedFiles += 1;
    await fs.writeFile(filePath, `${JSON.stringify(rows, null, 4)}\n`, 'utf8');
  }

  console.log(`assign-years: updated ${changedFiles} files, ${changedEntries} entries`);
};

await main();
