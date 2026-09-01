import { promises as fs } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const sourcesDir = path.join(rootDir, 'data', 'sources')
const quotesDir = path.join(rootDir, 'data', 'quotes')
const outputJson = path.join(sourcesDir, 'philosopher-catalog.json')
const outputMarkdown = path.join(sourcesDir, 'INDEX_CENTRAL.md')
const outputUnusedMarkdown = path.join(sourcesDir, 'INDEX_NEKORISCENI_IZVORI.md')

const sourceDefinitions = {
  'diogenes-laertius': { label: 'Diogen Laertije', index: 'INDEX_LEARTIJE.md' },
  'walter-burley': { label: 'Burley', index: 'INDEX_BURLEY.md' },
  'hermann-diels': { label: 'Diels', index: 'INDEX_DIELS.md' },
  eunapius: { label: 'Eunapije', index: 'INDEX_EUNAPIJE.md' },
  philostratus: { label: 'Filostrat', index: 'INDEX_FILOSTRAT.md' },
  'porphyry-vita-plotini': { label: 'Porfirije', index: 'INDEX_PORFIRIJE_PLOTIN.md' },
  'john-of-wales': { label: 'Jovan Velški', index: 'INDEX_JOVAN_VELSKI.md' },
  'al-mubashshir-ibn-fatik': { label: 'Mukhtār al-ḥikam', index: 'INDEX_MUKHTAR_AL_HIKAM.md' },
  suda: { label: 'Suda', index: 'INDEX_SUDA.md' },
  'plato-protagoras': { label: 'Platon, Protagora', index: 'INDEX_PROTAGORA.md' },
  'plato-theaetetus': { label: 'Platon, Teetet', index: 'INDEX_PROTAGORA.md' },
  'greek-corpus': { label: 'Grčki korpus', index: 'INDEX_GREEK.md' },
}

const unindexedSources = []

const aliasEntries = {
  'Periander': 'Perijandar',
  'Pittakos': 'Pitak',
  'Mizon': 'Mizon',
  'Misosternon (Mizon)': 'Mizon',
  'Ferekit': 'Ferekid',
  'Anaksimandar': 'Anaksimander',
  'Anaksimen iz Mileta': 'Anaksimen',
  'Empedokle': 'Empedoklo',
  'Meliso': 'Melis',
  'Alkmeón': 'Alkmeon',
  'Fedón': 'Fedon',
  'Stilpon': 'Stilbon',
  'Poleman': 'Polemon',
  'Karnejad': 'Karnead',
  'Teofrastos': 'Teofrast',
  'Krates Atenjanin': 'Kratet Atenjanin',
  'Kratet': 'Kratet iz Tebe',
  'Zenon iz Kitija': 'Zenon iz Kitijuma',
  'Zenon iz Kitijuma (pomešan sa Elejcem)': 'Zenon iz Kitijuma',
  'Zenon Elejski': 'Zenon iz Eleje',
  'Hrisip': 'Hrizip',
  'Arkesilaos': 'Arkesilaj',
  'Eshine': 'Eshin',
  'Porfirije': 'Porfirije iz Tira',
  'Tit Lukrecije': 'Lukrecije',
  'Euklit Megaranin': 'Euklid Megaranin',
  'Ariston sa Hiosa': 'Aristo iz Hija',
}

const sourceUsageAliases = {
  'greek-corpus': [
    'aristotle',
    'aristotle-generation-corruption',
    'aristotle-metaphysics',
    'aristotle-physics',
    'plato-parmenides',
    'plato-protagoras',
    'plato-theaetetus',
    'plotinus-enneads',
    'plutarch',
    'plutarch-against-colotes',
  ],
}

const normalize = value => value
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()

const slugifyAuthor = author => author
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '') || 'author'

const markdownLink = (label, target) => `[${label}](${target.replaceAll(' ', '%20')})`

const read = relative => fs.readFile(path.join(sourcesDir, relative), 'utf8')

const parseSerbianAuthorNames = async () => {
  const source = await fs.readFile(path.join(rootDir, 'utils', 'translations.ts'), 'utf8')
  const srBlock = source.match(/\bsr:\s*\{[\s\S]*?philosophers:\s*\{([\s\S]*?)\r?\n\s{4}\},/)?.[1]
  if (!srBlock) throw new Error('Could not find Serbian philosopher translations')

  const names = new Map()
  const pattern = /^\s*(?:'([^']+)'|([A-Za-z][\w ]*)):\s*'([^']+)',?$/gm
  for (const match of srBlock.matchAll(pattern)) {
    names.set(match[1] ?? match[2], match[3])
  }
  return names
}

const parseBurley = async () => {
  const [index, generatedManifest] = await Promise.all([
    read('INDEX_BURLEY.md'),
    fs.readFile(path.join(sourcesDir, 'walter-burley', 'chapters-generated', 'manifest.json'), 'utf8'),
  ])
  const generated = JSON.parse(generatedManifest).chapters
  const generatedByRoman = new Map(generated.map(chapter => [chapter.roman, chapter.file]))
  const rows = []
  const pattern = /^\|\s*([IVXLCDM]+)\s*\|\s*([^|]+?)\s*\|/gm
  for (const match of index.matchAll(pattern)) {
    const file = generatedByRoman.get(match[1])
    if (!file) throw new Error(`Missing generated Burley chapter ${match[1]}`)
    rows.push({
      name: match[2].trim().replace(/\s+\(ponovljen u registru\)$/, ''),
      source: 'walter-burley',
      reference: match[1],
      href: `walter-burley/chapters-generated/${file}`,
      kind: 'biography',
    })
  }
  return rows
}

const parseNumberedIndex = async (filename, source, options = {}) => {
  const markdown = await read(filename)
  const rows = []
  let section = ''
  for (const line of markdown.split(/\r?\n/)) {
    if (line.startsWith('### ')) section = line.slice(4).trim()
    const match = line.match(/^\d+\.\s+(.+)$/)
    if (!match) continue
    const parsed = options.parseLine(match[1])
    if (!parsed) continue
    rows.push({
      ...parsed,
      source,
      href: options.href?.(parsed) ?? filename,
      section,
      kind: 'biography',
    })
  }
  return rows
}

const parseLaertius = () => parseNumberedIndex('INDEX_LEARTIJE.md', 'diogenes-laertius', {
  parseLine: line => ({
    name: line.split(/\s+\(/)[0].trim(),
    reference: line.match(/—\s+Knjig(?:a|e)\s+([^—]+)$/)?.[1]?.trim() ?? null,
  }),
})

const parseEunapius = () => parseNumberedIndex('INDEX_EUNAPIJE.md', 'eunapius', {
  parseLine: line => {
    const match = line.match(/^(.+?)\s+—\s+`(#.+)`$/)
    return match ? { name: match[1], reference: match[2] } : null
  },
  href: row => `eunapius/vitae-sophistarum.en.html${row.reference}`,
})

const parsePhilostratus = () => parseNumberedIndex('INDEX_FILOSTRAT.md', 'philostratus', {
  parseLine: line => {
    const match = line.match(/^(.+?)\s+\(`([^`]+)`\)$/)
    return match ? { name: match[1], reference: match[2] } : null
  },
})

const parseDiels = async () => {
  const markdown = await read('INDEX_DIELS.md')
  const rows = []
  for (const match of markdown.matchAll(/^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*`([^`]+)`\s*\|$/gm)) {
    rows.push({
      name: match[2].trim(),
      source: 'hermann-diels',
      reference: `Diels ${match[1]}, A. Leben und Lehre`,
      href: `hermann-diels/philosophers/${match[3]}`,
      kind: 'biographical testimonia',
    })
  }
  return rows
}

const parseGreekCorpus = async () => {
  const markdown = await read('INDEX_GREEK.md')
  const rows = []
  let repository = null
  let current = null
  let acceptingWorks = false

  const finishCurrent = () => {
    if (!current || current.works.length === 0) return
    rows.push({
      name: current.name,
      source: 'greek-corpus',
      reference: `${current.authorId}; ${current.works.length} ${current.works.length === 1 ? 'delo' : 'dela'}`,
      href: `${current.repository}/data/${current.authorId}`,
      kind: 'primary-text corpus',
    })
  }

  for (const line of markdown.split(/\r?\n/)) {
    if (line === '# canonical-greekLit') {
      repository = 'canonical-greekLit'
      continue
    }
    if (line === '# First1KGreek') {
      repository = 'First1KGreek'
      continue
    }

    const authorMatch = line.match(/^## `([^`]+)` --- (.+)$/)
    if (authorMatch) {
      finishCurrent()
      current = repository
        ? { repository, authorId: authorMatch[1], name: authorMatch[2].trim(), works: [] }
        : null
      acceptingWorks = false
      continue
    }

    if (!current) continue
    if (/^(?:Filozofski relevantna dela(?: u korpusu)?|Relevantna dela|Dela u korpusu):$/.test(line)) {
      acceptingWorks = true
      continue
    }
    if (/^(?:U istom folderu postoji i|Izostavljeno kao nerelevantno):$/.test(line)) {
      acceptingWorks = false
      continue
    }
    if (!acceptingWorks) continue

    const workMatch = line.match(/^- `([^`]+)` --- (.+)$/)
    if (workMatch) {
      current.works.push({ id: workMatch[1], title: workMatch[2].trim() })
    } else if (current.works.length > 0 && line !== '') {
      acceptingWorks = false
    }
  }
  finishCurrent()
  return rows
}

const parseLivesIndex = async (directory, source) => {
  const rows = JSON.parse(await fs.readFile(path.join(sourcesDir, directory, 'lives-index.json'), 'utf8'))
  return rows.map(row => ({
    ...row,
    source,
    href: `${directory}/${row.href}`,
    kind: 'biography',
  }))
}

const loadQuoteStats = async serbianNames => {
  const stats = new Map()
  const files = (await fs.readdir(quotesDir)).filter(file => file.endsWith('.json'))
  for (const file of files) {
    const author = path.basename(file, '.json')
    const displayName = serbianNames.get(author) ?? author
    const items = JSON.parse(await fs.readFile(path.join(quotesDir, file), 'utf8'))
    const authorStats = stats.get(normalize(displayName)) ?? new Map()
    for (const item of items) {
      for (const source of item.sources ?? []) {
        const sourceStats = authorStats.get(source.name) ?? { entries: 0 }
        sourceStats.entries += 1
        authorStats.set(source.name, sourceStats)
      }
    }
    stats.set(normalize(displayName), authorStats)
  }
  return stats
}

const canonicalize = (name, translatedNames) => {
  const alias = aliasEntries[name] ?? name
  const normalizedAlias = normalize(alias)
  const translated = [...translatedNames.values()].find(value => normalize(value) === normalizedAlias)
  return translated ?? alias
}

const buildCatalog = async () => {
  const serbianNames = await parseSerbianAuthorNames()
  const quoteStats = await loadQuoteStats(serbianNames)
  const sourceRows = (await Promise.all([
    parseBurley(),
    parseLaertius(),
    parseDiels(),
    parseGreekCorpus(),
    Promise.resolve([
      {
        name: 'Protagora',
        source: 'hermann-diels',
        reference: '80 A–C',
        href: 'hermann-diels/band1.txt',
        kind: 'testimonia and fragments',
      },
      {
        name: 'Protagora',
        source: 'plato-protagoras',
        reference: '317b–339a',
        href: 'canonical-greekLit/data/tlg0059/tlg022/tlg0059.tlg022.perseus-grc2.xml',
        kind: 'dialogue',
      },
      {
        name: 'Protagora',
        source: 'plato-theaetetus',
        reference: '166d–167c',
        href: 'canonical-greekLit/data/tlg0059/tlg006/tlg0059.tlg006.perseus-grc2.xml',
        kind: 'doxographical reconstruction',
      },
    ]),
    parseEunapius(),
    parsePhilostratus(),
    parseLivesIndex('john-of-wales', 'john-of-wales'),
    parseLivesIndex('al-mubashshir-ibn-fatik', 'al-mubashshir-ibn-fatik'),
    parseLivesIndex('suda', 'suda'),
    Promise.resolve([{
      name: 'Plotin',
      source: 'porphyry-vita-plotini',
      reference: '1-26',
      href: 'INDEX_PORFIRIJE_PLOTIN.md',
      kind: 'biography',
    }]),
  ])).flat()

  const people = new Map()
  for (const row of sourceRows) {
    const name = canonicalize(row.name, serbianNames)
    const key = normalize(name)
    const person = people.get(key) ?? { name, sources: [] }
    const usageSources = sourceUsageAliases[row.source] ?? [row.source]
    const entries = usageSources.reduce(
      (total, source) => total + (quoteStats.get(key)?.get(source)?.entries ?? 0),
      0,
    )
    person.sources.push({
      source: row.source,
      sourceLabel: sourceDefinitions[row.source].label,
      index: sourceDefinitions[row.source].index,
      reference: row.reference,
      href: row.href,
      kind: row.kind,
      entries,
    })
    people.set(key, person)
  }

  const catalog = [...people.values()]
    .map(person => {
      const projectAuthor = [...serbianNames]
        .find(([, translated]) => normalize(translated) === normalize(person.name))?.[0] ?? null
      return {
        ...person,
        projectAuthor,
      }
    })
    .sort((left, right) => left.name.localeCompare(right.name, 'sr-Latn'))

  return { catalog, unindexedSources }
}

const renderMarkdown = ({ catalog, unindexedSources }) => {
  const used = catalog.filter(person => person.sources.some(source => source.entries > 0)).length
  const unused = catalog.length - used
  const lines = [
    '# Centralni katalog filozofa i lokalnih izvora',
    '',
    'Ovaj fajl generiše `npm run build:catalog:philosophers`. Ne uređivati ga ručno.',
    '',
    `Ukupno: **${catalog.length} ličnosti**; sa upotrebom izvora **${used}**, bez upotrebe izvora **${unused}**.`,
    '',
    '## Katalog',
    '',
    '| Filozof / ličnost | Dostupni lokalni izvori | Upotreba |',
    '|---|---|---:|',
  ]

  for (const person of catalog) {
    const personName = person.projectAuthor
      ? markdownLink(person.name, `http://localhost:3000/sr/authors/${slugifyAuthor(person.projectAuthor)}`)
      : person.name
    const sources = person.sources
      .map(source => {
        const reference = source.reference ? ` — ${source.reference}` : ''
        return `${markdownLink(source.sourceLabel, source.href)}${reference}`
      })
      .join('<br>')
    const uses = person.sources.map(source => source.entries).join('<br>')
    lines.push(`| ${personName} | ${sources} | ${uses} |`)
  }

  if (unindexedSources.length > 0) {
    lines.push('', '## Izvori koji čekaju indeksiranje po ličnosti', '')
    lines.push('| Izvor | Razlog |', '|---|---|')
    for (const source of unindexedSources) {
      lines.push(`| ${markdownLink(source.source, source.index)} | ${source.reason} |`)
    }
  }
  lines.push(
    '',
    '## Napomena',
    '',
    'Grčki korpus obuhvata izvorna dela i fragmente, a ne nužno životopise. Dielsovi odeljci `A. Leben und Lehre` vode se kao biografska svedočanstva, ne kao jedinstveni antički životopisi.',
    '',
  )
  return lines.join('\n')
}

const renderUnusedMarkdown = ({ catalog }) => {
  const filteredCatalog = catalog.filter(
    person => person.projectAuthor && person.sources.some(source => source.entries === 0),
  )
  const partiallyUsed = filteredCatalog.filter(
    person => person.sources.some(source => source.entries > 0),
  ).length
  const fullyUnused = filteredCatalog.length - partiallyUsed
  const lines = [
    '# Postojeći filozofi sa nekorišćenim lokalnim izvorima',
    '',
    'Ovaj fajl generiše `npm run build:catalog:philosophers`. Ne uređivati ga ručno.',
    '',
    'Prikazani su samo filozofi koji već postoje u projektu i za koje najmanje jedan lokalni izvor ima upotrebu `0`.',
    '',
    `Ukupno: **${filteredCatalog.length} filozofa**; sa drugim korišćenim izvorima **${partiallyUsed}**, bez ijednog korišćenog ovde indeksiranog izvora **${fullyUnused}**.`,
    '',
    '## Katalog',
    '',
    '| Filozof / ličnost | Dostupni lokalni izvori | Upotreba |',
    '|---|---|---:|',
  ]

  for (const person of filteredCatalog) {
    const personName = markdownLink(
      person.name,
      `http://localhost:3000/sr/authors/${slugifyAuthor(person.projectAuthor)}`,
    )
    const sources = person.sources
      .map(source => {
        const reference = source.reference ? ` — ${source.reference}` : ''
        return `${markdownLink(source.sourceLabel, source.href)}${reference}`
      })
      .join('<br>')
    const uses = person.sources.map(source => source.entries).join('<br>')
    lines.push(`| ${personName} | ${sources} | ${uses} |`)
  }

  lines.push(
    '',
    '## Napomena',
    '',
    'Grčki korpus obuhvata izvorna dela i fragmente, a ne nužno životopise. Dielsovi odeljci `A. Leben und Lehre` vode se kao biografska svedočanstva.',
    '',
  )
  return lines.join('\n')
}

const result = await buildCatalog()
await Promise.all([
  fs.writeFile(outputJson, `${JSON.stringify({ generatedAt: new Date().toISOString(), ...result }, null, 2)}\n`, 'utf8'),
  fs.writeFile(outputMarkdown, renderMarkdown(result), 'utf8'),
  fs.writeFile(outputUnusedMarkdown, renderUnusedMarkdown(result), 'utf8'),
])

console.log(`Cataloged ${result.catalog.length} people from ${Object.keys(sourceDefinitions).length} indexed local sources.`)
