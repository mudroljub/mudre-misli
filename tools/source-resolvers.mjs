import { promises as fs } from 'node:fs'
import path from 'node:path'

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

const createDiogenesLaertiusResolver = () =>
  async reference => {
    const normalized = String(reference || '').trim()
    if (!normalized) return null

    const refMatch = normalized.match(/\b([IVX]+)\.(\d+)(?:[–-](\d+))?/)
    if (!refMatch) return null

    const bookNumber = romanToNumber[refMatch[1]]
    const sectionNumber = Number(refMatch[2])
    const endSectionNumber = Number(refMatch[3] ?? refMatch[2])

    if (!bookNumber || !Number.isFinite(sectionNumber)) {
      return null
    }

    const passage = endSectionNumber > sectionNumber
      ? `${bookNumber}.${sectionNumber}-${endSectionNumber}`
      : `${bookNumber}.${sectionNumber}`

    return `data/sources/diogenes-laertius/diogenes-laertius.xml#${passage}`
  }

const createWalterBurleyResolver = rootDir => {
  let chaptersByRoman = null

  const loadChapters = async () => {
    if (chaptersByRoman) return chaptersByRoman
    const relManifest = 'data/sources/walter-burley/chapters-generated/manifest.json'
    const manifest = JSON.parse(await fs.readFile(path.join(rootDir, relManifest), 'utf8'))
    chaptersByRoman = new Map(manifest.chapters.map(chapter => [chapter.roman, chapter.file]))
    return chaptersByRoman
  }

  return async reference => {
    const normalized = String(reference || '').trim()
    const roman = normalized.match(/\b([MDCLXVI]+)\b/)?.[1]
    if (!roman) return null

    const filename = (await loadChapters()).get(roman)
    return filename
      ? `data/sources/walter-burley/chapters-generated/${filename}:1`
      : null
  }
}

const createPorphyryVitaPlotiniResolver = () =>
  async reference => {
    const section = String(reference || '').trim().match(/^\d+$/)?.[0]
    if (!section || Number(section) < 1 || Number(section) > 26) return null

    return `data/sources/porphyry/vita-plotini.el-wikisource.parse.json#p${section}`
  }

const hermannDielsAuthorFiles = {
  Anaximenes: '03-Anaximenes.txt',
  Xenophanes: '11-Xenophanes.txt',
  Heraclitus: '12-Heraclitus.txt',
  Parmenides: '18-Parmenides.txt',
  'Zeno of Elea': '19-Zeno.txt',
  Empedocles: '21-Empedocles.txt',
  Anaxagoras: '46-Anaxagoras.txt',
}

const createHermannDielsResolver = rootDir => {
  const cache = new Map()

  const loadAuthorSection = async filename => {
    if (cache.has(filename)) return cache.get(filename)

    const relFile = `data/sources/hermann-diels/philosophers/${filename}`
    const content = await fs.readFile(path.join(rootDir, relFile), 'utf8')
    const lines = content.split(/\r?\n/)
    const fragmentStart = lines.findIndex(line => /B\.\s*FRAGMENTE/i.test(line))
    const section = { relFile, lines, fragmentStart }
    cache.set(filename, section)
    return section
  }

  return async (reference, author, originalText) => {
    const filename = hermannDielsAuthorFiles[author]
    if (!filename || !originalText) return null

    const { relFile, lines, fragmentStart } = await loadAuthorSection(filename)
    if (fragmentStart < 0) return null

    const tokens = [...new Set(
      String(originalText)
        .match(/[\p{L}\p{M}]+/gu)
        ?.filter(token => token.length >= 5)
        .sort((a, b) => b.length - a.length) ?? [],
    )]
    if (!tokens.length) return null

    const fragmentNumber = String(reference).match(/(?:^|\s)B\.?\s*(\d+[a-z]?)/i)?.[1]
    let searchStart = fragmentStart
    let searchEnd = lines.length

    if (fragmentNumber) {
      const marker = new RegExp(`^\\s*${fragmentNumber.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\[`, 'i')
      const markerIndex = lines.findIndex((line, index) => index >= fragmentStart && marker.test(line))
      if (markerIndex >= 0) {
        searchStart = markerIndex
        const nextMarker = lines.findIndex(
          (line, index) => index > markerIndex && /^\s*\d+[a-z]?\s*\[/i.test(line),
        )
        searchEnd = nextMarker >= 0 ? nextMarker : lines.length
      }
    }

    const loweredTokens = tokens.map(token => token.normalize('NFC').toLocaleLowerCase('el'))
    const minimumScore = Math.max(2, Math.ceil(loweredTokens.length * 0.2))
    let best = null

    for (let index = searchStart; index < searchEnd; index += 1) {
      const window = lines
        .slice(index, Math.min(index + 7, searchEnd))
        .join('\n')
        .normalize('NFC')
        .toLocaleLowerCase('el')
      const score = loweredTokens.reduce(
        (total, token) => total + (window.includes(token) ? 1 : 0),
        0,
      )

      if (score > (best?.score ?? 0)) best = { index, window, score }
    }

    if (!best || best.score < minimumScore) return null

    const matchingTokenIndex = loweredTokens.findIndex(token => best.window.includes(token))
    if (matchingTokenIndex < 0) return null

    const token = tokens[matchingTokenIndex]
    const lowerToken = loweredTokens[matchingTokenIndex]

    for (let index = best.index; index < Math.min(best.index + 7, searchEnd); index += 1) {
      const normalizedLine = lines[index].normalize('NFC')
      const anchorIndex = normalizedLine.toLocaleLowerCase('el').indexOf(lowerToken)
      if (anchorIndex < 0) continue

      const anchor = normalizedLine.slice(anchorIndex, anchorIndex + token.length)
      return `${relFile}:${index + 1}#${anchor}`
    }

    return null
  }
}

const createPlutarchStephanusResolver = (rootDir, relFile) => {
  let lineByPage = null

  const loadLineIndex = async () => {
    if (lineByPage) return lineByPage

    const content = await fs.readFile(path.join(rootDir, relFile), 'utf8')
    const lines = content.split(/\r?\n/)
    lineByPage = new Map()

    for (let index = 0; index < lines.length; index += 1) {
      const matches = lines[index].matchAll(
        /<milestone\b[^>]*\bunit="stephpage"[^>]*\bn="([^"]+)"|<milestone\b[^>]*\bn="([^"]+)"[^>]*\bunit="stephpage"/gi,
      )

      for (const match of matches) {
        const page = String(match[1] ?? match[2]).toLowerCase()
        if (!lineByPage.has(page)) lineByPage.set(page, index + 1)
      }
    }

    return lineByPage
  }

  return async reference => {
    const stephanusPage = String(reference || '')
      .match(/\b(\d{3,4}[a-f])\b/i)?.[1]
      ?.toLowerCase()
    if (!stephanusPage) return null

    const index = await loadLineIndex()
    const line = index.get(stephanusPage)

    return line ? `${relFile}:${line}` : null
  }
}

export const createSourceResolvers = rootDir => ({
  'diogenes-laertius': createDiogenesLaertiusResolver(),
  'walter-burley': createWalterBurleyResolver(rootDir),
  'porphyry-vita-plotini': createPorphyryVitaPlotiniResolver(),
  'hermann-diels': createHermannDielsResolver(rootDir),
  plutarch: createPlutarchStephanusResolver(
    rootDir,
    'data/sources/plutarch/septem-sapientium-convivium.xml',
  ),
  'plutarch-against-colotes': createPlutarchStephanusResolver(
    rootDir,
    'data/sources/plutarch/adversus-colotem.xml',
  ),
})
