import fs from 'fs';
import path from 'path';

const quotesDir = 'data/quotes';

// Lista grčkih imena koja treba zadržati sa Ѡ/ѡ
const greekNames = [
  'Блѡсѡна', 'Блѡсѡнъ', 'Херакѡна', 'Херакѡнъ',
  'Сѡкратъ', 'Сѡкрата', 'Сѡкратомъ', 'Сѡкратѹ',
  'Платѡнъ', 'Платѡна', 'Платѡномъ', 'Платѡнѹ',
  'Аристѡтєль', 'Аристѡтєлѧ',
  'Пѷѳагѡра', 'Пѷѳагѡрꙋ', 'Пѷѳагѡръ',
  'Ꙁєнѡфанъ', 'Ꙁєнѡфана',
  'Ємпєдѡклъ', 'Ємпєдѡкла'
];

const files = fs.readdirSync(quotesDir).filter(f => f.endsWith('.json') && f !== 'quotes.json');

let totalFixed = 0;

files.forEach(file => {
  const filePath = path.join(quotesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const originalCount = (content.match(/ѡ/g) || []).length;
  
  // Privremeno zameni grčka imena placeholder-ima
  const placeholders = {};
  greekNames.forEach((name, idx) => {
    const placeholder = `__GREEK_NAME_${idx}__`;
    placeholders[placeholder] = name;
    const regex = new RegExp(name, 'g');
    content = content.replace(regex, placeholder);
  });
  
  // Zameni sve preostale ѡ → о i Ѡ → О
  content = content.replaceAll('ѡ', 'о');
  content = content.replaceAll('Ѡ', 'О');
  
  // Vrati grčka imena
  Object.entries(placeholders).forEach(([placeholder, name]) => {
    content = content.replaceAll(placeholder, name);
  });
  
  const newCount = (content.match(/ѡ/g) || []).length;
  const fixed = originalCount - newCount;
  
  if (fixed > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`${file}: ${originalCount} → ${newCount} (fixed ${fixed})`);
    totalFixed += fixed;
  }
});

console.log(`\nTotal: Fixed ${totalFixed} omega characters across ${files.length} files`);
