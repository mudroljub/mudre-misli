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
  noQuotesForAuthor: string;
  openQuote: string;
  sectionQuotes: string;
  sectionAnecdotes: string;
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
    noQuotesForAuthor: 'Нѣсть изрѣчєніи сєго любомѫдрьца.',
    openQuote: 'Отъврьзи изрѣчєніє',
    sectionQuotes: 'Изрѣчєніꙗ',
    sectionAnecdotes: 'Житіє',
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
    noQuotesForAuthor: 'Nema citata za ovog autora.',
    openQuote: 'Otvori citat',
    sectionQuotes: 'Izreke',
    sectionAnecdotes: 'Život',
  },
  el: {
    siteTitle: 'Σοφαὶ γνῶμαι',
    randomQuote: 'Τυχαῖα ρῆσις',
    quoteDetails: 'Λεπτομέρειες ρήσεως',
    source: 'Πηγή',
    backToHome: 'Ἀρχική',
    viewAllQuotes: 'Πᾶσαι ρήσεις',
    quotesBy: 'Ρήσεις ὑπό',
    pageNotFound: 'Σελὶς οὐχ εὑρέθη',
    pageNotFoundMessage: 'Ἡ σελὶς ἣν ζητεῖς οὐκ ὑπάρχει.',
    returnHome: 'Ἐπιστροφὴ εἰς ἀρχήν',
    noQuotesForAuthor: 'Οὐκ εἰσὶ ρήσεις τοῦ συγγραφέως.',
    openQuote: 'Ἄνοιξον ρῆσιν',
    sectionQuotes: 'Γνῶμαι',
    sectionAnecdotes: 'Βίος',
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language];
}
