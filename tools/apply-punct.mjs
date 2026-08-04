import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const dir = './data/quotes';

function transform(stsl) {
  return stsl
    .replace(/["\u201E\u201C\u201D\u2018\u2019\u00AB\u00BB]/g, '')
    .replace(/\s*\u2014\s*/g, ' \u00B7 ')
    .replace(/[.,;:!?]+\s*/g, ' \u00B7 ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .replace(/\s*\u00B7\s*$/, '')
    + ' \u00B7';
}

for (const file of readdirSync(dir).filter(f => f.endsWith('.json'))) {
  const fp = join(dir, file);
  const data = JSON.parse(readFileSync(fp, 'utf8'));
  for (const entry of data) {
    if (entry.stsl) entry.stsl = transform(entry.stsl);
  }
  writeFileSync(fp, JSON.stringify(data, null, 4) + '\n', 'utf8');
  console.log(file);
}
