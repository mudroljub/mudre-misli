# Die Fragmente der Vorsokratiker

Hermann Diels (1848–1922)

**De.**: Die Fragmente der Vorsokratiker: Griechisch und Deutsch  
**En.**: The Fragments of the Pre-Socratics: Greek and German  
**Srp.**: Fragmenti predsokratovaca: Grčki i nemački

Kritička edicija fragmenata predsokratovskih filozofa, osnovno naučno izdanje za proučavanje ranih grčkih mislilaca.

**Izdanje**: 3. Auflage, 1912  
**Izvor**: Internet Archive, OCR plain text export

---

## Struktura

**Fajlovi:**
- `band1.txt` (1.6M, 27,351 linija) - Glavni tom sa tekstovima
- `band2.txt` (1.2M, 44,946 linija) - Word Index
- `manifest.json` - Mapiranje svih 54 filozofa sa tačnim linijama
- `philosophers/` - Ekstraktovani pojedinačni fajlovi (16 filozofa sa fragmentima)

**Organizacija svakog filozofa:**
- **A. LEBEN UND LEHRE** - Život i učenje (sekundarne reference iz antičkih izvora)
- **B. FRAGMENTE** - Autentični fragmenti (direktni citati izgubljenih dela) - samo kod 16 filozofa

---

## Legenda

**Status ekstrakcije:**
- ✅ = Ekstraktovano u `philosophers/` fajl
- 📄 = U band1.txt ali samo A. LEBEN (bez B. FRAGMENTE)
- ⏳ = U band1.txt SA fragmentima, ali nije još ekstraktovano

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

3. **Anaximenes** ✅  
   Linije 1894–2267 (s. 22) - SA fragmentima  
   Diels: `03-Anaximenes.txt` (374 linija)

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

11. **Xenophanes** ✅ 🎯  
    Linije 3154–4771 (s. 42) - SA fragmentima  
    Diels: `11-Xenophanes.txt` (1,618 linija)  
    Naš fajl: `data/quotes/Ksenofan.json`

12. **Heraclitus** ✅ 🎯  
    Linije 4772–7586 (s. 67) - SA fragmentima  
    Diels: `12-Heraclitus.txt` (2,815 linija) — Najveći fajl!  
    Naš fajl: `data/quotes/Heraklit.json`

13. **Epicharmus** ✅  
    Linije 7587–8711 (s. 113) - SA fragmentima  
    Diels: `13-Epicharmus.txt` (1,125 linija)

14. **Alcmaeon** ✅  
    Linije 8712–9063 (s. 131) - SA fragmentima  
    Diels: `14-Alcmaeon.txt` (352 linija)

15. **Ikkos** 📄  
    Linije 9064–9094 (s. 137) - BEZ fragmenata

16. **Paron** 📄  
    Linije 9095–9107 - BEZ fragmenata

17. **Ameinias** 📄  
    Linije 9108–9121 - BEZ fragmenata

18. **Parmenides** ✅ 🎯  
    Linije 9122–10756 (s. 138) - SA fragmentima  
    Diels: `18-Parmenides.txt` (1,635 linija)  
    Naš fajl: `data/quotes/Parmenid.json`

19. **Zeno** ✅ 🎯  
    Linije 10757–11436 (s. 165) - SA fragmentima  
    Diels: `19-Zeno.txt` (680 linija)  
    Naš fajl: `data/quotes/Zenon_iz_Eleje.json`

20. **Melissus** ✅  
    Linije 11437–12508 (s. 176) - SA fragmentima  
    Diels: `20-Melissus.txt` (1,072 linija)

### Empedoklo i pluralisti

21. **Empedocles** ✅ 🎯  
    Linije 12509–18025 (s. 193) - SA fragmentima  
    Diels: `21-Empedocles.txt` (5,517 linija) — Najveći po linijama!  
    Naš fajl: `data/quotes/Empedoklo.json`

22. **Menestor** 📄  
    Linije 18026–18094 (s. 283) - BEZ fragmenata

23. **Xuthus** 📄  
    Linije 18095–18105 (s. 284) - BEZ fragmenata

24. **Boidas** 📄  
    Linije 18106–18134 - BEZ fragmenata

25. **Ion of Chios** ✅  
    Linije 18135–18333 (s. 285) - SA fragmentima  
    Diels: `25-Ion_of_Chios.txt` (199 linija)

26. **Hippon** ✅  
    Linije 18334–18615 (s. 288) - SA fragmentima  
    Diels: `26-Hippon.txt` (282 linija)

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

32. **Philolaus** ✅  
    Linije 19115–20296 (s. 301) - SA fragmentima  
    Diels: `32-Philolaus.txt` (1,182 linija)

33. **Eurytus** 📄  
    Linije 20297–20320 (s. 320) - BEZ fragmenata

34. **Archippos. Lysis. Opsimos** 📄  
    Linije 20321–20368 (s. 321) - BEZ fragmenata

35. **Archytas** ✅  
    Linije 20369–21436 (s. 322) - SA fragmentima  
    Diels: `35-Archytas.txt` (1,068 linija)

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

46. **Anaxagoras** ✅ 🎯  
    Lininje 23728–25875 (s. 375) - SA fragmentima  
    Diels: `46-Anaxagoras.txt` (2,148 linija)  
    Naš fajl: `data/quotes/Anaksagora.json`

47. **Archelaus** ✅  
    Linije 25876–26122 (s. 410) - SA fragmentima  
    Diels: `47-Archelaus.txt` (247 linija)

48. **Metrodorus of Lampsacus** 📄  
    Lininje 26123–26176 (s. 414) - BEZ fragmenata

49. **Clidemus** 📄  
    Linije 26177–26221 (s. 415) - BEZ fragmenata

50. **Idaeus** 📄  
    Linije 26222–26276 - BEZ fragmenata

51. **Diogenes of Apollonia** ✅  
    Linije 26277–27218 (s. 416) - SA fragmentima  
    Diels: `51-Diogenes_of_Apollonia.txt` (942 linija)

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
- ✅ Ekstraktovano 16 filozofa sa fragmentima
- ✅ Identifikovan presek sa projektom

**Faza 2** ⏳ - OCR čišćenje i parsiranje
- Pilot na Heraklitu (najveći, najpoznatiji)
- Očistiti grčki tekst od OCR grešaka
- Parsirati B. FRAGMENTE sekcije (DK brojevi, grčki, nemački)

**Faza 3** ⏳ - Integracija
- Uporediti Diels fragmente sa postojećim quotes
- Dodati nedostajuće autentične fragmente
- Validirati postojeće prema kritičkoj ediciji

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
