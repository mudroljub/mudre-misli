export const entryTypes = ['quote', 'reported', 'anecdote', 'bio'] as const;
export type EntryType = (typeof entryTypes)[number];

export const supportedLanguages = ['stsl', 'sr', 'el'] as const;
export type Language = (typeof supportedLanguages)[number];

export interface Quote {
  type: EntryType;
  sr: string;
  stsl: string;
  el?: string;
  author: string;
  source: string;
}

export interface QuoteWithId extends Quote {
  _id: number;
}

export interface AuthorMetadata {
  src: string;
  born: number; // Negativna vrednost označava p. n. e, pozitivna n. e.
}

export type AuthorsData = Record<string, AuthorMetadata>;
export type QuotesByLanguage = Record<Language, QuoteWithId[]>;
