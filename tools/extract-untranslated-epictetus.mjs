import fs from 'node:fs'
import path from 'node:path'

const source = path.join(
  process.cwd(),
  'data', 'sources', 'canonical-greekLit', 'data', 'tlg0557', 'tlg001',
  'tlg0557.tlg001.perseus-grc2.xml',
)
const outputDirectory = path.join(process.cwd(), 'data', 'sources', 'epictetus', 'discourses', 'pending')
const chapters = [
  ['I.30', '1', '30'],
  ['III.9', '3', '9'],
  ...Array.from({ length: 11 }, (_, index) => [`IV.${index + 3}`, '4', String(index + 3)]),
]

const decode = value => value
  .replace(/<[^>]+>/gu, '')
  .replace(/&lt;/gu, '<')
  .replace(/&gt;/gu, '>')
  .replace(/&amp;/gu, '&')
  .replace(/&quot;/gu, '"')
  .replace(/\s+/gu, ' ')
  .trim()

const escape = value => value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
const xml = fs.readFileSync(source, 'utf8')
fs.mkdirSync(outputDirectory, { recursive: true })

for (const [anchor, book, chapter] of chapters) {
  const start = new RegExp(`<div type="textpart" subtype="chapter" xml:base="urn:cts:greekLit:tlg0557\\.tlg001\\.perseus-grc2:${book}" n="${chapter}">`, 'u')
  const startMatch = start.exec(xml)
  if (!startMatch) throw new Error(`Missing ${anchor} in Greek source`)
  const remainder = xml.slice(startMatch.index + startMatch[0].length)
  const endMatch = /<div type="textpart" subtype="chapter"/u.exec(remainder)
  const chapterXml = remainder.slice(0, endMatch?.index)
  const titleMatch = /<head>([\s\S]*?)<\/head>/u.exec(chapterXml)
  const paragraphs = Array.from(chapterXml.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gu), match => decode(match[1]))
    .filter(Boolean)
  const title = titleMatch ? decode(titleMatch[1]) : ''
  const filename = anchor.toLowerCase().replace('.', '-') + '.grc.md'
  const content = [
    '---',
    'author: Epictetus',
    'work: Discourses',
    `anchor: ${anchor}`,
    `original_title: ${title}`,
    'language: grc',
    'source:',
    '  collection: canonical-greekLit',
    '  work: tlg0557.tlg001',
    `  cts: urn:cts:greekLit:tlg0557.tlg001.perseus-grc2:${book}.${chapter}`,
    '  edition: Perseus grc2 (Schenkl, 1916)',
    '---',
    '',
    ...paragraphs.flatMap(paragraph => [paragraph, '']),
  ].join('\n')
  fs.writeFileSync(path.join(outputDirectory, filename), content, 'utf8')
}

console.log(`Extracted ${chapters.length} Greek chapters to ${path.relative(process.cwd(), outputDirectory)}`)
