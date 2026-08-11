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
  sectionOthersAbout: string;
  sectionWritings: string;
  bce: string;
  wikipedia: string;
  navHome: string;
  navPhilosophers: string;
  navDictionary: string;
  navAbout: string;
  scriptCyr: string;
  scriptLat: string;
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
    sophists: string;
    socratics: string;
    platonicAcademy: string;
    aristotelianSchool: string;
    cynics: string;
    stoics: string;
    skeptics: string;
    epicureans: string;
  };
  cities: {
    Clazomenae: string;
    Leontinoi: string;
    Abdera: string;
    Elea: string;
    Cnidus: string;
    Stagira: string;
    Eresus: string;
    Athens: string;
    Cyrene: string;
    Sinope: string;
    Priene: string;
    Samos: string;
    Colophon: string;
    Chalcedon: string;
    Acragas: string;
    Ephesus: string;
    Miletus: string;
    Syracuse: string;
    Thebes: string;
    Maroneia: string;
    Citium: string;
    Assos: string;
    Soli: string;
    Chios: string;
    Borysthenes: string;
    Elis: string;
    Phlius: string;
    Scythia: string;
    Corinth: string;
    Mytilene: string;
    Sparta: string;
    Cnossos: string;
    Eretria: string;
    Syros: string;
  };
  philosophers: {
    Anaxagoras: string;
    Gorgias: string;
    Protagoras: string;
    Leucippus: string;
    Democritus: string;
    Eudoxus: string;
    Aristotle: string;
    Theophrastus: string;
    Socrates: string;
    Xenophon: string;
    Aristippus: string;
    Antisthenes: string;
    Diogenes: string;
    Plato: string;
    'Bias of Priene': string;
    Pythagoras: string;
    Xenophanes: string;
    Xenocrates: string;
    Parmenides: string;
    'Zeno of Elea': string;
    Empedocles: string;
    Heraclitus: string;
    Thales: string;
    Anaximander: string;
    Anaximenes: string;
    Monimus: string;
    'Crates of Thebes': string;
    Metrocles: string;
    Hipparchia: string;
    'Zeno of Citium': string;
    Cleanthes: string;
    Chrysippus: string;
    'Aristo of Chios': string;
    Sphaerus: string;
    Anaxarchus: string;
    Pyrrho: string;
    'Timon of Phlius': string;
    Epicurus: string;
    Anacharsis: string;
    Pittacus: string;
    Solon: string;
    'Chilon of Sparta': string;
    Epimenides: string;
    Pherecydes: string;
    Menedemus: string;
    Cleobulus: string;
    Cleobulina: string;
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
    sectionOthersAbout: 'Споминаниꙗ',
    sectionWritings: 'Дѣла',
    bce: 'п.р.х.',
    wikipedia: 'Википєдїꙗ',
    navHome: 'Начѧло',
    navPhilosophers: 'Филосоѳи',
    navDictionary: 'Рєчьникъ',
    navAbout: 'О дѣлѣ',
    scriptCyr: 'Кѷрилица',
    scriptLat: 'Латиница',
    sidebarGroups: {
      ancientSages: 'Дрѣвьнꙗ мѫдрость',
      presocratics: 'Прѣдъ-Сократови',
      athenianPhilosophy: 'Атїньска любомѫдрость',
      hellenisticSchools: 'Єллиньскъ школꙑ',
    },
    sidebarSubgroups: {
      ionianSchool: 'Іоньска школа',
      pythagoreans: 'Піѳагорєи',
      eleatics: 'Єлєи',
      atomists: 'Атомісти',
      others: 'Инии',
      sophists: 'Софісти',
      socratics: 'Сократъ і Сократови',
      platonicAcademy: 'Платонова акадємїꙗ',
      aristotelianSchool: 'Арістотєлова школа',
      cynics: 'Кїници',
      stoics: 'Стоїци',
      skeptics: 'Скєптици',
      epicureans: 'Єпикѹрєи',
    },
    cities: {
      Clazomenae: 'Клаꙁомєнѣ',
      Leontinoi: 'Лєонтіної',
      Abdera: 'Авдєра',
      Elea: 'Єлєа',
      Cnidus: 'Кнідъ',
      Stagira: 'Стагіра',
      Eresus: 'Єрєсъ',
      Athens: 'Аѳины',
      Cyrene: 'Кірєна',
      Sinope: 'Сінопа',
      Priene: 'Прієнѣ',
      Samos: 'Самосъ',
      Colophon: 'Колофонъ',
      Chalcedon: 'Халкєдонъ',
      Acragas: 'Акрагантъ',
      Ephesus: 'Єфєсъ',
      Miletus: 'Мілєтъ',
      Syracuse: 'Сѵракѹꙁа',
      Thebes: 'Тєва',
      Maroneia: 'Маронєꙗ',
      Citium: 'Кітій',
      Assos: 'Асосъ',
      Soli: 'Солі',
      Chios: 'Хіосъ',
      Borysthenes: 'Борѵстєнъ',
      Elis: 'Єліда',
      Phlius: 'Флїѹнтъ',
      Scythia: 'Скѵѳіꙗ',
      Corinth: 'Корінѳъ',
      Mytilene: 'Мітілєна',
      Sparta: 'Спарта',
      Cnossos: 'Кносъ',
      Eretria: 'Єрєтріꙗ',
      Syros: 'Сѵросъ',
    },
    philosophers: {
      Anaxagoras: 'Анаѯагоръ',
      Gorgias: 'Горгїꙗ',
      Protagoras: 'Прѡтагѡръ',
      Leucippus: 'Леѹкипъ',
      Democritus: 'Дємокрітъ',
      Eudoxus: 'Еѹдоѯъ',
      Aristotle: 'Арістотєль',
      Theophrastus: 'Тєѡфрастъ',
      Socrates: 'Сѡкратъ',
      Xenophon: 'Ѯєнофѡнъ',
      Aristippus: 'Аристипъ',
      Antisthenes: 'Антисѳенъ',
      Diogenes: 'Диогенъ отъ Синопы',
      Plato: 'Платѡнъ',
      'Bias of Priene': 'Биѩнтъ',
      Pythagoras: 'Піѳагоръ',
      Xenophanes: 'Ѯєнофанъ',
      Xenocrates: 'Ѯєнократъ',
      Parmenides: 'Парменидъ',
      'Zeno of Elea': 'Зєнонъ отъ Єлеи',
      Empedocles: 'Емпєдоклъ',
      Heraclitus: 'Хєраклитъ',
      Thales: 'Ѳалєсъ',
      Anaximander: 'Анаѯимандръ',
      Anaximenes: 'Анаѯименъ',
      Monimus: 'Мѡнімѡсъ',
      'Crates of Thebes': 'Кратєтъ отъ Тєвъ',
      Metrocles: 'Мєтроклъ',
      Hipparchia: 'Хіпархїꙗ',
      'Zeno of Citium': 'Зєнонъ отъ Китїꙗ',
      Cleanthes: 'Клєанѳъ',
      Chrysippus: 'Хрісіпъ',
      'Aristo of Chios': 'Арістонъ отъ Хїа',
      Sphaerus: 'Сфєръ',
      Anaxarchus: 'Анаѯархъ',
      Pyrrho: 'Пѵронъ',
      'Timon of Phlius': 'Тімонъ отъ Флїѹнта',
      Epicurus: 'Епікѹръ',
      Anacharsis: 'Анахарсісъ',
      Pittacus: 'Піттакъ',
      Solon: 'Солонъ',
      'Chilon of Sparta': 'Хїлонъ',
      Epimenides: 'Епімєнідъ',
      Pherecydes: 'Фєрєкідъ',
      Menedemus: 'Мєнєдємъ',
      Cleobulus: 'Клєовѹлъ',
      Cleobulina: 'Клєовѹліна',
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
    sectionOthersAbout: 'Spominjanja',
    sectionWritings: 'Dela',
    bce: 'p.n.e.',
    wikipedia: 'Vikipedija',
    navHome: 'Početna',
    navPhilosophers: 'Filozofi',
    navDictionary: 'Rečnik',
    navAbout: 'O projektu',
    scriptCyr: 'Ћирилица',
    scriptLat: 'Latinica',
    sidebarGroups: {
      ancientSages: 'Drevna mudrost',
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
      sophists: 'Sofisti',
      socratics: 'Sokrat i sokratovci',
      platonicAcademy: 'Platonova akademija',
      aristotelianSchool: 'Aristotelova škola',
      cynics: 'Kinici',
      stoics: 'Stoici',
      skeptics: 'Skeptici',
      epicureans: 'Epikurejci',
    },
    cities: {
      Clazomenae: 'Klazomene',
      Leontinoi: 'Leontinoj',
      Abdera: 'Abdera',
      Elea: 'Eleja',
      Cnidus: 'Knid',
      Stagira: 'Stagira',
      Eresus: 'Eres',
      Athens: 'Atina',
      Cyrene: 'Kirena',
      Sinope: 'Sinopa',
      Priene: 'Prijene',
      Samos: 'Samos',
      Colophon: 'Kolofon',
      Chalcedon: 'Halkedon',
      Acragas: 'Akragant',
      Ephesus: 'Efes',
      Miletus: 'Milet',
      Syracuse: 'Sirakuza',
      Thebes: 'Teba',
      Maroneia: 'Maroneja',
      Citium: 'Kitij',
      Assos: 'Asos',
      Soli: 'Soli',
      Chios: 'Hios',
      Borysthenes: 'Boristen',
      Elis: 'Elida',
      Phlius: 'Flijunt',
      Scythia: 'Skitija',
      Corinth: 'Korint',
      Mytilene: 'Mitilena',
      Sparta: 'Sparta',
      Cnossos: 'Knosos',
      Eretria: 'Eretrija',
      Syros: 'Siros',
    },
    philosophers: {
      Anaxagoras: 'Anaksagora',
      Gorgias: 'Gorgija',
      Protagoras: 'Protagora',
      Leucippus: 'Leukip',
      Democritus: 'Demokrit',
      Eudoxus: 'Eudoks',
      Aristotle: 'Aristotel',
      Theophrastus: 'Teofrast',
      Socrates: 'Sokrat',
      Xenophon: 'Ksenofont',
      Aristippus: 'Aristip',
      Antisthenes: 'Antisten',
      Diogenes: 'Diogen iz Sinope',
      Plato: 'Platon',
      'Bias of Priene': 'Bijant',
      Pythagoras: 'Pitagora',
      Xenophanes: 'Ksenofan',
      Xenocrates: 'Ksenokrat',
      Parmenides: 'Parmenid',
      'Zeno of Elea': 'Zenon iz Eleje',
      Empedocles: 'Empedoklo',
      Heraclitus: 'Heraklit',
      Thales: 'Tales',
      Anaximander: 'Anaksimander',
      Anaximenes: 'Anaksimen',
      Monimus: 'Monimos',
      'Crates of Thebes': 'Kratet iz Tebe',
      Metrocles: 'Metrokle',
      Hipparchia: 'Hiparhija',
      'Zeno of Citium': 'Zenon iz Kitijuma',
      Cleanthes: 'Kleant',
      Chrysippus: 'Hrizip',
      'Aristo of Chios': 'Aristo iz Hija',
      Sphaerus: 'Sfer',
      Anaxarchus: 'Anaksarh',
      Pyrrho: 'Piron',
      'Timon of Phlius': 'Timon iz Flija',
      Epicurus: 'Epikur',
      Anacharsis: 'Anaharsis',
      Pittacus: 'Pitak',
      Solon: 'Solon',
      'Chilon of Sparta': 'Hilon',
      Epimenides: 'Epimenid',
      Pherecydes: 'Ferekid',
      Menedemus: 'Menedém',
      Cleobulus: 'Kleobul',
      Cleobulina: 'Kleobulina',
    },
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language];
}
