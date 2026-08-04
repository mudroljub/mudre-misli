import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const sourceRoot = path.join(rootDir, 'data', 'sources', 'diogenes-laertius');
const outputRoot = path.join(sourceRoot, 'clean');

const htmlEntityMap = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ndash: '–',
  mdash: '—',
  hellip: '…',
  laquo: '«',
  raquo: '»',
};

function decodeEntities(input) {
  return input
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&([a-zA-Z][a-zA-Z0-9]+);/g, (m, name) => htmlEntityMap[name] ?? m);
}

function extractMainContent(html) {
  const openMatch = html.match(/<div\s+id="mw-content-text"[^>]*>/i);
  if (!openMatch || openMatch.index == null) {
    return null;
  }

  const startTagStart = openMatch.index;
  const startTagEnd = startTagStart + openMatch[0].length;
  const divTagRegex = /<\/?div\b[^>]*>/gi;
  divTagRegex.lastIndex = startTagEnd;

  let depth = 1;
  let endIndex = html.length;
  let tagMatch;

  while ((tagMatch = divTagRegex.exec(html)) !== null) {
    if (tagMatch[0][1] === '/') {
      depth -= 1;
      if (depth === 0) {
        endIndex = tagMatch.index;
        break;
      }
    } else {
      depth += 1;
    }
  }

  return html.slice(startTagEnd, endIndex);
}

function stripHtmlToText(htmlFragment) {
  let text = htmlFragment;

  text = text.replace(/<!--([\s\S]*?)-->/g, ' ');
  text = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ');
  text = text.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
  text = text.replace(/<sup\b[^>]*class="[^"]*reference[^"]*"[^>]*>[\s\S]*?<\/sup>/gi, ' ');
  text = text.replace(/<table\b[^>]*>[\s\S]*?<\/table>/gi, ' ');
  text = text.replace(/<div\b[^>]*class="[^"]*(ws-header|wst-header|header_notes|plainSister|sisterproject)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, ' ');

  text = text.replace(/<(h1|h2|h3|h4|h5|h6|p|li|blockquote|section|article|tr|dd|dt)\b[^>]*>/gi, '\n');
  text = text.replace(/<br\s*\/?\s*>/gi, '\n');

  text = text.replace(/<[^>]+>/g, ' ');
  text = decodeEntities(text);

  text = text.replace(/[ \t\f\v\u00A0]+/g, ' ');
  text = text.replace(/\r/g, '');
  text = text.replace(/ *\n */g, '\n');
  text = text.replace(/\n{3,}/g, '\n\n').trim();

  // If there is a numbered start marker (very common in these pages), trim header residue above it.
  const numberedStart = text.search(/\n?\s*1\s*\./);
  if (numberedStart > 0 && numberedStart < 5000) {
    text = text.slice(numberedStart).trim();
  }

  return text;
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function processLanguageFolder(lang) {
  const inputDir = path.join(sourceRoot, lang);
  const outputDir = path.join(outputRoot, lang);
  await ensureDir(outputDir);

  const files = (await fs.readdir(inputDir)).filter((f) => f.toLowerCase().endsWith('.html')).sort();
  const manifest = [];

  for (const file of files) {
    const inPath = path.join(inputDir, file);
    const outPath = path.join(outputDir, file.replace(/\.html$/i, '.txt'));

    const raw = await fs.readFile(inPath, 'utf8');
    const main = extractMainContent(raw);
    const cleanText = main ? stripHtmlToText(main) : '';

    await fs.writeFile(outPath, cleanText + '\n', 'utf8');

    manifest.push({
      lang,
      sourceFile: path.relative(rootDir, inPath).replaceAll('\\', '/'),
      cleanFile: path.relative(rootDir, outPath).replaceAll('\\', '/'),
      chars: cleanText.length,
      extracted: Boolean(main),
    });
  }

  return manifest;
}

async function main() {
  await ensureDir(outputRoot);

  const langs = ['en', 'el'];
  const allEntries = [];
  for (const lang of langs) {
    const entries = await processLanguageFolder(lang);
    allEntries.push(...entries);
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    sourceRoot: path.relative(rootDir, sourceRoot).replaceAll('\\', '/'),
    outputRoot: path.relative(rootDir, outputRoot).replaceAll('\\', '/'),
    files: allEntries,
  };

  const manifestPath = path.join(outputRoot, 'manifest.clean.json');
  await fs.writeFile(manifestPath, JSON.stringify(summary, null, 2) + '\n', 'utf8');

  const ok = allEntries.filter((e) => e.extracted).length;
  console.log(`Clean extraction finished: ${ok}/${allEntries.length} files.`);
  console.log(`Manifest: ${path.relative(rootDir, manifestPath).replaceAll('\\', '/')}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
