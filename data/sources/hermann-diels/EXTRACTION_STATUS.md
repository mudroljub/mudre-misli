# Hermann Diels Extraction Status

**Datum**: 2026-08-07  
**Izvor**: Internet Archive b24869673 (1903, 1. izdanje)  
**OCR**: Tesseract 5.1.0 (2022) sa grčkom podrškom

---

## Status ekstrakcije

### ✅ Ekstraktovano i parsovano (6/16)

| # | Filozof | TXT Fajl | Fragmenti | Status |
|---|---------|----------|-----------|--------|
| 11 | Xenophanes | `philosophers/11-Xenophanes.txt` | 36 | ✅ |
| 12 | Heraclitus | `philosophers/12-Heraclitus.txt` | 38 | ✅ |
| 18 | Parmenides | `philosophers/18-Parmenides.txt` | 17 | ✅ |
| 19 | Zeno | `philosophers/19-Zeno.txt` | 3 | ⚠️ Poseban format |
| 21 | Empedocles | `philosophers/21-Empedocles.txt` | 140 | ✅ |
| 46 | Anaxagoras | `philosophers/46-Anaxagoras.txt` | 22 | ✅ |

**Ukupno: 256 fragmenata parsovano**

### ⏳ Za ekstrakciju (10/16)

Filozofi sa B. FRAGMENTE sekcijom koji čekaju ekstrakciju:

1. **3** - Anaximenes
2. **13** - Epicharmos
3. **14** - Alcmaeon
4. **20** - Melissus
5. **25** - Ion of Chios
6. **26** - Hippon
7. **32** - Philolaus
8. **35** - Archytas
9. **47** - Archelaus
10. **51** - Diogenes of Apollonia

---

## Sledeći koraci

### Faza 2A: Ekstrakcija preostalih filozofa
- [ ] Pronaći granice za preostalih 15 filozofa u band1.txt
- [ ] Ekstraktovati u `philosophers/` folder
- [ ] Ažurirati manifest.json sa linijskim granicama

### Faza 2B: Parsiranje fragmenata (pilot: Heraklit)
- [ ] Identifikovati sve B. fragmente u 12-Heraclitus.txt
- [ ] Parsirati DK brojeve (B.1, B.2, ...)
- [ ] Ekstraktovati grčki tekst + nemački prevod
- [ ] Mapirati na postojeće `data/quotes/Heraklit.json`

### Faza 3: Integracija
- [ ] Dodati Diels fragmente kao novi source u quotes
- [ ] Kreirati cross-reference: Diogenes ↔ Diels
- [ ] Implementirati pointer builder za hermann-diels

---

## Napomene

**OCR kvalitet**:
- ✅ Grčki tekst je čist Unicode (npr. `Ἡράκλειτος Βλύσωνος`)
- ✅ Nemački prevodi su čitljivi
- ⚠️ Ponekad postoje OCR greške u interpunkciji i brojevima
- ✅ Ukupno upotrebljiv za autentične fragmente!

**Prioritet**: Filozofi sa 🎯 oznakom (imamo ih u projektu) su prioritetni za integraciju.
