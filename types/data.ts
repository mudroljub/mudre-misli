export const entryTypes = ['quote', 'anecdote'] as const;
export type EntryType = (typeof entryTypes)[number];

export const supportedLanguages = ['sl', 'sr', 'en'] as const;
export type Language = (typeof supportedLanguages)[number];

export interface Quote {
  type: EntryType;
  sr: string;
  sl: string;
  en?: string;
  author: string;
  source: string;
}

export interface QuoteWithId extends Quote {
  _id: number;
}

// Negativna vrednost označava p. n. e, pozitivna n. e.
export interface BirthDate {
  year: number;
  approximate: boolean;
}

export interface AuthorMetadata {
  src: string;
  born: BirthDate;
}

export type AuthorsData = Record<string, AuthorMetadata>;
export type QuotesByLanguage = Record<Language, QuoteWithId[]>;
