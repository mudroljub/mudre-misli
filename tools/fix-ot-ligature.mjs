import fs from 'fs';
import path from 'path';

const quotesDir = 'data/quotes';
const files = fs.readdirSync(quotesDir).filter(f => f.endsWith('.json') && f !== 'quotes.json');

let totalFixed = 0;

files.forEach(file => {
  const filePath = path.join(quotesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Trenutno ima От/от (bez jera), treba otъ
  const beforeOt = (content.match(/От[^ъ]/g) || []).length;
  const beforeot = (content.match(/от[^ъ]/g) || []).length;
  
  // Zameni От → отъ (ako vec nema ъ)
  content = content.replace(/От(?!ъ)/g, 'отъ');
  // Zameni от → отъ (ako vec nema ъ) 
  content = content.replace(/от(?!ъ)/g, 'отъ');
  
  const afterCount = (content.match(/отъ/g) || []).length;
  const fixed = beforeOt + beforeot;
  
  if (fixed > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`${file}: fixed ${fixed} instances → ${afterCount} total отъ`);
    totalFixed += fixed;
  }
});

console.log(`\nTotal: Fixed ${totalFixed} instances across all files`);
