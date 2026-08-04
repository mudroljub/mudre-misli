import authorsRaw from '../data/authors.json';
import quotes from '../data/quotes.json';
import {
  supportedLanguages,
  type AuthorsData,
  type Language,
  type QuotesByLanguage,
  type QuoteWithId,
  type Quote,
} from '../types/data';

const authorsData: AuthorsData = authorsRaw;
const quoteInputs = quotes as Quote[];
const quotesData: QuoteWithId[] = quoteInputs.map((entry, index) => ({
  _id: index + 1,
  ...entry,
}));

const languages = supportedLanguages;
const authors = Object.keys(authorsData).sort((left, right) => {
  const yearDifference = authorsData[left].born - authorsData[right].born;
  return yearDifference || left.localeCompare(right, 'sr');
});

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
  languages.includes(preferred as Language) ? (preferred as Language) : 'stsl';

const getTextForLanguage = (entry: QuoteWithId, language: Language = 'stsl'): string => {
  if (language === 'stsl' && entry.stsl) {
    return entry.stsl;
  }

  if (language === 'en' && entry.en) {
    return entry.en;
  }

  return entry.sr || entry.stsl || entry.en || '';
};

const quotesByLanguage: QuotesByLanguage = {
  sr: quotesData.filter((entry) => entry.sr),
  stsl: quotesData.filter((entry) => entry.stsl),
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
