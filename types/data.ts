/**
 * Valid entry types:
 * - quote: direktan citat filozofa
 * - reported: prepričana izreka ili učenje
 * - anecdote: kratka zgoda sa poentom, često duhovita ili karakteristična
 * - bio: običan biografski podatak
 */
export const entryTypes = ['quote', 'reported', 'anecdote', 'bio'] as const;
export type EntryType = (typeof entryTypes)[number];

/**
 * Supported UI languages:
 * - stsl: staroslovenski
 * - sr: savremeni srpski
 */
export const supportedLanguages = ['stsl', 'sr'] as const;
export type Language = (typeof supportedLanguages)[number];

/**
 * Common fields shared by all entry types.
 */
interface BaseEntry {
    _id: number;

  /** Modern Serbian translation (required) */
  sr: string;

  /** Old Slavic/Slavonic translation (required) */
  stsl: string;

  /** Original text in Greek or Latin (required) */
  originalText: string;

  /** Philosopher to whom the entry belongs */
  author: string;

  /** Source key identifier (e.g., "diogenes-laertius", "aristotle-metaphysics") */
  source: string;

  /** Reference within the source (e.g., "II.21", "VI.40", "Book I, Chapter 3") */
  reference: string;

  /** Machine-readable pointer to exact source line, e.g. data/sources/.../03.txt:67 */
  pointer?: string;
}

/**
 * Biographical entry or anecdote.
 * Anecdotes are dated stories about the philosopher.
 */
interface LifeEvent extends BaseEntry {
  type: 'bio' | 'anecdote';
  /** Year of the event (negative = BCE, positive = CE) - required */
  year: number;
}

/**
 * Quote or reported statement.
 */
interface Saying extends BaseEntry {
  type: 'quote' | 'reported';
}

export type Entry = LifeEvent | Saying;

/**
 * Data about a philosopher/author.
 *
 * Years use negative numbers for BCE, positive for CE.
 */
export interface AuthorData {
  /** URL to portrait image (preferably from Wikimedia Commons) */
  src: string;

  /** Year of birth (negative = BCE, positive = CE) */
  born: number;

  /** Year of death (negative = BCE, positive = CE) */
  died: number;

  /** Name in modern Serbian */
  sr: string;

  /** Name in Old Church Slavonic */
  stsl: string;

  /** Name in ancient Greek */
  el: string;
}

export type AuthorsData = Record<string, AuthorData>;
export type EntriesByLanguage = Record<Language, Entry[]>;

export type SourceData = {
  language: string;
  originalTitle: string;
  stsl: string;
  sr: string;
};
