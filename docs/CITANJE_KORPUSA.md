# Zadatak: izdvajanje staroslovenskih jezičkih i filozofskih primera iz korpusa

## Cilj

Iz lokalnog korpusa staroslovenskih tekstova izdvojiti najbolje primere za rekonstrukciju slovenskog filozofskog jezika.

Ne praviti indeks pojavljivanja reči.

Cilj je napraviti mali, kvalitetan korpus koji pokazuje:

- kako staroslovenski izražava apstraktne pojmove;
- kako gradi filozofsku i apstraktnu rečenicu;
- kako tvori apstraktne imenice;
- kako koristi domaće slovenske reči za izražavanje mišljenja;
- kako oblikuje definicije, poređenja i argumente.

---

# Važno ograničenje

Korpus sadrži samo staroslovenske tekstove.

Nema grčkih paralelnih tekstova.

Zato:

- ne određivati grčki originalni termin;
- ne nagađati prevodilačke parove;
- ne pisati "λόγος → слово" bez dokaza;
- ne zaključivati poreklo termina samo na osnovu značenja.

Ako je moguća veza sa grčkim filozofskim pojmom, ona se može navesti samo kao napomena:

```

Moguća kasnija interpretacija:
...

Pouzdanost:
niska / srednja / visoka

```

Glavni zadatak je analiza slovenskog jezika.

---

# Izvori

Korpus se nalazi:

```

data\sources\corpus

```

---

# Hijerarhija izvora

## A. Filozofski i apstraktni tekstovi

### Разуми на елинские философи.txt

Prioritet: ★★★★★

Tražiti:

- мѫдрость
- философъ
- умъ
- разумъ
- душа
- добродѣтель
- начало


### Прогласъ.txt

Prioritet: ★★★★★

Tražiti:

- слово
- словеса
- писание
- буквы
- разумъ
- душа
- знати


### О письменьхъ.txt

Prioritet: ★★★★★

Tražiti:

- слово
- писание
- языкъ
- разумъ
- человекъ
- знание


### Пчела.txt / Бьчела.txt

Prioritet: ★★★★☆

Tražiti:

- definicije;
- moralne pojmove;
- filozofske izreke.


---

## B. Prevodilački i jezički uzor

### Suprasliensis

Prioritet: ★★★★★

Koristiti za:

- apstraktne imenice;
- složene rečenice;
- razvijenu sintaksu.


### Sava

Prioritet: ★★★★☆

Koristiti za:

- razvijeni književni stil.


### Vita Constantini

Prioritet: ★★★★☆

Koristiti za:

- filozofski govor;
- jezik obrazovanja;
- pojam filozofa.


### Marianus

Prioritet: ★★★★☆

Koristiti za:

- osnovnu sintaksu;
- najstariji sloj.


### Zographensis

Prioritet: ★★★★☆

Koristiti za:

- arhaične oblike;
- grafiju.


### Assemanius

Prioritet: ★★★☆☆

Koristiti za:

- leksičke varijante.


---

# Oblasti izdvajanja

Svaki primer označiti jednom ili više oblasti:

```

01 Biće i postojanje

02 Um, razum i mišljenje

03 Jezik, reč i pismo

04 Znanje i učenje

05 Mudrost i filozofija

06 Duša i čovek

07 Etika i vrlina

08 Istina i spoznaja

09 Zakon, pravda i društvo

10 Bog i duhovni pojmovi

```

---

# Termini koje posebno pratiti

## Biće i postojanje

- єсть
- быти
- бытие
- сѫщьство
- єстьство
- природа


## Um i mišljenje

- умъ
- разумъ
- размꙑслъ
- помыслъ
- мыслити
- разумѣти


## Jezik i reč

- слово
- словеса
- рече
- глаголати
- языкъ
- писание
- буква


## Znanje

- знати
- вѣдѣти
- познати
- разумѣти
- учити


## Mudrost

- мѫдрость
- мудръ


## Istina

- истина
- истиньнъ


## Početak

- начало
- начѧло


## Čovek

- чловѣкъ
- душа
- срьдьце
- умъ


## Etika

- добро
- зло
- добродѣтель
- правда
- любовь
- крѣпость


---

# Pravila izbora

Ne izdvajati svaku pojavu.

Prednost imaju:

1. Definicijske konstrukcije:

```

X єсть Y

```

2. Rečenice koje objašnjavaju pojam.

3. Rečenice sa apstraktnim imenicama.

4. Poređenja:

```

X подобьно Y
X яко Y

```

5. Suprotnosti:

```

X и Y
добро / зло
разумъ / неразумие

```

6. Rečenice koje pokazuju promenu značenja obične reči u apstraktan pojam.

---

# Ne izdvajati

Ne uključivati:

- obične narativne rečenice;
- genealogije;
- spiskove imena;
- ponavljane formule;
- čisto liturgijske delove bez jezičkog značaja;
- izolovane reči bez konteksta.

---

# Obrada teksta

Sačuvati originalnu grafiju.

Ne modernizovati.

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
- višestruke prelome.

---

# Izlaz

Napraviti:

```

language/ПРИМЕРИ.md

````

Format:

```md
# слово

Oblast:

03 Jezik, reč i pismo

Status:

[ПОТВРЂЕНО]

Izvor:

Прогласъ

Tekst:

...

Značenje u kontekstu:

Reč koja označava govor, poruku ili apstraktni sadržaj.

Zašto je važno:

Primer gde obična slovenska reč dobija šire duhovno značenje.
````

---

# Statusi

Koristiti:

## [ПОТВРЂЕНО]

Direktan primer iz staroslovenskog korpusa.

## [ФИЛОЗОФСКА УПОТРЕБА]

Obična reč koja u kontekstu ima apstraktno značenje.

## [АПСТРАКТНИ ТЕРМИН]

Reč koja već funkcioniše kao pojam.

## [РЕКОНСТРУКЦИЈА]

Novi termin napravljen za savremeni filozofski jezik.

Ne mešati potvrđene i rekonstruisane termine.

---

# Količina

Cilj:

* 10–20 najboljih primera po oblasti;
* ukupno 200–300 primera.

Bolje je imati mali broj jasnih primera nego veliki broj ponavljanja.
