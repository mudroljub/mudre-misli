import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const quotesDir = path.join(rootDir, 'data', 'quotes')
const idPattern = /^mm-(\d{6})$/
const files = (await fs.readdir(quotesDir))
  .filter(file => file.endsWith('.json'))
  .sort()

const documents = []
const usedIds = new Set()
let largestNumber = 0

for (const file of files) {
  const filePath = path.join(quotesDir, file)
  const entries = JSON.parse(await fs.readFile(filePath, 'utf8'))

  if (!Array.isArray(entries)) {
    throw new Error(`${file} does not contain an array`)
  }

  for (const [index, entry] of entries.entries()) {
    if (!entry.id) continue

    const match = idPattern.exec(entry.id)
    if (!match) {
      throw new Error(`${file} entry ${index + 1} has invalid id "${entry.id}"`)
    }
    if (usedIds.has(entry.id)) {
      throw new Error(`${file} entry ${index + 1} duplicates id "${entry.id}"`)
    }

    usedIds.add(entry.id)
    largestNumber = Math.max(largestNumber, Number(match[1]))
  }

  documents.push({ file, filePath, entries })
}

let assigned = 0

for (const document of documents) {
  let changed = false

  document.entries = document.entries.map(entry => {
    if (entry.id) return entry

    let id
    do {
      largestNumber += 1
      id = `mm-${String(largestNumber).padStart(6, '0')}`
    } while (usedIds.has(id))

    usedIds.add(id)
    assigned += 1
    changed = true
    return { id, ...entry }
  })

  if (changed) {
    await fs.writeFile(
      document.filePath,
      `${JSON.stringify(document.entries, null, 2)}\n`,
      'utf8',
    )
  }
}

console.log(`Assigned ${assigned} stable entry ids`)
