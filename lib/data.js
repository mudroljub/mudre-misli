import authorsData from '@/data/authors.json';
import quotesRaw from '@/data/quotes.json';

const quotesData = quotesRaw.map((q, i) => ({ _id: i + 1, ...q }));

const languages = ['sr', 'sl', 'en'];
const authors = Object.keys(authorsData || {});

const slugifyAuthor = (author) =>
  String(author)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'author';

const authorSlugs = Object.fromEntries(
  authors.map((author) => [author, slugifyAuthor(author)])
);

const authorFromSlug = Object.fromEntries(
  Object.entries(authorSlugs).map(([author, slug]) => [slug, author])
);

const getLanguagePreference = (preferred) => {
  if (languages.includes(preferred)) {
    return preferred;
  }

  return 'sl';
};

const getTextForLanguage = (quote, lang = 'sl') => {
  if (lang === 'sl' && quote.sl) {
    return quote.sl;
  }

  if (lang === 'en' && quote.en) {
    return quote.en;
  }

  return quote.sr || quote.sl || quote.en || '';
};

const quotesByLanguage = {
  sr: quotesData.filter((quote) => quote.sr),
  sl: quotesData.filter((quote) => quote.sl),
  en: quotesData.filter((quote) => quote.en || quote.sr),
};

const authorById = Object.fromEntries(
  authorsData ? Object.entries(authorsData).map(([name, meta]) => [name, meta]) : []
);

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
