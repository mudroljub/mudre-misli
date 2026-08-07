# Die Fragmente der Vorsokratiker

Hermann Diels (1848–1922)

**De.**: Die Fragmente der Vorsokratiker: Griechisch und Deutsch  
**En.**: The Fragments of the Pre-Socratics: Greek and German  
**Srp.**: Fragmenti predsokratovaca: Grčki i nemački

Kritička edicija fragmenata predsokratovskih filozofa, osnovno naučno izdanje za proučavanje ranih grčkih mislilaca.

**Izdanje**: 1. Auflage, 1903  
**Izvor**: Internet Archive b24869673, Tesseract 5.1.0 OCR (2022)

---

## OCR kvalitet

**✅ VELIKI NAPREDAK** - Zamenjen stari korumpiran OCR (1912) sa novim čistim:

**Prethodno (1912 izdanje)**:
- ⚠️ Teške greške: `'HpaKXeixoi;` umesto `Ἡράκλειτος`
- ⚠️ Mešavina Latin/Greek karaktera: `BXöawvo<;` umesto `Βλόσωνος`
- ❌ Neupotreljiv za fragmente

**Sada (1903 izdanje, OCR 2022)**:
- ✅ Čist Unicode grčki tekst: `Ἡράκλειτος Βλύσωνος`
- ✅ OCR parametri: `-l deu+grc` (nemački + grčki)
- ✅ OCR detected lang: `el` (Greek) sa 100% confidence
- ✅ Upotrebljiv za autentične fragmente!

---

## Status ekstrakcije (2026-08-07)

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

## Struktura

**Fajlovi:**
- `band1.txt` (2.6M, 44,337 linija) - Glavni tom, 1903 izdanje, čist OCR
- `band2.txt` (1.2M, 44,946 linija) - Word Index (1912, manji prioritet)
- `manifest.json` - Mapiranje filozofa sa tačnim linijama
- `philosophers/` - Ekstraktovani pojedinačni fajlovi (6 od 16 sa fragmentima)

**Organizacija svakog filozofa:**
- **A. LEBEN UND LEHRE** - Život i učenje (sekundarne reference iz antičkih izvora)
- **B. FRAGMENTE** - Autentični fragmenti (direktni citati izgubljenih dela) - samo kod 16 filozofa

---

## Legenda

**Status ekstrakcije:**
- ✅ = Ekstraktovano u `philosophers/` fajl sa čistim OCR-om
- 📄 = U band1.txt ali samo A. LEBEN (bez B. FRAGMENTE)
- ⏳ = U band1.txt SA fragmentima, treba ekstraktovati sa novim OCR-om

**Status obrade:**
- 🎯 = Imamo u `data/quotes/` (presek sa projektom)
- 🧹 = OCR očišćen
- ✍️ = Fragmenti parsirani i mapirani
- 💾 = Integrisano u projekat

---

## Svi filozofi (1-53, ukupno 54)

### Jonska škola i milećani

1. **Thales** 📄 🎯  
   Linije 513–1364 (s. 1) - BEZ fragmenata (Tales nije ostavio pisanih dela)  
   Naš fajl: `data/quotes/Tales.json`

2. **Anaximander** 📄  
   Linije 1365–1893 (s. 14) - BEZ fragmenata

3. **Anaximenes** ⏳  
   SA fragmentima - treba ekstraktovati sa novim OCR-om

### Pitagorejci

4. **Pythagoras** 📄 🎯  
   Linije 2268–2717 (s. 27) - BEZ fragmenata (oralni nauk)  
   Naš fajl: `data/quotes/Pitagora.json`

5. **Cercops** 📄  
   Linije 2718–2731 (s. 35) - BEZ fragmenata

6. **Petron** 📄  
   Linije 2732–2747 - BEZ fragmenata

7. **Brotinos** 📄  
   Linije 2748–2799 - BEZ fragmenata

8. **Hippasos** 📄  
   Linije 2800–3079 (s. 36) - BEZ fragmenata

9. **Kalliphon und Demokedes** 📄  
   Linije 3080–3117 (s. 39) - BEZ fragmenata

10. **Parmiskos** 📄  
    Linije 3118–3153 (s. 41) - BEZ fragmenata

### Ksenofan i eleati

11. **Xenophanes** ⏳ 🎯  
    SA fragmentima - treba ekstraktovati sa novim OCR-om  
    Naš fajl: `data/quotes/Ksenofan.json`

12. **Heraclitus** ✅ 🎯 🧹  
    Linije 4101–6509 - SA fragmentima  
    Diels: `philosophers/12-Heraclitus.txt` (2,409 linija)  
    Naš fajl: `data/quotes/Heraklit.json`

13. **Epicharmus** ⏳  
    SA fragmentima - treba ekstraktovati sa novim OCR-om

14. **Alcmaeon** ⏳  
    SA fragmentima - treba ekstraktovati sa novim OCR-om

15. **Ikkos** 📄  
    Linije 9064–9094 (s. 137) - BEZ fragmenata

16. **Paron** 📄  
    Linije 9095–9107 - BEZ fragmenata

17. **Ameinias** 📄  
    Linije 9108–9121 - BEZ fragmenata

18. **Parmenides** ⏳ 🎯  
    SA fragmentima - treba ekstraktovati sa novim OCR-om  
    Naš fajl: `data/quotes/Parmenid.json`

19. **Zeno** ⏳ 🎯  
    SA fragmentima - treba ekstraktovati sa novim OCR-om  
    Naš fajl: `data/quotes/Zenon_iz_Eleje.json`

20. **Melissus** ⏳  
    SA fragmentima - treba ekstraktovati sa novim OCR-om

### Empedoklo i pluralisti

21. **Empedocles** ⏳ 🎯  
    SA fragmentima - treba ekstraktovati sa novim OCR-om  
    Naš fajl: `data/quotes/Empedoklo.json`

22. **Menestor** 📄  
    Linije 18026–18094 (s. 283) - BEZ fragmenata

23. **Xuthus** 📄  
    Linije 18095–18105 (s. 284) - BEZ fragmenata

24. **Boidas** 📄  
    Linije 18106–18134 - BEZ fragmenata

25. **Ion of Chios** ⏳  
    SA fragmentima - treba ekstraktovati sa novim OCR-om

26. **Hippon** ⏳  
    SA fragmentima - treba ekstraktovati sa novim OCR-om

27. **Phaleas und Hippodamos** 📄  
    Linije 18616–18706 (s. 293) - BEZ fragmenata

28. **Polykleitos** 📄  
    Linije 18707–18850 (s. 294) - BEZ fragmenata

29. **Oinopides** 📄  
    Linije 18851–18980 (s. 296) - BEZ fragmenata

30. **Hippokrates von Chios. Aischylos** 📄  
    Linije 18981–19100 (s. 298) - BEZ fragmenata

31. **Theodoros** 📄  
    Linije 19101–19114 (s. 300) - BEZ fragmenata

### Kasniji pitagorejci

32. **Philolaus** ⏳  
    SA fragmentima - treba ekstraktovati sa novim OCR-om

33. **Eurytus** 📄  
    BEZ fragmenata

34. **Archippos. Lysis. Opsimos** 📄  
    BEZ fragmenata

35. **Archytas** ⏳  
    SA fragmentima - treba ekstraktovati sa novim OCR-om

35a. **Ocellus** 📄  
     Linije 21437–21491 (s. 338) - BEZ fragmenata

36. **Timaeus** 📄  
    Linije 21492–21535 (s. 339) - BEZ fragmenata

37. **Hicetas** 📄  
    Linije 21536–21548 (s. 340) - BEZ fragmenata

38. **Ecphantus** 📄  
    Linije 21549–21595 - BEZ fragmenata

39. **Xenophilus** 📄  
    Linije 21596–21620 (s. 341) - BEZ fragmenata

40. **Diocles, Echecrates, Polymnastus, Phanton, Arion** 📄  
    Linije 21621–21646 - BEZ fragmenata

41. **Prorus, Amyclas, Cleinias** 📄  
    Linije 21647–21683 (s. 342) - BEZ fragmenata

42. **Damon and Phintias** 📄  
    Linije 21684–21709 - BEZ fragmenata

43. **Simus, Myonides, Euphranor** 📄  
    Linije 21710–21729 (s. 343) - BEZ fragmenata

44. **Lycon** 📄  
    Linije 21730–21773 - BEZ fragmenata

45. **Pythagorean School** 📄  
    Linije 21774–23727 (s. 344) - BEZ fragmenata (opšta škola)

### Anaksagora i nus filozofija

46. **Anaxagoras** ⏳ 🎯  
    SA fragmentima - treba ekstraktovati sa novim OCR-om  
    Naš fajl: `data/quotes/Anaksagora.json`

47. **Archelaus** ⏳  
    SA fragmentima - treba ekstraktovati sa novim OCR-om

48. **Metrodorus of Lampsacus** 📄  
    BEZ fragmenata

49. **Clidemus** 📄  
    BEZ fragmenata

50. **Idaeus** 📄  
    BEZ fragmenata

51. **Diogenes of Apollonia** ⏳  
    SA fragmentima - treba ekstraktovati sa novim OCR-om

### Ostali

52. **Cratylus** 📄  
    Linije 27219–27293 (s. 432) - BEZ fragmenata

53. **Antisthenes the Heraclitean** 📄  
    Linije 27294–27351 (s. 434) - BEZ fragmenata

---

## Presek sa projektom

**6 filozofa sa fragmentima** koje imamo u `data/quotes/`:
- Heraklit 🎯
- Ksenofan 🎯
- Parmenid 🎯
- Zenon iz Eleje 🎯
- Empedoklo 🎯
- Anaksagora 🎯

**2 filozofa BEZ Diels fragmenata** koje imamo:
- Tales 🎯 (samo A. LEBEN - nije pisao)
- Pitagora 🎯 (samo A. LEBEN - oralni nauk)

**Za ekstrakciju:**
- Demokrit ⏳ - postoji u band1.txt sa fragmentima, treba ekstraktovati
- Protagora ⏳ - postoji u band1.txt, treba proveriti i ekstraktovati

---

## OCR kvalitet i plan integracije

**Problem OCR-a:**
- ⚠️ Teške greške u grčkom tekstu (β→ß, μ→|u, mešavina Latin/Greek)
- ✅ Nemački tekst čitljiv

**Plan:**

**Faza 1** ✅ - Analiza i mapiranje
- ✅ Kreiran manifest.json (54 filozofa)
- ✅ Ekstraktovano 6 filozofa sa fragmentima (256 fragmenata)
- ✅ Identifikovan presek sa projektom

**Faza 2A** ⏳ - Ekstrakcija preostalih filozofa
- [ ] Pronaći granice za preostalih 10 filozofa u band1.txt
- [ ] Ekstraktovati u `philosophers/` folder
- [ ] Ažurirati manifest.json sa linijskim granicama

**Faza 2B** ⏳ - Parsiranje fragmenata (pilot: Heraklit)
- [ ] Identifikovati sve B. fragmente u 12-Heraclitus.txt
- [ ] Parsirati DK brojeve (B.1, B.2, ...)
- [ ] Ekstraktovati grčki tekst + nemački prevod
- [ ] Mapirati na postojeće `data/quotes/Heraklit.json`

**Faza 3** ⏳ - Integracija
- [ ] Dodati Diels fragmente kao novi source u quotes
- [ ] Kreirati cross-reference: Diogenes ↔ Diels
- [ ] Implementirati pointer builder za hermann-diels

---

## Razlika: Diels vs Diogenes Laertius

| Aspekt | Diogenes Laertius | Hermann Diels |
|--------|------------------|---------------|
| Tip izvora | Biografija + doksografija | Kritička edicija fragmenata |
| Fokus | Šta DRUGI kažu o filozofu | Šta je filozof SAM napisao |
| Naš `type` | `bio`, `anecdote`, `reported` | `quote` (autentični) |
| Primer | "Diogen kaže da je Heraklit..." | Heraklitov originalni tekst |
| Opseg | 10 knjiga, 80+ filozofa | 54 predsokratovca |
| Autentičnost | Sekundarne reference | Primarni tekstovi |

**Komplementarni izvori** - koriste se zajedno za potpunu sliku filozofa.
