# Strategija integracije izvornih fragmenata

**Datum**: 2026-08-07  
**Problem**: Kako integrisati autentične Diels fragmente sa postojećim Diogenes reported tekstovima?

---

## Trenutno stanje

### Postojeći podaci (Diogenes Laertius)
- **Tip**: Sekundarne reference ("šta DRUGI kažu o filozofu")
- **Primer**: Heraklit.json ima 33 entries, svi `type: reported` ili `bio`
- **Format**: 
  ```json
  {
    "type": "quote",
    "sr": "Mnogoznanje ne uči umu...",
    "originalText": "πολυμαθίη νόον οὐ διδάσκει...",
    "sources": [{"name": "diogenes-laertius", "reference": "IX.1"}]
  }
  ```

### Novi podaci (Hermann Diels)
- **Tip**: Primarne reference ("šta je filozof SAM napisao")
- **Status**: 39+ fragmenata parsirano, nisu integrisani
- **Format**: DK sistem (B.1, B.2... = autentični fragmenti)
- **Fajl**: `data/sources/hermann-diels/philosophers/12-Heraclitus-fragments.json`

---

## Problem: Duplikati i verzije

**Isti sadržaj, različiti izvori**:

| Diogenes IX.1 | Diels B.40 |
|--------------|------------|
| πολυμαθίη νόον **οὐ** διδάσκει | πολυμαθίη νόον **ἔχειν οὐ** διδάσκει |
| Reported verzija | Kritički uspostavljen tekst |

**Pitanje**: Kako prikazati obe verzije?

---

## STRATEGIJA 1: **Diels kao primarni, ostalo u "Versions" sekciji**

### Koncept
Ako postoji Diels fragment (autentičan), on ide u glavni prikaz. Ostale verzije (Diogenes, Plutarch) u zasebnu sekciju.

### Data struktura
```json
{
  "type": "quote",
  "sr": "Mnogoznanje ne uči posedovanje uma...",
  "stsl": "...",
  "originalText": "πολυμαθίη νόον ἔχειν οὐ διδάσκει...",
  "author": "Heraclitus",
  
  "sources": [
    {"name": "hermann-diels", "reference": "B.40"}
  ],
  
  "versions": [
    {
      "sr": "Mnogoznanje ne uči umu...",
      "originalText": "πολυμαθίη νόον οὐ διδάσκει...",
      "sources": [{"name": "diogenes-laertius", "reference": "IX.1"}],
      "note": "Reported verzija kod Diogena Laertija"
    }
  ]
}
```

### UI prikaz
**Glavni prikaz**:
> πολυμαθίη νόον ἔχειν οὐ διδάσκει  
> Izvor: Hermann Diels B.40

**Klik na "Verzije" (expand)**:
> **Druga verzija** (Diogenes Laertius IX.1):  
> πολυμαθίη νόον οὐ διδάσκει  
> _Reported verzija, minor textual variant_

### ✅ Prednosti
- Prioritet autentičnom tekstu
- Ne gubimo alternativne verzije
- Jasna hijerarhija (primarni vs sekundarni)

### ❌ Mane
- Kompleksna migracija (1300+ entries)
- Treba odlučiti koje verzije su "iste"
- UI komponenta za expand/collapse

---

## STRATEGIJA 2: **Zasebni entries sa cross-reference**

### Koncept
Svaki izvor = zaseban entry. Povezani preko `relatedTo` polja.

### Data struktura
```json
// Entry 1: Diels (primarni)
{
  "type": "quote",
  "sr": "Mnogoznanje ne uči posedovanje uma...",
  "originalText": "πολυμαθίη νόον ἔχειν οὐ διδάσκει...",
  "author": "Heraclitus",
  "sources": [{"name": "hermann-diels", "reference": "B.40"}],
  "relatedTo": [1234]  // ID drugog entry-ja
}

// Entry 2: Diogenes (sekundarni)
{
  "type": "reported",
  "sr": "Mnogoznanje ne uči umu...",
  "originalText": "πολυμαθίη νόον οὐ διδάσκει...",
  "author": "Heraclitus",
  "sources": [{"name": "diogenes-laertius", "reference": "IX.1"}],
  "relatedTo": [1233]  // ID prvog entry-ja
}
```

### UI prikaz
**Glavni listing**: Oba se prikazuju kao zasebne kartice

**Detail page**: "Povezani citati" sekcija sa linkovima

### ✅ Prednosti
- Jednostavna data struktura
- Ne menja postojeće entries
- Lako dodavanje novih izvora

### ❌ Mane
- Duplikati u listama (može zbuniti)
- Teško videti "šta je kanonski tekst"
- Treba UI logika za povezivanje

---

## STRATEGIJA 3: **Multi-source sa "canonical" flagom**

### Koncept
Jedan entry može imati više sources. Prvi source je "canonical".

### Data struktura
```json
{
  "type": "quote",
  "sr": "Mnogoznanje ne uči posedovanje uma...",
  "originalText": "πολυμαθίη νόον ἔχειν οὐ διδάσκει...",
  "author": "Heraclitus",
  
  "sources": [
    {
      "name": "hermann-diels",
      "reference": "B.40",
      "canonical": true,
      "text": "πολυμαθίη νόον ἔχειν οὐ διδάσκει..."
    },
    {
      "name": "diogenes-laertius",
      "reference": "IX.1",
      "text": "πολυμαθίη νόον οὐ διδάσκει...",
      "note": "Minor textual variant"
    }
  ]
}
```

### UI prikaz
**Glavni prikaz**: Canonical source (Diels)

**Detail page**: Svi izvori listani, svaki sa svojim `text` poljem

### ✅ Prednosti
- Jedan entry, više verzija
- Jasno koji je canonical
- Ne duplira metadata (sr, stsl)

### ❌ Mane
- `originalText` polje više nije jedinstveno
- Treba odlučiti: koji originalText ide u top-level?
- Kompleksna validacija

---

## STRATEGIJA 4: **Source priority + text variants polje**

### Koncept (PREPORUKA)
Kombinacija pristupa 1 i 3. Canonical text u `originalText`, varijante u `textVariants`.

### Data struktura
```json
{
  "type": "quote",
  "sr": "Mnogoznanje ne uči posedovanje uma...",
  "stsl": "...",
  "originalText": "πολυμαθίη νόον ἔχειν οὐ διδάσκει...",
  "author": "Heraclitus",
  
  "sources": [
    {"name": "hermann-diels", "reference": "B.40"},
    {"name": "diogenes-laertius", "reference": "IX.1"}
  ],
  
  "textVariants": [
    {
      "source": "diogenes-laertius",
      "text": "πολυμαθίη νόον οὐ διδάσκει...",
      "diff": "Missing 'ἔχειν'",
      "note": "Reported version, minor omission"
    }
  ]
}
```

### Logika
1. **Prvi source** u `sources` array = primarni (prikazuje se)
2. `originalText` = tekst **prvog source-a**
3. `textVariants` = samo ako postoje RAZLIKE u drugim izvorima
4. Ako su tekstovi identični → samo dodaj source u array, bez variant

### UI prikaz
**Glavni prikaz**:
> πολυμαθίη νόον ἔχειν οὐ διδάσκει  
> Izvor: Hermann Diels B.40; Diogenes Laertius IX.1

**Detail page - "Text Variants" tab**:
> **Diogenes Laertius IX.1** (reported version):  
> πολυμαθίη νόον οὐ διδάσκει  
> Diff: Missing 'ἔχειν' | Note: Minor omission in reported text

### ✅ Prednosti
- **Jednostavna** za slučaj identičnih tekstova (samo dodaj source)
- **Fleksibilna** za razlike (textVariants polje)
- **Ne duplicira** entries
- **Backward compatible** - postojeći entries ostaju isti
- **Canonical je jasan** - prvi u sources array

### ❌ Mane
- Treba algoritam za diff detection
- Odluka "koliko različit = nova varijanta vs greška"

---

## Migracija plan za Strategiju 4

### Faza 1: Mapiranje (ručno ili polu-automatski)
```javascript
// tools/map-diels-to-diogenes.mjs
{
  "heraclitus": {
    "B.40": {
      "matches": ["diogenes-laertius:IX.1"],
      "similarity": 0.95,
      "action": "merge" // ili "separate"
    }
  }
}
```

### Faza 2: Dodavanje textVariants
- Za mappinge sa `similarity < 1.0`
- Generiše diff string
- Dodaje note ako je potrebno

### Faza 3: Dodavanje novih fragmenata
- Fragmenti bez match-a u Diogenus → novi entries
- Primer: Diels B.1 (ne postoji kod Diogena) → dodati kao novi quote

### Faza 4: UI komponente
- `<TextVariants>` komponenta za prikaz varijanti
- Diff highlighting (optional)

---

## TypeScript types (Strategija 4)

```typescript
interface SourceReference {
  name: string;
  reference: string | null;
  pointer?: string;
}

interface TextVariant {
  /** Koji source ima ovu varijantu */
  source: string;
  
  /** Alternativni grčki/latinski tekst */
  text: string;
  
  /** Kratak opis razlike (opciono) */
  diff?: string;
  
  /** Dodatna napomena (opciono) */
  note?: string;
}

interface BaseEntry {
  // ... postojeća polja ...
  
  /** Array izvora (prvi = canonical) */
  sources: SourceReference[];
  
  /** Tekstualne varijante iz drugih izvora (opciono) */
  textVariants?: TextVariant[];
}
```

---

## Validacija i pravila

### Pravilo 1: Source Priority
**Diels > Plutarch > Diogenes Laertius**

Reasoning:
- Diels = kritički uspostavljen tekst (scholarly consensus)
- Plutarch = direktni citati (manji ali pouzdani)
- Diogenes = sekundarne reference (korisne ali manje precizne)

### Pravilo 2: Similarity threshold
- **> 95%** similar → merge sa textVariants
- **80-95%** similar → odluka case-by-case (ručno)
- **< 80%** similar → zasebni entries (možda različiti fragmenti)

### Pravilo 3: Translation priority
- `sr` i `stsl` prevodi se odnose na **canonical text** (originalText)
- Ako textVariant zahteva drugi prevod → dodati u variant objekt

---

## Primer kompletne integracije

### Pre (samo Diogenes):
```json
{
  "type": "quote",
  "sr": "Mnogoznanje ne uči umu...",
  "originalText": "πολυμαθίη νόον οὐ διδάσκει...",
  "sources": [{"name": "diogenes-laertius", "reference": "IX.1"}]
}
```

### Posle (Diels + Diogenes):
```json
{
  "type": "quote",
  "sr": "Mnogoznanje ne uči posedovanje uma...",
  "stsl": "...",
  "originalText": "πολυμαθίη νόον ἔχειν οὐ διδάσκει...",
  "author": "Heraclitus",
  
  "sources": [
    {"name": "hermann-diels", "reference": "B.40"},
    {"name": "diogenes-laertius", "reference": "IX.1"}
  ],
  
  "textVariants": [
    {
      "source": "diogenes-laertius",
      "text": "πολυμαθίη νόον οὐ διδάσκει...",
      "diff": "Omits 'ἔχειν' (to have/possess)",
      "note": "Reported version in Diogenes; Diels restores fuller reading from multiple sources"
    }
  ]
}
```

---

## PREPORUKA: **Strategija 4**

**Razlozi**:
1. ✅ Najjednostavnija za implementaciju
2. ✅ Backward compatible (ne ruši postojeće)
3. ✅ Skalabilna (lako dodati nove izvore)
4. ✅ Jasna hijerarhija (prvi source = canonical)
5. ✅ Ne gubi informacije (variants čuvaju sve verzije)
6. ✅ UI naturally prati strukturu

**Sledeći koraci**:
1. Napraviti mapping tool (Diels → Diogenes similarity)
2. Ažurirati TypeScript types
3. Dodati `textVariants` polje u schema
4. Kreirati UI komponentu za prikaz varijanti
5. Migrirati jedan filozof (Heraklit) kao pilot
6. Proširiti na ostale

---

## Reference

- [HERACLITUS_MAPPING.md](../data/sources/hermann-diels/HERACLITUS_MAPPING.md) - postojeća analiza
- [PODELA_I_DATIRANJE.md](PODELA_I_DATIRANJE.md) - pravila za tipove
- [POINTER_FORMAT.md](POINTER_FORMAT.md) - format source referenci
