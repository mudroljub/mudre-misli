import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import type { Language } from '../types/data'
import type { Work, WorkSection } from '../types/works'

export const readWorkSection = (work: Work, section: WorkSection, language: Language): string => {
  const filename = path.join(process.cwd(), 'data', 'works', work.directory, `${section.file}.${language}.md`)
  const content = fs.readFileSync(filename, 'utf8')
  const escaped = section.anchor.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
  const heading = new RegExp(`^##\\s+${escaped}\\s*$`, 'mu')
  const startMatch = heading.exec(content)
  if (!startMatch) throw new Error(`Missing section ${section.anchor} in ${filename}`)
  const start = startMatch.index + startMatch[0].length
  const remainder = content.slice(start)
  const nextHeading = /^##\s+.+?\s*$/mu.exec(remainder)
  return remainder.slice(0, nextHeading?.index ?? remainder.length).trim()
}
