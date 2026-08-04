# Pointer Format Dokumentacija

## Format

Pointer precizno locira izvorni grčki tekst citata u Diogenovim knjigama:

```
file:line#anchor
```

### Primeri:

**Bez anchor-a** (jedinstveni citat u odeljku):
```
"pointer": "data/sources/diogenes-laertius/el/03.txt:59"
```

**Sa anchor-om** (više citata iz istog odeljka):
```
"pointer": "data/sources/diogenes-laertius/el/09.txt:185#πῦρ μ"
```

## Komponente

| Deo | Opis | Primer |
|-----|------|--------|
| `file` | Putanja do grčkog izvora | `data/sources/diogenes-laertius/el/03.txt` |
| `line` | Linija gde počinje odeljak | `185` |
| `anchor` | Prvih 5-9 karaktera grčkog teksta citata | `πῦρ μ` |

## Kada postoji anchor?

- **51% citata** ima anchor - oni koji dele odeljak sa drugim citatima
- **49% citata** nema anchor - jedinstveni su u svom odeljku

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

### Primer iz podataka:

```json
{
  "sr": "Ne razgorevaj vatru nožem.",
  "el": "πῦρ μαχαίρᾳ μὴ σκαλεύειν.",
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

## Generisanje

Anchori se automatski generišu u `tools/build-quotes.mjs`:

1. Grupiše citate po `file:line`
2. Ako više citata deli istu lokaciju → detektuje koliziju
3. Za svaki citat nalazi minimalni jedinstveni prefix iz `quote.el`
4. Dodaje `#anchor` na pointer

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
✅ **Robust** - anchor je substring stvarnog teksta  
✅ **Automatsko** - generiše se iz postojećih podataka

## Backward kompatibilnost

Pointer bez anchor-a je i dalje validan:
```
data/sources/diogenes-laertius/el/03.txt:59
```

Agent samo proverava da li postoji `#` u pointer string-u.
