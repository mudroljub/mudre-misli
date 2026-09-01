import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createSourceResolvers } from './source-resolvers.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const inputDir = path.join(rootDir, 'data/quotes')
const outputFile = path.join(rootDir, 'data/quotes.json')
const sourcesFile = path.join(rootDir, 'data/sources.json')
const greekTermsFile = path.join(rootDir, 'data/greek-terms.json')

const normalizeGreek = text =>
  text
    .normalize('NFD')
    .replace(/\u0300/g, '\u0301')
    .normalize('NFC')
    .toLocaleLowerCase('el')

const escapeRegExp = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const greekFormPattern = form => {
  const normalizedForm = normalizeGreek(form)
  const expression = escapeRegExp(normalizedForm).replace(/\s+/g, '\\s+')

  return new RegExp(`(?<!\\p{L})${expression}(?!\\p{L})`, 'u')
}

const sourceRegistry = JSON.parse(await fs.readFile(sourcesFile, 'utf8'))
const greekTerms = JSON.parse(await fs.readFile(greekTermsFile, 'utf8'))
const knownGreekTags = new Set(Object.keys(greekTerms))
const normalizedGreekTerms = Object.entries(greekTerms).map(([tag, forms]) => [
  tag,
  forms.map(greekFormPattern),
])

const files = (await fs.readdir(inputDir))
  .filter(file => file.endsWith('.json'))
  .sort()

const sourceResolvers = createSourceResolvers(rootDir)

const buildPointer = async (sourceObj, author, originalText) => {
  const resolver = sourceResolvers[sourceObj.name]

  return resolver
    ? resolver(sourceObj.reference, author, originalText)
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
  const normalizedText = normalizeGreek(originalText)

  for (const [tag, patterns] of normalizedGreekTerms) {
    if (patterns.some(pattern => pattern.test(normalizedText))) {
      detectedTags.add(tag)
    }
  }

  return [...detectedTags].sort()
}

const allQuotes = []
const chronologicalEntries = []
const chronologicalIndexes = []
const byPointer = new Map()
const entryIds = new Set()

let nextId = 1

for (const file of files) {
  const filePath = path.join(inputDir, file)
  const content = JSON.parse(
    await fs.readFile(filePath, 'utf8'),
  )

  if (!Array.isArray(content)) {
    throw new Error(`${file} does not contain an array`)
  }

  if (content.length > 0) {
    const authorSets = content.map(entry => new Set(
      Array.isArray(entry.author) ? entry.author : [entry.author],
    ))
    const commonAuthors = [...authorSets[0]].filter(author =>
      authorSets.every(authors => authors.has(author)),
    )

    if (commonAuthors.length === 1) {
      const owner = commonAuthors[0]
      const actualBasename = path.basename(file, '.json')

      if (actualBasename !== owner) {
        throw new Error(
          `${file} must be named "${owner}.json" ` +
          `(English Wikipedia title for project author "${owner}")`,
        )
      }
    }
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
    if (typeof entry.id !== 'string' || !/^mm-\d{6}$/.test(entry.id)) {
      throw new Error(`${file} entry ${entryIndex + 1} has invalid or missing id`)
    }

    if (entryIds.has(entry.id)) {
      throw new Error(`${file} entry ${entryIndex + 1} duplicates id "${entry.id}"`)
    }

    entryIds.add(entry.id)

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
      ? await buildPointer(primarySource, author, entry.originalText)
      : null

    const detectedTags =
      entry.type === 'quote' || entry.type === 'reported'
        ? detectTags(entry.originalText)
        : undefined

    const excludedTags = entry.excludedTags ?? []
    if (!Array.isArray(excludedTags) || excludedTags.some(tag => typeof tag !== 'string')) {
      throw new Error(`${file} entry ${entryIndex + 1} has invalid excludedTags`)
    }

    for (const tag of excludedTags) {
      if (!knownGreekTags.has(tag)) {
        throw new Error(`${file} entry ${entryIndex + 1} excludes unknown tag "${tag}"`)
      }
      if (!detectedTags?.includes(tag)) {
        throw new Error(`${file} entry ${entryIndex + 1} excludes undetected tag "${tag}"`)
      }
    }

    const tags = detectedTags?.filter(tag => !excludedTags.includes(tag))

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
  if (!basePointer.startsWith('data/sources/diogenes-laertius/')) continue
  if (basePointer.includes('.xml#')) continue

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

// Every generated local pointer must resolve to an existing file and line.
// When several entries share the same source location, the generated anchor
// must also occur in the target source text.
const pointerFileCache = new Map()

for (const quote of allQuotes) {
  if (!quote.pointer) continue

  const teiMatch = quote.pointer.match(
    /^(data\/sources\/diogenes-laertius\/diogenes-laertius\.xml)#(\d+)\.(\d+)(?:-(\d+))?$/,
  )

  if (teiMatch) {
    const [, relFile, book, section] = teiMatch
    let content = pointerFileCache.get(relFile)
    if (content === undefined) {
      content = await fs.readFile(path.join(rootDir, relFile), 'utf8')
      pointerFileCache.set(relFile, content)
    }
    const bookPattern = new RegExp(`<div\\b[^>]*subtype="book"[^>]*n="${book}"|<div\\b[^>]*n="${book}"[^>]*subtype="book"`)
    const sectionPattern = new RegExp(`<div\\b[^>]*subtype="section"[^>]*n="${section}"|<div\\b[^>]*n="${section}"[^>]*subtype="section"`)
    if (!bookPattern.test(content) || !sectionPattern.test(content)) {
      throw new Error(`Quote ${quote._id} points to missing TEI passage "${quote.pointer}"`)
    }
    continue
  }

  const plotinusTeiMatch = quote.pointer.match(
    /^(data\/sources\/First1KGreek\/data\/tlg2000\/tlg001\/tlg2000\.tlg001\.1st1K-grc1\.xml)#(\d+)\.(\d+)\.(\d+)(?:-(\d+))?$/,
  )

  if (plotinusTeiMatch) {
    const [, relFile, book, chapter, section, endSection] = plotinusTeiMatch
    let content = pointerFileCache.get(relFile)
    if (content === undefined) {
      content = await fs.readFile(path.join(rootDir, relFile), 'utf8')
      pointerFileCache.set(relFile, content)
    }

    const bookPattern = new RegExp(`<div\\b[^>]*subtype="book"[^>]*n="${book}"|<div\\b[^>]*n="${book}"[^>]*subtype="book"`)
    const chapterPattern = new RegExp(`<div\\b[^>]*subtype="chapter"[^>]*n="${chapter}"|<div\\b[^>]*n="${chapter}"[^>]*subtype="chapter"`)
    const sectionNumbers = endSection ? [section, endSection] : [section]
    const hasSections = sectionNumbers.every(sectionNumber => {
      const sectionPattern = new RegExp(`<div\\b[^>]*subtype="section"[^>]*n="${sectionNumber}"|<div\\b[^>]*n="${sectionNumber}"[^>]*subtype="section"`)
      return sectionPattern.test(content)
    })

    if (!bookPattern.test(content) || !chapterPattern.test(content) || !hasSections) {
      throw new Error(`Quote ${quote._id} points to missing Plotinus passage "${quote.pointer}"`)
    }
    continue
  }

  const porphyryMatch = quote.pointer.match(
    /^(data\/sources\/porphyry\/vita-plotini\.el-wikisource\.parse\.json)#p(\d+)$/,
  )

  if (porphyryMatch) {
    const [, relFile, section] = porphyryMatch
    let content = pointerFileCache.get(relFile)
    if (content === undefined) {
      content = await fs.readFile(path.join(rootDir, relFile), 'utf8')
      pointerFileCache.set(relFile, content)
    }
    const source = JSON.parse(content)
    const html = String(source?.parse?.text || '')

    if (!html.includes(`id="p${section}"`)) {
      throw new Error(`Quote ${quote._id} points to missing Porphyry section "${quote.pointer}"`)
    }
    continue
  }

  const [fileAndLine, anchor] = quote.pointer.split('#', 2)
  const pointerMatch = fileAndLine.match(/^(.*):(\d+)$/)

  if (!pointerMatch) {
    throw new Error(`Quote ${quote._id} has invalid pointer "${quote.pointer}"`)
  }

  const [, relFile, lineText] = pointerMatch
  let content = pointerFileCache.get(relFile)

  if (content === undefined) {
    content = await fs.readFile(path.join(rootDir, relFile), 'utf8')
    pointerFileCache.set(relFile, content)
  }

  const line = Number(lineText)
  const lines = content.split(/\r?\n/)
  const lineCount = lines.length

  if (!Number.isInteger(line) || line < 1 || line > lineCount) {
    throw new Error(
      `Quote ${quote._id} points to missing line ${lineText} in "${relFile}"`,
    )
  }

  let sectionEnd = line

  while (
    sectionEnd < lines.length &&
    !/^\d+\s/.test(lines[sectionEnd].trim())
  ) {
    sectionEnd += 1
  }

  const sectionContent = lines.slice(line - 1, sectionEnd).join('\n')
  const normalizedSectionContent = sectionContent.normalize('NFC')

  if (
    anchor &&
    !sectionContent.includes(anchor) &&
    !normalizedSectionContent.includes(anchor.normalize('NFC'))
  ) {
    const lowerContent = sectionContent.toLocaleLowerCase('el')
    const lowerAnchor = anchor.toLocaleLowerCase('el')
    let anchorIndex = lowerContent.indexOf(lowerAnchor)
    let anchorLength = anchor.length

    if (anchorIndex < 0) {
      const tokens = quote.originalText
        .match(/[\p{L}\p{M}]+/gu)
        ?.filter(token => token.length >= 5)
        .sort((a, b) => b.length - a.length) ?? []

      for (const token of tokens) {
        anchorIndex = lowerContent.indexOf(token.toLocaleLowerCase('el'))

        if (anchorIndex >= 0) {
          anchorLength = token.length
          break
        }
      }
    }

    if (anchorIndex < 0) {
      quote.pointer = fileAndLine
      continue
    }

    const exactAnchor = sectionContent.slice(anchorIndex, anchorIndex + anchorLength)
    quote.pointer = `${fileAndLine}#${exactAnchor}`
  }
}

// No global sorting needed - each author's entries are already sorted within their file

const output = `${JSON.stringify(allQuotes, null, 2)}\n`
let currentOutput = null

try {
  currentOutput = await fs.readFile(outputFile, 'utf8')
} catch (error) {
  if (error?.code !== 'ENOENT') throw error
}

if (currentOutput !== output) {
  await fs.writeFile(outputFile, output, 'utf8')
  console.log(`Generated ${outputFile} (${allQuotes.length} quotes)`)
} else {
  console.log(`Unchanged ${outputFile} (${allQuotes.length} quotes)`)
}
