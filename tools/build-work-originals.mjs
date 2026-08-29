import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const indexFile = path.join(rootDir, 'data', 'works-index.json')
const outputFile = path.join(rootDir, 'data', 'work-originals.json')
const works = JSON.parse(await fs.readFile(indexFile, 'utf8'))
const xmlCache = new Map()

const attrs = tag => Object.fromEntries(
  [...tag.matchAll(/([:\w-]+)="([^"]*)"/gu)].map(match => [match[1], match[2]]),
)

const extractElement = (xml, start, name = 'div') => {
  const tags = new RegExp(`<\\/?${name}\\b[^>]*>`, 'gu')
  tags.lastIndex = start
  let depth = 0
  let match
  while ((match = tags.exec(xml))) {
    if (!match[0].startsWith('</')) depth += 1
    else depth -= 1
    if (depth === 0) return xml.slice(start, tags.lastIndex)
  }
  throw new Error(`Unclosed <${name}> at ${start}`)
}

const findDiv = (xml, expected) => {
  const tags = /<div\b[^>]*>/gu
  let match
  while ((match = tags.exec(xml))) {
    const values = attrs(match[0])
    if (Object.entries(expected).every(([key, value]) => values[key] === String(value))) {
      return { start: match.index, xml: extractElement(xml, match.index) }
    }
  }
  return null
}

const decodeEntities = text => text
  .replace(/&#x([0-9a-f]+);/giu, (_, value) => String.fromCodePoint(Number.parseInt(value, 16)))
  .replace(/&#(\d+);/gu, (_, value) => String.fromCodePoint(Number(value)))
  .replaceAll('&amp;', '&')
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replaceAll('&quot;', '"')
  .replaceAll('&apos;', "'")

const teiToText = fragment => decodeEntities(fragment
  .replace(/<note\b[\s\S]*?<\/note>/gu, ' ')
  .replace(/<head\b[^>]*>/gu, '')
  .replace(/<\/head>/gu, '\n')
  .replace(/<\/(?:p|said|l|sp)>/gu, '\n')
  .replace(/<label\b[^>]*>/gu, '')
  .replace(/<\/label>/gu, ' ')
  .replace(/<[^>]+>/gu, ' ')
  .replace(/[ \t]+/gu, ' ')
  .replace(/ *\n */gu, '\n')
  .replace(/\n{3,}/gu, '\n\n')
  .trim())

const romanToNumber = roman => {
  const values = { I: 1, V: 5, X: 10 }
  let total = 0
  for (let i = 0; i < roman.length; i += 1) {
    total += values[roman[i]] < (values[roman[i + 1]] ?? 0) ? -values[roman[i]] : values[roman[i]]
  }
  return total
}

const canonicalGreekFile = async workId => {
  const [authorId, textId] = workId.split('.')
  const directory = path.join(rootDir, 'data', 'sources', 'canonical-greekLit', 'data', authorId, textId)
  const files = (await fs.readdir(directory)).filter(file => /\.perseus-grc\d+\.xml$/u.test(file)).sort()
  if (!files.length) throw new Error(`No Greek edition for ${workId}`)
  return path.join(directory, files.at(-1))
}

const readXml = async filename => {
  let xml = xmlCache.get(filename)
  if (xml === undefined) {
    xml = await fs.readFile(filename, 'utf8')
    xmlCache.set(filename, xml)
  }
  return xml
}

const extractStephanus = (xml, anchor) => {
  const milestones = [...xml.matchAll(/<milestone\b[^>]*\/>/gu)]
    .filter(match => attrs(match[0]).unit === 'section')
  const index = milestones.findIndex(match => attrs(match[0]).n === anchor)
  if (index < 0) return null
  const start = milestones[index].index + milestones[index][0].length
  const end = milestones[index + 1]?.index ?? xml.indexOf('</div>', start)
  return teiToText(xml.slice(start, end))
}

const extractDiscourses = (xml, anchor) => {
  const match = anchor.match(/^([IVX]+)\.(\d+)$/u)
  if (!match) return null
  const book = findDiv(xml, { subtype: 'book', n: romanToNumber(match[1]) })
  if (!book) return null
  const chapter = findDiv(book.xml, { subtype: 'chapter', n: match[2] })
  return chapter ? teiToText(chapter.xml) : null
}

const extractEnchiridion = (xml, anchor) => {
  const chapter = findDiv(xml, { subtype: 'chapter', n: anchor })
  return chapter ? teiToText(chapter.xml) : null
}

const extractFragment = (xml, anchor) => {
  const fragment = findDiv(xml, { subtype: 'fragment', n: anchor })
  return fragment ? teiToText(fragment.xml) : null
}

const parseReferenceRange = reference => {
  const match = reference?.match(/^X\.(\d+)[–-](\d+)$/u)
  return match ? [Number(match[1]), Number(match[2])] : null
}

const extractDiogenesRange = (xml, reference) => {
  const range = parseReferenceRange(reference)
  if (!range) return null
  const book = findDiv(xml, { subtype: 'book', n: '10' })
  if (!book) return null
  const sections = []
  for (let number = range[0]; number <= range[1]; number += 1) {
    const section = findDiv(book.xml, { subtype: 'section', n: number })
    if (!section) throw new Error(`Missing Diogenes Laertius X.${number}`)
    sections.push(teiToText(section.xml))
  }
  return sections.join('\n\n')
}

const extractDiogenesSection = (xml, reference, anchor) => {
  const range = parseReferenceRange(reference)
  if (!range || !/^\d+$/u.test(anchor)) return null
  const number = Number(anchor)
  if (number < range[0] || number > range[1]) return null
  const book = findDiv(xml, { subtype: 'book', n: '10' })
  if (!book) return null
  const section = findDiv(book.xml, { subtype: 'section', n: number })
  return section ? teiToText(section.xml) : null
}

const originals = {}

for (const work of works) {
  let filename
  let xml
  if (work.source.name === 'canonical-greekLit') {
    filename = await canonicalGreekFile(work.source.work)
    xml = await readXml(filename)
  } else if (work.source.name === 'diogenes-laertius') {
    filename = path.join(rootDir, 'data', 'sources', 'diogenes-laertius', 'diogenes-laertius.xml')
    xml = await readXml(filename)
  } else {
    throw new Error(`Unsupported work source ${work.source.name}`)
  }

  const relativeFile = path.relative(rootDir, filename).replaceAll('\\', '/')
  for (const section of work.sections) {
    let text
    let citation
    if (work.source.name === 'diogenes-laertius') {
      if (section.anchor === '1') {
        text = extractDiogenesRange(xml, work.source.reference)
        citation = work.source.reference.replace(/^X\./u, '10.')
      } else {
        text = extractDiogenesSection(xml, work.source.reference, section.anchor)
        citation = `10.${section.anchor}`
      }
    } else if (work.citationScheme === 'stephanus') {
      text = extractStephanus(xml, section.anchor)
      citation = section.anchor
    } else if (work.slug === 'discourses') {
      text = extractDiscourses(xml, section.anchor)
      citation = `${romanToNumber(section.anchor.split('.')[0])}.${section.anchor.split('.')[1]}`
    } else if (work.citationScheme === 'fragment') {
      text = extractFragment(xml, section.anchor)
      citation = section.anchor
    } else {
      text = extractEnchiridion(xml, section.anchor)
      citation = section.anchor
    }

    if (!text) throw new Error(`Cannot resolve original for ${work.id}#${section.anchor}`)
    originals[`${work.id}#${section.anchor}`] = {
      text,
      pointer: `${relativeFile}#${citation}`,
    }
  }
}

const output = `${JSON.stringify(originals, null, 2)}\n`
let current = null
try { current = await fs.readFile(outputFile, 'utf8') } catch (error) {
  if (error?.code !== 'ENOENT') throw error
}
if (current !== output) await fs.writeFile(outputFile, output, 'utf8')
console.log(`${current === output ? 'Unchanged' : 'Generated'} ${outputFile} (${Object.keys(originals).length} sections)`)
