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
Markdown fajlovi sadrže tekst prevoda sa kanonskim sidrima kao naslovima, kako
bi ostali pogodni za ljudsko uređivanje:

```md
## 43a

Tekst odeljka...

## 43b

Tekst sledećeg odeljka...
```

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
stephanus, book-chapter, section
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

`npm run build:data` redom gradi citate, dela i njihove izvornike. `npm run dev`
i `npm run build` automatski pokreću sva tri generatora.

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
