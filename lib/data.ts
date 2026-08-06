import authorsRaw from '../data/authors.json';
import quotes from '../data/quotes.json';
import {
  supportedLanguages,
  type AuthorsData,
  type Language,
  type EntriesByLanguage,
  type Entry,
  SourceData,
} from '../types/data';
import sourcesRaw from '../data/sources.json';
import { getTranslation } from './translations';

const sourcesData: Record<string, SourceData> = sourcesRaw;

const authorsData: AuthorsData = authorsRaw;
const quotesData: Entry[] = quotes as Entry[];

const languages = supportedLanguages;
const authors = Object.keys(authorsData).sort((left, right) => {
  const yearDifference = authorsData[left].born - authorsData[right].born;
  return yearDifference || left.localeCompare(right, 'sr');
});

const slugifyAuthor = (author: string): string =>
  author
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
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

const getTextForLanguage = (entry: Entry, language: Language = 'stsl'): string => {
  if (language === 'stsl' && entry.stsl) {
    return entry.stsl;
  }

  return entry.sr || '';
};

const getAuthorName = (author: string, language: Language = 'stsl'): string => {
  const t = getTranslation(language);
  return t.philosophers[author as keyof typeof t.philosophers] || author;
};

const getSourceName = (
  source: string,
  language: Language = 'stsl'
): string => {
  const metadata = sourcesData[source];

  if (!metadata) {
    return source;
  }

  return language === 'stsl'
    ? metadata.stsl
    : metadata.sr;
};

const quotesByLanguage: EntriesByLanguage = {
  sr: quotesData.filter((entry) => entry.sr),
  stsl: quotesData.filter((entry) => entry.stsl),
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
  getAuthorName,
  slugifyAuthor,
  sourcesData,
  getSourceName,
};
