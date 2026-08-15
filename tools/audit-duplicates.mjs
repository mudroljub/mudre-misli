import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const quotesFile = path.join(rootDir, 'data', 'quotes.json')
const reportFile = path.join(rootDir, 'docs', 'DUPLIKATI_KANDIDATI.md')
const quotes = JSON.parse(await fs.readFile(quotesFile, 'utf8'))

// Ručno provereni parovi i pointer-grupe koji nisu duplikati.
const resolvedPairs = new Set([
  'mm-001633:mm-002039', // Pitagorina tvrdnja i Zenonova alternativna atribucija, D. L. VIII.48
])
const resolvedPointers = new Set()

const normalize = value => String(value ?? '')
  .normalize('NFD')
  .replace(/\p{M}/gu, '')
  .toLocaleLowerCase()
  .replace(/[^\p{L}\p{N}]+/gu, ' ')
  .trim()

const tokens = value => new Set(normalize(value).split(/\s+/).filter(token => token.length >= 3))

const jaccard = (left, right) => {
  const a = tokens(left)
  const b = tokens(right)
  if (a.size < 4 || b.size < 4) return 0
  let intersection = 0
  for (const token of a) if (b.has(token)) intersection += 1
  return intersection / new Set([...a, ...b]).size
}

const primarySource = entry => entry.sources?.[0] ?? {}
const refKey = entry => `${primarySource(entry).name ?? ''}:${primarySource(entry).reference ?? ''}`
const excerpt = value => {
  const compact = String(value ?? '').replace(/\s+/g, ' ').trim()
  return compact.length > 150 ? `${compact.slice(0, 147)}…` : compact
}
const escapeCell = value => excerpt(value).replaceAll('|', '\\|')

const groupBy = (items, keyFor) => {
  const groups = new Map()
  for (const item of items) {
    const key = keyFor(item)
    if (!key) continue
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(item)
  }
  return [...groups.entries()].filter(([, group]) => group.length > 1)
}

const exactOriginalGroups = groupBy(
  quotes.filter(entry => normalize(entry.originalText).length >= 12),
  entry => normalize(entry.originalText),
)

const exactPointerGroups = groupBy(
  quotes.filter(
    entry => entry.pointer
      && !entry.pointer.startsWith('data/sources/walter-burley/')
      && !entry.pointer.startsWith('data/sources/diogenes-laertius/')
      && !resolvedPointers.has(entry.pointer),
  ),
  entry => entry.pointer,
)

const similarPairs = []
for (const [, group] of groupBy(quotes, refKey)) {
  for (let left = 0; left < group.length; left += 1) {
    for (let right = left + 1; right < group.length; right += 1) {
      const a = group[left]
      const b = group[right]
      const pairKey = [a.id, b.id].sort().join(':')
      if (resolvedPairs.has(pairKey)) continue
      if (normalize(a.originalText) === normalize(b.originalText)) continue
      const similarity = jaccard(a.originalText, b.originalText)
      if (similarity >= 0.72) similarPairs.push({ a, b, similarity })
    }
  }
}
similarPairs.sort((a, b) => b.similarity - a.similarity)

const lines = [
  '# Kandidati za duplikate i deljene unose',
  '',
  'Izveštaj je automatski izveden iz `data/quotes.json`. Kandidat nije automatski',
  'duplikat: isti izvorni paragraf može namerno biti podeljen na više unosa.',
  'Posle izmene korpusa izveštaj se obnavlja komandom `npm run audit:duplicates`.',
  '',
]

if (exactOriginalGroups.length) {
  lines.push('## Isti normalizovani izvornik — najjači kandidati', '', `Broj grupa: **${exactOriginalGroups.length}**.`, '')
}

for (const [key, group] of exactOriginalGroups) {
  lines.push(`### ${group.map(entry => `\`${entry.id}\``).join(' / ')}`, '', `Normalizovani izvornik: \`${escapeCell(key)}\``, '')
  lines.push('| ID | Autor | Tip | Izvor | Pointer | Srpski |', '| --- | --- | --- | --- | --- | --- |')
  for (const entry of group) {
    lines.push(`| \`${entry.id}\` | ${escapeCell(entry.author)} | \`${entry.type}\` | ${escapeCell(refKey(entry))} | ${escapeCell(entry.pointer || '—')} | ${escapeCell(entry.sr)} |`)
  }
  lines.push('', '- [ ] Odluka: duplikat / deljeni unos / opravdano odvojeno', '')
}

if (similarPairs.length) {
  lines.push('## Sličan izvornik u istoj izvornoj referenci', '', `Broj parova sa sličnošću najmanje 72%: **${similarPairs.length}**.`, '')
  lines.push('| Sličnost | Prvi unos | Drugi unos | Izvor |', '| ---: | --- | --- | --- |')
  for (const { a, b, similarity } of similarPairs) {
    lines.push(`| ${Math.round(similarity * 100)}% | \`${a.id}\` ${escapeCell(a.author)} — ${escapeCell(a.sr)} | \`${b.id}\` ${escapeCell(b.author)} — ${escapeCell(b.sr)} | ${escapeCell(refKey(a))} |`)
  }
  lines.push('')
}

if (exactPointerGroups.length) {
  lines.push('## Potpuno isti pointer — kandidati za proveru atomizacije', '', `Broj grupa: **${exactPointerGroups.length}**.`, '')
}

for (const [pointer, group] of exactPointerGroups) {
  lines.push(`### \`${pointer}\``, '', '| ID | Autor | Tip | Referenca | Srpski |', '| --- | --- | --- | --- | --- |')
  for (const entry of group) {
    lines.push(`| \`${entry.id}\` | ${escapeCell(entry.author)} | \`${entry.type}\` | ${escapeCell(primarySource(entry).reference)} | ${escapeCell(entry.sr)} |`)
  }
  lines.push('', '- [ ] Odluka: duplikat / deljeni unos / pravilna atomizacija / neprecizan pointer', '')
}

if (!exactOriginalGroups.length && !similarPairs.length && !exactPointerGroups.length) {
  lines.push('Trenutno nema otvorenih kandidata.', '')
} else {
  lines.push('## Kako pregledati', '', '1. Isti normalizovani izvornik najjači je signal duplikata.', '2. Kod sličnog izvornika proveriti da li je jedan unos skraćena verzija drugog.', '3. Ne spajati unose samo zato što dele paragraf ili pointer.', '4. Ako isti događaj pripada više autora, sačuvati jedan deljeni unos umesto kopija.', '')
}

await fs.writeFile(reportFile, `${lines.join('\n')}\n`, 'utf8')
console.log(`Generated ${reportFile}`)
console.log(`Exact originals: ${exactOriginalGroups.length}; similar pairs: ${similarPairs.length}; exact pointers: ${exactPointerGroups.length}`)
