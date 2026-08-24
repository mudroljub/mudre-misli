import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const worksDir = path.join(rootDir, 'data', 'works')
const outputFile = path.join(rootDir, 'data', 'works-index.json')
const quotesDir = path.join(rootDir, 'data', 'quotes')

const findManifests = async directory => {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async entry => {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) return findManifests(target)
    return entry.isFile() && entry.name === 'work.json' ? [target] : []
  }))
  return nested.flat()
}

const quoteIds = new Set()
for (const filename of (await fs.readdir(quotesDir)).filter(name => name.endsWith('.json'))) {
  const entries = JSON.parse(await fs.readFile(path.join(quotesDir, filename), 'utf8'))
  for (const entry of entries) quoteIds.add(entry.id)
}

const workIds = new Set()
const workKeys = new Set()
const index = []
const contentCache = new Map()

const readContentFile = async (workDir, file, language) => {
  const filename = path.join(workDir, `${file}.${language}.md`)
  let content = contentCache.get(filename)
  if (content === undefined) {
    content = await fs.readFile(filename, 'utf8')
    contentCache.set(filename, content)
  }
  return { filename, content }
}

const sectionText = (content, anchor) => {
  const escaped = anchor.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
  const match = content.match(new RegExp(`^##\\s+${escaped}\\s*$`, 'gmu'))
  return match?.length ?? 0
}

for (const manifestFile of (await findManifests(worksDir)).sort()) {
  const manifest = JSON.parse(await fs.readFile(manifestFile, 'utf8'))
  const relativeDir = path.relative(worksDir, path.dirname(manifestFile)).replaceAll('\\', '/')
  const label = `data/works/${relativeDir}/work.json`

  if (!/^(?:mw|mm)-\d{6}$/u.test(manifest.id)) throw new Error(`${label}: invalid id`)
  if (workIds.has(manifest.id) || quoteIds.has(manifest.id)) throw new Error(`${label}: duplicate id ${manifest.id}`)
  workIds.add(manifest.id)

  if (!manifest.author || !manifest.slug || !manifest.title?.sr || !manifest.title?.stsl) {
    throw new Error(`${label}: missing required metadata`)
  }
  const workKey = `${manifest.author}/${manifest.slug}`
  if (workKeys.has(workKey)) throw new Error(`${label}: duplicate author/slug ${workKey}`)
  workKeys.add(workKey)

  if (!Array.isArray(manifest.sections) || manifest.sections.length === 0) {
    throw new Error(`${label}: work has no sections`)
  }

  const anchors = new Set()
  for (const section of manifest.sections) {
    if (!section.anchor || !section.file || anchors.has(section.anchor)) {
      throw new Error(`${label}: invalid or duplicate section anchor ${section.anchor}`)
    }
    anchors.add(section.anchor)
    for (const language of ['sr', 'stsl']) {
      const { filename, content } = await readContentFile(path.dirname(manifestFile), section.file, language)
      if (!content.trim()) throw new Error(`${label}: empty ${path.basename(filename)}`)
      const occurrences = sectionText(content, section.anchor)
      if (occurrences !== 1) {
        throw new Error(`${label}: anchor ${section.anchor} occurs ${occurrences} times in ${path.basename(filename)}`)
      }
    }
  }

  index.push({ ...manifest, directory: relativeDir })
}

index.sort((left, right) =>
  left.author.localeCompare(right.author, 'en') || left.title.sr.localeCompare(right.title.sr, 'sr'),
)

const output = `${JSON.stringify(index, null, 2)}\n`
let current = null
try { current = await fs.readFile(outputFile, 'utf8') } catch (error) {
  if (error?.code !== 'ENOENT') throw error
}
if (current !== output) await fs.writeFile(outputFile, output, 'utf8')
console.log(`${current === output ? 'Unchanged' : 'Generated'} ${outputFile} (${index.length} works)`)
