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

async function findCorrectUrl(brokenUrl) {
  // Extract filename from URL (handle encoded characters)
  const match = brokenUrl.match(/\/([^\/]+)\.(?:jpg|jpeg|png|gif)(?:\?|$)/i);
  if (!match) return null;

  const filename = decodeURIComponent(match[1] + match[0].match(/\.(jpg|jpeg|png|gif)/i)[0]);

  // Try to fetch the Commons page
  const commonsUrl = `https://commons.wikimedia.org/wiki/File:${filename.replace(/ /g, '_')}`;

  try {
    const response = await fetch(commonsUrl);
    if (!response.ok) return null;

    const html = await response.text();

    // Extract the actual image URL from the page
    const imageMatch = html.match(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[a-f0-9]\/[a-f0-9]{2}\/[^"]+\.(?:jpg|jpeg|png|gif)/i);
    if (imageMatch) {
      // Remove thumbnail path if present
      let url = imageMatch[0];
      url = url.replace(/\/thumb\//, '/');
      url = url.replace(/\/\d+px-[^\/]+$/, '');

      // Verify the URL works
      if (await verifyUrl(url)) {
        return url;
      }
    }
  } catch (error) {
    console.error(`Error fetching ${commonsUrl}:`, error.message);
  }

  return null;
}

console.log('Finding correct URLs for broken images...\n');

let fixed = 0;
const couldNotFix = [];

for (const [name, data] of Object.entries(authors)) {
  const fields = ['src'];
  if (data.originalSrc) fields.push('originalSrc');

  for (const field of fields) {
    const url = data[field];

    if (url && url.startsWith('http')) {
      const isOk = await verifyUrl(url);

      if (!isOk) {
        console.log(`🔍 Fixing ${name} (${field})...`);
        const correctUrl = await findCorrectUrl(url);

        if (correctUrl) {
          console.log(`  ✅ Found: ${correctUrl}`);
          authors[name][field] = correctUrl;
          fixed++;
        } else {
          console.log(`  ❌ Could not find correct URL`);
          couldNotFix.push({ name, field, url });
        }

        // Small delay
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
}

// Write updated authors.json
fs.writeFileSync(authorsPath, JSON.stringify(authors, null, 2), 'utf-8');

console.log(`\n\nFixed: ${fixed}`);
console.log(`Could not fix: ${couldNotFix.length}`);

if (couldNotFix.length > 0) {
  console.log('\nCould not fix:');
  couldNotFix.forEach(item => console.log(`- ${item.name} (${item.field})`));
}
