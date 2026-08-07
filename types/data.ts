/**
 * Supported entry types.
 */
export const entryTypes = ["quote", "reported", "anecdote", "bio"] as const;

/**
 * Supported UI languages.
 */
export const supportedLanguages = ["stsl", "sr"] as const;
export type Language = (typeof supportedLanguages)[number];

/**
 * Source reference object.
 */
export interface SourceReference {
  /** Source key (e.g. "diogenes-laertius", "hermann-diels") */
  name: string;

  /** Reference within the source (e.g. "II.21", "B.8") */
  reference: string | null;

  /** Machine-readable pointer to the exact source location */
  pointer?: string;
}

/**
 * Common fields shared by all entries.
 */
interface BaseEntry {
  /** Unique entry identifier */
  _id: number;

  /** Modern Serbian translation */
  sr: string;

  /** Old Church Slavonic translation */
  stsl: string;

  /** Original Greek or Latin text */
  originalText: string;

  /** Philosopher(s) to whom the entry belongs. Multiple authors for shared entries (e.g., teacher-student relationships). */
  author: string | string[];

  /** Array of source references (primary source is first) */
  sources: SourceReference[];

  /** Machine-readable pointer to the primary source location (from sources[0]) */
  pointer?: string;
}

/**
 * Biographical event or dated anecdote.
 */
export interface LifeEvent extends BaseEntry {
  type: "bio" | "anecdote";

  /** Year of the event (negative = BCE, positive = CE) */
  year: number;
}

/**
 * Direct quotation or reported teaching.
 */
export interface Saying extends BaseEntry {
  type: "quote" | "reported";
}

/**
 * Any entry in the database.
 */
export type Entry = LifeEvent | Saying;

/**
 * Data about a philosopher.
 */
export interface AuthorData {
  /** Year of birth (negative = BCE, positive = CE) */
  born: number;

  /** Year of death (negative = BCE, positive = CE) */
  died: number;

  /** Portrait URL */
  src?: string;

  /** Ancient birthplace */
  birthplace?: string;

  /** Name in the original language */
  originalText: string;
}

export type AuthorsData = Record<string, AuthorData>;
export type EntriesByLanguage = Record<Language, Entry[]>;

export interface SourceData {
  language: string;
  originalTitle: string;
  stsl: string;
  sr: string;
}