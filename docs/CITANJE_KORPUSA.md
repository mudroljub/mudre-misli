# Zadatak: izdvajanje staroslovenskih jezičkih primera iz korpusa

## Cilj

Iz lokalnog korpusa staroslovenskih tekstova izdvojiti najbolje primere za rekonstrukciju slovenskog filozofskog jezika.

Ne praviti običan indeks pojavljivanja reči.

Cilj je napraviti mali, kvalitetan jezički korpus koji pokazuje:
- kako staroslovenski izražava apstraktne pojmove;
- kako prevodi grčke filozofske i teološke termine;
- kako gradi rečenicu;
- kako tvori apstraktne imenice.

---

# Izvori

Korpus se nalazi lokalno:

```

data\sources\corpus
├── marianus
├── zographensis
├── assemanius
├── sava
└── suprasliensis

```

Prioritet izvora:

1. Suprasliensis — filozofski i apstraktni izrazi
2. Sava — složen prevodilački jezik
3. Marianus — osnovna sintaksa i najstariji sloj
4. Zographensis — poređenje arhaičnih oblika
5. Assemanius — leksičke varijante

---

# Šta izdvajati

Tražiti primere koji sadrže ili objašnjavaju sledeće pojmove:

## Biće i postojanje

Grčki:
- εἶναι
- οὐσία
- φύσις

Slovenski:
- єсть
- быти
- сѫщьство
- єстьство

---

## Um i mišljenje

Grčki:
- νοῦς
- διάνοια
- φρόνησις

Slovenski:
- умъ
- разумъ
- размꙑслъ
- помыслъ

---

## Reč i razum

Grčki:
- λόγος

Slovenski:
- слово
- словеса

Posebno izdvojiti primere gde слово ima apstraktno ili ontološko značenje.

---

## Znanje

Grčki:
- γνῶσις
- γινώσκειν

Slovenski:
- знати
- вѣдѣти
- разумѣти

---

## Mudrost

Grčki:
- σοφία

Slovenski:
- мѫдрость

---

## Istina

Grčki:
- ἀλήθεια

Slovenski:
- истина

---

## Uzročnost i početak

Grčki:
- ἀρχή
- αἰτία

Slovenski:
- начѧло
- причина

---

# Pravila izbora

Ne izdvajati svaku pojavu.

Prednost imaju:

1. Definicijske rečenice

Primer:

```

X єсть Y

```

2. Rečenice sa apstraktnim imenicama.

3. Konstrukcije koje mogu poslužiti kao model filozofskog izraza.

4. Rečenice koje jasno pokazuju značenje termina.

---

# Izbegavati

Ne izdvajati:

- obične biblijske naracije;
- genealogije;
- ponavljanja istih formula;
- lična imena;
- tehničke liturgijske formule bez jezičkog značaja.

---

# Obrada teksta

Korpus koristi staru ćirilsku Unicode transkripciju.

Ne menjati originalni tekst.

Sačuvati:

- ѣ
- ѧ
- ѫ
- ѹ
- ꙗ
- ѭ

Ukloniti samo:

- brojeve redova;
- tehničke oznake izdanja;
- nepotrebne prelome.

Ne modernizovati grafiju.

---

# Izlaz

Napraviti fajl:

```

language/PRIMERI.md

````

Format:

```md
# слово

Grčki pojam:
λόγος

Izvor:
Marianus

Tekst:

Въ началѣ бѣ Слово ·
и Слово бѣ къ Богу

Zašto je važan:
Primer apstraktne upotrebe reči слово.

---

# истина

Grčki:
ἀλήθεια

Izvor:
Suprasliensis

Tekst:
...

Napomena:
...
````

---

# Količina

Ne praviti više od:

* 10–20 primera po pojmu;
* ukupno oko 200–300 primera.

Kvalitet je važniji od količine.

---

# Važno

Razlikovati:

[POTVRĐENO]
Primer direktno iz staroslovenskog korpusa.

[REKONSTRUKCIJA]
Novi termin napravljen za filozofski jezik.

Ne mešati ova dva nivoa.
