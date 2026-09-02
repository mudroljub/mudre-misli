# Plotin — Eneade

**Grč.** Ἐννεάδες  
**Sr.** Eneade

## Lokalni izvor

`First1KGreek/data/tlg2000/tlg001/tlg2000.tlg001.1st1K-grc1.xml` — potpuni
grčki tekst Volkmannovog izdanja iz 1883–1884. u CTS/EpiDoc TEI XML formatu.
Poreklo i CTS metapodaci čuvaju se u pratećim `__cts__.xml` fajlovima i u
`INDEX_GREEK.md`.

## Struktura

TEI hijerarhija ima tri nivoa: eneada, rasprava i odeljak. Projektna
bibliografska oznaka zadržava rimski broj Eneade (`VI.9.11`), dok pokazivač
koristi arapske brojeve:

```text
data/sources/First1KGreek/data/tlg2000/tlg001/tlg2000.tlg001.1st1K-grc1.xml#6.9.11
data/sources/First1KGreek/data/tlg2000/tlg001/tlg2000.tlg001.1st1K-grc1.xml#5.1.6-7
```

Raspon se koristi samo kada jedan unos neprekidno prelazi iz jednog odeljka u
sledeći.

Korpus sadrži svih **6 eneada**, **54 rasprave** i **653 kanonska odeljka**.
Za prevod se koristi sidro oblika `I.1.1`, a prevodni tekst deli se u šest
fajlova, po jedan za svaku eneadu. Pripremljeni nacrt manifesta nalazi se u
`data/works/plotinus/enneads/work.draft.json`.
