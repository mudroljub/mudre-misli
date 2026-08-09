import fs from 'fs';
import path from 'path';

const quotesDir = 'data/quotes';
const files = fs.readdirSync(quotesDir).filter(f => f.endsWith('.json') && f !== 'quotes.json');

let totalFixed = 0;

files.forEach(file => {
  const filePath = path.join(quotesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Zameni отъ → Отъ ako je:
  // 1. Na početku stringa nakon navodnika: "отъ
  // 2. Nakon srednje tačke i razmaka: · отъ
  const before = (content.match(/"отъ|· отъ/g) || []).length;
  
  content = content.replace(/"отъ/g, '"Отъ');
  content = content.replace(/· отъ/g, '· Отъ');
  
  const after = before - (content.match(/"отъ|· отъ/g) || []).length;
  
  if (after > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`${file}: capitalized ${after} instances`);
    totalFixed += after;
  }
});

console.log(`\nTotal: Capitalized ${totalFixed} instances`);
