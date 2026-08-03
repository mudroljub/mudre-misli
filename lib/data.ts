import authorsRaw from '../data/authors.json';
import quotesRaw from '../data/quotes.json';
import {
  entryTypes,
  supportedLanguages,
  type AuthorsData,
  type Language,
  type QuotesByLanguage,
  type WisdomEntry,
  type WisdomEntryInput,
} from '../types/data';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

function assertWisdomEntryInput(value: unknown): asserts value is WisdomEntryInput {
  if (!isRecord(value)) {
    throw new TypeError('Svaki zapis mora biti objekat.');
  }

  if (!entryTypes.includes(value.type as WisdomEntryInput['type'])) {
    throw new TypeError(`Nepoznata vrsta zapisa: ${String(value.type)}`);
  }

  for (const field of ['sr', 'sl', 'author', 'source'] as const) {
    if (typeof value[field] !== 'string') {
      throw new TypeError(`Polje "${field}" mora biti tekst.`);
    }
  }

  if (value.en !== undefined && typeof value.en !== 'string') {
    throw new TypeError('Polje "en" mora biti tekst kada postoji.');
  }
}

function assertAuthorsData(value: unknown): asserts value is AuthorsData {
  if (!isRecord(value)) {
    throw new TypeError('Podaci o autorima moraju biti objekat.');
  }

  for (const [author, metadata] of Object.entries(value)) {
    if (!isRecord(metadata) || typeof metadata.src !== 'string' || metadata.src.length === 0) {
      throw new TypeError(`Autor "${author}" mora imati izvor slike.`);
    }

  }
}

assertAuthorsData(authorsRaw);

const authorsData: AuthorsData = authorsRaw;
const quotesData: WisdomEntry[] = quotesRaw.map((entry, index) => {
  assertWisdomEntryInput(entry);
  return { _id: index + 1, ...entry };
});

const languages = supportedLanguages;
const authors = Object.keys(authorsData);

const slugifyAuthor = (author: string): string =>
  author
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'author';

const authorSlugs: Record<string, string> = Object.fromEntries(
  authors.map((author) => [author, slugifyAuthor(author)])
);

const authorFromSlug: Record<string, string> = Object.fromEntries(
  Object.entries(authorSlugs).map(([author, slug]) => [slug, author])
);

const getLanguagePreference = (preferred: string): Language =>
  languages.includes(preferred as Language) ? (preferred as Language) : 'sl';

const getTextForLanguage = (entry: WisdomEntry, language: Language = 'sl'): string => {
  if (language === 'sl' && entry.sl) {
    return entry.sl;
  }

  if (language === 'en' && entry.en) {
    return entry.en;
  }

  return entry.sr || entry.sl || entry.en || '';
};

const quotesByLanguage: QuotesByLanguage = {
  sr: quotesData.filter((entry) => entry.sr),
  sl: quotesData.filter((entry) => entry.sl),
  en: quotesData.filter((entry) => entry.en || entry.sr),
};

const authorById: AuthorsData = { ...authorsData };

export {
  authorsData,
  authorById,
  quotesData,
  quotesByLanguage,
  authors,
  languages,
  authorSlugs,
  authorFromSlug,
  getLanguagePreference,
  getTextForLanguage,
  slugifyAuthor,
};
