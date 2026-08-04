import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('./data/quotes/Tales.json', 'utf8'));

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

for (let i = 0; i < data.length; i++) {
  data[i].stsl = transform(data[i].stsl);
}

writeFileSync('./data/quotes/Tales.json', JSON.stringify(data, null, 4) + '\n', 'utf8');
console.log('Tales.json ažuriran.');
