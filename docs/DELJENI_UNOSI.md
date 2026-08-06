# Shared Entries - Pravila za višestruke autore

## Kada koristiti `author: ["A", "B"]`

Entry može imati **niz autora** kada informacija **podjednako pripada obema biografijama** i tekst ima smisla na obe stranice.

## Kako pronaći kandidate za deljenje

### Metoda: Cross-reference pretraga

Za glavne filozofe (Tales, Pitagora, Heraklit, Parmenid, Empedoklo, Sokrat, Platon, Aristotel, Zenon iz Kitijuma, Epikur):

1. **Pretraži ime filozofa u SVIM drugim fajlovima**
   - Ne samo u njegovom sopstvenom fajlu
   - Traži u `sr`, `stsl`, `originalText` poljima
   
2. **Tipovi odnosa koji se mogu deliti:**
   - Učitelj-učenik relacija
   - Susret, razgovor, debate
   - Kritika (jedan kritikuje drugog)
   - Uticaj ("inspirisan X-om")
   - Saradnja, prijateljstvo
   - Konflikt, neslaganje
   - Citiranje, komentarisanje

3. **Proveri da li je ISTA referenca**
   - Ako `Platon.json` pominje Sokrata sa `reference: "III.5"`
   - I `Sokrat.json` ima entry sa `reference: "III.5"`
   - → Oba entry-ja potiču iz istog pasusa u izvoru
   - → **Kandidat za deljenje!**

### Primer pretrage - KORISTI GRČKA IMENA!

**VAŽNO**: Pretraži `originalText` polje sa grčkim imenima, ne srpska imena!

```bash
# Nađi sve fajlove gde se pominje "Σωκράτ" (Sokrat na grčkom)
grep -l "Σωκράτ" data/quotes/*.json | grep -v "Sokrat.json"

# Proveri reference u pronađenim fajlovima:
grep -B2 "Σωκράτ" data/quotes/Platon.json | grep reference

# Proveri da li Sokrat.json ima istu referencu:
grep "III.34" data/quotes/Sokrat.json
```

Ako se **ista referenca** pojavljuje u oba fajla → primeni pravila ispod.

### Potvrđeni parovi sa deljenom referencom

**1. Empedoklo ↔ Gorgija | VIII.58**
- Empedoklo.json: Γοργίαν... (VIII.58)
- Gorgias.json: implicitno pominje učitelja (VIII.59 referiše na VIII.58)
- Odnos: učitelj-učenik
- Status: ✅ Već refaktorisano sa `author: ["Gorgias", "Empedocles"]`

**2. Parmenid ↔ Zenon iz Eleje | IX.25**
- Parmenid.json: Ζήνων ὁ Ἐλεάτης καὶ ἐρώμενος (IX.25) - obrisano
- Zenon_iz_Eleje.json: Ζήνων Ἐλεάτης ἤκουσεν... Παρμενίδου (IX.25)
- Odnos: učitelj-učenik, usvojeni sin
- Status: ✅ Refaktorisano sa `author: ["Zeno of Elea", "Parmenides"]`

## Pravilo za odlučivanje

### ✅ KORISTI NIZ - kada:

1. **Rečenica pominje oba imena eksplicitno**
   ```json
   {
     "sr": "Gorgija iz Leontina bio učenik Empedokla iz Akraganta.",
     "author": ["Gorgias", "Empedocles"]
   }
   ```
   - Čita se prirodno u obe biografije
   - Obe osobe su imenovane
   - Informacija je podjednako važna za obe

2. **Informacija je inherentno dvosmerna**
   - Učitelj-učenik relacija
   - Prijateljstvo, savez, debate
   - Zajedničko delo, susret, događaj

### ❌ NE KORISTI NIZ - kada:

1. **Tekst referiše jednog po imenu, a drugog sa "on"/"njegov"/"mu"**
   
   **Loše** (ne kopirati ovako):
   ```json
   {
     "sr": "Bio je Empedoklov učenik i postao izvanredan govornik.",
     "author": ["Gorgias", "Empedocles"]  // ❌ NE!
   }
   ```
   Razlog: "Bio je" odnosi se na Gorgiju, ali kod Empedokla bi značilo "Empedoklo je bio Empedoklov učenik" - besmisleno.

2. **Informacija je asimetrična**
   - Detalji o učenikovom životu (samo kod učenika)
   - Ocena jednog o drugom (kod onog ko ocenjuje)
   - Anegdota iz perspektive jednog

## Kako refaktorisati

Ako originalni tekst ima zamenice/posesive:

**Original kod Gorgija:**
```
"Bio učenik Empedokla iz Akraganta i izvanredan govornik..."
```

**Original kod Empedokla:**
```
"Gorgija iz Leontina bio njegov učenik."
```

### Opcija 1: Preformuliši u neutralan oblik

```json
{
  "sr": "Gorgija iz Leontina bio učenik Empedokla iz Akraganta; postao izvanredan govornik i živeo sto devet godina.",
  "stsl": "Горгїа Леонтиискыи ѹченикъ Емпедокла отъ Акраганта бѣ · пръсвѣтьлъ витїꙗ быстъ · живѣ сто и девѧть лѣтъ.",
  "author": ["Gorgias", "Empedocles"],
  "source": "diogenes-laertius",
  "reference": "VIII.58"
}
```

Provera: "Gorgija... bio učenik Empedokla..." - ✅ ima smisla u obe biografije

### Opcija 2: Kopiraj zasebno ako su perspektive različite

Ako je nemoguće neutralno formulisati (npr. anegdota iz jedne perspektive), ostavi dva odvojena entry-ja.

## Primeri iz prakse

### ✅ Dobar primer - Niz autora

```json
{
  "sr": "Zenon Elejski bio učenik Parmenida, usvojeni sin i prisni miljenik.",
  "author": ["Zenon iz Eleje", "Parmenid"]
}
```
✅ Oba imena, informacija važna za obe biografije

### ❌ Loš primer - NE koristiti niz

```json
{
  "sr": "Prepustio kraljevski dostojanstvo bratu.",
  "author": ["Heraclitus", "???"]  // ❌ NE! Ko je brat?
}
```
❌ Odnosi se samo na Heraklita

### ⚠️ Granični slučaj - Preformuliši prvo

**Pre:**
```json
// Kod Talesa
{"sr": "Anaksimander bio njegov učenik.", "author": "Tales"}
// Kod Anaksimandra  
{"sr": "Bio učenik Talesa.", "author": "Anaxamander"}
```

**Posle:**
```json
{
  "sr": "Anaksimander iz Mileta bio učenik Talesa.",
  "author": ["Tales", "Anaxamander"]
}
```

## Prednosti ovog pristupa

✅ **Nema duplikacije** - jedna rečenica, prikazuje se na više strana  
✅ **Konzistentnost** - ne može biti različita na dve stranice  
✅ **Jednostavnost** - ne treba poseban tip ili referenca sistem  
✅ **Prirodnost** - tekst se čita prirodno na svakoj stranici

## Build proces

`tools/build-quotes.mjs` automatski ekspanduje:

```javascript
// U source JSON:
{"author": ["A", "B"], ...}

// Generiše se u quotes.json:
{"_id": 1, "author": "A", ...}
{"_id": 2, "author": "B", ...}  // isti tekst, različit _id
```

Svaki autor dobija odvojenu kopiju sa svojim `_id` i `pointer` (ako je potrebno).
