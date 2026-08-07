#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const QUOTES_DIR = 'data/quotes';

// Mapping from long source names to normalized keys
const SOURCE_NAME_MAP = {
  'Walter Burley, De Vita et Moribus Philosophorum, Cap. XXVI': 'walter-burley',
  'Walter Burley, De Vita et Moribus Philosophorum, Cap. XXIX': 'walter-burley',
  'Walter Burley, De Vita et Moribus Philosophorum, Cap. XXVI (ex Valerio Maximo III, III, Ext. 2)': 'walter-burley',
  'Walter Burley, De Vita et Moribus Philosophorum, Cap. XXIX (ex Seneca)': 'walter-burley',
};

function normalizeSourceName(name) {
  return SOURCE_NAME_MAP[name] || name;
}

function normalizeQuoteFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const quotes = JSON.parse(content);

  let modified = false;

  const normalizedQuotes = quotes.map(quote => {
    if (!quote.sources || !Array.isArray(quote.sources)) {
      return quote;
    }

    const normalizedSources = quote.sources.map(source => {
      const normalizedName = normalizeSourceName(source.name);

      if (normalizedName !== source.name) {
        modified = true;
        return {
          ...source,
          name: normalizedName
        };
      }

      return source;
    });

    return {
      ...quote,
      sources: normalizedSources
    };
  });

  if (modified) {
    writeFileSync(filePath, JSON.stringify(normalizedQuotes, null, 2) + '\n', 'utf-8');
    return true;
  }

  return false;
}

function main() {
  const files = readdirSync(QUOTES_DIR).filter(f => f.endsWith('.json'));

  console.log(`Processing ${files.length} quote files...\n`);

  let normalizedCount = 0;
  let affectedQuotes = 0;

  for (const file of files) {
    const filePath = join(QUOTES_DIR, file);
    const content = JSON.parse(readFileSync(filePath, 'utf-8'));

    const beforeCount = content.filter(q =>
      q.sources?.some(s => SOURCE_NAME_MAP[s.name])
    ).length;

    const wasNormalized = normalizeQuoteFile(filePath);

    if (wasNormalized) {
      normalizedCount++;
      affectedQuotes += beforeCount;
      console.log(`✅ Normalized: ${file} (${beforeCount} quotes)`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Total files: ${files.length}`);
  console.log(`   Files normalized: ${normalizedCount}`);
  console.log(`   Quotes affected: ${affectedQuotes}`);
}

main();
