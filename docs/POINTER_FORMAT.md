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

## Provera i generisanje

```bash
node tools/build-quotes.mjs
node tools/build-source-map.mjs
npm run audit:duplicates
```

Build proverava da TEI fajl postoji i da svaki Diogenov pointer označava
postojeću knjigu i odeljak. Svi unosi kojima je Diogen primarni izvor moraju
dobiti pointer.
