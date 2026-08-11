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

const getDiogenesElFileForBook = bookNumber =>
  `data/sources/diogenes-laertius/el/${String(bookNumber + 1).padStart(2, '0')}.txt`

const createDiogenesLaertiusResolver = rootDir => {
  const sourceIndexCache = new Map()

  const loadSectionLineIndex = async bookNumber => {
    if (sourceIndexCache.has(bookNumber)) {
      return sourceIndexCache.get(bookNumber)
    }

    const relFile = getDiogenesElFileForBook(bookNumber)
    const content = await fs.readFile(path.join(rootDir, relFile), 'utf8')
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

    const sourceIndex = { lineBySection, lines }
    sourceIndexCache.set(bookNumber, sourceIndex)

    return sourceIndex
  }

  return async (reference, _author, originalText) => {
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

    const relFile = getDiogenesElFileForBook(bookNumber)
    const { lineBySection, lines } = await loadSectionLineIndex(bookNumber)
    let selectedSection = sectionNumber

    if (endSectionNumber > sectionNumber && originalText) {
      const tokens = String(originalText)
        .match(/[\p{L}\p{M}]+/gu)
        ?.filter(token => token.length >= 5)
        .map(token => token.normalize('NFC').toLocaleLowerCase('el')) ?? []
      let bestScore = -1

      for (let section = sectionNumber; section <= endSectionNumber; section += 1) {
        const startLine = lineBySection.get(section)
        if (!startLine) continue

        const nextLines = [...lineBySection.entries()]
          .filter(([number]) => number > section)
          .map(([, line]) => line)
        const endLine = nextLines.length ? Math.min(...nextLines) - 1 : lines.length
        const sectionText = lines
          .slice(startLine - 1, endLine)
          .join('\n')
          .normalize('NFC')
          .toLocaleLowerCase('el')
        const score = tokens.reduce(
          (sum, token) => sum + (sectionText.includes(token) ? 1 : 0),
          0,
        )

        if (score > bestScore) {
          bestScore = score
          selectedSection = section
        }
      }
    }

    const line = lineBySection.get(selectedSection)

    return line ? `${relFile}:${line}` : null
  }
}

const walterBurleyAuthorFiles = {
  'Bias of Priene': 'bias',
  'Chilon of Sparta': 'chilon',
  'Crates of Thebes': 'crates',
  Diogenes: 'diogenes_cynicus',
  Pherecydes: 'pherecides',
  'Zeno of Citium': 'zeno_citieus',
  'Zeno of Elea': 'zeno_eleates',
}

const createWalterBurleyResolver = rootDir =>
  async (reference, author) => {
    const normalized = String(reference || '').trim()
    if (!normalized || !/\b[MDCLXVI]+\b/.test(normalized) || !author) {
      return null
    }

    const basename =
      walterBurleyAuthorFiles[author] ??
      author.toLowerCase().replace(/\s+/g, '_')
    const filename = `${basename}.txt`
    const relFile = `data/sources/walter-burley/latin_raw/${filename}`

    try {
      await fs.access(path.join(rootDir, relFile))
      return `${relFile}:1`
    } catch {
      return null
    }
  }

const createHermannDielsResolver = () =>
  async () => null

export const createSourceResolvers = rootDir => ({
  'diogenes-laertius': createDiogenesLaertiusResolver(rootDir),
  'walter-burley': createWalterBurleyResolver(rootDir),
  'hermann-diels': createHermannDielsResolver(rootDir),
})
