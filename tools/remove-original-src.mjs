import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authorsPath = path.join(__dirname, '../data/authors.json');

const authors = JSON.parse(fs.readFileSync(authorsPath, 'utf-8'));

let removed = 0;

for (const [name, data] of Object.entries(authors)) {
  if (data.originalSrc) {
    delete data.originalSrc;
    removed++;
    console.log(`Removed originalSrc from ${name}`);
  }
}

fs.writeFileSync(authorsPath, JSON.stringify(authors, null, 2), 'utf-8');

console.log(`\nTotal removed: ${removed}`);
