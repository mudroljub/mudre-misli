import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { greekTerms } from './greek-terms.js'

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
  XI: 11,
  XII: 12,
}

const sourceIndexCache = new Map()

const getElFileForBook = bookNumber =>
  `data/sources/diogenes-laertius/el/${String(bookNumber + 1).padStart(2, '0')}.txt`

const loadSectionLineIndex = async bookNumber => {
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
  'diogenes-laertius': async reference => {
    const normalized = String(reference || '').trim()
    if (!normalized) return null

    const refMatch = normalized.match(/\b([IVX]+)\.(\d+)/)
    if (!refMatch) return null

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
  },

  'walter-burley': async (reference, author) => {
    const normalized = String(reference || '').trim()
    if (!normalized) return null

    // Match "Cap. XXVI" or "XXVI" from reference
    const refMatch = normalized.match(/\b([IVX]+)\b/)
    if (!refMatch) return null

    // Use author name to find the file
    if (!author) return null

    // Normalize author name to filename
    const filename = author.toLowerCase().replace(/\s+/g, '_') + '.txt'
    const relFile = `data/sources/walter-burley/latin_raw/${filename}`

    const absFile = path.join(rootDir, relFile)

    try {
      await fs.access(absFile)

      // Walter Burley files are small, pointer is just the file
      return `${relFile}:1`
    } catch {
      return null
    }
  },

  'hermann-diels': async reference => {
    // TODO: Implement when Diels fragments are integrated
    // Format: B.8, A.1, etc.
    return null
  },
}

const buildPointer = async (sourceObj, author) => {
  const sourceName = sourceObj.name

  if (sourceName === 'diogenes-laertius') {
    return pointerBuilders['diogenes-laertius'](sourceObj.reference)
  }

  if (sourceName === 'walter-burley') {
    return pointerBuilders['walter-burley'](
      sourceObj.reference,
      author,
    )
  }

  if (sourceName === 'hermann-diels') {
    return pointerBuilders['hermann-diels'](sourceObj.reference)
  }

  return null
}

/**
 * Detect Greek philosophical terms in originalText and return tags.
 * @param {string} originalText Greek text to analyze.
 * @returns {string[]} Array of detected term tags.
 */
const detectTags = originalText => {
  if (!originalText) return []

  const detectedTags = new Set()

  for (const term of greekTerms) {
    const hasMatch = term.forms.some(form =>
      originalText.includes(form)
    )

    if (hasMatch) {
      detectedTags.add(term.tag)
    }
  }

  return Array.from(detectedTags).sort()
}

// First pass: collect all quotes
const allQuotes = []
let nextId = 1

for (const file of files) {
  const filePath = path.join(inputDir, file)
  const content = JSON.parse(
    await fs.readFile(filePath, 'utf8'),
  )

  if (!Array.isArray(content)) {
    throw new Error(`${file} does not contain an array`)
  }

  for (const entry of content) {
    // Keep author as-is (array or single value)
    const author = Array.isArray(entry.author)
      ? entry.author[0]
      : entry.author

    // Build pointer from primary source
    const primarySource = entry.sources?.[0]
    const pointer = primarySource
      ? await buildPointer(primarySource, author)
      : null

    // Detect tags only for quote and reported types
    const tags =
      entry.type === 'quote' || entry.type === 'reported'
        ? detectTags(entry.originalText)
        : undefined

    allQuotes.push({
      _id: nextId++,
      ...entry,
      ...(pointer ? { pointer } : {}),
      ...(tags?.length ? { tags } : {}),
    })
  }
}

// Sort only bio and anecdote entries while preserving all other positions
const chronologicalEntries = allQuotes
  .filter(
    entry =>
      entry.type === 'anecdote' ||
      entry.type === 'bio',
  )
  .sort(
    (a, b) =>
      (a.year ?? Infinity) -
      (b.year ?? Infinity),
  )

let chronologicalIndex = 0

const sortedQuotes = allQuotes.map(entry => {
  if (
    entry.type !== 'anecdote' &&
    entry.type !== 'bio'
  ) {
    return entry
  }

  return chronologicalEntries[chronologicalIndex++]
})

// Second pass: add anchors to pointers with collisions
const byPointer = new Map()

sortedQuotes.forEach((quote, index) => {
  if (quote.pointer && quote.originalText) {
    if (!byPointer.has(quote.pointer)) {
      byPointer.set(quote.pointer, [])
    }

    byPointer.get(quote.pointer).push({
      quote,
      index,
    })
  }
})

byPointer.forEach((items, basePointer) => {
  if (items.length <= 1) {
    return
  }

  items.forEach(({ quote, index }) => {
    const text = quote.originalText

    // Find minimum anchor length for uniqueness
    let anchor = ''

    for (
      let len = 5;
      len <= Math.min(50, text.length);
      len += 1
    ) {
      const candidate = text.substring(0, len)

      const matches = items.filter(item =>
        item.quote.originalText.startsWith(candidate)
      )

      if (matches.length === 1) {
        anchor = candidate
        break
      }
    }

    // Fallback if no unique prefix found
    if (!anchor) {
      const match = text.match(/^.{5,30}[·;.]/)

      anchor = match
        ? match[0]
        : text.substring(0, 30)
    }

    // Add anchor to pointer: file:line#anchor
    sortedQuotes[index].pointer =
      `${basePointer}#${anchor}`
  })
})

quotes.push(...sortedQuotes)

await fs.writeFile(
  outputFile,
  JSON.stringify(quotes, null, 2),
  'utf8',
)

console.log(
  `Generated ${outputFile} (${quotes.length} quotes)`,
)