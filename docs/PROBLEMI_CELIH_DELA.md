# Problemi čitavih dela

Ovaj dokument je radni dnevnik svih problema otkrivenih pri poravnavanju
kanonskih sidara i filološkom pregledu dela u `data/works`. Problem se beleži
čim se uoči, čak i kada se ne rešava u istom prolazu.

## Oznake

- **otvoren** — problem još nije rešen;
- **delimično rešen** — tehnička veza je popravljena, ali tekst traži rad;
- **rešen** — problem je popravljen i proveren;
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

### ION-002 — ranije pogrešno postavljena sidra 535a–542b

- status: **rešen**
- vrsta: `sidro`
- mesto: Stefanus 535a–542b

Sidra su bila vezana pretežno za granice pasusa, a ne za stvarne Stefanusove
granice, koje često padaju usred rečenice ili Homerovog stiha. Sva sidra u tom
rasponu poravnata su prema grčkom izvoru u oba prevoda. Tekst prevoda nije
menjan. Izuzetak je `540a`, opisan zasebno u ION-001.

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

## Platon — ostali dijalozi

### PLATO-001 — granice odeljaka nisu svuda Stefanusove granice

- status: **otvoren**
- vrsta: `sidro`
- mesto: naročito Lisid 213c; proveriti sva još nepregledana sidra

Prevodi ponegde počinju ranije ili završavaju kasnije od odgovarajućeg grčkog
odeljka. Sidra treba filološki poravnati delo po delo, bez automatskog pomeranja
teksta prema dužini.

### EUTH-001 — pomerena završna sidra 13a–16a

- status: **rešen**
- vrsta: `sidro`
- mesto: Eutifron 13a–16a

Sidra su bila postavljena na granice replika i pasusa umesto na stvarne
Stefanusove granice. Pomak je rastao prema kraju: pod `15d` je stajala rasprava
o darovima bogovima, dok grčki `15d` već pripada završnom Sokratovom pozivu
Eutifronu da ne ode bez odgovora. Svih 16 sidara od `13a` do `16a` poravnato je
u srpskom i staroslovenskom tekstu, bez menjanja prevoda. Po završetku raspona
`2a`–`6e`, opisanog u EUTH-004, sva sidra dela su pregledana i poravnata.

### EUTH-002 — pomerena sidra 10a–12e

- status: **rešen**
- vrsta: `sidro`
- mesto: Eutifron 10a–12e

Kontrolni prolaz posle popravke završetka pokazao je da je pomak postojao i u
prethodnom rasponu. Na primer, grčki `10a` počinje Sokratovim pitanjem da li
bogovi vole sveto zato što je sveto ili je ono sveto zato što ga vole, dok
je prevod pod nekadašnjim `10a` još završavao prethodnu raspravu. Svih 15
sidara poravnato je u oba jezika bez promene teksta; provereni su redosled,
jedinstvenost, generatori i tipovi.

### EUTH-003 — pomerena sidra 7a–9e

- status: **rešen**
- vrsta: `sidro`
- mesto: Eutifron 7a–9e

Sidra su bila postavljena uglavnom na početke replika i pasusa, premda grčke
Stefanusove granice u ovom rasponu često padaju usred rečenice. Na primer,
`7a` počinje drugim članom definicije svetoga (ono što bogovima nije milo),
`8a` usred suprotstavljanja pravednog i nepravednog, a `9b` prilogom „jasno”
usred Sokratovog poziva na dokazivanje. Svih 15 sidara poravnato je u srpskom
i staroslovenskom tekstu bez promene prevoda; potvrđeni su broj, jedinstvenost,
redosled, generatori i provera tipova.

### EUTH-004 — pomerena početna sidra 2a–6e

- status: **rešen**
- vrsta: `sidro`, `alat`
- mesto: Eutifron 2a–6e

Početni raspon pregledan je novim poluautomatskim postupkom koji prikazuje
grčku granicu uz oba prevoda, a zatim primenjuje samo filološki potvrđene,
jednoznačne tekstualne lokatore. Od 24 sidra, `2a`, `2b` i `3b` već su bila
tačna; ostalo 21 sidro pomereno je u oba jezika. Alat je potvrdio da tekst
prevoda bez komentara nije promenjen. Eutifron sada ima svih 70 pregledanih,
jedinstvenih i pravilno poređanih sidara.

## Platon — Lisid

### LYS-001 — dupliran i nepotpun Ktesipov govor 204c–204d

- status: **rešen**
- vrsta: `dodatak`, `izostavljanje`, `tačnost-sr`, `tačnost-stsl`
- mesto: Lisid 204c–204d

Oba prevoda ponavljala su početak Ktesipove replike, a duža verzija ipak nije
sadržala završetak grčkog odeljka `204d`. Kraća duplirana verzija uklonjena je
iz srpskog i staroslovenskog teksta, a u sačuvanu repliku prevedene su četiri
izostavljene rečenice o Hipotalovoj prozi, pesmama i spisima, njegovom pevanju
Lisidu i crvenjenju pred Sokratovim pitanjem. Sidra `204c`–`204e` ponovo su
proverena; deklarativna mapa ostaje idempotentna, a generatori i provera tipova
prolaze.

### LYS-002 — pomerena sidra 203a–206e

- status: **delimično rešen**
- vrsta: `sidro`
- mesto: Lisid 203a–206e; potom nastaviti od 207a

Prvih 17 Stefanusovih granica pregledano je pomoću deklarativne mape. Šest
sidara već je bilo tačno, a 11 je pomereno u oba prevoda bez promene teksta.
Prošli su provera ponovne primene mape, generatori i tipovi. Delo ima još 82
sidra, od `207a` do `223b`, koja treba pregledati pre zatvaranja ovog zapisa.

## Pravilo vođenja dnevnika

Za svaki novi problem zapisati delo, precizno kanonsko mesto, jezik, vrstu,
status, kratak opis i uslov pod kojim se može smatrati rešenim. Ako se problem
popravi, ne brisati zapis: promeniti status u **rešen** i ukratko navesti šta je
urađeno.
