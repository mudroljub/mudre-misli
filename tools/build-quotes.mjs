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
    const line = lines[index].trim()

    // Skip empty lines and lines that don't start with a digit
    if (!line || !/^\d/.test(line)) {
      continue
    }

    // Extract leading digits as section number
    const digits = line.match(/^\d+/)
    if (!digits) {
      continue
    }

    const section = Number(digits[0])
    if (!lineBySection.has(section)) {
      lineBySection.set(section, index + 1)
    }
  }

  sourceIndexCache.set(bookNumber, lineBySection)
  return lineBySection
}

// Pointer builders for different sources
const pointerBuilders = {
  'diogenes-laertius': async (reference) => {
    const normalized = String(reference || '').trim()
    if (!normalized) return null

    const refMatch = normalized.match(/\b([IVX]+)\.(\d+)/)
    if (!refMatch) return null

    const bookNumber = romanToNumber[refMatch[1]]
    const sectionNumber = Number(refMatch[2])
    if (!bookNumber || !Number.isFinite(sectionNumber)) return null

    const relFile = getElFileForBook(bookNumber)
    const sectionIndex = await loadSectionLineIndex(bookNumber)
    const line = sectionIndex.get(sectionNumber)

    if (line) {
      return `${relFile}:${line}`
    }
    return null
  },

  'walter-burley': async (reference, author) => {
    const normalized = String(reference || '').trim()
    if (!normalized) return null

    // Match "Cap. XXVI" or "XXVI" from reference
    const refMatch = normalized.match(/\b([IVX]+)\b/)
    if (!refMatch) return null

    // Use author name to find the file
    if (!author) return null

    // Normalize author name to filename (e.g., "Gorgias" -> "gorgias.txt")
    const filename = author.toLowerCase().replace(/\s+/g, '_') + '.txt'
    const relFile = `data/sources/walter-burley/latin_raw/${filename}`

    // Check if file exists
    const absFile = path.join(rootDir, relFile)
    try {
      await fs.access(absFile)
      // Walter Burley files are small, pointer is just the file
      return `${relFile}:1`
    } catch {
      return null
    }
  }
}

const buildPointer = async (source, reference, author) => {
  // Extract base source key (e.g., "diogenes-laertius" from "diogenes-laertius")
  const sourceKey = String(source || '').split(',')[0].trim()

  // Try to match known source patterns
  if (sourceKey === 'diogenes-laertius') {
    return pointerBuilders['diogenes-laertius'](reference)
  }

  if (sourceKey.includes('Walter Burley')) {
    return pointerBuilders['walter-burley'](reference, author)
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
    const pointer = await buildPointer(entry.source, entry.reference, entry.author)
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
