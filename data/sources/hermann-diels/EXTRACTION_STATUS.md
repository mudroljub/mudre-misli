# Hermann Diels Extraction Status

**Datum**: 2026-08-07  
**Izvor**: Internet Archive b24869673 (1903, 1. izdanje)  
**OCR**: Tesseract 5.1.0 (2022) sa grčkom podrškom

---

## Status ekstrakcije

### ✅ Ekstraktovano (1/16)

| # | Filozof | Fajl | Linije | Status |
|---|---------|------|--------|--------|
| 12 | Heraclitus (Herakleitos) | `philosophers/12-Heraclitus.txt` | 4101-6509 (2,409) | ✅ Verifikovano |

### ⏳ Za ekstrakciju (15/16)

Filozofi sa B. FRAGMENTE sekcijom koji čekaju ekstrakciju:

1. **3** - Anaximenes
2. **11** - Xenophanes (🎯 u projektu)
3. **13** - Epicharmos
4. **14** - Alcmaeon
5. **18** - Parmenides (🎯 u projektu)
6. **19** - Zeno (🎯 u projektu)
7. **20** - Melissus
8. **21** - Empedocles (🎯 u projektu)
9. **25** - Ion of Chios
10. **26** - Hippon
11. **32** - Philolaus
12. **35** - Archytas
13. **46** - Anaxagoras (🎯 u projektu)
14. **47** - Archelaus
15. **51** - Diogenes of Apollonia

**🎯 = Imamo u data/quotes/** (6 filozofa sa presekom)

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
