import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import type { Language } from '../types/data'
import type { Work, WorkSection } from '../types/works'

export const readWorkSection = (work: Work, section: WorkSection, language: Language): string => {
  const filename = path.join(process.cwd(), 'data', 'works', work.directory, `${section.file}.${language}.md`)
  const content = fs.readFileSync(filename, 'utf8')
  const escaped = section.anchor.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
  const marker = new RegExp(`<!--\\s*anchor:${escaped}\\s*-->`, 'mu')
  const startMatch = marker.exec(content)
  if (!startMatch) throw new Error(`Missing section ${section.anchor} in ${filename}`)
  const start = startMatch.index + startMatch[0].length
  const remainder = content.slice(start)
  const nextMarker = /<!--\s*anchor:.+?\s*-->/mu.exec(remainder)
  return remainder
    .slice(0, nextMarker?.index ?? remainder.length)
    .replace(/<!--[\s\S]*?-->/gu, '')
    .trim()
}

export interface WorkReadingPage {
  startIndex: number
  endIndex: number
}

const targetPageLength = 10000
const readingPagesCache = new Map<string, WorkReadingPage[]>()

export const getWorkReadingPages = (work: Work): WorkReadingPage[] => {
  const cached = readingPagesCache.get(work.id)
  if (cached) return cached
  const lengths = work.sections.map(section => readWorkSection(work, section, 'sr').length)
  const pages: WorkReadingPage[] = []
  let startIndex = 0
  let length = 0

  lengths.forEach((sectionLength, index) => {
    if (index > startIndex && length >= targetPageLength) {
      pages.push({ startIndex, endIndex: index - 1 })
      startIndex = index
      length = 0
    }
    length += sectionLength
  })

  if (work.sections.length) pages.push({ startIndex, endIndex: work.sections.length - 1 })
  readingPagesCache.set(work.id, pages)
  return pages
}

export const findWorkReadingPage = (work: Work, sectionIndex: number): WorkReadingPage => {
  const page = getWorkReadingPages(work).find(item => sectionIndex >= item.startIndex && sectionIndex <= item.endIndex)
  if (!page) throw new Error(`Missing reading page for ${work.id}#${work.sections[sectionIndex]?.anchor}`)
  return page
}
