import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const worksDir = path.join(rootDir, 'data', 'works')
const originalsFile = path.join(rootDir, 'data', 'work-originals.json')
const markerPattern = /<!--\s*anchor:([^>]+?)\s*-->/gu

const usage = () => {
  console.error('Usage: node tools/audit-work-anchors.mjs <work-directory> [FROM] [TO] [CONTEXT]')
  console.error('   or: node tools/audit-work-anchors.mjs <work-directory> [--from ANCHOR] [--to ANCHOR] [--context NUMBER]')
  console.error('Example: npm run audit:work-anchors -- plato/euthyphro 2a 6e 320')
  process.exitCode = 1
}

const args = process.argv.slice(2)
const workArgument = args.shift()
if (!workArgument) {
  usage()
  process.exit()
}

const options = { context: 280 }
const positional = []
while (args.length) {
  const option = args.shift()
  if (!option.startsWith('--')) {
    positional.push(option)
    continue
  }
  const [name, inlineValue] = option.split('=', 2)
  const value = inlineValue ?? args.shift()
  if (name === '--from') options.from = value
  else if (name === '--to') options.to = value
  else if (name === '--context' && /^\d+$/u.test(value ?? '')) options.context = Number(value)
  else {
    console.error(`Unknown or incomplete option: ${option}`)
    usage()
    process.exit()
  }
}
if (positional.length > 3) {
  usage()
  process.exit()
}
options.from ??= positional[0]
options.to ??= positional[1]
if (positional[2] !== undefined) {
  if (!/^\d+$/u.test(positional[2])) throw new Error('CONTEXT must be a number')
  options.context = Number(positional[2])
}

const workDir = path.resolve(worksDir, workArgument)
if (path.relative(worksDir, workDir).startsWith('..')) throw new Error('Work directory must stay inside data/works')
const manifestFile = path.join(workDir, 'work.json')
const manifest = JSON.parse(await fs.readFile(manifestFile, 'utf8'))
const originals = JSON.parse(await fs.readFile(originalsFile, 'utf8'))
const anchors = manifest.sections.map(section => section.anchor)

const fromIndex = options.from === undefined ? 0 : anchors.indexOf(options.from)
const toIndex = options.to === undefined ? anchors.length - 1 : anchors.indexOf(options.to)
if (fromIndex < 0) throw new Error(`Unknown --from anchor ${options.from}`)
if (toIndex < 0) throw new Error(`Unknown --to anchor ${options.to}`)
if (fromIndex > toIndex) throw new Error('--from must precede --to')

const fileCache = new Map()
const readTranslation = async (section, language) => {
  const filename = path.join(workDir, `${section.file}.${language}.md`)
  let content = fileCache.get(filename)
  if (content === undefined) {
    content = await fs.readFile(filename, 'utf8')
    fileCache.set(filename, content)
  }
  return content
}

const visibleMarkers = content => content.replace(markerPattern, (_, anchor) => `⟦${anchor.trim()}⟧`)

const contextAtMarker = (content, anchor, radius) => {
  const marked = visibleMarkers(content)
  const token = `⟦${anchor}⟧`
  const index = marked.indexOf(token)
  if (index < 0) throw new Error(`Missing anchor ${anchor}`)
  const start = Math.max(0, index - radius)
  const end = Math.min(marked.length, index + token.length + radius)
  return `${start > 0 ? '…' : ''}${marked.slice(start, end).trim()}${end < marked.length ? '…' : ''}`
}

const tail = (text, length) => text.length <= length ? text : `…${text.slice(-length)}`
const head = (text, length) => text.length <= length ? text : `${text.slice(0, length)}…`

console.log(`${manifest.title.sr} (${manifest.id}) — ${toIndex - fromIndex + 1} granica`)
console.log(`Opseg: ${anchors[fromIndex]}–${anchors[toIndex]}; kontekst prevoda: ${options.context} znakova`)

for (let index = fromIndex; index <= toIndex; index += 1) {
  const section = manifest.sections[index]
  const previous = manifest.sections[index - 1]
  const currentOriginal = originals[`${manifest.id}#${section.anchor}`]?.text
  const previousOriginal = previous ? originals[`${manifest.id}#${previous.anchor}`]?.text : ''
  if (currentOriginal === undefined || (previous && previousOriginal === undefined)) {
    throw new Error(`Missing generated original for ${manifest.id}#${section.anchor}`)
  }

  const [sr, stsl] = await Promise.all([
    readTranslation(section, 'sr'),
    readTranslation(section, 'stsl'),
  ])

  console.log(`\n===== ${section.anchor} =====`)
  console.log('\nGRČKA GRANICA')
  console.log(`${tail(previousOriginal, 220)}\n⟦${section.anchor}⟧\n${head(currentOriginal, 360)}`.trim())
  console.log('\nSR — SADAŠNJI POLOŽAJ')
  console.log(contextAtMarker(sr, section.anchor, options.context))
  console.log('\nSTSL — SADAŠNJI POLOŽAJ')
  console.log(contextAtMarker(stsl, section.anchor, options.context))
}
