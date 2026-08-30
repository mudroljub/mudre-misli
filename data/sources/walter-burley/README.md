# Walter Burley — *De vita et moribus philosophorum*

## O izvoru

Walter Burley (Gualterus Burlaeus, oko 1275–1344/45) bio je engleski
skolastički filozof. Njemu tradicionalno pripisani *Liber de vita et moribus
philosophorum* srednjovekovni je biografski kompendijum o antičkim filozofima.

Lokalno izdanje priredio je Hermann Knust 1886. godine u okviru edicije
*Bibliothek des Litterarischen Vereins in Stuttgart*, broj 177. PDF sadrži
latinski tekst, stari španski prevod i naučni aparat.

## Struktura

- `BLV_177_...pdf` — izvorno izdanje;
- `ocr/` — neizmenjeni Internet Archive DjVu XML i podaci o stranicama;
- `latin_raw/` — izdvojeni tekstovi pojedinih ličnosti, uz minimalno čišćenje;
- `chapters/` — detaljnije obrađena poglavlja o petorici mudraca;
- `chapters-generated/` — ponovljivo generisani radni OCR latinskih poglavlja;
- `metadata.json` — bibliografski podaci;
- `philosophers_index.json` — sažet, mašinski čitljiv pregled slojeva;
- [`../INDEX_BURLEY.md`](../INDEX_BURLEY.md) — operativni pregled obrade.

Broj izdvojenih tekstova ne zapisuje se ručno u ovom dokumentu. Merodavno je
stvarno stanje direktorijuma `latin_raw/`, a sažetak se čuva u
`philosophers_index.json`.

## Napomena o upotrebi

Tekstovi u `latin_raw/` predstavljaju radne ekstrakcije iz složenog izdanja.
Pre unošenja u `data/quotes/` potrebno je proveriti granice odlomka, latinski
tekst i da li Burley navodi neki stariji izvor ili govori u svoje ime.

Izvorno izdanje i njegov tekst su u javnom vlasništvu.

## Mašinski čitljiv izvor

Internet Archive zapis `gualteriburlaei01burlgoog` sadrži OCR istog Knustovog
izdanja kao DjVu XML. XML čuva granice skeniranih strana, redova i reči, dok
`scandata.xml` opisuje listove digitalizata. Pošto ovaj zapis nema popunjena
polja `pageNumber`, generator iz samostalnih brojeva strana u OCR-u izračunava
dominantni pomak između lista digitalizata i štampane strane i proverava ga na
nizu stranica.

Izvorni fajlovi se preuzimaju, proveravaju MD5 kontrolnim sumama iz Internet
Archive metapodataka i obrađuju komandom:

```sh
npm run build:source:burley
```

Knustovo izdanje do strane 395 naizmenično donosi latinski tekst i stari
španski prevod. Generator uzima parne, latinske strane i završnu latinsku
stranu 395, pa ih deli prema
naslovima `Cap.` koje je OCR prepoznao. Svaki generisani odeljak sadrži oznaku
štampane strane. Kritički aparat odvaja se prema samostalnom znaku `*` kojim
je slog izdanja razgraničen na svakoj strani. Generisani tekst nije kritički
prepis: OCR greške i granicu aparata treba proveriti prema faksimilu pre
citiranja. Ručno uređeni `chapters/` i postojeći `latin_raw/` ne prepisuju se.
