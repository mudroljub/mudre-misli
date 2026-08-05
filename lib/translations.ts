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
  sidebarGroups: {
    ancientSages: string;
    presocratics: string;
    athenianPhilosophy: string;
    hellenisticSchools: string;
  };
  sidebarSubgroups: {
    ionianSchool: string;
    pythagoreans: string;
    eleatics: string;
    atomists: string;
    others: string;
    socratics: string;
    platonicAcademy: string;
    aristotelianSchool: string;
    cynics: string;
    stoics: string;
    skeptics: string;
    epicureans: string;
  };
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
    sidebarGroups: {
      ancientSages: 'Дрєвьнїи мѫдрьци',
      presocratics: 'Прєдсократовци',
      athenianPhilosophy: 'Атїньска любомѫдрость',
      hellenisticSchools: 'Хєлєністьскꙑꙗ школꙑ',
    },
    sidebarSubgroups: {
      ionianSchool: 'Їоньска школа',
      pythagoreans: 'Піѳагорєїци',
      eleatics: 'Єлєатици',
      atomists: 'Атомісти',
      others: 'Іньни',
      socratics: 'Сократъ і сократовци',
      platonicAcademy: 'Платонова акадємїꙗ',
      aristotelianSchool: 'Арістотєлова школа',
      cynics: 'Кїници',
      stoics: 'Стоїци',
      skeptics: 'Скєптици',
      epicureans: 'Єпікѹрєїци',
    },
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
    sidebarGroups: {
      ancientSages: 'Drevni mudraci',
      presocratics: 'Predsokratovci',
      athenianPhilosophy: 'Atinska filozofija',
      hellenisticSchools: 'Helenističke škole',
    },
    sidebarSubgroups: {
      ionianSchool: 'Jonska škola',
      pythagoreans: 'Pitagorejci',
      eleatics: 'Elejci',
      atomists: 'Atomisti',
      others: 'Ostali',
      socratics: 'Sokrat i sokratovci',
      platonicAcademy: 'Platonova akademija',
      aristotelianSchool: 'Aristotelova škola',
      cynics: 'Kinici',
      stoics: 'Stoici',
      skeptics: 'Skeptici',
      epicureans: 'Epikurejci',
    },
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language];
}
