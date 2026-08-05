import type { Language } from '../types/data';

export interface Translations {
  siteTitle: string;
  randomQuote: string;
  quoteDetails: string;
  source: string;
  backToHome: string;
  viewAllQuotes: string;
  quotesBy: string;
  pageNotFound: string;
  pageNotFoundMessage: string;
  returnHome: string;
  openQuote: string;
  sectionQuotes: string;
  sectionLife: string;
}

export const translations: Record<Language, Translations> = {
  stsl: {
    siteTitle: 'Мѫдрыѩ мысли',
    randomQuote: 'Слѹчаиноє изрѣчєніє',
    quoteDetails: 'О изрѣчєніи',
    source: 'Источьникъ',
    backToHome: 'Въ начѧло',
    viewAllQuotes: 'Вьсѧ изрѣчєніꙗ',
    quotesBy: 'Изрѣчєніꙗ',
    pageNotFound: 'Страница не обрѣтєна',
    pageNotFoundMessage: 'Страница, ѭже ищєши, не обрѣтаєть сѧ.',
    returnHome: 'Въспѧть въ начѧло',
    openQuote: 'Виждь источьникъ',
    sectionQuotes: 'Изрѣчєніꙗ',
    sectionLife: 'Житіє',
  },
  sr: {
    siteTitle: 'Mudre misli',
    randomQuote: 'Slučajni citat',
    quoteDetails: 'Detalji citata',
    source: 'Izvor',
    backToHome: 'Početna',
    viewAllQuotes: 'Svi citati',
    quotesBy: 'Citati od',
    pageNotFound: 'Stranica nije pronađena',
    pageNotFoundMessage: 'Stranica koju tražite ne postoji.',
    returnHome: 'Povratak na početnu',
    openQuote: 'Vidi izvornik',
    sectionQuotes: 'Izreke',
    sectionLife: 'Život',
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language];
}
