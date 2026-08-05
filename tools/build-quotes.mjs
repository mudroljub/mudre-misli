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

const buildPointer = async (reference) => {
  const normalized = String(reference || '').trim()

  if (!normalized) {
    return null
  }

  const refMatch = normalized.match(/\b([IVX]+)\.(\d+)/)
  if (!refMatch) {
    return null
  }

  const bookNumber = romanToNumber[refMatch[1]]
  const sectionNumber = Number(refMatch[2])
  if (!bookNumber || !Number.isFinite(sectionNumber)) {
    return null
  }

  const relFile = getElFileForBook(bookNumber)
  const sectionIndex = await loadSectionLineIndex(bookNumber)
  const line = sectionIndex.get(sectionNumber)

  if (line) {
    return `${relFile}:${line}`
  }

  return null
}

// First pass: collect all quotes
const allQuotes = []
let nextId = 1
for (const file of files) {
  const filePath = path.join(inputDir, file)
  const content = JSON.parse(await fs.readFile(filePath, 'utf8'))

  if (!Array.isArray(content))
    throw new Error(`${file} does not contain an array`)

  for (const entry of content) {
    const pointer = await buildPointer(entry.reference)
    allQuotes.push({
      _id: nextId++,
      ...entry,
      ...(pointer ? { pointer } : {}),
    })
  }
}

// Second pass: add anchors to pointers with collisions
const byPointer = new Map()
allQuotes.forEach((quote, index) => {
  if (quote.pointer && quote.el) {
    if (!byPointer.has(quote.pointer)) {
      byPointer.set(quote.pointer, [])
    }
    byPointer.get(quote.pointer).push({ quote, index })
  }
})

byPointer.forEach((items, basePointer) => {
  if (items.length > 1) {
    // Collision detected - add anchors
    items.forEach(({ quote, index }) => {
      const text = quote.el

      // Find minimum anchor length for uniqueness
      let anchor = ''
      for (let len = 5; len <= Math.min(50, text.length); len++) {
        const candidate = text.substring(0, len)
        const matches = items.filter(
          item => item.quote.el.startsWith(candidate)
        )
        if (matches.length === 1) {
          anchor = candidate
          break
        }
      }

      // Fallback if no unique prefix found
      if (!anchor) {
        const match = text.match(/^.{5,30}[·;.]/)
        anchor = match ? match[0] : text.substring(0, 30)
      }

      // Add anchor to pointer: file:line#anchor
      allQuotes[index].pointer = `${basePointer}#${anchor}`
    })
  }
})

quotes.push(...allQuotes)

await fs.writeFile(
  outputFile,
  JSON.stringify(quotes, null, 2),
  'utf8'
)

console.log(`Generated ${outputFile} (${quotes.length} quotes)`)
