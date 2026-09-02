import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const attrs = tag => Object.fromEntries(
  [...tag.matchAll(/([:\w-]+)="([^"]*)"/gu)].map(match => [match[1], match[2]]),
)

const roman = number => {
  const values = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
  let rest = number
  let result = ''
  for (const [value, numeral] of values) {
    while (rest >= value) {
      result += numeral
      rest -= value
    }
  }
  return result
}

const textparts = xml => {
  const stack = []
  const result = []
  const tags = /<\/?div\b[^>]*>/gu
  let match
  while ((match = tags.exec(xml))) {
    if (match[0].startsWith('</')) {
      stack.pop()
      continue
    }
    const values = attrs(match[0])
    const node = { subtype: values.subtype, n: values.n }
    stack.push(node)
    if (node.subtype) result.push([...stack])
  }
  return result
}

const collectPlotinus = xml => textparts(xml)
  .filter(path => path.at(-1)?.subtype === 'section')
  .map(path => {
    const book = path.find(node => node.subtype === 'book')?.n
    const chapter = path.find(node => node.subtype === 'chapter')?.n
    const section = path.find(node => node.subtype === 'section')?.n
    if (!book || !chapter || !section) throw new Error('Incomplete Plotinus hierarchy')
    return { anchor: `${roman(Number(book))}.${chapter}.${section}`, file: `ennead-${roman(Number(book)).toLowerCase()}` }
  })

const collectMarcus = xml => textparts(xml)
  .filter(path => path.at(-1)?.subtype === 'chapter')
  .map(path => {
    const book = path.find(node => node.subtype === 'book')?.n
    const chapter = path.find(node => node.subtype === 'chapter')?.n
    if (!book || !chapter) throw new Error('Incomplete Marcus Aurelius hierarchy')
    return { anchor: `${roman(Number(book))}.${chapter}`, file: `book-${roman(Number(book)).toLowerCase()}` }
  })

const assertUnique = (sections, label) => {
  const anchors = new Set(sections.map(section => section.anchor))
  if (anchors.size !== sections.length) throw new Error(`${label}: duplicate anchors`)
}

const assertIdsFree = async ids => {
  const used = new Set()
  const quoteDir = path.join(rootDir, 'data', 'quotes')
  for (const name of (await fs.readdir(quoteDir)).filter(name => name.endsWith('.json'))) {
    for (const entry of JSON.parse(await fs.readFile(path.join(quoteDir, name), 'utf8'))) used.add(entry.id)
  }
  const worksDir = path.join(rootDir, 'data', 'works')
  const visit = async directory => {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const target = path.join(directory, entry.name)
      if (entry.isDirectory()) await visit(target)
      else if (entry.name === 'work.json') used.add(JSON.parse(await fs.readFile(target, 'utf8')).id)
    }
  }
  await visit(worksDir)
  for (const id of ids) if (used.has(id)) throw new Error(`Identifier already used: ${id}`)
}

const writeDraft = async ({ directory, manifest, sections }) => {
  await fs.mkdir(directory, { recursive: true })
  await fs.writeFile(path.join(directory, 'work.draft.json'), `${JSON.stringify({ ...manifest, sections }, null, 2)}\n`, 'utf8')
  const grouped = new Map()
  for (const section of sections) {
    if (!grouped.has(section.file)) grouped.set(section.file, [])
    grouped.get(section.file).push(section)
  }
  for (const [file, fileSections] of grouped) {
    const body = `${fileSections.map(section => `<!-- anchor:${section.anchor} -->\n`).join('\n')}\n`
    for (const language of ['sr', 'stsl']) {
      await fs.writeFile(path.join(directory, `${file}.${language}.md`), body, 'utf8')
    }
  }
}

const plotinusXml = await fs.readFile(path.join(rootDir, 'data', 'sources', 'First1KGreek', 'data', 'tlg2000', 'tlg001', 'tlg2000.tlg001.1st1K-grc1.xml'), 'utf8')
const marcusXml = await fs.readFile(path.join(rootDir, 'data', 'sources', 'canonical-greekLit', 'data', 'tlg0562', 'tlg001', 'tlg0562.tlg001.perseus-grc2.xml'), 'utf8')
const plotinusSections = collectPlotinus(plotinusXml)
const marcusSections = collectMarcus(marcusXml)

if (plotinusSections.length !== 653) throw new Error(`Expected 653 Plotinus sections, found ${plotinusSections.length}`)
if (marcusSections.length !== 486) throw new Error(`Expected 486 Marcus Aurelius chapters, found ${marcusSections.length}`)
assertUnique(plotinusSections, 'Plotinus')
assertUnique(marcusSections, 'Marcus Aurelius')
await assertIdsFree(['mw-000010', 'mw-000011'])

await writeDraft({
  directory: path.join(rootDir, 'data', 'works', 'plotinus', 'enneads'),
  manifest: {
    id: 'mw-000010',
    slug: 'enneads',
    author: 'Plotinus',
    kind: 'collection',
    title: { sr: 'Eneade', stsl: 'Девѧтицꙑ' },
    originalTitle: 'Ἐννεάδες',
    source: { name: 'First1KGreek', work: 'tlg2000.tlg001' },
    citationScheme: 'book-chapter-section',
  },
  sections: plotinusSections,
})

await writeDraft({
  directory: path.join(rootDir, 'data', 'works', 'marcus-aurelius', 'meditations'),
  manifest: {
    id: 'mw-000011',
    slug: 'meditations',
    author: 'Marcus Aurelius',
    kind: 'collection',
    title: { sr: 'Samome sebi', stsl: 'Самомѹ себѣ' },
    originalTitle: 'Τὰ εἰς ἑαυτόν',
    source: { name: 'canonical-greekLit', work: 'tlg0562.tlg001' },
    citationScheme: 'book-chapter',
  },
  sections: marcusSections,
})

console.log(`Prepared Plotinus: ${plotinusSections.length} sections in ${new Set(plotinusSections.map(section => section.file)).size} files per language`)
console.log(`Prepared Marcus Aurelius: ${marcusSections.length} chapters in ${new Set(marcusSections.map(section => section.file)).size} files per language`)
