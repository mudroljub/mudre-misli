#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const QUOTES_DIR = 'data/quotes';

function migrateQuoteFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const quotes = JSON.parse(content);

  let modified = false;

  const migratedQuotes = quotes.map(quote => {
    // Skip if already migrated
    if (quote.sources) {
      return quote;
    }

    // Skip if no source field
    if (!quote.source) {
      return quote;
    }

    modified = true;

    // Create new structure
    const newQuote = { ...quote };

    // Convert to sources array
    newQuote.sources = [
      {
        name: quote.source,
        reference: quote.reference || null
      }
    ];

    // Remove old fields
    delete newQuote.source;
    delete newQuote.reference;

    return newQuote;
  });

  if (modified) {
    writeFileSync(filePath, JSON.stringify(migratedQuotes, null, 2) + '\n', 'utf-8');
    return true;
  }

  return false;
}

function main() {
  const files = readdirSync(QUOTES_DIR).filter(f => f.endsWith('.json'));

  console.log(`Found ${files.length} quote files to process...\n`);

  let migratedCount = 0;
  let totalQuotes = 0;

  for (const file of files) {
    const filePath = join(QUOTES_DIR, file);
    const content = JSON.parse(readFileSync(filePath, 'utf-8'));
    totalQuotes += content.length;

    const wasMigrated = migrateQuoteFile(filePath);

    if (wasMigrated) {
      migratedCount++;
      console.log(`✅ Migrated: ${file}`);
    } else {
      console.log(`⏭️  Skipped: ${file} (already migrated or no source field)`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Total files: ${files.length}`);
  console.log(`   Migrated: ${migratedCount}`);
  console.log(`   Skipped: ${files.length - migratedCount}`);
  console.log(`   Total quotes: ${totalQuotes}`);
}

main();
