import type { Language } from '../types/data';

export interface Translations {
  siteTitle: string;
  randomQuote: string;
  quoteDetails: string;
  source: string;
  readFull: string;
  contents: string;
  gotoAuthor: string;
  pageNotFound: string;
  pageNotFoundMessage: string;
  goHome: string;
  sectionQuotes: string;
  sectionLife: string;
  sectionOthersAbout: string;
  sectionWritings: string;
  sectionLetters: string;
  showMore: string;
  showLess: string;
  bce: string;
  wikipedia: string;
  navHome: string;
  navPhilosophers: string;
  navDictionary: string;
  dictionaryTitle: string;
  navWorks: string;
  navAbout: string;
  workUi: {
    allWorks: string;
    openWork: string;
    previousSection: string;
    nextSection: string;
  };
  about: {
    intro: string;
    schoolImageAlt: string;
    schoolCaption: string;
    balatongrad: string;
    mapImageAlt: string;
    mapCaption: string;
    tradition: string;
    cyrilMethodiusImageAlt: string;
    cyrilMethodiusCaption: string;
  };
  scriptCyr: string;
  scriptLat: string;
  sidebarGroups: {
    ancientSages: string;
    presocratics: string;
    athenianPhilosophy: string;
    hellenisticSchools: string;
    romanPhilosophy: string;
    lateAntiquity: string;
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
    rhetoricians: string;
    cynics: string;
    stoics: string;
    skeptics: string;
    epicureans: string;
    romanStoics: string;
    romanEclectics: string;
    romanEpicureans: string;
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
    Hierapolis: string;
    Corduba: string;
    Rome: string;
    Arpinum: string;
    Volsinii: string;
    Megara: string;
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
    'Euclid of Megara': string;
    Diogenes: string;
    Plato: string;
    Plotinus: string;
    Archimedes: string;
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
    'Hipparchia of Maroneia': string;
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
    'Pherecydes of Syros': string;
    Menedemus: string;
    Cleobulus: string;
    Cleobulina: string;
    Epictetus: string;
    Seneca: string;
    Cicero: string;
    'Musonius Rufus': string;
    Lucretius: string;
    Philolaus: string;
    Melissus: string;
    Iamblichus: string;
  };
}

export const translations: Record<Language, Translations> = {
  stsl: {
    siteTitle: 'Ѹчилище Блатьнограда',
    randomQuote: 'Слѹчаиноє изрѣчєніє',
    quoteDetails: 'О изрѣчєніи',
    source: 'Источьникъ',
    readFull: 'Чьти вьсе',
    contents: 'Съдрьжаніє',
    gotoAuthor: 'Къ философу',
    pageNotFound: 'Страница не обрѣтєна',
    pageNotFoundMessage: 'Страница, ѭже ищєши, не обрѣтаєть сѧ.',
    goHome: 'Въ начѧло',
    sectionQuotes: 'Изрѣчєніꙗ',
    sectionLife: 'Житіє',
    sectionOthersAbout: 'Помѣни',
    sectionWritings: 'Дѣла',
    sectionLetters: 'Писма',
    showMore: 'Покажи више',
    showLess: 'Покажи мање',
    bce: 'п.р.х.',
    wikipedia: 'Википєдїꙗ',
    navHome: 'Начѧло',
    navPhilosophers: 'Философи',
    navDictionary: 'Словьникъ',
    dictionaryTitle: 'Грьчьско-словѣньскъ философьскъ словьникъ',
    navWorks: 'Книгꙑ',
    navAbout: 'О дѣлѣ',
    workUi: {
      allWorks: 'Философьскыѧ книгꙑ',
      openWork: 'Чьти',
      previousSection: 'Прѣдьнии отъдѣлъ',
      nextSection: 'Слѣдѹѭштии отъдѣлъ',
    },
    about: {
      intro: 'Ѹчилище Блатьнограда мьнима словѣньска школа любомѫдриꙗ девѧтаго вѣка · въ Блатьноградѣ бѣ · сѣдалищи паноньскꙑихъ Словѣнъ и єдиномь отъ прьвꙑихъ срѣдищь словѣньскаго писмени · Дѣло се показати тщить како бы любомѫдриѥ ѹчила сѧ · аще бы Словѣне велика ѹчилища въ срѣдьни вѣкъ имѣли · и како бы словѣньскъ ѹченъ ꙗꙁꙑкъ того врѣмене глаголалъ ·',
      schoolImageAlt: 'Ѹчилище Блатьнограда',
      schoolCaption: 'Ѹчилище Блатьнограда · нꙑнѣшьнєє въꙁображеніє ·',
      balatongrad: 'Блатьноградъ на брѣꙁѣ Блатьна єꙁера бѣ стольнъ градъ Блатьньскꙑѧ ꙁемлѧ · ꙗже ѭжьнꙑѧ и ꙁападьнꙑѧ Словѣнꙑ съвѧꙁа прѣжде прихода Ѹгръ ·',
      mapImageAlt: 'Блатьньска ꙁемлꙗ и Велика Моравиꙗ',
      mapCaption: 'Блатьньска ꙁемлꙗ междѹ Хръватьскоѭ и Великоѭ Моравиѥѭ ·',
      tradition: 'Въ Блатьноградѣ въ девѧтѣмь вѣцѣ пребꙑваста Константинъ Любомѫдрьць · нарицаємꙑи Кѵрилъ · и братъ єго Методіи · иже писмѧ Словѣномъ принесоста · Тѹ словѣньскѫ школѫ съ пѧтьѭ десѧтъ ѹченикъ сътвориста · градъ же велико срѣдище словѣньскаго писмени бꙑсть · Не тъкмо библіискꙑꙗ писаниꙗ · нъ и мѫдра и любомѫдрьска изрѣчєніꙗ рано прѣлагаахѫ Словѣне · Обычаи тъ въ послѣдѹѭштꙑихъ вѣцѣхъ продлъжи сѧ и съхрани сѧ въ съборницѣхъ ꙗко Разѹми Менандра · Пчела · и Разѹми на єллиньскꙑѧ любомѫдрьцѧ · Се єсть словѣньскꙑи обычаи любомѫдриꙗ · єгоже мꙑ продължаємъ ·',
      cyrilMethodiusImageAlt: 'Кѵрилъ и Методіи',
      cyrilMethodiusCaption: 'Константинъ Любомѫдрьць и братъ єго Методіи · дарителꙗ словѣньскаго писмени ·',
    },
    scriptCyr: 'Кѷрилица',
    scriptLat: 'Латиница',
    sidebarGroups: {
      ancientSages: 'Дрѣвьнии мѫдрьци',
      presocratics: 'Прѣдесократови',
      athenianPhilosophy: 'Атїньско любомѫдриѥ',
      hellenisticSchools: 'Єллиньскꙑ школꙑ',
      romanPhilosophy: 'Римьско любомѫдриѥ',
      lateAntiquity: 'Поздьнѧꙗ древьность',
    },
    sidebarSubgroups: {
      ionianSchool: 'Іоньска школа',
      pythagoreans: 'Піѳагорєи',
      eleatics: 'Єлєи',
      atomists: 'Атомісти',
      others: 'Инии',
      sophists: 'Софісти',
      socratics: 'Сократъ и Сократови',
      platonicAcademy: 'Платонова акадємїꙗ',
      aristotelianSchool: 'Арістотєлова школа',
      rhetoricians: 'Витиѩ',
      cynics: 'Кїници',
      stoics: 'Стоїци',
      skeptics: 'Скєптици',
      epicureans: 'Єпикѹрєи',
      romanStoics: 'Римьстии стоїци',
      romanEclectics: 'Римьстии събиратели',
      romanEpicureans: 'Римьстии єпикѹрєи',
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
      Hierapolis: 'Иєраполь',
      Corduba: 'Кордѹва',
      Rome: 'Римъ',
      Arpinum: 'Арпинъ',
      Volsinii: 'Волсинии',
      Megara: 'Мегара',
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
      'Euclid of Megara': 'Еѹклидъ Мегарꙗнинъ',
      Diogenes: 'Диогенъ отъ Синопы',
      Plato: 'Платѡнъ',
      Plotinus: 'Плѡтинъ',
      Archimedes: 'Архимедъ',
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
      'Hipparchia of Maroneia': 'Хіпархїꙗ',
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
      'Pherecydes of Syros': 'Фєрєкідъ',
      Menedemus: 'Мєнєдємъ',
      Cleobulus: 'Клєовѹлъ',
      Cleobulina: 'Клєовѹліна',
      Epictetus: 'Епиктетъ',
      Seneca: 'Сенека',
      Cicero: 'Цицеронъ',
      'Musonius Rufus': 'Мѹсонии Рѹфъ',
      Lucretius: 'Лѹкреции',
      Philolaus: 'Филолаи',
      Melissus: 'Мєлисъ',
      Iamblichus: 'Їамблихъ',
    },
  },
  sr: {
    siteTitle: 'Učilište Blatnograda',
    randomQuote: 'Slučajni citat',
    quoteDetails: 'Detalji citata',
    source: 'Izvor',
    readFull: 'Čitaj celo',
    contents: 'Sadržaj',
    gotoAuthor: 'K filozofu',
    pageNotFound: 'Stranica nije pronađena',
    pageNotFoundMessage: 'Stranica koju tražite ne postoji.',
    goHome: 'Početna',
    sectionQuotes: 'Izreke',
    sectionLife: 'Život',
    sectionOthersAbout: 'Pominjanja',
    sectionWritings: 'Dela',
    sectionLetters: 'Pisma',
    showMore: 'Prikaži više',
    showLess: 'Prikaži manje',
    bce: 'p.n.e.',
    wikipedia: 'Vikipedija',
    navHome: 'Početna',
    navPhilosophers: 'Filozofi',
    navDictionary: 'Rečnik',
    dictionaryTitle: 'Grčko-slovenski filozofski rečnik',
    navWorks: 'Knjige',
    navAbout: 'O projektu',
    workUi: {
      allWorks: 'Filozofske knjige',
      openWork: 'Čitaj',
      previousSection: 'Prethodni odeljak',
      nextSection: 'Sledeći odeljak',
    },
    about: {
      intro: 'Učilište Blatnograda je zamišljena slovenska filozofska škola iz 9. veka koja se nalazila u Blatnogradu, sedištu panonskih Slovena i jednom od prvih središta slovenske pismenosti. Ovaj projekat pokušava dočarati kako bi izgledalo izučavanje filozofije da su Sloveni imali univerzitete u srednjem veku, i kako bi zvučao učeni slovenski jezik toga vremena.',
      schoolImageAlt: 'Učilište Blatnograda',
      schoolCaption: 'Učilište Blatnograda, savremena rekonstrukcija',
      balatongrad: 'Blatnograd, na obali Blatnog jezera, bio je prestonica Blatenske zemlje (Блатьньскъ), koja je povezivala južne i zapadne Slovene pre dolaska Ugara.',
      mapImageAlt: 'Blatenska zemlja i Velika Moravska',
      mapCaption: 'Blatenska zemlja između Hrvatske i Velike Moravske.',
      tradition: 'U Blatnogradu su u 9. veku boravili Konstantin Filozof (poznat kao Ćirilo) i brat njegov Metodije, koji su doneli pismo Slovenima. Tu su osnovali slovensku školu sa 50-ak učenika, a grad je postao značajno središte slovenske pismenosti. Pored biblijskih tekstova, Sloveni su rano prevodili mudre i filozofske izreke, a ta tradicija je u narednim vekovima nastavljena i sačuvana u zbirkama kao što su Разѹми Менандра, Pčela i Razumi helenskih filozofa. To je slovenska filozofska tradicija koju mi nastavljamo.',
      cyrilMethodiusImageAlt: 'Ćirilo i Metodije',
      cyrilMethodiusCaption: 'Konstantin Filozof i brat njegov Metod, donositelji slovenske pismenosti.',
    },
    scriptCyr: 'Ћирилица',
    scriptLat: 'Latinica',
    sidebarGroups: {
      ancientSages: 'Drevni mudraci',
      presocratics: 'Predsokratovci',
      athenianPhilosophy: 'Atinska filozofija',
      hellenisticSchools: 'Helenističke škole',
      romanPhilosophy: 'Rimska filozofija',
      lateAntiquity: 'Kasna antika',
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
      rhetoricians: 'Govornici',
      cynics: 'Kinici',
      stoics: 'Stoici',
      skeptics: 'Skeptici',
      epicureans: 'Epikurejci',
      romanStoics: 'Rimski stoici',
      romanEclectics: 'Rimski eklektičari',
      romanEpicureans: 'Rimski epikurejci',
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
      Hierapolis: 'Hijerapolj',
      Corduba: 'Korduba',
      Rome: 'Rim',
      Arpinum: 'Arpinum',
      Volsinii: 'Volsiniji',
      Megara: 'Megara',
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
      'Euclid of Megara': 'Euklid Megaranin',
      Diogenes: 'Diogen iz Sinope',
      Plato: 'Platon',
      Plotinus: 'Plotin',
      Archimedes: 'Arhimed',
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
      'Hipparchia of Maroneia': 'Hiparhija',
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
      'Pherecydes of Syros': 'Ferekid',
      Menedemus: 'Menedem',
      Cleobulus: 'Kleobul',
      Cleobulina: 'Kleobulina',
      Epictetus: 'Epiktet',
      Seneca: 'Seneka',
      Cicero: 'Ciceron',
      'Musonius Rufus': 'Musonije Ruf',
      Lucretius: 'Lukrecije',
      Philolaus: 'Filolaj',
      Melissus: 'Melis',
      Iamblichus: 'Jamblihos',
    },
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language];
}
