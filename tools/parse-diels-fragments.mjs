#!/usr/bin/env node
/**
 * Parse Diels-Kranz fragments from TXT files into structured JSON.
 *
 * Improved parser that handles:
 * - DK number and Greek text on separate lines (with gap)
 * - Multiple citation sources before fragment text
 * - German translations after Greek text
 *
 * Usage:
 *   node tools/parse-diels-fragments.mjs <philosopher-number>
 *   node tools/parse-diels-fragments.mjs 12  # Heraclitus
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const greekPattern = /[α-ωΑ-Ω]/
const citationPattern = /^\[(\d+)\]/

async function parsePhilosopherFragments(number) {
  const inputDir = path.join(rootDir, 'data/sources/hermann-diels/philosophers')
  const files = await fs.readdir(inputDir)

  const txtFile = files.find(f =>
    f.startsWith(`${number.toString().padStart(2, '0')}-`) && f.endsWith('.txt')
  )

  if (!txtFile) {
    throw new Error(`No file found for philosopher ${number}`)
  }

  const txtPath = path.join(inputDir, txtFile)
  const content = await fs.readFile(txtPath, 'utf8')
  const lines = content.split(/\r?\n/)

  console.log(`Parsing ${txtFile}...`)

  // Find section A and B boundaries
  let sectionAStart = -1
  let sectionBStart = -1

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^A\.\s*(LEBEN|LEHRE)/i)) {
      sectionAStart = i
    }
    // Match both "B. FRAGMENTE" and "B. FR. 1-10" formats
    if (lines[i].match(/^B\.\s*(FRAGMENTE|FR\.)/i)) {
      sectionBStart = i
      break
    }
  }

  if (sectionBStart === -1) {
    throw new Error('Section B (FRAGMENTE or FR.) not found')
  }

  // Parse from section A if available (contains quoted fragments), otherwise from B
  const parseStart = sectionAStart !== -1 ? sectionAStart : sectionBStart

  console.log(`Section A: ${sectionAStart}, Section B: ${sectionBStart}, parsing from ${parseStart}`)

  // Parse fragments
  const fragments = []
  let currentDK = null
  let greekLines = []
  let germanLines = []
  let sourceLines = []
  let state = 'seeking' // 'seeking' | 'in_greek' | 'in_german'

  for (let i = parseStart; i < lines.length; i++) {
    const line = lines[i].trim()

    // Skip empty lines
    if (!line) {
      // Empty line might signal end of German translation
      if (state === 'in_german' && germanLines.length > 0) {
        state = 'seeking'
      }
      continue
    }

    // Detect DK number at start: "40 [citation]" or "1 SIMPLI, phys..."
    const dkMatch = line.match(/^(\d+)\s+(\[|[A-ZΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ])/)
    if (dkMatch) {
      // Save previous fragment if exists
      if (currentDK && greekLines.length > 0) {
        fragments.push({
          dk_number: `B.${currentDK}`,
          line: i + 1 - greekLines.length,
          greek: greekLines.join(' ').trim(),
          german: germanLines.join(' ').trim() || null,
          sources: sourceLines.join(' ').trim() || null
        })
      }

      // Start new fragment
      currentDK = dkMatch[1]
      greekLines = []
      germanLines = []
      sourceLines = []
      state = 'in_greek'

      // Extract citation and Greek from same line
      const restOfLine = line.substring(dkMatch[0].length - 1) // Keep opening [
      sourceLines.push(restOfLine.match(/\[[^\]]+\]/g)?.join(' ') || '')

      // Extract Greek text if present on this line
      if (greekPattern.test(restOfLine)) {
        greekLines.push(restOfLine)
      }
      continue
    }

    // If we don't have a current fragment, skip
    if (!currentDK) continue

    // Additional citation lines
    if (citationPattern.test(line) && state !== 'in_german') {
      sourceLines.push(line)
      continue
    }

    // Greek continuation lines
    if (greekPattern.test(line) && state === 'in_greek') {
      greekLines.push(line)
      continue
    }

    // Transition to German (starts with number like "1." or capital letter)
    if ((line.match(/^\d+\./) || /^[A-ZÄÖÜ]/.test(line)) && greekLines.length > 0) {
      state = 'in_german'
      germanLines.push(line)
      continue
    }

    // German continuation
    if (state === 'in_german') {
      // Stop if we hit a new DK-like pattern or section header
      if (line.match(/^B\.\s*FR/) || line.match(/^\d+\s*$/)) {
        state = 'seeking'
        continue
      }
      germanLines.push(line)
      continue
    }
  }

  // Save last fragment
  if (currentDK && greekLines.length > 0) {
    fragments.push({
      dk_number: `B.${currentDK}`,
      line: lines.length,
      greek: greekLines.join(' ').trim(),
      german: germanLines.join(' ').trim() || null,
      sources: sourceLines.join(' ').trim() || null
    })
  }

  console.log(`Extracted ${fragments.length} fragments`)

  // Save to JSON
  const outputPath = txtPath.replace('.txt', '-fragments.json')
  await fs.writeFile(outputPath, JSON.stringify(fragments, null, 2), 'utf8')

  console.log(`Saved to ${path.basename(outputPath)}`)

  // Print summary
  console.log('\nFragment summary:')
  fragments.slice(0, 5).forEach(f => {
    console.log(`  ${f.dk_number}: ${f.greek.substring(0, 60)}...`)
  })

  return fragments
}

// CLI
const philosopherNumber = parseInt(process.argv[2])
if (!philosopherNumber) {
  console.error('Usage: node tools/parse-diels-fragments.mjs <philosopher-number>')
  console.error('Example: node tools/parse-diels-fragments.mjs 12')
  process.exit(1)
}

parsePhilosopherFragments(philosopherNumber).catch(err => {
  console.error('Error:', err.message)
  process.exit(1)
})
