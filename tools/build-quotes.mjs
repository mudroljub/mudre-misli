import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { greekTerms } from './greek-terms.mjs'
import { createSourceResolvers } from './source-resolvers.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const inputDir = path.join(rootDir, 'data/quotes')
const outputFile = path.join(rootDir, 'data/quotes.json')
const sourcesFile = path.join(rootDir, 'data/sources.json')

const sourceRegistry = JSON.parse(await fs.readFile(sourcesFile, 'utf8'))

const files = (await fs.readdir(inputDir))
  .filter(file => file.endsWith('.json'))
  .sort()

const sourceResolvers = createSourceResolvers(rootDir)

const buildPointer = async (sourceObj, author) => {
  const resolver = sourceResolvers[sourceObj.name]

  return resolver
    ? resolver(sourceObj.reference, author)
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

  // Sort entries within each file first
  // Entries with 'year' field: sort by year
  // Other entries: maintain original order
  content.sort((a, b) => {
    const hasYearA = 'year' in a && typeof a.year === 'number'
    const hasYearB = 'year' in b && typeof b.year === 'number'

    if (hasYearA && hasYearB) {
      return a.year - b.year
    }

    // Keep entries without year in original order
    return 0
  })

  for (const [entryIndex, entry] of content.entries()) {
    if (!Array.isArray(entry.sources) || entry.sources.length === 0) {
      throw new Error(`${file} entry ${entryIndex + 1} has no sources`)
    }

    for (const source of entry.sources) {
      const sourceName = String(source?.name || '').trim()
      const reference = String(source?.reference || '').trim()

      if (!sourceName) {
        throw new Error(`${file} entry ${entryIndex + 1} has a source without a name`)
      }

      if (!sourceRegistry[sourceName]) {
        throw new Error(
          `${file} entry ${entryIndex + 1} uses unknown source "${sourceName}"`,
        )
      }

      if (!reference) {
        throw new Error(
          `${file} entry ${entryIndex + 1} has no reference for source "${sourceName}"`,
        )
      }
    }

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

// No global sorting needed - each author's entries are already sorted within their file

await fs.writeFile(
  outputFile,
  JSON.stringify(allQuotes, null, 2),
  'utf8',
)

console.log(
  `Generated ${outputFile} (${allQuotes.length} quotes)`,
)
