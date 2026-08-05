/**
 * Valid quote/anecdote types:
 * - quote: direktan citat filozofa
 * - anecdote: kratka zgoda sa poentom, često duhovita ili karakteristična
 * - bio: običan biografski podatak
 *
 * Note: 'reported' is deprecated and should not be used. Use 'quote' with
 * indirect speech in the text instead.
 */
export const quoteTypes = ['quote', 'reported', 'anecdote', 'bio'] as const;
export type QuoteType = (typeof quoteTypes)[number];

/**
 * Supported display languages:
 * - stsl: staroslovenski
 * - sr: savremeni srpski
 *
 * Note: Greek (el) is stored but not included as a display language.
 */
export const supportedLanguages = ['stsl', 'sr'] as const;
export type Language = (typeof supportedLanguages)[number];

/**
 * A quote, anecdote, or biographical note from a philosophical source.
 *
 * All entries must have both Serbian (sr) and Old Church Slavonic (stsl) translations.
 * Greek text (el) is required when available in the source material.
 */
export interface Quote {
  /** Type of entry (see QuoteType documentation above) */
  type: QuoteType;

  /** Approximate year of the event or statement (negative = BCE, positive = CE) */
  year?: number;

  /** Modern Serbian translation (required) */
  sr: string;

  /** Old Church Slavonic translation (required) */
  stsl: string;

  /** Greek original from source (required when available in source) */
  el?: string;

  /** Philosopher to whom the quote/anecdote belongs */
  author: string;

  /** Source key identifier (e.g., "diogenes-laertius", "aristotle-metaphysics") */
  source: string;

  /** Reference within the source (e.g., "II.21", "VI.40", "Book I, Chapter 3") */
  reference: string;

  /** Machine-readable pointer to exact source line, e.g. data/sources/.../03.txt:67 */
  pointer?: string;
}

export interface QuoteWithId extends Quote {
  _id: number;
}

/**
 * Metadata about a philosopher/author.
 *
 * All fields are required. Years use negative numbers for BCE, positive for CE.
 */
export interface AuthorMetadata {
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

export type AuthorsData = Record<string, AuthorMetadata>;
export type QuotesByLanguage = Record<Language, QuoteWithId[]>;

export type SourceData = {
  language: string;
  originalTitle: string;
  stsl: string;
  sr: string;
};
