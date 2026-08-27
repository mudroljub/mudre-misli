import type { Entry } from '../types/data'

export const LONG_FORM_WORD_LIMIT = 150
export const LONG_FORM_EXCERPT_WORDS = 42

type LongFormCandidate = Pick<Entry, 'type' | 'sr' | 'stsl' | 'display'>

export const countWords = (text: string): number =>
  text.trim().match(/\S+/gu)?.length ?? 0

export const isLongFormEntry = (entry: LongFormCandidate): boolean => {
  if (entry.display === 'reader') return true
  if (entry.display === 'card') return false
  if (entry.type !== 'quote' && entry.type !== 'works' && entry.type !== 'letter') return false

  return Math.max(countWords(entry.sr), countWords(entry.stsl)) > LONG_FORM_WORD_LIMIT
}

export const getExcerpt = (text: string): string => {
  const words = text.trim().split(/\s+/u)
  if (words.length <= LONG_FORM_EXCERPT_WORDS) return text.trim()
  return `${words.slice(0, LONG_FORM_EXCERPT_WORDS).join(' ')}…`
}

export const splitLongFormParagraphs = (text: string): string[] =>
  text.split(/\n\s*\n/u).map(paragraph => paragraph.trim()).filter(Boolean)
