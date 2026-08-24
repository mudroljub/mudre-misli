# Problemi čitavih dela

Ovaj dokument je radni dnevnik svih problema otkrivenih pri poravnavanju
kanonskih sidara i filološkom pregledu dela u `data/works`. Problem se beleži
čim se uoči, čak i kada se ne rešava u istom prolazu.

## Oznake

- **otvoren** — problem još nije rešen;
- **delimično rešen** — tehnička veza je popravljena, ali tekst traži rad;
- **napomena** — osobenost izvora ili prevoda koja ne mora biti greška.

Vrste problema: `sidro`, `izostavljanje`, `dodatak`, `tačnost-sr`,
`tačnost-stsl`, `stil-sr`, `stil-stsl`, `terminologija`, `izvor` i `alat`.

## Platon — Ion

### ION-001 — odlomak 540a nije preveden

- status: **otvoren**
- vrsta: `izostavljanje`, `tačnost-sr`, `tačnost-stsl`
- mesto: Stefanus 540a
- fajlovi: `data/works/plato/ion/ion.sr.md`,
  `data/works/plato/ion/ion.stsl.md`

Posle Sokratove primedbe da je Ion zaboravan, grčki tekst sadrži sedam kratkih
replika. Sokrat podseća Iona da je rapsodsko umenje različito od kočijaškog i
da zato ne može poznavati sve. U oba prevoda taj razgovor nedostaje. Umesto
njega odmah sledi sažeti prelaz na pitanje šta pripada rapsodu.

Sidro `540a` zasad stoji na najbližoj postojećoj granici. Tačno poravnanje nije
moguće dok se izostavljene replike ne prevedu; pri dopuni treba sačuvati sidro
na početku Ionovog „Šta sam onda zaboravio?“.

## Epiktet — Razgovori

### DIS-002 — Razgovori nisu potpuni

- status: **otvoren**
- vrsta: `izostavljanje`
- mesto: I.30, III.9 i IV.3–IV.13

Manifest sadrži 82 poglavlja, dok sačuvane četiri knjige imaju 95. Nedostaju
I.30, III.9 i jedanaest završnih poglavlja četvrte knjige, IV.3–IV.13. Zbog
toga delo trenutno ne treba predstavljati kao potpun tekst bez jasne napomene,
a nedostajuća poglavlja treba prevesti i dodati u manifest redom.

### Grčki izvori za dopunu Razgovora

Sva navedena poglavlja nalaze se u jednom lokalnom izvornom fajlu:
`data/sources/canonical-greekLit/data/tlg0557/tlg001/tlg0557.tlg001.perseus-grc2.xml`
(*Epictetus, Discourses*, `tlg0557.tlg001.perseus-grc2`). Svaka stavka ispod je
samostalna celina pogodna za zaseban prevod.

Izdvojene radne kopije sa YAML metapodacima nalaze se u
`data/sources/epictetus/discourses/pending/`; za svaku od njih treba izraditi
odgovarajući srpski i staroslovenski prevod pre unošenja u knjige `book-i`,
`book-iii` ili `book-iv`.

| Poglavlje | CTS lokator | red početka u XML-u |
| --- | --- | ---: |
| I.30 | `1.30` | 1596 |
| III.9 | `3.9` | 3408 |
| IV.3 | `4.3` | 4850 |
| IV.4 | `4.4` | 4876 |
| IV.5 | `4.5` | 4975 |
| IV.6 | `4.6` | 5051 |
| IV.7 | `4.7` | 5128 |
| IV.8 | `4.8` | 5212 |
| IV.9 | `4.9` | 5300 |
| IV.10 | `4.10` | 5338 |
| IV.11 | `4.11` | 5412 |
| IV.12 | `4.12` | 5486 |
| IV.13 | `4.13` | 5530 |

### DIS-003 — naslovi staroslovenskih odeljaka nisu prevedeni

- status: **otvoren**
- vrsta: `tačnost-stsl`, `stil-stsl`
- mesto: sva poglavlja u `work.json`

Vrednosti `title.stsl` ponavljaju savremene srpske naslove latinicom. Potrebno
ih je prevesti na projektni staroslovenski i zapisati odgovarajućim pismom.

## Pravilo vođenja dnevnika

Za svaki novi problem zapisati delo, precizno kanonsko mesto, jezik, vrstu,
status, kratak opis i uslov pod kojim se može smatrati rešenim. Kada se problem
popravi, ukloniti njegov zapis iz ovog radnog dnevnika.
