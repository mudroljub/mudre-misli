/**
 * Supported entry types.
 */
export const entryTypes = [
  "quote", /* Direktne reči autora, bez pripovedačkog okvira */
  "reported", /* Autorova izreka, odgovor ili mišljenje preneto posredno (npr. "govorio je", "upitan je odgovorio", "rekao je da") */
  "bio", /* Podatak o životu autora (rođen, radio, živeo, umro...); uključuje i ono što drugi izvori tvrde o autoru */
  "anecdote", /* Poučna ili zabavna epizoda iz života, ako je običan podatak onda bio */
  "works", /* Pominjanje, opis ili nabrajanje dela koja je autor napisao */
  "letter", /* Celo pismo ili duži odlomak pisma */
  "mention", /* Pominjanje, kritika, pohvala filozofa i slično, često nakon smrti */
] as const

/**
 * Supported UI languages.
 */
export const supportedLanguages = ["stsl", "sr"] as const
export type Language = (typeof supportedLanguages)[number]

/**
 * Source reference object.
 */
export interface SourceReference {
  /** Source key (e.g. "diogenes-laertius", "hermann-diels") */
  name: string

  /** Reference within the source (e.g. "II.21", "B.8") */
  reference: string | null

  /** Machine-readable pointer to the exact source location */
  pointer?: string
}

/**
 * Textual variant from an alternative source.
 */
export interface TextVariant {
  /** Source name for this variant (must match a name in sources array) */
  source: string

  /** Alternative Greek/Latin text */
  text: string

  /** Brief description of difference (optional) */
  diff?: string

  /** Additional note about this variant (optional) */
  note?: string
}

/**
 * Common fields shared by all entries.
 */
interface BaseEntry {
  /** Stable identifier stored in the source entry */
  id: string

  /** Unique entry identifier */
  _id: number

  /** Optional override for automatic card/reader presentation */
  display?: "card" | "reader"

  /** Modern Serbian translation */
  sr: string

  /** Old Church Slavonic translation */
  stsl: string

  /** Original Greek or Latin text (from primary source - sources[0]) */
  originalText: string

  /** Philosopher(s) to whom the entry belongs. Multiple authors for shared entries (e.g., teacher-student relationships). */
  author: string | string[]

  /** Array of source references (primary source is first) */
  sources: SourceReference[]

  /** Machine-readable pointer to the primary source location (from sources[0]) */
  pointer?: string

  /** Textual variants from alternative sources (only if text differs) */
  textVariants?: TextVariant[]

  /** Philosophical terms detected in originalText (Greek terms in nominative form) */
  tags?: string[]

}

/**
 * Biographical event or dated anecdote.
 */
export interface LifeEvent extends BaseEntry {
  type: "bio" | "anecdote"

  /** Year of the event (negative = BCE, positive = CE) */
  year: number
}

/**
 * Direct quotation or reported teaching.
 */
export interface Saying extends BaseEntry {
  type: "quote" | "reported"
}

/**
 * Written work (book, treatise, poem).
 */
export interface Writing extends BaseEntry {
  type: "works"
}

/**
 * Letter attributed to a philosopher.
 */
export interface Letter extends BaseEntry {
  type: "letter"
}

export interface Mention extends BaseEntry {
  type: "mention"
}

export type Entry = LifeEvent | Saying | Writing | Letter | Mention

/**
 * Data about a philosopher.
 */
export interface AuthorData {
  /** Year of birth (negative = BCE, positive = CE) */
  born: number

  /** Year of death (negative = BCE, positive = CE) */
  died: number

  /** Portrait URL */
  src?: string

  /** Ancient birthplace */
  birthplace?: string

  /** Name in the original language */
  originalText: string
}

export type AuthorsData = Record<string, AuthorData>

export interface PlaceCoordinates {
  lat: number
  long: number
}

export type PlacesData = Record<string, PlaceCoordinates>

export type EntriesByLanguage = Record<Language, Entry[]>

export interface SourceData {
  author: string
  language: string
  originalTitle: string
  stsl: string
  sr: string
}
