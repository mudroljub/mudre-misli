export const entryTypes = ['quote', 'anecdote'] as const;
export type EntryType = (typeof entryTypes)[number];

export const supportedLanguages = ['sr', 'sl', 'en'] as const;
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

export interface AuthorMetadata {
  src: string;
}

export type AuthorsData = Record<string, AuthorMetadata>;
export type QuotesByLanguage = Record<Language, WisdomEntry[]>;
