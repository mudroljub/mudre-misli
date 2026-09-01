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

const createPlotinusEnneadsResolver = () =>
  async reference => {
    const normalized = String(reference || '').trim()
    const refMatch = normalized.match(/^([IVX]+)\.(\d+)\.(\d+)(?:[–-](\d+))?$/)
    if (!refMatch) return null

    const bookNumber = romanToNumber[refMatch[1]]
    const chapterNumber = Number(refMatch[2])
    const sectionNumber = Number(refMatch[3])
    const endSectionNumber = Number(refMatch[4] ?? refMatch[3])

    if (
      !bookNumber ||
      bookNumber > 6 ||
      !Number.isFinite(chapterNumber) ||
      !Number.isFinite(sectionNumber) ||
      endSectionNumber < sectionNumber
    ) {
      return null
    }

    const passage = endSectionNumber > sectionNumber
      ? `${bookNumber}.${chapterNumber}.${sectionNumber}-${endSectionNumber}`
      : `${bookNumber}.${chapterNumber}.${sectionNumber}`

    return `data/sources/First1KGreek/data/tlg2000/tlg001/tlg2000.tlg001.1st1K-grc1.xml#${passage}`
  }

const createIamblichusVitaPythagoricaResolver = () =>
  async reference => {
    const normalized = String(reference || '').trim()
    const refMatch = normalized.match(/^(\d+)\.(\d+)(?:[–-](\d+))?$/)
    if (!refMatch) return null

    const chapterNumber = Number(refMatch[1])
    const sectionNumber = Number(refMatch[2])
    const endSectionNumber = Number(refMatch[3] ?? refMatch[2])

    if (
      chapterNumber < 1 ||
      sectionNumber < 1 ||
      endSectionNumber < sectionNumber
    ) {
      return null
    }

    const passage = endSectionNumber > sectionNumber
      ? `${chapterNumber}.${sectionNumber}-${endSectionNumber}`
      : `${chapterNumber}.${sectionNumber}`

    return `data/sources/First1KGreek/data/tlg2023/tlg001/tlg2023.tlg001.1st1K-grc1.xml#${passage}`
  }

const createPorphyryVitaPythagoraeResolver = () =>
  async reference => {
    const section = String(reference || '').trim().match(/^\d+$/)?.[0]
    if (!section || Number(section) < 1) return null

    return `data/sources/First1KGreek/data/tlg2034/tlg002/tlg2034.tlg002.1st1K-grc1.xml#${section}`
  }

const hermannDielsAuthorFiles = {
  Anaximenes: '03-Anaximenes.txt',
  Xenophanes: '11-Xenophanes.txt',
  Heraclitus: '12-Heraclitus.txt',
  Parmenides: '18-Parmenides.txt',
  'Zeno of Elea': '19-Zeno.txt',
  Empedocles: '21-Empedocles.txt',
  Anaxagoras: '46-Anaxagoras.txt',
  Protagoras: 'band1.txt#protagoras',
}

const createHermannDielsResolver = rootDir => {
  const cache = new Map()

  const loadAuthorSection = async filename => {
    if (cache.has(filename)) return cache.get(filename)

    const isProtagoras = filename === 'band1.txt#protagoras'
    const relFile = isProtagoras
      ? 'data/sources/hermann-diels/band1.txt'
      : `data/sources/hermann-diels/philosophers/${filename}`
    const content = await fs.readFile(path.join(rootDir, relFile), 'utf8')
    const lines = content.split(/\r?\n/)
    const sectionStart = isProtagoras
      ? lines.findIndex(line => /14\.\s*PROTAGORAS\./i.test(line))
      : 0
    const fragmentStart = lines.findIndex(
      (line, index) => index >= sectionStart && /[BΒ]\.\s*FRAGMENTE/i.test(line),
    )
    const imitationStart = isProtagoras
      ? lines.findIndex(
          (line, index) => index >= fragmentStart && /^\s*C\.\s*IMITATION\.\s*$/i.test(line),
        )
      : -1
    const sectionEnd = isProtagoras
      ? lines.findIndex(
          (line, index) => index > imitationStart && /75\.\s*XENIADES\./i.test(line),
        )
      : lines.length
    const section = {
      relFile,
      lines,
      fragmentStart,
      sectionStart,
      imitationStart,
      sectionEnd,
      isProtagoras,
    }
    cache.set(filename, section)
    return section
  }

  return async (reference, author, originalText) => {
    const filename = hermannDielsAuthorFiles[author]
    if (!filename || !originalText) return null

    const {
      relFile,
      lines,
      fragmentStart,
      sectionStart,
      imitationStart,
      sectionEnd,
      isProtagoras,
    } = await loadAuthorSection(filename)
    if (fragmentStart < 0) return null

    const tokens = [...new Set(
      String(originalText)
        .match(/[\p{L}\p{M}]+/gu)
        ?.filter(token => token.length >= 5)
        .sort((a, b) => b.length - a.length) ?? [],
    )]
    if (!tokens.length) return null

    const normalizedReference = String(reference)
    const referenceMatch = normalizedReference.match(/(?:^|\s)([ABC])\.?\s*(\d+[a-z]?)/i)
    const fragmentNumber = referenceMatch?.[2]
    let searchStart = fragmentStart
    let searchEnd = isProtagoras ? sectionEnd : lines.length
    let referenceLine = -1

    if (isProtagoras && referenceMatch) {
      const sectionLetter = referenceMatch[1].toUpperCase()
      if (sectionLetter === 'A') {
        searchStart = sectionStart + 1
        searchEnd = fragmentStart
      } else if (sectionLetter === 'B') {
        searchStart = fragmentStart
        searchEnd = imitationStart > fragmentStart ? imitationStart : sectionEnd
      } else if (sectionLetter === 'C' && imitationStart > 0) {
        searchStart = imitationStart
        searchEnd = sectionEnd
      }
    }

    if (fragmentNumber) {
      const marker = new RegExp(
        `^\\s*${fragmentNumber.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*(?:\\.|\\[)`,
        'i',
      )
      const markerIndex = lines.findIndex(
        (line, index) => index >= searchStart && index < searchEnd && marker.test(line),
      )
      if (markerIndex >= 0) {
        referenceLine = markerIndex
        searchStart = markerIndex
        const nextMarker = lines.findIndex(
          (line, index) =>
            index > markerIndex && index < searchEnd && /^\s*\d+[a-z]?\s*(?:\.|\[)/i.test(line),
        )
        searchEnd = nextMarker >= 0 ? nextMarker : searchEnd
      }
    }

    // Dielsov OCR često lomi reči i meša grčko i latiničko pismo.
    // Broj testimonijuma ili fragmenta zato je pouzdaniji od tekstualnog sidra.
    if (isProtagoras && referenceLine >= 0) {
      return `${relFile}:${referenceLine + 1}`
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

    if (!best || best.score < minimumScore) {
      return isProtagoras && referenceLine >= 0 ? `${relFile}:${referenceLine + 1}` : null
    }

    const matchingTokenIndex = loweredTokens.findIndex(token => best.window.includes(token))
    if (matchingTokenIndex < 0) {
      return isProtagoras && referenceLine >= 0 ? `${relFile}:${referenceLine + 1}` : null
    }

    const token = tokens[matchingTokenIndex]
    const lowerToken = loweredTokens[matchingTokenIndex]

    for (let index = best.index; index < Math.min(best.index + 7, searchEnd); index += 1) {
      const normalizedLine = lines[index].normalize('NFC')
      const anchorIndex = normalizedLine.toLocaleLowerCase('el').indexOf(lowerToken)
      if (anchorIndex < 0) continue

      const anchor = normalizedLine.slice(anchorIndex, anchorIndex + token.length)
      return `${relFile}:${index + 1}#${anchor}`
    }

    return isProtagoras && referenceLine >= 0 ? `${relFile}:${referenceLine + 1}` : null
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

const createPlatoStephanusResolver = (rootDir, relFile) => {
  let lineBySection = null

  const loadLineIndex = async () => {
    if (lineBySection) return lineBySection

    const content = await fs.readFile(path.join(rootDir, relFile), 'utf8')
    const lines = content.split(/\r?\n/)
    lineBySection = new Map()

    for (let index = 0; index < lines.length; index += 1) {
      const matches = lines[index].matchAll(
        /<milestone\b[^>]*\bunit="section"[^>]*\bn="([^"]+)"|<milestone\b[^>]*\bn="([^"]+)"[^>]*\bunit="section"/gi,
      )

      for (const match of matches) {
        const section = String(match[1] ?? match[2]).toLowerCase()
        if (!lineBySection.has(section)) lineBySection.set(section, index + 1)
      }
    }

    return lineBySection
  }

  return async reference => {
    const section = String(reference || '')
      .match(/\b(\d{3}[a-e])\b/i)?.[1]
      ?.toLowerCase()
    if (!section) return null

    const index = await loadLineIndex()
    const line = index.get(section)
    return line ? `${relFile}:${line}` : null
  }
}

export const createSourceResolvers = rootDir => ({
  'diogenes-laertius': createDiogenesLaertiusResolver(),
  'walter-burley': createWalterBurleyResolver(rootDir),
  'porphyry-vita-plotini': createPorphyryVitaPlotiniResolver(),
  'plotinus-enneads': createPlotinusEnneadsResolver(),
  'iamblichus-vita-pythagorica': createIamblichusVitaPythagoricaResolver(),
  'porphyry-vita-pythagorae': createPorphyryVitaPythagoraeResolver(),
  'plato-protagoras': createPlatoStephanusResolver(
    rootDir,
    'data/sources/canonical-greekLit/data/tlg0059/tlg022/tlg0059.tlg022.perseus-grc2.xml',
  ),
  'plato-theaetetus': createPlatoStephanusResolver(
    rootDir,
    'data/sources/canonical-greekLit/data/tlg0059/tlg006/tlg0059.tlg006.perseus-grc2.xml',
  ),
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
