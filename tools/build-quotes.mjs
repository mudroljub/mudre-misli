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

    if (!line || !/^\d/.test(line)) continue

    const digits = line.match(/^\d+/)
    if (!digits) continue

    const section = Number(digits[0])

    if (!lineBySection.has(section)) {
      lineBySection.set(section, index + 1)
    }
  }

  sourceIndexCache.set(bookNumber, lineBySection)

  return lineBySection
}

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

    return line ? `${relFile}:${line}` : null
  },

  'walter-burley': async (reference, author) => {
    const normalized = String(reference || '').trim()
    if (!normalized || !/\b([IVX]+)\b/.test(normalized) || !author) {
      return null
    }

    const filename = author.toLowerCase().replace(/\s+/g, '_') + '.txt'
    const relFile = `data/sources/walter-burley/latin_raw/${filename}`

    try {
      await fs.access(path.join(rootDir, relFile))
      return `${relFile}:1`
    } catch {
      return null
    }
  },

  'hermann-diels': async () => {
    // TODO: Implement when Diels fragments are integrated
    return null
  },
}

const buildPointer = async (sourceObj, author) => {
  const builder = pointerBuilders[sourceObj.name]

  return builder
    ? builder(sourceObj.reference, author)
    : null
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
    if (term.forms.some(form => originalText.includes(form))) {
      detectedTags.add(term.tag)
    }
  }

  return [...detectedTags].sort()
}

const allQuotes = []
const chronologicalEntries = []
const chronologicalIndexes = []
const byPointer = new Map()

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
    const author = Array.isArray(entry.author)
      ? entry.author[0]
      : entry.author

    const primarySource = entry.sources?.[0]
    const pointer = primarySource
      ? await buildPointer(primarySource, author)
      : null

    const tags =
      entry.type === 'quote' || entry.type === 'reported'
        ? detectTags(entry.originalText)
        : undefined

    const quote = {
      _id: nextId++,
      ...entry,
      ...(pointer ? { pointer } : {}),
      ...(tags?.length ? { tags } : {}),
    }

    const index = allQuotes.length

    allQuotes.push(quote)

    if (entry.type === 'anecdote' || entry.type === 'bio') {
      chronologicalEntries.push(quote)
      chronologicalIndexes.push(index)
    }

    if (pointer && entry.originalText) {
      const items = byPointer.get(pointer)

      if (items) {
        items.push(quote)
      } else {
        byPointer.set(pointer, [quote])
      }
    }
  }
}

// Sort only bio and anecdote entries
chronologicalEntries.sort(
  (a, b) =>
    (a.year ?? Infinity) -
    (b.year ?? Infinity),
)

// Put them back into their original slots
for (let i = 0; i < chronologicalIndexes.length; i += 1) {
  allQuotes[chronologicalIndexes[i]] = chronologicalEntries[i]
}

// Add anchors only where pointers collide
for (const [basePointer, items] of byPointer) {
  if (items.length < 2) continue

  for (const quote of items) {
    const text = quote.originalText
    let anchor = ''

    for (let len = 5; len <= Math.min(50, text.length); len += 1) {
      const candidate = text.slice(0, len)

      if (
        items.every(
          item =>
            item === quote ||
            !item.originalText.startsWith(candidate),
        )
      ) {
        anchor = candidate
        break
      }
    }

    if (!anchor) {
      anchor =
        text.match(/^.{5,30}[·;.]/)?.[0] ??
        text.slice(0, 30)
    }

    quote.pointer = `${basePointer}#${anchor}`
  }
}

await fs.writeFile(
  outputFile,
  JSON.stringify(allQuotes, null, 2),
  'utf8',
)

console.log(
  `Generated ${outputFile} (${allQuotes.length} quotes)`,
)