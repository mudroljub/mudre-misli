# Walter Burley — *De vita et moribus philosophorum*

Operativni pregled lokalnog Burleyjevog sloja. Za bibliografske podatke i
pravila upotrebe vidi [README](walter-burley/README.md); mašinski sažetak je u
`walter-burley/philosophers_index.json`.

## Lokalni materijal

- izvorno Knustovo izdanje iz 1886. čuva se kao PDF;
- `walter-burley/latin_raw/` sadrži 78 radnih tekstualnih ekstrakcija;
- `walter-burley/chapters/` sadrži pet detaljnije strukturisanih poglavlja;
- direktorijum, a ne ručno vođen spisak, merodavan je inventar ekstrakcija.

Ekstrakcija nije isto što i završena obrada. Pre integracije treba proveriti
granice poglavlja i latinski tekst prema PDF-u, odvojiti paralelni španski
prevod i urednički aparat, zatim obraditi sav raspoloživ tekst iz poglavlja.

## Integrisani autori

Trenutno 23 autorska JSON fajla sadrže ukupno 106 unosa kojima je neposredni
izvor `walter-burley`:

| Autor | Unosa |
|---|---:|
| Anaharsis | 1 |
| Antisten | 3 |
| Bijant iz Prijene | 6 |
| Hilon iz Sparte | 1 |
| Hrisip | 19 |
| Ciceron | 9 |
| Kleobulina | 1 |
| Kleobul | 5 |
| Kratet iz Tebe | 1 |
| Demosten | 7 |
| Diogen | 8 |
| Empedokle | 4 |
| Epikur | 4 |
| Gorgija | 3 |
| Heraklit | 1 |
| Lukrecije | 2 |
| Ferekid sa Sirosa | 5 |
| Pitak | 1 |
| Seneka | 10 |
| Sokrat | 1 |
| Solon | 8 |
| Ksenofont | 1 |
| Zenon iz Kitijuma | 5 |

Brojevi se mogu ponovo izvesti iz `data/quotes/*.json`; ne predstavljaju broj
svih podataka u ekstraktima niti tvrdnju da je svaki navedeni autor potpuno
obrađen. Potpuna obrada je posebno potvrđena za raspoložive ekstrakte Cicerona,
Seneke i Lukrecija.

## Ispravka: Musonije Ruf

Burley nema poglavlje o Musoniju Rufu. Raniji indeks je pogrešno označavao
`Cap. C`; provera PDF-a pokazala je da je to poglavlje o Munaciju Planku.
Musonije se pojavljuje samo u Knustovoj uredničkoj fusnoti uz Katona, dakle ne
u Burleyjevom glavnom tekstu. Njegovi unosi u projektu zato koriste neposredni
antički izvor, Aula Gelija V.1.

## Pravilo za dalju obradu

1. Izabrati ekstrakt prema stvarnom fajlu u `latin_raw/`.
2. Proveriti ceo odlomak u PDF-u.
3. Razdvojiti Burleyjev tekst, starije izvore koje navodi, španski prevod i
   Knustov aparat.
4. Atomizovati i prevesti sav upotrebljiv sadržaj poglavlja.
5. Tek tada autora označiti kao potpuno obrađenog.

Poslednja strukturna provera: 26. avgust 2026.
