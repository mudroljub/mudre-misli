import authorsRaw from '../data/authors.json';
import placesRaw from '../data/places.json';
import sourcesRaw from '../data/sources.json';
import {
  supportedLanguages,
  type AuthorsData,
  type PlacesData,
  type Language,
  type Entry,
  type SourceData,
  type SourceReference,
} from '../types/data';
import { getTranslation } from './translations';

const sourcesData: Record<string, SourceData> = sourcesRaw;
const authorsData: AuthorsData = authorsRaw;
const placesData: PlacesData = placesRaw;
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

const getTextForLanguage = (entry: Pick<Entry, 'sr' | 'stsl'>, language: Language = 'stsl'): string => {
  if (language === 'stsl' && entry.stsl) {
    return entry.stsl;
  }

  return entry.sr || '';
};

const getAuthorName = (author: string, language: Language = 'stsl'): string => {
  const t = getTranslation(language);
  return t.philosophers[author as keyof typeof t.philosophers] || author;
};

const getSourceName = (source: string, language: Language = 'stsl'): string => {
  const metadata = sourcesData[source];
  if (!metadata) return source;
  return language === 'stsl' ? metadata.stsl : metadata.sr;
};

const getSourceOriginalTitle = (source: string): string =>
  sourcesData[source]?.originalTitle || source;

const getSourceAuthor = (source: string): string =>
  sourcesData[source]?.author || '';

const getSourceCitation = (source: SourceReference, language: Language): string =>
  [getSourceAuthor(source.name), getSourceName(source.name, language), source.reference]
    .filter(Boolean)
    .join(', ');

const authorById: AuthorsData = { ...authorsData };

export {
  authorsData,
  placesData,
  authorById,
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
  getSourceOriginalTitle,
  getSourceAuthor,
  getSourceCitation,
};
