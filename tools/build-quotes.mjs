import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const rootDir = path.resolve(__dirname, '..')

const inputDir = path.join(rootDir, 'data/quotes')
const outputFile = path.join(rootDir, 'data/quotes.json')

const files = (await fs.readdir(inputDir))
  .filter(file => file.endsWith('.json'))
  .sort()

const quotes = []

for (const file of files) {
  const filePath = path.join(inputDir, file)
  const content = JSON.parse(await fs.readFile(filePath, 'utf8'))

  if (!Array.isArray(content))
    throw new Error(`${file} does not contain an array`)

  quotes.push(...content)
}

await fs.writeFile(
  outputFile,
  JSON.stringify(quotes, null, 2),
  'utf8'
)

console.log(`Generated ${outputFile} (${quotes.length} quotes)`)