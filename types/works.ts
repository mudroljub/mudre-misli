import type { Language } from './data'

export type WorkKind = 'dialogue' | 'treatise' | 'letter' | 'handbook' | 'collection' | 'poem'
export type CitationScheme = 'stephanus' | 'book-chapter' | 'section'

export interface LocalizedText {
  sr: string
  stsl: string
}

export interface WorkSection {
  anchor: string
  file: string
  title?: LocalizedText
}

export interface WorkSource {
  name: string
  work?: string
  reference?: string
}

export interface WorkOriginal {
  text: string
  pointer: string
}

export interface Work {
  id: string
  slug: string
  author: string
  kind: WorkKind
  title: LocalizedText
  originalTitle: string
  source: WorkSource
  citationScheme: CitationScheme
  sections: WorkSection[]
  directory: string
}

export const getLocalizedWorkText = (value: LocalizedText, language: Language): string =>
  value[language] || value.sr
