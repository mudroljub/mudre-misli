import type { Language } from '../types/data';

export interface Translations {
  siteTitle: string;
  randomQuote: string;
  quoteDetails: string;
  source: string;
  gotoAuthor: string;
  pageNotFound: string;
  pageNotFoundMessage: string;
  goHome: string;
  sectionQuotes: string;
  sectionLife: string;
  bce: string;
}

export const translations: Record<Language, Translations> = {
  stsl: {
    siteTitle: 'Мѫдрыѩ мысли',
    randomQuote: 'Слѹчаиноє изрѣчєніє',
    quoteDetails: 'О изрѣчєніи',
    source: 'Источьникъ',
    gotoAuthor: 'Kъ любомѫдрьцю',
    pageNotFound: 'Страница не обрѣтєна',
    pageNotFoundMessage: 'Страница, ѭже ищєши, не обрѣтаєть сѧ.',
    goHome: 'Въ начѧло',
    sectionQuotes: 'Изрѣчєніꙗ',
    sectionLife: 'Житіє',
    bce: 'п.н.є.',
  },
  sr: {
    siteTitle: 'Mudre misli',
    randomQuote: 'Slučajni citat',
    quoteDetails: 'Detalji citata',
    source: 'Izvor',
    gotoAuthor: 'K filozofu',
    pageNotFound: 'Stranica nije pronađena',
    pageNotFoundMessage: 'Stranica koju tražite ne postoji.',
    goHome: 'Početna',
    sectionQuotes: 'Izreke',
    sectionLife: 'Život',
    bce: 'p.n.e.',
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language];
}
