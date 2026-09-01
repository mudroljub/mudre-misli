# Pointeri ka izvorima

`pointer` se ne unosi ručno u `data/quotes/*.json`, već ga
`tools/build-quotes.mjs` generiše iz prvog elementa niza `sources`.

## Diogen Laertije: TEI/CTS pointer

Diogenov jedini lokalni tekst izvora je:

`data/sources/diogenes-laertius/diogenes-laertius.xml`

Pointer neposredno označava CTS prolaz, bez posrednog tekstualnog fajla:

```text
data/sources/diogenes-laertius/diogenes-laertius.xml#8.17
data/sources/diogenes-laertius/diogenes-laertius.xml#8.48-49
```

Deo iza `#` ima oblik `knjiga.odeljak` ili
`knjiga.početni-odeljak-završni-odeljak`. Brojevi knjiga u pointeru su arapski,
dok se u bibliografskoj referenci zadržavaju rimski brojevi (`VIII.17`).

Ovaj oblik je stabilan pri preformatiranju XML fajla, za razliku od broja
fizičke linije. Ako TEI ponavlja broj odeljka na granici dve biografije, CTS
pointer i dalje verno čuva oznaku izdanja; `originalText` služi za izbor tačnog
teksta pri proveri sadržaja.

Primer izvornog unosa:

```json
{
  "sr": "Ne razgorevaj vatru nožem.",
  "originalText": "πῦρ μαχαίρᾳ μὴ σκαλεύειν.",
  "sources": [
    {
      "name": "diogenes-laertius",
      "reference": "VIII.17"
    }
  ]
}
```

Generisani unos dobija:

```json
{
  "pointer": "data/sources/diogenes-laertius/diogenes-laertius.xml#8.17"
}
```

## Linijski pointeri drugih izvora

Izvori koji nemaju CTS hijerarhiju koriste oblik:

```text
file:line#anchor
```

`anchor` je opcioni provereni deo izvornog teksta. Primer:

```text
data/sources/hermann-diels/philosophers/12-Heraclitus.txt:42#πῦρ
```

Walter Burley koristi pointer ka početku lokalnog poglavlja bez anchora, jer
OCR tekst nije dovoljno stabilan za preciznije tekstualne oznake.

Porfirijev `Život Plotinov` koristi stabilnu oznaku odeljka iz lokalnog HTML-a
sačuvanog unutar JSON odgovora:

```text
data/sources/porphyry/vita-plotini.el-wikisource.parse.json#p14
```

Plotinove `Eneade` koriste trodelni CTS prolaz
`eneada.rasprava.odeljak`. Bibliografska referenca zadržava rimski broj
Eneade, dok pointer koristi arapski broj:

```text
data/sources/First1KGreek/data/tlg2000/tlg001/tlg2000.tlg001.1st1K-grc1.xml#1.6.8
data/sources/First1KGreek/data/tlg2000/tlg001/tlg2000.tlg001.1st1K-grc1.xml#5.1.6-7
```

Jamblihovo delo `O pitagorejskom životu` koristi CTS prolaz
`poglavlje.odeljak`, a Porfirijev `Život Pitagore` broj odeljka:

```text
data/sources/First1KGreek/data/tlg2023/tlg001/tlg2023.tlg001.1st1K-grc1.xml#15.64
data/sources/First1KGreek/data/tlg2034/tlg002/tlg2034.tlg002.1st1K-grc1.xml#37
```

Platonovi dijalozi `Protagora` i `Teetet` koriste provereni linijski pointer
na lokalni TEI, izveden iz prve navedene Stefanove oznake (`317b`, `166d` i
slično). Bibliografska referenca može obuhvatiti raspon, dok pointer vodi na
početak tog raspona.

## Provera i generisanje

```bash
node tools/build-quotes.mjs
node tools/build-source-map.mjs
npm run audit:duplicates
```

Build proverava da TEI fajl postoji i da svaki Diogenov pointer označava
postojeću knjigu i odeljak. Svi unosi kojima je Diogen primarni izvor moraju
dobiti pointer.
