import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const worksDir = path.join(rootDir, 'data', 'works')
const markerPattern = /<!--\s*anchor:([^>]+?)\s*-->/gu
const workArgument = process.argv[2]
const outputArgument = process.argv[3]

if (!workArgument || !outputArgument) {
  throw new Error('Usage: node tools/create-work-anchor-map.mjs <work-directory> <output.json>')
}

const workDir = path.resolve(worksDir, workArgument)
if (path.relative(worksDir, workDir).startsWith('..')) throw new Error('Work directory must stay inside data/works')
const outputFile = path.resolve(rootDir, outputArgument)
const manifest = JSON.parse(await fs.readFile(path.join(workDir, 'work.json'), 'utf8'))
const anchors = Object.fromEntries(manifest.sections.map(section => [section.anchor, {}]))

const plainAndOffsets = content => {
  const offsets = new Map()
  let plain = ''
  let cursor = 0
  for (const match of content.matchAll(markerPattern)) {
    plain += content.slice(cursor, match.index)
    offsets.set(match[1].trim(), plain.length)
    cursor = match.index + match[0].length
  }
  plain += content.slice(cursor)
  return { plain, offsets }
}

const uniqueLocator = (plain, offset, label) => {
  const start = plain.slice(offset).search(/\S/u) + offset
  if (start < offset) throw new Error(`${label}: no text after anchor`)
  for (let length = 32; length <= 1200; length += 8) {
    const locator = plain.slice(start, start + length)
    if (plain.indexOf(locator) === start && plain.indexOf(locator, start + 1) < 0) return locator
  }
  throw new Error(`${label}: cannot form a unique locator`)
}

for (const language of ['sr', 'stsl']) {
  const files = [...new Set(manifest.sections.map(section => section.file))]
  for (const file of files) {
    const filename = path.join(workDir, `${file}.${language}.md`)
    const { plain, offsets } = plainAndOffsets(await fs.readFile(filename, 'utf8'))
    for (const section of manifest.sections.filter(item => item.file === file)) {
      const offset = offsets.get(section.anchor)
      if (offset === undefined) throw new Error(`${path.basename(filename)}: missing anchor ${section.anchor}`)
      anchors[section.anchor][language] = {
        before: uniqueLocator(plain, offset, `${path.basename(filename)}#${section.anchor}`),
      }
    }
  }
}

const output = `${JSON.stringify({ work: workArgument.replaceAll('\\', '/'), anchors }, null, 2)}\n`
await fs.writeFile(outputFile, output, 'utf8')
console.log(`Generated ${path.relative(rootDir, outputFile)} (${manifest.sections.length} anchors)`)
