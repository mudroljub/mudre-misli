#!/usr/bin/env node

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const greekTerm = args[0];

if (!greekTerm) {
  console.error('Upotreba: node check-term-consistency.mjs <grčki-termin>');
  process.exit(1);
}

// Učitaj sve JSON fajlove
const quotesDir = join(__dirname, '..', 'data', 'quotes');
const files = readdirSync(quotesDir).filter(f => f.endsWith('.json'));

let allEntries = [];
for (const file of files) {
  const content = JSON.parse(readFileSync(join(quotesDir, file), 'utf8'));
  allEntries = allEntries.concat(content.map(e => ({ ...e, _file: file })));
}

// Traži sve instance
const matches = allEntries.filter(e =>
  e.originalText && e.originalText.includes(greekTerm)
);

if (matches.length === 0) {
  console.log(`Nema instance termina "${greekTerm}" u podacima.`);
  process.exit(0);
}

console.log(`Pronađeno ${matches.length} instanci termina "${greekTerm}":\n`);

for (const entry of matches) {
  console.log(`${'─'.repeat(80)}`);
  console.log(`Fajl: ${entry._file} (ID: ${entry._id})`);
  console.log(`Tip: ${entry.type}`);
  console.log(`\nOriginal (el):`);
  console.log(entry.originalText);
  console.log(`\nSrpski (sr):`);
  console.log(entry.sr);
  console.log(`\nStaroslovenski (stsl):`);
  console.log(entry.stsl);
  console.log();
}

console.log(`${'═'.repeat(80)}`);
console.log(`Ukupno: ${matches.length} instanci`);
