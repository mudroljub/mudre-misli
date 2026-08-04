import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const rootDir = path.resolve(__dirname, '..')

const inputDir = path.join(rootDir, 'data/quotes')
const outputFile = path.join(rootDir, 'data/quotes.json')

const files = (await fs.readdir(inputDir))
  .filter(file => file.endsWith('.json'))
  .sort()

const quotes = []
const romanToNumber = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
}
const sourceIndexCache = new Map()

const getElFileForBook = (bookNumber) =>
  `data/sources/diogenes-laertius/el/${String(bookNumber + 1).padStart(2, '0')}.txt`

const loadSectionLineIndex = async (bookNumber) => {
  if (sourceIndexCache.has(bookNumber)) {
    return sourceIndexCache.get(bookNumber)
  }

  const relFile = getElFileForBook(bookNumber)
  const absFile = path.join(rootDir, relFile)
  const content = await fs.readFile(absFile, 'utf8')
  const lines = content.split(/\r?\n/)
  const lineBySection = new Map()

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^\s*(\d+)[\s.]/)
    if (!match) {
      continue
    }

    const section = Number(match[1])
    if (!lineBySection.has(section)) {
      lineBySection.set(section, index + 1)
    }
  }

  sourceIndexCache.set(bookNumber, lineBySection)
  return lineBySection
}

const buildSource = async (source) => {
  const normalized = String(source || '').trim()
  const marker = 'Diogen Laertije, Životi i mišljenja znamenitih filozofa, '

  if (!normalized) {
    throw new Error('Quote is missing source text')
  }

  if (!normalized.startsWith(marker)) {
    return { source: normalized }
  }

  const refsRaw = normalized.slice(marker.length)
  const firstRef = refsRaw.match(/\b([IVX]+)\.(\d+)/)
  if (!firstRef) {
    return { source: normalized }
  }

  const bookNumber = romanToNumber[firstRef[1]]
  const sectionNumber = Number(firstRef[2])
  if (!bookNumber || !Number.isFinite(sectionNumber)) {
    return { source: normalized }
  }

  const relFile = getElFileForBook(bookNumber)
  const sectionIndex = await loadSectionLineIndex(bookNumber)
  const line = sectionIndex.get(sectionNumber)

  if (line) {
    return { source: normalized, pointer: `${relFile}:${line}` }
  }

  return { source: normalized }
}

for (const file of files) {
  const filePath = path.join(inputDir, file)
  const content = JSON.parse(await fs.readFile(filePath, 'utf8'))

  if (!Array.isArray(content))
    throw new Error(`${file} does not contain an array`)

  for (const entry of content) {
    const mappedSource = await buildSource(entry.source)
    quotes.push({
      ...entry,
      source: mappedSource.source,
      ...(mappedSource.pointer ? { pointer: mappedSource.pointer } : {}),
    })
  }
}

await fs.writeFile(
  outputFile,
  JSON.stringify(quotes, null, 2),
  'utf8'
)

console.log(`Generated ${outputFile} (${quotes.length} quotes)`)
