# Zadatak: izdvajanje staroslovenskih jezičkih i filozofskih primera iz korpusa

## Cilj

Iz lokalnog korpusa staroslovenskih tekstova izdvojiti najbolje primere za rekonstrukciju slovenskog filozofskog jezika.

Ne praviti običan indeks pojavljivanja reči.

Cilj je napraviti mali, kvalitetan jezički korpus koji pokazuje:

- kako staroslovenski izražava apstraktne pojmove;
- kako prevodi grčke filozofske i teološke termine;
- kako gradi filozofsku rečenicu;
- kako tvori apstraktne imenice;
- kako izražava definicije i argumente.

---

# Izvori

Korpus se nalazi lokalno:

```

data\sources\corpus

```

---

# Hijerarhija izvora

Izvori se dele na dve grupe.

## A. Filozofski i apstraktni jezik

Ovi tekstovi imaju najveći prioritet.

### 1. Разуми на елинские философи.txt

Prioritet: ★★★★★

Glavni izvor za:

- grčke filozofske pojmove;
- prevod antičkih termina;
- jezik o mudrosti i znanju.

Posebno tražiti:

- философъ
- мѫдрость
- душа
- природа
- начало
- бытие
- разумъ


### 2. Прогласъ.txt

Prioritet: ★★★★★

Glavni izvor za:

- filozofiju jezika;
- odnos slova, reči i smisla;
- apstraktni govor.

Posebno tražiti:

- слово
- писание
- языкъ
- разумъ
- знание


### 3. О письменьхъ.txt

Prioritet: ★★★★★

Glavni izvor za:

- pojam jezika;
- znak i značenje;
- odnos glasa i slova.


### 4. Пчела.txt / Бьчела.txt

Prioritet: ★★★★☆

Glavni izvor za:

- mudrosne iskaze;
- definicije;
- filozofske obrasce.

Posebno tražiti konstrukcije:

```

X єсть Y
X подобьно Y

```

---

## B. Prevodilački i jezički uzor

### 5. Suprasliensis

Prioritet: ★★★★★

Najvažniji prevodilački izvor.

Koristiti za:

- apstraktne imenice;
- prevod grčkih pojmova;
- složene rečenice.

---

### 6. Sava

Prioritet: ★★★★☆

Koristiti za:

- razvijene apstraktne konstrukcije;
- prevodilački stil.


---

### 7. Vita Constantini

Prioritet: ★★★★☆

Koristiti za:

- rasprave o jeziku;
- odnos znanja i vere;
- filozofski stil.

---

### 8. Marianus

Prioritet: ★★★★☆

Koristiti za:

- osnovnu sintaksu;
- najstariji književni sloj.


---

### 9. Zographensis

Prioritet: ★★★★☆

Koristiti za:

- poređenje arhaičnih oblika;
- grafiju.


---

### 10. Assemanius

Prioritet: ★★★☆☆

Koristiti za:

- leksičke varijante.


---

# Šta izdvajati

Tražiti primere koji pokazuju filozofsku ili apstraktnu upotrebu.

Ne tražiti samo pojavljivanje reči.

---

# Ključni pojmovi

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

## Reč i logos

Grčki:

- λόγος

Slovenski:

- слово
- словеса

Posebno izdvojiti:

- слово kao govor;
- слово kao razum;
- слово kao ontološki pojam.


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

## Početak i uzrok

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

1. Definicijske rečenice:

```

X єсть Y

```

2. Rečenice sa apstraktnim imenicama.

3. Rečenice koje predstavljaju prevod grčkog filozofskog izraza.

4. Rečenice koje pokazuju tvorbu novih slovenskih pojmova.

5. Rečenice koje mogu služiti kao obrazac za novi filozofski prevod.


---

# Izbegavati

Ne izdvajati:

- obične narativne delove;
- genealogije;
- ponavljanja istih formula;
- lična imena;
- liturgijske formule bez jezičkog značaja;
- slučajne pojave reči bez filozofskog značenja.


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

language/PRIMERИ.md

````

Format:

```md
# слово

Grčki pojam:
λόγος

Izvor:
Прогласъ

Tekst:

...

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
* ukupno 200–300 primera.

Kvalitet je važniji od količine.

---

# Oznake

Razlikovati:

[POTVRĐENO]

Primer direktno iz staroslovenskog korpusa.

[PREVODILAČKI UZOR]

Primer koji pokazuje način prevođenja grčkog apstraktnog pojma.

[REKONSTRUKCIJA]

Novi termin napravljen za filozofski jezik.

Ne mešati ova tri nivoa.
