import fs from 'fs';

const file = 'data/quotes/Heraclitus.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Pronađi entry koji treba premestiti (year: -520)
const targetIndex = data.findIndex(e => e.year === -520 && e.type === 'bio');
const targetEntry = data[targetIndex];

// Ukloni ga sa trenutne pozicije
data.splice(targetIndex, 1);

// Pronađi poziciju nakon year: -530 i pre year: -504
const insertIndex = data.findIndex((e, i) => 
  e.year === -530 && data[i + 1]?.year === -504
) + 1;

// Ubaci na novu poziciju
data.splice(insertIndex, 0, targetEntry);

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log(`Moved entry from position ${targetIndex} to ${insertIndex}`);
