import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const quotesDir = path.join(rootDir, 'data/quotes')
const authors = JSON.parse(await fs.readFile(path.join(rootDir, 'data/authors.json'), 'utf8'))
const sources = JSON.parse(await fs.readFile(path.join(rootDir, 'data/sources.json'), 'utf8'))
const allowedTypes = new Set(['quote', 'reported', 'anecdote', 'bio', 'works'])
const datedTypes = new Set(['bio', 'anecdote'])
const referencePatterns = {
  'diogenes-laertius': /^(?:[IVX]+\.\d+(?:[–-]\d+)?)(?:; [IVX]+\.\d+(?:[–-]\d+)?)*$/,
  'hermann-diels': /^[ABC]\.\d+$/,
  'walter-burley': /^Cap\. [MDCLXVI]+(?: \(.+\))?$/,
  plutarch: /^Moralia \d+[A-F]$/,
  aristotle: /^Rhetoric [IVX]+\.\d+, \d+[a-z]$/,
  athenaeus: /^[IVX]+\.\d+[a-z]$/,
  'dissoi-logoi': /^\d+\.\d+$/,
}
const errors = []
const warnings = []
const exactTexts = new Map()

const fail = (location, message) => errors.push(`${location}: ${message}`)

const files = (await fs.readdir(quotesDir))
  .filter(file => file.endsWith('.json'))
  .sort()

let entryCount = 0

for (const file of files) {
  const filePath = path.join(quotesDir, file)
  let entries

  try {
    entries = JSON.parse(await fs.readFile(filePath, 'utf8'))
  } catch (error) {
    fail(file, `neispravan JSON (${error.message})`)
    continue
  }

  if (!Array.isArray(entries)) {
    fail(file, 'koreni element mora biti niz')
    continue
  }

  for (const [index, entry] of entries.entries()) {
    entryCount += 1
    const location = `${file}#${index + 1}`

    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      fail(location, 'unos mora biti objekat')
      continue
    }

    if (!allowedTypes.has(entry.type)) {
      fail(location, `nedozvoljen tip "${entry.type}"`)
    }

    for (const field of ['sr', 'stsl', 'originalText']) {
      if (typeof entry[field] !== 'string' || !entry[field].trim()) {
        fail(location, `polje "${field}" mora biti neprazan string`)
      }
    }

    const entryAuthors = Array.isArray(entry.author) ? entry.author : [entry.author]

    if (entryAuthors.length === 0) {
      fail(location, 'nedostaje autor')
    }

    for (const author of entryAuthors) {
      if (typeof author !== 'string' || !authors[author]) {
        fail(location, `nepoznat autor "${author}"`)
      }
    }

    const hasYear = Object.hasOwn(entry, 'year')

    if (datedTypes.has(entry.type)) {
      if (!hasYear || typeof entry.year !== 'number' || !Number.isFinite(entry.year)) {
        fail(location, `tip "${entry.type}" mora imati brojčano polje "year"`)
      }
    } else if (hasYear) {
      fail(location, `tip "${entry.type}" ne sme imati polje "year"`)
    }

    if (!Array.isArray(entry.sources) || entry.sources.length === 0) {
      fail(location, 'mora imati najmanje jedan izvor')
    } else {
      for (const [sourceIndex, source] of entry.sources.entries()) {
        const sourceLocation = `${location}.sources[${sourceIndex}]`

        if (!source || typeof source !== 'object' || Array.isArray(source)) {
          fail(sourceLocation, 'izvor mora biti objekat')
          continue
        }

        if (typeof source.name !== 'string' || !sources[source.name]) {
          fail(sourceLocation, `nepoznato kanonsko ime izvora "${source.name}"`)
        }

        if (typeof source.reference !== 'string' || !source.reference.trim()) {
          fail(sourceLocation, 'reference mora biti neprazan string')
        } else {
          const pattern = referencePatterns[source.name]

          if (pattern && !pattern.test(source.reference.trim())) {
            fail(sourceLocation, `neispravan format reference "${source.reference}"`)
          }
        }
      }
    }

    if (entry.textVariants !== undefined) {
      if (!Array.isArray(entry.textVariants)) {
        fail(location, 'polje "textVariants" mora biti niz')
      } else {
        const sourceNames = new Set(entry.sources?.map(source => source?.name))

        for (const [variantIndex, variant] of entry.textVariants.entries()) {
          const variantLocation = `${location}.textVariants[${variantIndex}]`

          if (!variant || typeof variant !== 'object' || Array.isArray(variant)) {
            fail(variantLocation, 'varijanta mora biti objekat')
            continue
          }

          if (!sourceNames.has(variant.source)) {
            fail(variantLocation, `izvor varijante "${variant.source}" nije naveden u sources`)
          }

          if (typeof variant.text !== 'string' || !variant.text.trim()) {
            fail(variantLocation, 'tekst varijante mora biti neprazan string')
          }
        }
      }
    }

    if (typeof entry.originalText === 'string' && entry.originalText.trim()) {
      const key = entry.originalText.trim()
      const previous = exactTexts.get(key)

      if (previous) {
        warnings.push(`moguć potpuni duplikat: ${previous} i ${location}`)
      } else {
        exactTexts.set(key, location)
      }
    }
  }
}

if (warnings.length) {
  console.warn(`Upozorenja (${warnings.length}):`)
  for (const warning of warnings) console.warn(`- ${warning}`)
}

if (errors.length) {
  console.error(`Greške (${errors.length}):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(`Podaci su ispravni: ${files.length} fajlova, ${entryCount} unosa.`)
}
