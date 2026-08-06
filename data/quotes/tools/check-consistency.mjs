#!/usr/bin/env node

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Učitaj rečnik
const recnikContent = readFileSync('docs/RECNIK.md', 'utf8');
const lines = recnikContent.split('\n').filter(l => l.startsWith('|') && !l.startsWith('| -'));

const dictionary = [];
for (const line of lines.slice(1)) { // Skip header
  const parts = line.split('|').map(p => p.trim()).filter(p => p);
  if (parts.length >= 3) {
    const [greek, stsl, sr] = parts;
    dictionary.push({ greek, stsl, sr });
  }
}

console.log(`Učitano ${dictionary.length} termina iz rečnika.\n`);

// Učitaj sve JSON fajlove
const quotesDir = 'data/quotes';
const files = readdirSync(quotesDir).filter(f => f.endsWith('.json'));

let allEntries = [];
for (const file of files) {
  const content = JSON.parse(readFileSync(join(quotesDir, file), 'utf8'));
  allEntries = allEntries.concat(content.map(e => ({ ...e, file })));
}

console.log(`Učitano ${allEntries.length} entrija iz ${files.length} fajlova.\n`);

// Proveri svaki termin
for (const term of dictionary) {
  const { greek, stsl, sr } = term;

  // Napravi regex za pretragu (ukloni dijakritike za fleksibilnost)
  const greekBase = greek.replace(/[ᾶάὰἀἁἄἅᾴᾷἆἇῆήὴἠἡἤἥἦἧῖίὶἰἱἴἵἶἷῦύὺὐὑὔὕὖὗῶώὸὠὡὤὥὦὧ]/g, (match) => {
    const map = {
      'ᾶ': 'α', 'ά': 'α', 'ὰ': 'α', 'ἀ': 'α', 'ἁ': 'α', 'ἄ': 'α', 'ἅ': 'α', 'ᾴ': 'α', 'ᾷ': 'α', 'ἆ': 'α', 'ἇ': 'α',
      'ῆ': 'η', 'ή': 'η', 'ὴ': 'η', 'ἠ': 'η', 'ἡ': 'η', 'ἤ': 'η', 'ἥ': 'η', 'ἦ': 'η', 'ἧ': 'η',
      'ῖ': 'ι', 'ί': 'ι', 'ὶ': 'ι', 'ἰ': 'ι', 'ἱ': 'ι', 'ἴ': 'ι', 'ἵ': 'ι', 'ἶ': 'ι', 'ἷ': 'ι',
      'ῦ': 'υ', 'ύ': 'υ', 'ὺ': 'υ', 'ὐ': 'υ', 'ὑ': 'υ', 'ὔ': 'υ', 'ὕ': 'υ', 'ὖ': 'υ', 'ὗ': 'υ',
      'ῶ': 'ω', 'ώ': 'ω', 'ὸ': 'ω', 'ὠ': 'ω', 'ὡ': 'ω', 'ὤ': 'ω', 'ὥ': 'ω', 'ὦ': 'ω', 'ὧ': 'ω',
      'έ': 'ε', 'ὲ': 'ε', 'ἐ': 'ε', 'ἑ': 'ε', 'ἔ': 'ε', 'ἕ': 'ε',
      'ό': 'ο', 'ὸ': 'ο', 'ὀ': 'ο', 'ὁ': 'ο', 'ὄ': 'ο', 'ὅ': 'ο',
    };
    return map[match] || match;
  });

  // Traži sve instance u originalText
  const matches = allEntries.filter(e => e.originalText && e.originalText.includes(greekBase.substring(0, 4)));

  if (matches.length === 0) continue;

  console.log(`\n${'='.repeat(80)}`);
  console.log(`Grčki: ${greek}`);
  console.log(`Očekivano stsl: ${stsl}`);
  console.log(`Očekivano sr: ${sr}`);
  console.log(`Pronađeno ${matches.length} instanci:`);
  console.log('='.repeat(80));

  for (const entry of matches.slice(0, 10)) { // Maksimalno 10 primera
    console.log(`\nFajl: ${entry.file}`);
    console.log(`ID: ${entry._id}`);
    console.log(`Tip: ${entry.type}`);
    console.log(`Original: ${entry.originalText.substring(0, 100)}...`);
    console.log(`SR: ${entry.sr.substring(0, 100)}...`);
    console.log(`STSL: ${entry.stsl.substring(0, 100)}...`);
  }

  if (matches.length > 10) {
    console.log(`\n... i još ${matches.length - 10} instanci.`);
  }

  // Pauziraj nakon svakog termina
  console.log(`\n[Enter za sledeći termin, Ctrl+C za prekid]`);
  await new Promise(resolve => {
    process.stdin.once('data', resolve);
  });
}
