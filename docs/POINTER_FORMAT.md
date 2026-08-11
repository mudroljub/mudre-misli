# Pointer Format Dokumentacija

> **VAŽNO**: Pointeri se **NE čuvaju u source JSON fajlovima** (`data/quotes/*.json`).  
> Oni se **automatski generišu tokom build procesa** (`node tools/build-quotes.mjs`)  
> i nalaze se samo u finalnom `data/quotes.json` fajlu.

## Format (Verzija 2.0 - Sources Array)

Od verzije 2.0, citati koriste **sources array** umesto pojedinačnih `source`/`reference` polja.

### Struktura u source JSON fajlovima:

```json
{
  "sr": "Tekst citata...",
  "originalText": "...",
  "sources": [
    {
      "name": "diogenes-laertius",
      "reference": "IX.1"
    },
    {
      "name": "hermann-diels",
      "reference": "B.8"
    }
  ]
}
```

**Multi-source primena**: Prvi izvor u nizu je primarni (npr. originalni fragment), dodatni izvori su cross-reference.

### Struktura u finalnom quotes.json:

```json
{
  "sr": "Tekst citata...",
  "sources": [...],
  "pointer": "data/sources/diogenes-laertius/el/09.txt:185#πῦρ μ"
}
```

**Napomena**: `pointer` se generiše iz **prvog izvora** u `sources` nizu.

## Pointer format

```
file:line#anchor
```

### Podržani izvori:

**1. Diogenes Laertius** (`name: "diogenes-laertius"`)
```json
{
  "name": "diogenes-laertius",
  "reference": "IX.1"
}
```

Generisani pointer:
```
"pointer": "data/sources/diogenes-laertius/el/09.txt:185"
"pointer": "data/sources/diogenes-laertius/el/09.txt:185#πῦρ μ"  (sa anchorom)
```

**2. Walter Burley** (`name: "walter-burley"`)
```json
{
  "name": "walter-burley",
  "reference": "Cap. XXVI"
}
```

Generisani pointer:
```
"pointer": "data/sources/walter-burley/latin_raw/gorgias.txt:1"
```

**3. Hermann Diels** (`name: "hermann-diels"`)
```json
{
  "name": "hermann-diels",
  "reference": "B.8"
}
```

**Reference format**: Diels-Kranz brojevi (DK system)
- `A.1`, `A.2`, ... = Leben und Lehre (sekundarne reference)
- `B.1`, `B.8`, ... = Fragmente (autentični tekstovi filozof)

*Status*: Pointer generisanje za Diels je u razvoju (TODO).

### Kako dodati novi izvor:

Dodaj builder funkciju u `tools/build-quotes.mjs`:

```javascript
pointerBuilders['novi-izvor'] = async (reference) => {
  // Parsiraj reference format specifičan za ovaj izvor
  // Pronađi odgovarajući fajl u data/sources/
  // Vrati "file:line" ili null
}
```

## Komponente

| Deo | Opis | Primer |
|-----|------|--------|
| `file` | Putanja do grčkog izvora | `data/sources/diogenes-laertius/el/03.txt` |
| `line` | Linija gde počinje odeljak | `185` |
| `anchor` | Provereni jedinstveni deo grčkog teksta citata | `πῦρ μ` |

## Kada postoji anchor?

Anchor se dodaje samo Diogenovim navodima koji dele isti odeljak sa drugim
unosima i kada se izabrani deo teksta zaista nalazi u tom odeljku. Razlike u
veličini slova i Unicode normalizaciji usklađuju se sa oblikom iz izvora. Ako je
`originalText` parafraza ili varijanta bez dovoljnog tekstualnog preseka,
pointer ostaje na nivou odeljka bez lažnog anchora.

Burleyjevi lokalni OCR fajlovi nisu svuda potpuni niti dovoljno stabilni za
tekstualne anchore. Njihovi pointeri zato vode na fajl poglavlja, bez anchora.

## Upotreba za agente

### Parsiranje pointer-a:

```javascript
function parsePointer(pointer) {
  const [location, anchor] = pointer.split('#')
  const [file, line] = location.split(':')
  return { file, line: parseInt(line), anchor }
}
```

### Pronalaženje citata u izvoru:

```javascript
async function findQuoteInSource(quote) {
  const { file, line, anchor } = parsePointer(quote.pointer)
  
  // 1. Učitaj odeljak (prosečno 7 linija)
  const sectionText = await readSection(file, line)
  
  // 2. Ako ima anchor, nađi tačnu poziciju
  if (anchor) {
    const position = sectionText.indexOf(anchor)
    if (position !== -1) {
      // Pronađen tačan citat
      return extractQuote(sectionText, position)
    }
  }
  
  // 3. Fallback: traži ceo grčki tekst
  const position = sectionText.indexOf(quote.el)
  if (position !== -1) {
    return extractQuote(sectionText, position)
  }
  
  // 4. Ceo odeljak ako ništa drugo
  return sectionText
}
```

### Primer iz podataka (nova struktura):

```json
{
  "sr": "Ne razgorevaj vatru nožem.",
  "originalText": "πῦρ μαχαίρᾳ μὴ σκαλεύειν.",
  "sources": [
    {
      "name": "diogenes-laertius",
      "reference": "VIII.17"
    }
  ],
  "pointer": "data/sources/diogenes-laertius/el/09.txt:185#πῦρ μ"
}
```

Agent:
1. Otvara `el/09.txt`
2. Ide na liniju 185
3. Traži `πῦρ μ` u narednih ~7 linija
4. Pronalazi: `πῦρ μαχαίρᾳ μὴ σκαλεύειν.`
5. Može verifikovati/prevoditi sa kontekstom

## Statistika

**Odeljci u izvorima:**
- Prosečna veličina: 7 linija
- 83% odeljaka ≤ 10 linija
- 6% odeljaka > 20 linija

**Anchor dužina:**
- Minimum: 5 karaktera
- Maksimum: 9 karaktera
- Prosek: 5 karaktera

**Preciznost:**
- Pointer + anchor → tačnost na ±2 linije
- Bez anchor-a → tačnost na ±7 linija (ceo odeljak)

## Kako proveriti pointere

```bash
# 1. Build-uj quotes.json iz source fajlova
node tools/build-quotes.mjs

# 2. Proveri koliko citata ima pointer
grep -c '"pointer"' data/quotes.json

# 3. Proveri primere
grep '"pointer"' data/quotes.json | head -10

# 4. Nađi citate bez pointera (nemaju validan reference)
grep -L '"pointer"' data/quotes.json
```

**Očekivani rezultat**: ~98% citata ima pointer.

**Trenutna statistika** (avgust 2026):
- **1523/1581 (96,3%)** unosa ima pointer
- **Diogen Laertije**: 1441/1441 primarni navod sa pointerom
- **Walter Burley**: 82/82 primarna navoda sa lokalnim poglavljem i pointerom
- **1211** Diogenovih pointera ima provereni anchor
- **Bez pointera**: 58 unosa iz izvora za koje namerno nema lokalnog resolvera
  (Hermann Diels 55, Plutarh 2, *Dissoi Logoi* 1)

## Generisanje

Anchori se automatski generišu u `tools/build-quotes.mjs`:

1. Grupiše citate po `file:line`
2. Ako više Diogenovih citata deli istu lokaciju → detektuje koliziju
3. Za svaki citat nalazi minimalni jedinstveni deo iz `originalText`
4. Proverava da deo zaista postoji u ciljnom odeljku i preuzima njegov tačan
   Unicode oblik iz izvora
5. Dodaje `#anchor`; ako nema pouzdanog preseka, ostavlja samo `file:line`

**Algoritam:**
```javascript
// Nađi najkraći jedinstveni prefix
for (let len = 5; len <= 50; len++) {
  const candidate = text.substring(0, len)
  if (onlyOneQuoteStartsWith(candidate)) {
    anchor = candidate
    break
  }
}
```

## Prednosti ovog formata

✅ **Precizno** - anchor razrešava 58% kolizija  
✅ **Kompaktno** - sve informacije u jednom string-u  
✅ **Parsibilno** - jednostavni split na `#` i `:`  
✅ **Robust** - svaki sačuvani anchor je substring stvarnog izvornog odeljka  
✅ **Automatsko** - generiše se iz postojećih podataka

## Backward kompatibilnost

Pointer bez anchor-a je i dalje validan:
```
data/sources/diogenes-laertius/el/03.txt:59
```

Agent samo proverava da li postoji `#` u pointer string-u.
