import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authorsPath = path.join(__dirname, '../data/authors.json');

const authors = JSON.parse(fs.readFileSync(authorsPath, 'utf-8'));

async function verifyUrl(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}

console.log('Checking all image URLs...\n');

const broken = [];

for (const [name, data] of Object.entries(authors)) {
  const url = data.src;

  // Check both src and originalSrc
  const urlsToCheck = [url];
  if (data.originalSrc) {
    urlsToCheck.push(data.originalSrc);
  }

  for (const urlToCheck of urlsToCheck) {
    if (urlToCheck.startsWith('http')) {
      const isOk = await verifyUrl(urlToCheck);
      const label = urlToCheck === url ? 'src' : 'originalSrc';

      if (!isOk) {
        console.log(`❌ ${name} (${label}): ${urlToCheck}`);
        broken.push({ name, field: label, url: urlToCheck });
      } else {
        console.log(`✅ ${name} (${label})`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

console.log(`\n\nTotal broken URLs: ${broken.length}`);
if (broken.length > 0) {
  console.log('\nBroken URLs:');
  broken.forEach(b => console.log(`- ${b.name} (${b.field}): ${b.url}`));
}
