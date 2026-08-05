import type { Language } from '../types/data';

export interface Translations {
  siteTitle: string;
  randomQuote: string;
  quoteDetails: string;
  source: string;
  returnToAuthor: string;
  pageNotFound: string;
  pageNotFoundMessage: string;
  goHome: string;
  viewSource: string;
  sectionQuotes: string;
  sectionLife: string;
}

export const translations: Record<Language, Translations> = {
  stsl: {
    siteTitle: 'Мѫдрыѩ мысли',
    randomQuote: 'Слѹчаиноє изрѣчєніє',
    quoteDetails: 'О изрѣчєніи',
    source: 'Источьникъ',
    returnToAuthor: 'Въспѧть къ любомѫдрьцю',
    pageNotFound: 'Страница не обрѣтєна',
    pageNotFoundMessage: 'Страница, ѭже ищєши, не обрѣтаєть сѧ.',
    goHome: 'Въ начѧло',
    viewSource: 'Виждь источьникъ',
    sectionQuotes: 'Изрѣчєніꙗ',
    sectionLife: 'Житіє',
  },
  sr: {
    siteTitle: 'Mudre misli',
    randomQuote: 'Slučajni citat',
    quoteDetails: 'Detalji citata',
    source: 'Izvor',
    returnToAuthor: 'Nazad filozofu',
    pageNotFound: 'Stranica nije pronađena',
    pageNotFoundMessage: 'Stranica koju tražite ne postoji.',
    goHome: 'Početna',
    viewSource: 'Vidi izvornik',
    sectionQuotes: 'Izreke',
    sectionLife: 'Život',
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language];
}
