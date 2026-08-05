export const quoteTypes = ['quote', 'reported', 'anecdote', 'bio'] as const;
export type QuoteType = (typeof quoteTypes)[number];

export const supportedLanguages = ['stsl', 'sr'] as const;
export type Language = (typeof supportedLanguages)[number];

export interface Quote {
  type: QuoteType;
  year?: number; // approximate year within the author's lifetime
  sr: string;
  stsl: string;
  el?: string;
  author: string;
  // Human-readable citation (author/work/book.section), intended for UI display.
  source: string;
  // Machine-readable pointer to exact source line, e.g. data/sources/.../03.txt:67.
  pointer?: string;
}

export interface QuoteWithId extends Quote {
  _id: number;
}

export interface AuthorMetadata {
  src: string;
  born: number; // Negativna vrednost označava p. n. e, pozitivna n. e.
  died: number; // Negativna vrednost označava p. n. e, pozitivna n. e.
  sr: string;
  stsl: string;
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
