import { promises as fs } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const sourceDir = path.join(rootDir, 'data', 'sources', 'suda')
const input = path.join(sourceDir, 'suda.tei-grc.xml')

const stripXml = value => value
  .replace(/<note\b[\s\S]*?<\/note>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replaceAll('&amp;', '&')
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replace(/\s+/g, ' ')
  .trim()

const confirmedPeople = [
  ['Anaharsid', '1.A.2130'],
  ['Anaksagora', '1.A.1981'],
  ['Anaksimander', '1.A.1986'],
  ['Anaksimen', '1.A.1988'],
  ['Antisten', '1.A.2723'],
  ['Aristip', '1.A.3909'],
  ['Aristotel', '1.A.3929'],
  ['Demokrit', '2.Δ.447'],
  ['Diogen iz Sinope', '2.Δ.1143'],
  ['Empedoklo', '2.E.1002'],
  ['Epikur', '2.E.2404'],
  ['Epiktet', '2.E.2424'],
  ['Gorgija', '1.Γ.388'],
  ['Kratet iz Tebe', '3.Κ.2341'],
  ['Ksenokrat', '3.Ξ.42'],
  ['Musonije Ruf', '3.Μ.1305'],
  ['Parmenid', '4.Π.675'],
  ['Pitagora', '4.Π.3120'],
  ['Platon', '4.Π.1709'],
  ['Plotin', '4.Π.1811'],
  ['Protagora', '4.Π.2958'],
  ['Sokrat', '4.Σ.829'],
  ['Stilbon', '4.Σ.1114'],
  ['Ksenofont', '3.Ξ.47'],
]

const source = await fs.readFile(input, 'utf8')
const lines = source.split(/\r?\n/)
const entries = []
let book = null
let chapter = null
let section = null
let sectionLines = []

for (const line of lines) {
  const textpart = line.match(/<div type="textpart" subtype="(book|chapter|section)" n="([^"]+)">/)
  if (textpart?.[1] === 'book') book = textpart[2]
  if (textpart?.[1] === 'chapter') chapter = textpart[2]
  if (textpart?.[1] === 'section') {
    section = textpart[2]
    sectionLines = [line]
    if (!line.includes('</div>')) continue
  }
  if (!section) continue
  if (sectionLines.at(-1) !== line) sectionLines.push(line)
  if (!line.includes('</div>')) continue

  const fullText = stripXml(sectionLines.join('\n'))
  const withoutNumber = fullText.replace(/^\d+[a-z]?\s+/, '')
  const lemma = withoutNumber.split(':', 1)[0].trim()
  const reference = `${book}.${chapter}.${section}`
  entries.push({ reference, lemma, excerpt: withoutNumber.slice(0, 600), text: withoutNumber })
  section = null
  sectionLines = []
}

const biographicalPattern = /(?:φιλόϲοφ|φιλοσόφ|ϲοφιϲτ|σοφιστ|μαθητ[ὴή]|διδάσκαλ|ῥήτωρ|ρητωρ)/i
const candidates = entries.filter(entry => biographicalPattern.test(entry.excerpt))
const entriesByReference = new Map(entries.map(entry => [entry.reference, entry]))
const confirmed = []
const lifeFiles = []
for (const [name, reference] of confirmedPeople) {
  const match = entriesByReference.get(reference)
  if (!match) throw new Error(`Confirmed Suda biography ${reference} for ${name} does not exist`)
  const filename = `${reference.replace(/[^\p{L}\p{N}]+/gu, '_')}.md`
  confirmed.push({
    name,
    reference,
    lemma: match.lemma,
    href: `lives/${filename}`,
  })
  lifeFiles.push({ filename, contents: `# ${name}\n\n**Suda:** ${reference}\n\n**Lema:** ${match.lemma}\n\n${match.text}\n` })
}

await fs.mkdir(path.join(sourceDir, 'lives'), { recursive: true })
await Promise.all([
  fs.writeFile(path.join(sourceDir, 'entries-index.json'), `${JSON.stringify(entries.map(({ text, ...entry }) => entry), null, 2)}\n`, 'utf8'),
  fs.writeFile(path.join(sourceDir, 'biography-candidates.json'), `${JSON.stringify(candidates.map(({ text, ...entry }) => entry), null, 2)}\n`, 'utf8'),
  fs.writeFile(path.join(sourceDir, 'lives-index.json'), `${JSON.stringify(confirmed, null, 2)}\n`, 'utf8'),
  ...lifeFiles.map(file => fs.writeFile(path.join(sourceDir, 'lives', file.filename), file.contents, 'utf8')),
])

console.log(`Indexed ${entries.length} Suda entries; selected ${candidates.length} candidates and confirmed ${confirmed.length} project biographies.`)
