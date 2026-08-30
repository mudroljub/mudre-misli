import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const sourceDir = path.join(rootDir, 'data', 'sources', 'walter-burley')
const ocrDir = path.join(sourceDir, 'ocr')
const outputDir = path.join(sourceDir, 'chapters-generated')
const sourceIndexFile = path.join(sourceDir, '..', 'INDEX_BURLEY.md')
const archiveId = 'gualteriburlaei01burlgoog'
const archiveBase = `https://archive.org/download/${archiveId}`
const metadataUrl = `https://archive.org/metadata/${archiveId}`
const sourceFiles = [
  `${archiveId}_djvu.xml`,
  `${archiveId}_scandata.xml`,
]

const romanValues = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
}

const decodeXml = value => value
  .replaceAll('&apos;', "'")
  .replaceAll('&quot;', '"')
  .replaceAll('&gt;', '>')
  .replaceAll('&lt;', '<')
  .replaceAll('&amp;', '&')
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))

const romanToNumber = roman => {
  let total = 0
  let previous = 0

  for (const character of [...roman.toUpperCase()].reverse()) {
    const value = romanValues[character]
    if (!value) return null
    total += value < previous ? -value : value
    previous = value
  }

  return total || null
}

const numberToRoman = number => {
  const numerals = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ]
  let remainder = number
  let result = ''
  for (const [value, numeral] of numerals) {
    while (remainder >= value) {
      result += numeral
      remainder -= value
    }
  }
  return result
}

const editDistance = (left, right) => {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index)
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = row[0]
    row[0] = leftIndex
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const above = row[rightIndex]
      row[rightIndex] = Math.min(
        row[rightIndex] + 1,
        row[rightIndex - 1] + 1,
        diagonal + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      )
      diagonal = above
    }
  }
  return row[right.length]
}

const readChapterCatalog = async () => {
  const markdown = await fs.readFile(sourceIndexFile, 'utf8')
  return [...markdown.matchAll(/^\|\s*([IVXLCDM]+)\s*\|\s*([^|]+?)\s*\|/gm)]
    .map(match => ({
      number: romanToNumber(match[1]),
      roman: match[1],
      title: match[2].trim(),
    }))
    .filter(entry => entry.number)
}

const slugify = value => value
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, 60)

const md5 = value => createHash('md5').update(value).digest('hex')

const fetchBuffer = async url => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Download failed (${response.status}): ${url}`)
  }
  return Buffer.from(await response.arrayBuffer())
}

const downloadSources = async () => {
  await fs.mkdir(ocrDir, { recursive: true })
  const metadataBuffer = await fetchBuffer(metadataUrl)
  const metadata = JSON.parse(metadataBuffer.toString('utf8'))
  const archiveFiles = new Map(metadata.files.map(file => [file.name, file]))
  const manifest = {
    archiveId,
    detailsUrl: `https://archive.org/details/${archiveId}`,
    metadataUrl,
    downloadedAt: new Date().toISOString(),
    files: [],
  }

  for (const filename of sourceFiles) {
    const archiveFile = archiveFiles.get(filename)
    if (!archiveFile?.md5) {
      throw new Error(`Archive metadata does not describe ${filename}`)
    }

    const target = path.join(ocrDir, filename)
    let buffer

    try {
      buffer = await fs.readFile(target)
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
    }

    if (!buffer || md5(buffer) !== archiveFile.md5) {
      buffer = await fetchBuffer(`${archiveBase}/${filename}`)
      if (md5(buffer) !== archiveFile.md5) {
        throw new Error(`Checksum mismatch for ${filename}`)
      }
      await fs.writeFile(target, buffer)
    }

    manifest.files.push({
      name: filename,
      format: archiveFile.format,
      size: buffer.length,
      md5: archiveFile.md5,
      url: `${archiveBase}/${filename}`,
    })
  }

  await fs.writeFile(
    path.join(ocrDir, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  )
}

const parsePageNumbers = xml => {
  const numbers = new Map()
  const pagePattern = /<page leafNum="(\d+)"[^>]*>([\s\S]*?)<\/page>/g

  for (const match of xml.matchAll(pagePattern)) {
    const number = match[2].match(/<pageNumber>([^<]+)<\/pageNumber>/)?.[1]?.trim()
    if (number) numbers.set(Number(match[1]), decodeXml(number))
  }

  return numbers
}

const parsePages = (xml, pageNumbers) => [...xml.matchAll(/<OBJECT\b[\s\S]*?<\/OBJECT>/g)]
  .map((objectMatch, leafIndex) => {
    const lines = [...objectMatch[0].matchAll(/<LINE>([\s\S]*?)<\/LINE>/g)]
      .map(lineMatch => [...lineMatch[1].matchAll(/<WORD\b[^>]*>([\s\S]*?)<\/WORD>/g)]
        .map(wordMatch => decodeXml(wordMatch[1]).trim())
        .filter(Boolean)
        .join(' '))
      .filter(Boolean)

    return {
      leafIndex,
      printedPage: pageNumbers.get(leafIndex) ?? null,
      lines,
    }
  })

const inferPrintedPageNumbers = pages => {
  const offsets = new Map()

  for (const page of pages) {
    for (const line of page.lines) {
      if (!/^\d{1,3}$/.test(line)) continue
      const printedPage = Number(line)
      if (printedPage < 1 || printedPage > 441) continue
      const offset = page.leafIndex - printedPage
      offsets.set(offset, (offsets.get(offset) ?? 0) + 1)
    }
  }

  const [dominantOffset, matches] = [...offsets]
    .sort((left, right) => right[1] - left[1])[0] ?? []
  if (!Number.isInteger(dominantOffset) || matches < 20) {
    throw new Error('Could not infer a reliable scan-leaf to printed-page offset')
  }

  for (const page of pages) {
    if (page.printedPage) continue
    const printedPage = page.leafIndex - dominantOffset
    if (printedPage >= 1 && printedPage <= 441) {
      page.printedPage = String(printedPage)
    }
  }

  return { offset: dominantOffset, matches }
}

const isLatinPage = page => {
  const printed = Number(page.printedPage)
  return Number.isInteger(printed)
    && ((printed >= 1 && printed <= 394 && printed % 2 === 0) || printed === 395)
}

const normalizeLines = page => {
  const pageNumber = String(page.printedPage)
  const boilerplate = /^(?:GUALTERI\s+BURLAEI|LIBER\s+DE\s+VITA|DE\s+VITA\s+ET\s+MORIBUS)/i

  return page.lines
    .map(line => line.replace(/\s+/g, ' ').trim())
    .filter(line => line && line !== pageNumber && !boilerplate.test(line))
}

const joinLines = lines => {
  const paragraphs = []

  for (const line of lines) {
    const previous = paragraphs.at(-1)
    if (previous && /[\p{L}]-$/u.test(previous)) {
      paragraphs[paragraphs.length - 1] = `${previous.slice(0, -1)}${line}`
    } else {
      paragraphs.push(line)
    }
  }

  return paragraphs.join('\n')
}

const findChapterHeading = line => {
  const match = line.match(/^.{0,30}?(?:Cap|Oap|Gap)\.?\s+([IVXLCDMTNOJGivxlcdmtnojg]+)\.?\s*(.*)$/)
  if (!match) return null
  return {
    ocrRoman: match[1]
      .toUpperCase()
      .replaceAll('T', 'I')
      .replaceAll('N', 'II')
      .replaceAll('J', 'I')
      .replaceAll('O', 'C')
      .replaceAll('G', 'C'),
    ocrTitle: match[2].replace(/^[\s.:;-]+|[\s.:;-]+$/g, ''),
  }
}

const splitChapters = (pages, catalog) => {
  const chapters = []
  let current = null
  let expectedIndex = 0

  for (const page of pages.filter(isLatinPage)) {
    const lines = normalizeLines(page)
    const apparatusStart = lines.findIndex(line => /^\*+$/.test(line))
    for (let index = 0; index < lines.length; index += 1) {
      const heading = findChapterHeading(lines[index])
      const expected = catalog[expectedIndex]
      const headingMatches = heading && expected
        && editDistance(heading.ocrRoman, expected.roman) <= 3
      if (headingMatches) {
        current = {
          ...expected,
          ocrHeading: lines[index],
          startPage: Number(page.printedPage),
          endPage: Number(page.printedPage),
          chunks: [],
        }
        chapters.push(current)
        expectedIndex += 1
      }

      const isMainText = apparatusStart === -1 || index < apparatusStart
      if (current && (isMainText || headingMatches)) {
        current.endPage = Number(page.printedPage)
        current.chunks.push({ page: Number(page.printedPage), line: lines[index] })
      }
    }
  }

  return chapters
}

const writeChapters = async chapters => {
  await fs.rm(outputDir, { recursive: true, force: true })
  await fs.mkdir(outputDir, { recursive: true })
  const manifest = []

  for (const chapter of chapters) {
    const filename = `${String(chapter.number).padStart(3, '0')}_${slugify(chapter.title) || 'chapter'}.md`
    const pageGroups = new Map()
    for (const chunk of chapter.chunks) {
      if (!pageGroups.has(chunk.page)) pageGroups.set(chunk.page, [])
      pageGroups.get(chunk.page).push(chunk.line)
    }

    const sections = [...pageGroups].map(([page, lines]) =>
      `<!-- Knust 1886, p. ${page} -->\n\n${joinLines(lines)}`)
    const content = [
      `# Cap. ${chapter.roman} - ${chapter.title}`,
      '',
      '> Radni OCR iz Knustovog izdanja (1886). Pre citiranja proveriti prema faksimilu.',
      '',
      ...sections,
      '',
    ].join('\n')

    await fs.writeFile(path.join(outputDir, filename), content, 'utf8')
    manifest.push({
      chapter: chapter.number,
      roman: chapter.roman,
      title: chapter.title,
      ocrHeading: chapter.ocrHeading,
      file: filename,
      pages: chapter.startPage === chapter.endPage
        ? [chapter.startPage]
        : [chapter.startPage, chapter.endPage],
    })
  }

  await fs.writeFile(
    path.join(outputDir, 'manifest.json'),
    `${JSON.stringify({ generatedFrom: `${archiveId}_djvu.xml`, chapters: manifest }, null, 2)}\n`,
    'utf8',
  )
}

const main = async () => {
  await downloadSources()
  const [djvuXml, scanXml] = await Promise.all([
    fs.readFile(path.join(ocrDir, `${archiveId}_djvu.xml`), 'utf8'),
    fs.readFile(path.join(ocrDir, `${archiveId}_scandata.xml`), 'utf8'),
  ])
  const pages = parsePages(djvuXml, parsePageNumbers(scanXml))
  const pageNumberInference = inferPrintedPageNumbers(pages)
  const latinPages = pages.filter(isLatinPage)
  const catalog = await readChapterCatalog()
  const chapters = splitChapters(pages, catalog)
  await writeChapters(chapters)

  console.log(`Verified ${sourceFiles.length} Internet Archive source files.`)
  console.log(`Parsed ${pages.length} scan leaves and ${latinPages.length} Latin edition pages.`)
  console.log(`Mapped printed pages with leaf offset ${pageNumberInference.offset} (${pageNumberInference.matches} OCR confirmations).`)
  console.log(`Generated ${chapters.length} chapter files in ${path.relative(rootDir, outputDir)}.`)
  if (chapters.length !== catalog.length) {
    throw new Error(`Detected ${chapters.length} of ${catalog.length} indexed chapters`)
  }
}

await main()
