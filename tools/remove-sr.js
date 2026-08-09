#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get author name from command line argument
const authorName = process.argv[2];

if (!authorName) {
  console.error('Usage: node remove-sr.js <AuthorName>');
  console.error('Example: node remove-sr.js Heraclitus');
  process.exit(1);
}

const filePath = path.join(__dirname, '..', 'data', 'quotes', `${authorName}.json`);

if (!fs.existsSync(filePath)) {
  console.error(`Error: File not found: ${filePath}`);
  process.exit(1);
}

console.log(`Reading ${filePath}...`);

// Read the JSON file
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let removedCount = 0;

// Remove "sr" field from each entry
data.forEach(entry => {
  if (entry.sr) {
    delete entry.sr;
    removedCount++;
  }
});

// Write back to file with proper formatting
fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');

console.log(`✓ Removed ${removedCount} "sr" fields from ${authorName}.json`);
