# Korpus za rekonstrukciju slovenskog filozofskog jezika

Svi tekstualni izvori nalaze se u: `../data/sources/corpus/`

## A. Direktni filozofski izvori ⭐⭐⭐⭐⭐

### Разуми на елинские философи.txt
Putanja: `../data/sources/corpus/Разуми на елинските философи.txt`
Prioritet: najviši

Svrha:
- grčki filozofski pojmovi u slovenskom obliku
- termini:
  - философъ
  - мѫдрость
  - душа
  - природа
  - начало
  - быти
  - разумъ

Ovo je najvažniji novi dodatak.

---

### Прогласъ.txt
Putanja: `../data/sources/corpus/Прогласъ.txt`

Prioritet: najviši

Svrha:
- filozofija jezika
- odnos slova, reči i smisla
- obrazac apstraktnog argumentovanja

Ključni termini:
- слово
- писание
- разумъ
- языкъ
- учение


---

### О письменьхъ.txt
Putanja: `../data/sources/corpus/О письменьхъ.txt`

Prioritet: najviši

Svrha:
- metajezik
- govor o jeziku
- pojam znaka i značenja

Ključni termini:
- буква
- гласъ
- слово
- разумѣти


---

## B. Mudrosna književnost ⭐⭐⭐⭐

### Пчела.txt i Бьчела.txt
Putanja: `../data/sources/corpus/Пчела.txt` i `../data/sources/corpus/Бьчела.txt`

Prioritet: visok

Svrha:
- kratke filozofske izreke
- definicije
- moralna filozofija

Odličan izvor za obrasce:

```

X есть Y
X подобьно Y
мудрость есть...

````

---

---

## C. Hrišćanski filozofski sloj ⭐⭐⭐⭐

### Vita_Constantini.txt
Putanja: `../data/sources/corpus/Vita_Constantini.txt`

Veoma važno.

Sadrži:
- rasprave sa Grcima
- jezik i obrazovanje
- odnos vere i razuma

Ključni termini:
- разумъ
- философъ
- писание
- слово


### Beseda na eres.txt
Putanja: `../data/sources/corpus/Beseda na eres.txt`

Svrha:
- teološka argumentacija
- apstraktni pojmovi

Koristan za:
- истина
- разумъ
- естество


---

## D. Osnovni staroslovenski jezički sloj ⭐⭐⭐

### marianus.txt, zographensis, assemanius.txt
Putanja: 
- `../data/sources/corpus/marianus.txt`
- `../data/sources/corpus/zographensis`
- `../data/sources/corpus/assemanius.txt`

Svrha:
- gramatika
- sintaksa
- najstariji oblici

Ne koristiti kao glavni izvor filozofskih termina.


---

## E. Prevodilački sloj ⭐⭐⭐⭐

### suprasliensis.txt, sava.txt
Putanja:
- `../data/sources/corpus/suprasliensis.txt`
- `../data/sources/corpus/sava.txt`

Svrha:
- kako slovenski prevodilac prenosi grčki apstraktni jezik

Vrlo važni za:
- οὐσία
- φύσις
- λόγος
- διάνοια
- γνώσις


---

## F. Posebni izvori

### Фисилогъ.txt
Putanja: `../data/sources/corpus/Фисилогъ.txt`

Koristan za:
- природа
- свойство
- символičko mišljenje


### Слово о плъкоу Игоревѣ.txt
Putanja: `../data/sources/corpus/Слово о плъкоу Игоревѣ.txt`

Manje važan za filozofiju.

Koristan za:
- stil
- poetiku
- poređenje kasnijeg jezika

---

Moj prioritet za agenta bih sada promenio ovako:

```json
{
  "philosophical_priority": [
    "Разуми на елинские философи.txt",
    "Прогласъ.txt",
    "О письменьхъ.txt",
    "Пчела.txt",
    "Vita_Constantini.txt",
    "suprasliensis.txt",
    "sava.txt"
  ],

  "language_priority": [
    "marianus.txt",
    "zographensis",
    "assemanius.txt"
  ]
}
