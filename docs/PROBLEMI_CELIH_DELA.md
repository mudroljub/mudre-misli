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

### DIS-001 — IV.2 sadrži drugi tekst

- status: **otvoren**
- vrsta: `izostavljanje`, `dodatak`, `tačnost-sr`, `tačnost-stsl`
- mesto: IV.2

Tekst pod sidrom IV.2 nije prevod Epiktetovog poglavlja *O druženju*
(`περὶ συμπεριφορᾶς`). On je slobodna, proširena prerada teme prijateljstva iz
II.22: govori o spoljašnjim dobrima, suparništvu, psima oko mesa i prijateljstvu
zasnovanom na valjanom proizvoljenju. Pravo IV.2 počinje upozorenjem da se
učenik ne stopi ponovo sa starim drugovima i ne vrati njihovom načinu života.
Problem postoji u oba prevoda. Sidro tehnički pokazuje na IV.2, ali sadržaj
ispod njega treba zameniti stvarnim prevodom deset odeljaka IV.2.

Prvobitna sumnja obuhvatala je i II.12. Ponovna provera celog početka pokazala
je da II.12 odgovara grčkom izvorniku; taj deo nalaza iz početne analize bio je
pogrešan i ne zahteva pomeranje sidra.

### DIS-002 — Razgovori nisu potpuni

- status: **otvoren**
- vrsta: `izostavljanje`
- mesto: I.30, III.9 i IV.3–IV.13

Manifest sadrži 82 poglavlja, dok sačuvane četiri knjige imaju 95. Nedostaju
I.30, III.9 i jedanaest završnih poglavlja četvrte knjige, IV.3–IV.13. Zbog
toga delo trenutno ne treba predstavljati kao potpun tekst bez jasne napomene,
a nedostajuća poglavlja treba prevesti i dodati u manifest redom.

### DIS-003 — naslovi staroslovenskih odeljaka nisu prevedeni

- status: **otvoren**
- vrsta: `tačnost-stsl`, `stil-stsl`
- mesto: sva poglavlja u `work.json`

Vrednosti `title.stsl` ponavljaju savremene srpske naslove latinicom. Potrebno
ih je prevesti na projektni staroslovenski i zapisati odgovarajućim pismom.

## Platon — Lisid

### LYS-002 — pomerena sidra 203a–217c

- status: **delimično rešen**
- vrsta: `sidro`
- mesto: Lisid 203a–217c; potom nastaviti od 217d

Granice `203a`–`217c` pregledane su pomoću deklarativne mape. U prvom
prolazu šest sidara već je bilo tačno, a 11 je pomereno u oba prevoda bez
promene teksta. U kasnijim prolazima obnovljeni su izostavljeni odlomci i
poravnate granice do `217c`. Provera ponovne primene mape ostaje idempotentna.
Delo treba pregledati od `217d` do `223b`
pre zatvaranja ovog zapisa.

## Pravilo vođenja dnevnika

Za svaki novi problem zapisati delo, precizno kanonsko mesto, jezik, vrstu,
status, kratak opis i uslov pod kojim se može smatrati rešenim. Kada se problem
popravi, ukloniti njegov zapis iz ovog radnog dnevnika.
