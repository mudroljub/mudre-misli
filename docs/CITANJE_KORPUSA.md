# Zadatak: izdvajanje staroslovenskih jezičkih i filozofskih primera iz korpusa

## Cilj

Iz lokalnog korpusa staroslovenskih tekstova izdvojiti najbolje primere za rekonstrukciju slovenskog filozofskog jezika.

Ne praviti običan indeks pojavljivanja reči.

Cilj je napraviti mali, kvalitetan korpus koji pokazuje:

- kako staroslovenski izražava apstraktne pojmove;
- kako prevodi grčke filozofske i teološke termine;
- kako gradi filozofsku rečenicu;
- kako tvori apstraktne imenice;
- kako izražava definicije, poređenja i argumente;
- koje postojeće slovenske reči mogu nositi filozofsko značenje.

---

# Izvori

Korpus se nalazi lokalno:

```

data\sources\corpus

```

---

# Hijerarhija izvora

Izvori se dele na dve grupe.

# A. Filozofski i apstraktni jezik

## 1. Разуми на елинские философи.txt

Prioritet: ★★★★★

Glavni izvor za:

- grčke filozofske pojmove;
- prevod antičkih termina;
- moralnu i metafizičku terminologiju.

Posebno tražiti:

- философъ
- мѫдрость
- душа
- природа
- начало
- быти
- разумъ
- добродѣтель


## 2. Прогласъ.txt

Prioritet: ★★★★★

Glavni izvor za:

- filozofiju jezika;
- odnos slova, reči i smisla;
- apstraktni govor.

Posebno tražiti:

- слово
- словеса
- писание
- языкъ
- разумъ
- познание


## 3. О письменьхъ.txt

Prioritet: ★★★★★

Glavni izvor za:

- pojam jezika;
- znak i značenje;
- odnos glasa i slova;
- čoveka kao razumno biće.


## 4. Пчела.txt / Бьчела.txt

Prioritet: ★★★★☆

Glavni izvor za:

- mudrosne iskaze;
- definicije;
- filozofske obrasce;
- moralne pojmove.

Posebno tražiti konstrukcije:

```

X єсть Y

X подобьно Y

X не есть Y

```


---

# B. Prevodilački i jezički uzor

## 5. Suprasliensis

Prioritet: ★★★★★

Najvažniji prevodilački izvor.

Koristiti za:

- apstraktne imenice;
- prevod grčkih pojmova;
- složene sintaktičke konstrukcije.


## 6. Sava

Prioritet: ★★★★☆

Koristiti za:

- razvijene apstraktne konstrukcije;
- prevodilački stil.


## 7. Vita Constantini

Prioritet: ★★★★☆

Koristiti za:

- rasprave o jeziku;
- filozofiju i obrazovanje;
- definiciju filozofije.


## 8. Marianus

Prioritet: ★★★★☆

Koristiti za:

- osnovnu sintaksu;
- najstariji književni sloj.


## 9. Zographensis

Prioritet: ★★★★☆

Koristiti za:

- arhaične oblike;
- poređenje grafije.


## 10. Assemanius

Prioritet: ★★★☆☆

Koristiti za:

- leksičke varijante.


---

# Kategorije izdvajanja

Svaki primer svrstati u jednu ili više kategorija:

```

01 Ontologija
02 Saznanje i razum
03 Jezik i logos
04 Psihologija
05 Etika
06 Teologija
07 Čovek i društvo
08 Književnost i obrazovanje

```

---

# Ključni pojmovi

## Biće i postojanje

Grčki:

- εἶναι
- τὸ ὄν
- οὐσία
- φύσις

Slovenski:

- єсть
- быти
- сѫщьство
- єстьство
- природа


---

## Um i mišljenje

Grčki:

- νοῦς
- διάνοια
- φρόνησις
- λογισμός

Slovenski:

- умъ
- разумъ
- размꙑслъ
- помыслъ


Terminološka razlika:

```

умъ

unutrašnja misaona sposobnost
grčki: νοῦς

разумъ

razumevanje, rasuđivanje, objašnjenje
grčki: διάνοια

```

Ne izjednačavati automatski ova dva termina.


---

## Reč i logos

Grčki:

- λόγος

Slovenski:

- слово
- словеса


Posebno izdvojiti:

- слово kao govor;
- слово kao razum;
- слово kao božanski ili ontološki princip.


---

## Znanje

Grčki:

- γνῶσις
- γινώσκειν

Slovenski:

- знати
- вѣдѣти
- разумѣти
- познати


Razlikovati:

```

знати
opšte znanje

познати
lična ili neposredna spoznaja

```


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

## Početak i uzrok

Grčki:

- ἀρχή
- αἰτία

Slovenski:

- начѧло
- причина
- вина


---

## Priroda

Grčki:

- φύσις

Slovenski:

- природа
- єстьство


---

## Oblik i obraz

Grčki:

- μορφή
- εἶδος

Slovenski:

- образъ
- подобие
- видъ


---

## Delovanje

Grčki:

- ἔργον
- δύναμις

Slovenski:

- дѣло
- творити
- сила


---

# Pravila izbora

Ne izdvajati svaku pojavu.

Prednost imaju:

1. Definicijske rečenice:

```

X єсть Y

```

2. Rečenice sa apstraktnim imenicama.

3. Rečenice koje jasno prevode grčki filozofski pojam.

4. Rečenice koje pokazuju tvorbu slovenskih apstraktnih termina.

5. Rečenice koje mogu služiti kao model za novi filozofski prevod.

6. Rečenice gde obična slovenska reč dobija filozofsko značenje.


---

# Izbegavati

Ne izdvajati:

- obične narativne delove;
- genealogije;
- ponavljanja istih formula;
- lična imena;
- liturgijske formule bez jezičkog značaja;
- slučajne pojave reči bez apstraktnog značenja.


---

# Obrada teksta

Korpus koristi staru ćirilsku Unicode transkripciju.

Ne modernizovati grafiju.

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


---

# Izlaz

Napraviti fajl:

```

language/ПРИМЕРИ.md

````

Format:

```md
# слово

Kategorija:
03 Jezik i logos

Grčki pojam:
λόγος

Izvor:
Прогласъ

Status:
[ДОМАЋИ ТЕРМИН]

Tekst:

...

Zašto je važan:

Primer apstraktne upotrebe reči слово.

---

# разумъ

Kategorija:
02 Saznanje i razum

Grčki:
διάνοια

Izvor:
О письменьхъ

Status:
[PREVODILAČKI UZOR]

Tekst:

...

Napomena:
...
````

---

# Oznake

Koristiti sledeće oznake:

## [DOMAĆI TERMIN]

Slovenska reč potvrđena u staroslovenskom korpusu.

## [PREVODILAČKI UZOR]

Primer koji pokazuje kako slovenski prevodi grčki apstraktni pojam.

## [POZAJMLJENICA]

Grčka ili druga strana reč preneta u slovenski.

## [FILOZOFSKA UPOTREBA]

Obična slovenska reč koja u kontekstu dobija filozofsko značenje.

## [REKONSTRUKCIJA]

Novi termin napravljen za filozofski jezik.

Ne mešati ova tri nivoa.

---

# Količina

Ne praviti više od:

* 10–20 primera po pojmu;
* ukupno 200–300 najboljih primera.

Kvalitet je važniji od količine.
