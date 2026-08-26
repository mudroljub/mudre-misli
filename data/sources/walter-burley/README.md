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
- `latin_raw/` — izdvojeni tekstovi pojedinih ličnosti, uz minimalno čišćenje;
- `chapters/` — detaljnije obrađena poglavlja o petorici mudraca;
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
