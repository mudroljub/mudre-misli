#!/usr/bin/env node
/**
 * Maps Diels fragments to existing Diogenes entries based on text similarity.
 *
 * Usage:
 *   node tools/map-fragments.mjs <philosopher-name>
 *
 * Example:
 *   node tools/map-fragments.mjs Heraclitus
 *
 * Output:
 *   JSON file with mapping results in data/sources/hermann-diels/mappings/
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

// Levenshtein distance for similarity calculation
function levenshtein(a, b) {
  const matrix = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

// Calculate similarity ratio (0-1)
function similarity(a, b) {
  const maxLen = Math.max(a.length, b.length)
  if (maxLen === 0) return 1.0

  const distance = levenshtein(a, b)
  return 1.0 - distance / maxLen
}

// Normalize Greek text for comparison
function normalizeGreek(text) {
  return text
    .toLowerCase()
    .replace(/[\s\n\r\t]+/g, ' ')  // Normalize whitespace
    .replace(/[·;:,.!?]/g, '')     // Remove punctuation
    .replace(/[᾽ʼ'']/g, '')        // Remove apostrophes/breathing marks
    .trim()
}

async function main() {
  const philosopherArg = process.argv[2]
  if (!philosopherArg) {
    console.error('Usage: node tools/map-fragments.mjs <philosopher-name>')
    console.error('Example: node tools/map-fragments.mjs Heraclitus')
    process.exit(1)
  }

  // Find Diels fragments file
  const dielsDir = path.join(rootDir, 'data/sources/hermann-diels/philosophers')
  const dielsFiles = await fs.readdir(dielsDir)
  const dielsFile = dielsFiles.find(f =>
    f.toLowerCase().includes(philosopherArg.toLowerCase()) && f.endsWith('.json')
  )

  if (!dielsFile) {
    console.error(`No Diels fragments found for ${philosopherArg}`)
    process.exit(1)
  }

  // Load Diels fragments (array directly, not nested)
  const dielsPath = path.join(dielsDir, dielsFile)
  const dielsFragments = JSON.parse(await fs.readFile(dielsPath, 'utf8'))

  console.log(`Loaded ${dielsFragments.length} Diels fragments from ${dielsFile}`)

  // Load existing quotes
  const quotesDir = path.join(rootDir, 'data/quotes')
  const quotesFile = `${philosopherArg}.json`
  const quotesPath = path.join(quotesDir, quotesFile)

  let existingQuotes = []
  try {
    existingQuotes = JSON.parse(await fs.readFile(quotesPath, 'utf8'))
    console.log(`Loaded ${existingQuotes.length} existing quotes from ${quotesFile}`)
  } catch (err) {
    console.log(`No existing quotes file found (${quotesFile})`)
  }

  // Perform mapping
  const mappings = []
  const unmatchedDiels = []
  const threshold = 0.80  // 80% similarity threshold

  for (const fragment of dielsFragments) {
    if (!fragment.greek) {
      continue
    }

    const normalizedDiels = normalizeGreek(fragment.greek)
    let bestMatch = null
    let bestSimilarity = 0

    // Find best match in existing quotes
    for (let i = 0; i < existingQuotes.length; i++) {
      const quote = existingQuotes[i]
      if (!quote.originalText) continue

      const normalizedQuote = normalizeGreek(quote.originalText)
      const sim = similarity(normalizedDiels, normalizedQuote)

      if (sim > bestSimilarity) {
        bestSimilarity = sim
        bestMatch = { quote, index: i }
      }
    }

    if (bestMatch && bestSimilarity >= threshold) {
      mappings.push({
        diels: {
          reference: fragment.dk_number,
          text: fragment.greek,
          german: fragment.german
        },
        existing: {
          index: bestMatch.index,
          _id: bestMatch.quote._id,
          text: bestMatch.quote.originalText,
          sources: bestMatch.quote.sources
        },
        similarity: Math.round(bestSimilarity * 100) / 100,
        action: bestSimilarity >= 0.95 ? 'merge' : 'review'
      })
    } else {
      unmatchedDiels.push({
        reference: fragment.dk_number,
        text: fragment.greek,
        german: fragment.german,
        bestMatch: bestMatch ? {
          similarity: Math.round(bestSimilarity * 100) / 100,
          text: bestMatch.quote.originalText
        } : null
      })
    }
  }

  // Generate report
  const report = {
    philosopher: philosopherArg,
    timestamp: new Date().toISOString(),
    summary: {
      totalDielsFragments: dielsFragments.length,
      totalExistingQuotes: existingQuotes.length,
      matched: mappings.length,
      matchedAutoMerge: mappings.filter(m => m.action === 'merge').length,
      matchedReview: mappings.filter(m => m.action === 'review').length,
      unmatchedDiels: unmatchedDiels.length
    },
    thresholds: {
      autoMerge: '≥ 95%',
      review: '80-95%',
      separate: '< 80%'
    },
    mappings,
    unmatchedDiels
  }

  // Save report
  const outputDir = path.join(rootDir, 'data/sources/hermann-diels/mappings')
  await fs.mkdir(outputDir, { recursive: true })

  const outputFile = path.join(outputDir, `${philosopherArg.toLowerCase()}-mapping.json`)
  await fs.writeFile(outputFile, JSON.stringify(report, null, 2), 'utf8')

  console.log('\n=== MAPPING REPORT ===')
  console.log(`Total Diels fragments: ${report.summary.totalDielsFragments}`)
  console.log(`Total existing quotes: ${report.summary.totalExistingQuotes}`)
  console.log(`Matched (auto-merge ≥95%): ${report.summary.matchedAutoMerge}`)
  console.log(`Matched (review 80-95%): ${report.summary.matchedReview}`)
  console.log(`Unmatched Diels: ${report.summary.unmatchedDiels}`)
  console.log(`\nReport saved to: ${outputFile}`)
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
