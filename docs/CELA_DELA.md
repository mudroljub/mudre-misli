# Čitava filozofska dela

Čitava pisma, dijalozi, knjige i zbirke čuvaju se u `data/works`. Kratke
izreke, biografski podaci i kratka svedočanstva ostaju u `data/quotes`.

## Struktura

Svako delo ima svoj direktorijum:

```text
data/works/<author>/<work>/
  work.json
  <work>.sr.md
  <work>.stsl.md
```

`work.json` je jedini autoritet za identitet, metapodatke, redosled i sidra.
Markdown fajlovi sadrže nevidljiva kanonska sidra kao HTML komentare:

```md
<!-- anchor:43a -->Tekst odeljka koji može početi i usred pasusa.

Nastavak teksta <!-- anchor:43b -->i početak sledećeg kanonskog odeljka.
```

Sidro se postavlja na tačno mesto prema izvorniku, čak i usred rečenice. Ono
se čitaocu ne prikazuje i ne sme se koristiti kao razlog za veštačko cepanje
pasusa. Sadržaj, adrese i generator i dalje koriste njegovu vrednost.

Jedno delo po pravilu ima po jedan opisno nazvan fajl za svaki jezik, na primer
`crito.sr.md` i `crito.stsl.md`. Veoma veliko delo može imati po jedan fajl za
svaku knjigu ili drugu veliku celinu. Epiktetovi `Razgovori`, na primer, koriste
`book-i.sr.md`, `book-i.stsl.md` i tako dalje.

Primer manifesta:

```json
{
  "id": "mw-000002",
  "slug": "crito",
  "author": "Plato",
  "kind": "dialogue",
  "title": {
    "sr": "Kriton",
    "stsl": "Крітонъ"
  },
  "originalTitle": "Κρίτων",
  "source": {
    "name": "canonical-greekLit",
    "work": "tlg0059.tlg003"
  },
  "citationScheme": "stephanus",
  "sections": [
    {
      "anchor": "43a",
      "file": "crito"
    }
  ]
}
```

## Identitet

- Celo delo ima jedan trajni `id`.
- Novi identifikatori dela imaju oblik `mw-000001`.
- Delo preseljeno iz `data/quotes` čuva postojeći `mm-*` identifikator.
- Odeljci nemaju zasebne `mm-*` ili `mw-*` identifikatore.
- `anchor` je stabilno unutrašnje sidro prema kanonskoj podeli dela, na primer
  `43a`, `I.1` ili `12`.
- Promena prevoda, naslova ili putanje Markdown fajla ne menja `id` ni
  kanonsko sidro.

## Vrste i sistemi citiranja

Dozvoljene vrste su:

```text
dialogue, treatise, letter, handbook, collection, poem
```

Dozvoljeni sistemi citiranja su:

```text
stephanus, book-chapter, section, fragment
```

## Build i provera

Komanda:

```bash
npm run build:works
```

proverava:

- jedinstvenost identifikatora dela i njihovu koliziju sa citatima;
- jedinstvenost para autor–slug;
- obavezne metapodatke;
- postojanje i jedinstvenost sidara;
- postojanje oba jezička fajla za svaki deo ili knjigu;
- da prevodni fajlovi nisu prazni;
- da se svako kanonsko sidro u odgovarajućem fajlu pojavljuje tačno jednom.

Iz proverenih manifesta generiše se `data/works-index.json`. Taj fajl je
generisan i ne menja se ručno.

Komanda `npm run build:work-originals` povezuje svaki odeljak sa izvornim
grčkim tekstom u `data/sources` i generiše `data/work-originals.json`. Provera
se prekida ako izvor ili kanonsko sidro ne postoje, tako da prevod ne može
neopaženo ostati vezan za pogrešan odeljak. Generisani fajl se ne menja ručno.

### Filološko poravnanje sidara

Za pregled granica koristi se:

```bash
npm run audit:work-anchors -- plato/euthyphro 2a 6e 320
```

Posle putanje dela mogu se navesti prvo sidro, poslednje sidro i broj znakova
konteksta. Za svaku granicu alat prikazuje kraj prethodnog i početak narednog
grčkog odeljka, kao i sadašnji položaj u oba prevoda.

Provereni položaji čuvaju se kao jednoznačni tekstualni lokatori u
`tools/anchor-maps/`. Primer jednog zapisa:

```json
"7a": {
  "sr": { "before": "a ono što im nije milo" },
  "stsl": { "before": "єже же не любо" }
}
```

Mapa se najpre proverava bez zapisivanja:

```bash
npm run align:work-anchors -- tools/anchor-maps/euthyphro.json
```

Tek posle pregleda predloženih pomeranja primenjuje se neposrednim pozivom:

```bash
node tools/apply-work-anchor-map.mjs tools/anchor-maps/euthyphro.json --write
```

Alat odbija nepostojeće i nejedinstvene lokatore, duplikate i promenu
redosleda. Pre zapisivanja uklanja sidra i proverava da je sam tekst prevoda
ostao potpuno jednak; prikazuje i njegov skraćeni SHA-256 otisak. Zato mapa
automatizuje samo fizičko pomeranje, dok položaj i dalje mora biti filološki
određen prema grčkom izvorniku.

`npm run build:data` paralelno gradi citate i lanac dela–izvornici. `npm run
build` automatski pokreće generatore, dok `npm run dev` koristi već generisane
fajlove i zatim prati izmene citata.

Lokalni `npm run build` proverava serverski build bez izvoza hiljada statičkih
adresa. GitHub Pages koristi `npm run build:static`; tada se unapred generišu
svi citati, ali za čitava dela samo početna sidra stvarnih čitalačkih stranica.

## Prikaz

Spisak dela nalazi se na:

```text
/<lang>/dela
```

Čitač jednog odeljka koristi:

```text
/<lang>/dela/<author>/<work>/<anchor>
```

Osnovna adresa dela preusmerava na prvi odeljak. Čitač podržava sadržaj,
prethodni i sledeći odeljak, izbor jezika i preslovljavanje.
Ispod prevoda je sklopivi izvorni grčki tekst sa latiničnim preslovljavanjem.

Stranica autora automatski prikazuje sva dela čiji manifest ima odgovarajuće
polje `author`.

## Migrirani sadržaj

U novi sistem preneti su:

- Platon: `Klitofont`, `Kriton`, `Eutifron`, `Ion`, `Lisid`, `Parmenid`;
- Epiktet: `Enhiridion` i četiri knjige `Razgovora` objedinjene u jedno delo;
- Epikur: `Pismo Menoikeju`, `Glavne misli`, `Pismo Pitoklu` i `Pismo
  Herodotu`.

Četiri Epikurova dela zadržala su identifikatore `mm-001128`–`mm-001131`.
Stare `/quotes/<id>` adrese preusmeravaju na novi čitač. Stari veliki Markdown
fajlovi Platona i Epikteta i stari Epikurovi JSON unosi uklonjeni su nakon
provere migracije; direktorijumi sa manifestima jedini su izvor za aplikaciju.
