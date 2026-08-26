import { createHash } from 'node:crypto'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const worksDir = path.join(rootDir, 'data', 'works')
const markerPattern = /<!--\s*anchor:([^>]+?)\s*-->/gu

const usage = () => {
  console.error('Usage: node tools/apply-work-anchor-map.mjs <map.json> [--write]')
  console.error('Without --write the command only validates and previews the moves.')
  process.exitCode = 1
}

const args = process.argv.slice(2)
const mapArgument = args.shift()
if (!mapArgument || args.some(argument => argument !== '--write')) {
  usage()
  process.exit()
}
const shouldWrite = args.includes('--write')

const mapFile = path.resolve(rootDir, mapArgument)
const alignment = JSON.parse(await fs.readFile(mapFile, 'utf8'))
if (!alignment.work || !alignment.anchors || typeof alignment.anchors !== 'object') {
  throw new Error('Map must contain "work" and "anchors"')
}

const workDir = path.resolve(worksDir, alignment.work)
if (path.relative(worksDir, workDir).startsWith('..')) throw new Error('Work directory must stay inside data/works')
const manifest = JSON.parse(await fs.readFile(path.join(workDir, 'work.json'), 'utf8'))
const sectionByAnchor = new Map(manifest.sections.map(section => [section.anchor, section]))
const anchorOrder = new Map(manifest.sections.map((section, index) => [section.anchor, index]))

const parseContent = content => {
  const markers = []
  let plain = ''
  let cursor = 0
  for (const match of content.matchAll(markerPattern)) {
    plain += content.slice(cursor, match.index)
    markers.push({ anchor: match[1].trim(), offset: plain.length })
    cursor = match.index + match[0].length
  }
  plain += content.slice(cursor)
  return { plain, markers }
}

const hash = text => createHash('sha256').update(text).digest('hex').slice(0, 16)

const locatorOffset = (plain, instruction, label) => {
  if (!instruction || typeof instruction !== 'object') throw new Error(`${label}: locator must be an object`)
  const modes = ['before', 'after'].filter(mode => typeof instruction[mode] === 'string' && instruction[mode].length)
  if (modes.length !== 1) throw new Error(`${label}: specify exactly one non-empty "before" or "after" locator`)
  const mode = modes[0]
  const locator = instruction[mode]
  const first = plain.indexOf(locator)
  if (first < 0) throw new Error(`${label}: locator was not found: ${JSON.stringify(locator)}`)
  if (plain.indexOf(locator, first + 1) >= 0) throw new Error(`${label}: locator is not unique: ${JSON.stringify(locator)}`)
  return mode === 'before' ? first : first + locator.length
}

const entriesByFile = new Map()
for (const [anchor, languages] of Object.entries(alignment.anchors)) {
  const section = sectionByAnchor.get(anchor)
  if (!section) throw new Error(`Map contains unknown anchor ${anchor}`)
  for (const language of ['sr', 'stsl']) {
    if (!languages?.[language]) throw new Error(`${anchor}: missing ${language} locator`)
    const filename = path.join(workDir, `${section.file}.${language}.md`)
    const entries = entriesByFile.get(filename) ?? []
    entries.push({ anchor, instruction: languages[language] })
    entriesByFile.set(filename, entries)
  }
}

const plannedFiles = []
let movedCount = 0
for (const [filename, entries] of entriesByFile) {
  const content = await fs.readFile(filename, 'utf8')
  const { plain, markers } = parseContent(content)
  const currentOffsets = new Map()
  for (const marker of markers) {
    if (!sectionByAnchor.has(marker.anchor)) throw new Error(`${path.basename(filename)}: unknown anchor ${marker.anchor}`)
    if (currentOffsets.has(marker.anchor)) throw new Error(`${path.basename(filename)}: duplicate anchor ${marker.anchor}`)
    currentOffsets.set(marker.anchor, marker.offset)
  }

  const targetOffsets = new Map(currentOffsets)
  for (const { anchor, instruction } of entries) {
    const located = locatorOffset(plain, instruction, `${path.basename(filename)}#${anchor}`)
    const current = currentOffsets.get(anchor)
    const between = current === undefined ? '' : plain.slice(Math.min(current, located), Math.max(current, located))
    const offset = current !== undefined && between.trim() === '' ? current : located
    targetOffsets.set(anchor, offset)
    const state = current === undefined ? `dodaje se na ${offset}` : current === offset ? 'ostaje' : `${current} → ${offset}`
    console.log(`${path.relative(rootDir, filename)}#${anchor}: ${state}`)
    if (current !== offset) movedCount += 1
  }

  const orderedAnchors = [...targetOffsets.keys()].sort((left, right) => anchorOrder.get(left) - anchorOrder.get(right))
  for (let index = 1; index < orderedAnchors.length; index += 1) {
    const previous = orderedAnchors[index - 1]
    const current = orderedAnchors[index]
    if (targetOffsets.get(previous) > targetOffsets.get(current)) {
      throw new Error(`${path.basename(filename)}: mapped ${current} would precede ${previous}`)
    }
  }

  const markersAtOffset = new Map()
  for (const [anchor, offset] of targetOffsets) {
    const list = markersAtOffset.get(offset) ?? []
    list.push(anchor)
    markersAtOffset.set(offset, list)
  }
  for (const list of markersAtOffset.values()) {
    list.sort((left, right) => (anchorOrder.get(left) ?? Number.MAX_SAFE_INTEGER) - (anchorOrder.get(right) ?? Number.MAX_SAFE_INTEGER))
  }

  let output = ''
  for (let offset = 0; offset <= plain.length; offset += 1) {
    const anchors = markersAtOffset.get(offset)
    if (anchors) output += anchors.map(anchor => `<!-- anchor:${anchor} -->`).join('')
    if (offset < plain.length) output += plain[offset]
  }

  const after = parseContent(output).plain
  if (after !== plain) throw new Error(`${path.basename(filename)}: translation text changed while moving anchors`)
  plannedFiles.push({ filename, content: output, changed: output !== content, digest: hash(plain) })
}

console.log(`\n${movedCount} pomeranja u ${plannedFiles.length} jezičkih fajlova.`)
for (const file of plannedFiles) {
  console.log(`${file.changed ? 'IZMENA' : 'ISTO'} ${path.relative(rootDir, file.filename)}; tekst bez sidara SHA-256 ${file.digest}`)
}

if (!shouldWrite) {
  console.log('\nProbni režim: ništa nije zapisano. Dodaj --write za primenu.')
} else {
  for (const file of plannedFiles) {
    if (file.changed) await fs.writeFile(file.filename, file.content, 'utf8')
  }
  console.log('\nMapa je primenjena; tekst prevoda bez sidara ostao je nepromenjen.')
}
