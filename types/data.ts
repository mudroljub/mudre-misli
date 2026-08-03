export const entryTypes = ['quote', 'anecdote'] as const;
export type EntryType = (typeof entryTypes)[number];

export const supportedLanguages = ['sl', 'sr', 'en'] as const;
export type Language = (typeof supportedLanguages)[number];

export interface WisdomEntryInput {
  type: EntryType;
  sr: string;
  sl: string;
  en?: string;
  author: string;
  source: string;
}

export interface WisdomEntry extends WisdomEntryInput {
  _id: number;
}

// Negativna vrednost označava p. n. e, nula graničnu godinu, a pozitivna n. e.
export type HistoricalYear = number;

export interface BirthDate {
  year: HistoricalYear;
  approximate: boolean;
}

export interface AuthorMetadata {
  src: string;
  born: BirthDate;
}

export type AuthorsData = Record<string, AuthorMetadata>;
export type QuotesByLanguage = Record<Language, WisdomEntry[]>;
