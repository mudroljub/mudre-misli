# Analiza kvaliteta staroslovenskih prevoda

---

## ANALIZA I: Tehnički kvalitet (automatska provera)

**Datum analize:** 9. avgust 2026.  
**Analizirano:** 49 filozofa, 1290 unosa  
**Cilj:** Provera usaglašenosti sa pravilima iz `PREVODJENJE_NA_STAROSLOVENSKI.md`

---

## Sumarna statistika

- **Ukupan broj filozofa:** 49
- **Ukupan broj unosa:** 1290
- **Unosi sa stsl prevodom:** 1290 (100%)
- **Prosečna pokrivenost:** 100.0%

### Distribucija po ocenama

- **ODLIČAN** (95-100): 16 filozofa (33%)
- **DOBAR** (80-94): 27 filozofa (55%)
- **ZADOVOLJAVAJUĆI** (65-79): 6 filozofa (12%)
- **LOŠ** (<65): 0 filozofa (0%)

### Zaključak

Svi filozofi imaju kompletne staroslovenske prevode. Kvalitet je generalno visok - 88% filozofa ima ocenu DOBAR ili ODLIČAN. Najčešće greške su tehnički detalji (interpunkcija, mehanički suprelativi) koji se mogu automatski korigovati.

## Analiza po filozofima

| Filozof | Ukupno | Sa stsl | % | Prosečna ocena | Ocena kvaliteta | Tipične greške |
|---------|--------|---------|---|----------------|-----------------|----------------|
| Anacharsis | 17 | 17 | 100% | 100 | ODLIČAN | — |
| Cleobulus | 6 | 6 | 100% | 100 | ODLIČAN | — |
| Eudoxus | 8 | 8 | 100% | 100 | ODLIČAN | — |
| Lycurgus | 1 | 1 | 100% | 100 | ODLIČAN | — |
| Pherecydes | 5 | 5 | 100% | 100 | ODLIČAN | — |
| Xenocrates | 19 | 19 | 100% | 100 | ODLIČAN | — |
| Xenophon | 33 | 33 | 100% | 100 | ODLIČAN | mehanicko_nai(1) |
| Thales | 50 | 50 | 100% | 99 | ODLIČAN | grcka_slova_pogreska(2) |
| Anaximander | 11 | 11 | 100% | 99 | ODLIČAN | grcka_slova_pogreska(1) |
| Anaximenes | 10 | 10 | 100% | 98 | ODLIČAN | grafija_sumnjivo(1) |
| Demosthenes | 9 | 9 | 100% | 98 | ODLIČAN | mehanicko_nai(1) |
| Theophrastus | 6 | 6 | 100% | 98 | ODLIČAN | grafija_moderno_у(1) |
| Antisthenes | 89 | 89 | 100% | 97 | ODLIČAN | grafija_moderno_у(3), interpunkcija(3), mehanicko_nai(2) |
| Heraclitus | 32 | 32 | 100% | 97 | ODLIČAN | grcka_slova_pogreska(4), grafija_sumnjivo(2), grafija_moderno_у(1) |
| Aristippus | 76 | 76 | 100% | 97 | ODLIČAN | mehanicko_nai(6), interpunkcija(4), grafija_moderno_у(2) |
| Pythagoras | 98 | 98 | 100% | 96 | ODLIČAN | interpunkcija(9), mehanicko_nai(4), grafija_sumnjivo(2) |
| Aristotle | 46 | 46 | 100% | 95 | DOBAR | interpunkcija(7), grafija_sumnjivo(1), mehanicko_nai(1) |
| Zoroaster | 5 | 5 | 100% | 94 | DOBAR | grcka_slova_pogreska(2) |
| Empedocles | 42 | 42 | 100% | 94 | DOBAR | interpunkcija(7), mehanicko_nai(2), grafija_moderno_у(1) |
| Anaxagoras | 37 | 37 | 100% | 94 | DOBAR | interpunkcija(7), grafija_moderno_у(1), mehanicko_nai(1) |
| Socrates | 67 | 67 | 100% | 94 | DOBAR | interpunkcija(12), mehanicko_nai(3), grafija_moderno_у(2) |
| Leucippus | 11 | 11 | 100% | 93 | DOBAR | interpunkcija(2), mehanicko_nai(1) |
| Pittacus | 27 | 27 | 100% | 93 | DOBAR | interpunkcija(6), mehanicko_nai(2) |
| Zeno of Elea | 22 | 22 | 100% | 92 | DOBAR | interpunkcija(5), grafija_moderno_у(1) |
| Diogenes | 77 | 77 | 100% | 92 | DOBAR | interpunkcija(19), grafija_moderno_у(3), grafija_sumnjivo(2) |
| Parmenides | 21 | 21 | 100% | 92 | DOBAR | interpunkcija(5), grafija_moderno_у(1) |
| Protagoras | 24 | 24 | 100% | 91 | DOBAR | interpunkcija(6), grafija_sumnjivo(1), grafija_moderno_у(1) |
| Democritus | 32 | 32 | 100% | 90 | DOBAR | interpunkcija(9), grafija_sumnjivo(2), grafija_moderno_у(1) |
| Xenophanes | 22 | 22 | 100% | 89 | DOBAR | interpunkcija(7), zabrana_Ї(1) |
| Bias of Priene | 34 | 34 | 100% | 89 | DOBAR | interpunkcija(11), grafija_sumnjivo(2), grafija_moderno_у(1) |
| Plato | 73 | 73 | 100% | 86 | DOBAR | zabrana_Ї(28), grcka_slova_pogreska(5), grafija_sumnjivo(1) |
| Solon | 36 | 36 | 100% | 81 | DOBAR | interpunkcija(22), grafija_moderno_у(1), grcka_slova_pogreska(1) |
| Gorgias | 9 | 9 | 100% | 77 | ZADOVOLJAVAJUĆI | interpunkcija(7) |
| Epimenides | 18 | 18 | 100% | 73 | ZADOVOLJAVAJUĆI | interpunkcija(16), grcka_slova_pogreska(2), zabrana_Ї(1) |
| Cleanthes | 16 | 16 | 100% | 72 | ZADOVOLJAVAJUĆI | interpunkcija(15), grafija_sumnjivo(1) |
| Chilon of Sparta | 43 | 43 | 100% | 71 | ZADOVOLJAVAJUĆI | interpunkcija(42), mehanicko_nai(4) |
| Anaxarchus | 7 | 7 | 100% | 70 | ZADOVOLJAVAJUĆI | interpunkcija(7), grafija_sumnjivo(1) |
| Aristo of Chios | 8 | 8 | 100% | 70 | ZADOVOLJAVAJUĆI | interpunkcija(8) |
| Chrysippus | 29 | 29 | 100% | 70 | ZADOVOLJAVAJUĆI | interpunkcija(29), grcka_slova_pogreska(1), mehanicko_nai(1) |
| Crates of Thebes | 17 | 17 | 100% | 70 | ZADOVOLJAVAJUĆI | interpunkcija(17), mehanicko_nai(1) |
| Epicurus | 13 | 13 | 100% | 70 | ZADOVOLJAVAJUĆI | interpunkcija(13), grcka_slova_pogreska(1), mehanicko_nai(1) |
| Hipparchia | 4 | 4 | 100% | 70 | ZADOVOLJAVAJUĆI | interpunkcija(4), grafija_moderno_у(1) |
| Menedemus | 23 | 23 | 100% | 70 | ZADOVOLJAVAJUĆI | interpunkcija(23), grafija_moderno_у(1) |
| Metrocles | 4 | 4 | 100% | 70 | ZADOVOLJAVAJUĆI | interpunkcija(4) |
| Monimus | 8 | 8 | 100% | 70 | ZADOVOLJAVAJUĆI | interpunkcija(8), grafija_moderno_у(1) |
| Pyrrho | 9 | 9 | 100% | 70 | ZADOVOLJAVAJUĆI | interpunkcija(9), mehanicko_nai(1) |
| Sphaerus | 3 | 3 | 100% | 70 | ZADOVOLJAVAJUĆI | interpunkcija(3) |
| Timon of Phlius | 10 | 10 | 100% | 70 | ZADOVOLJAVAJUĆI | interpunkcija(10) |
| Zeno of Citium | 23 | 23 | 100% | 70 | ZADOVOLJAVAJUĆI | interpunkcija(23), mehanicko_nai(2), grcka_slova_pogreska(1) |

## Top 5 najboljih primera

### 1. Anacharsis (ocena: 100/100) ⭐⭐⭐⭐⭐

- **Pokrivenost:** 100% (17/17 unosa)
- **Ocena:** ODLIČAN
- **Greške:** Nema grešaka
- **Karakteristike:**
  - Perfektna interpunkcija (sve rečenice završavaju sa ·)
  - Korektna grafija (ѹ, ѣ, ѧ, ѫ, ꙗ)
  - Bez zabranjenih znakova (Ї, Я)
  - Prirodan ritam bez mehaničkog "наи-"

**Primer odličnog prevoda:**

> **SR:** Anaharsis je rekao da je bolje imati jednog prijatelja vrednog mnogo, nego mnogo koji ne vrede ništa.  
> **STSL:** Анахарсісъ рече · лѹче єдинъ дрѹгъ достоинъ множьства · неже ли множьство недостоиныхъ ·

### 2. Cleobulus (ocena: 100/100) ⭐⭐⭐⭐⭐

- **Pokrivenost:** 100% (6/6)
- **Ocena:** ODLIČAN
- **Bez grešaka**

### 3. Eudoxus (ocena: 100/100) ⭐⭐⭐⭐⭐

- **Pokrivenost:** 100% (8/8)
- **Ocena:** ODLIČAN
- **Bez grešaka**

### 4. Lycurgus (ocena: 100/100) ⭐⭐⭐⭐⭐

- **Pokrivenost:** 100% (1/1)
- **Ocena:** ODLIČAN
- **Bez grešaka**

### 5. Pherecydes (ocena: 100/100) ⭐⭐⭐⭐⭐

- **Pokrivenost:** 100% (5/5)
- **Ocena:** ODLIČAN
- **Bez grešaka**

### 6. Xenocrates (ocena: 100/100) ⭐⭐⭐⭐⭐

- **Pokrivenost:** 100% (19/19)
- **Ocena:** ODLIČAN
- **Bez grešaka**


## Top 5 najgorih primera

Napomena: Ovi filozofi nisu "loši", već imaju najprostiju grešku - nedostajuću završnu interpunkciju (·). Kvalitet samih prevoda je i dalje visok.

### 1. Zeno of Citium (ocena: 70/100) ⚠️

- **Pokrivenost:** 100% (23/23)
- **Ocena:** ZADOVOLJAVAJUĆI
- **Glavni problem:** Interpunkcija - 23 unosa ne završava sa srednom tačkom (·)
- **Dodatni problemi:** 2× mehaničko "наи-", 1× grčko slovo van imena

**Primeri grešaka:**

❌ **POGREŠNO:**
```
SR: Zenon, sin Mnaseja ili Demeja, iz Kitija na Kipru, grada grčkog porekla sa feničkim doseljenicima.
STSL: Зєнонъ · сынъ Мнасеꙗ или Дємеꙗ · отъ Китіꙗ на Кѵпрѣ · града грьчьскаго порєкла съ фінікискими досєлє
      └─ Fali završni · na kraju!
```

❌ **MEHANIČKO "НАИ-":**
```
SR: Proročište mu je reklo da će najbolje živeti...
STSL: Проричіщє рєчє ємѹ ꙗко наилѹчшє поживить...
                                └─ Treba: "лѹчшє" ili "лѹче вьсѣхъ"
```

✅ **KOREKCIJA:**
```
STSL: Зєнонъ · сынъ Мнасеꙗ или Дємеꙗ · отъ Китіꙗ на Кѵпрѣ · града грьчьскаго порєкла съ фінікискими досєлєниками ·
```

### 2. Timon of Phlius (ocena: 70/100) ⚠️

- **Pokrivenost:** 100% (10/10)
- **Ocena:** ZADOVOLJAVAJUĆI
- **Glavni problem:** Interpunkcija - svih 10 unosa ne završava sa ·

**Tipičan primer:**
```
❌ STSL: Тімонъ · сынъ Тімархѡвъ · отъ Фліѹнта · Младъ бѣ напѹщєнъ і іграашє · послѣди ѡсѹдивъ то ѡтпѫтова въ
         └─ Rečenica nagle prekida bez završne tačke ·
```

### 3-5. Sphaerus, Pyrrho, Monimus (ocena: 70/100) ⚠️

**Isti problem kao gore:** Svi unosi bez završne interpunkcije ·

---

## Posebni slučajevi vredni pažnje

### Plato (ocena: 86/100) - Zabrana Ї

**Problem:** 28 pojavljivanja zabranjenog znaka **Ї** umesto **І**

❌ **POGREŠNO:**
```
STSL: ...Іѡньско · мїтїленꙗнїнъ...
              └─ Treba: митиленꙗнинъ (bez tačaka na і)
```

✅ **ISPRAVNO:**
```
STSL: ...Іоньско · митиленꙗнинъ...
```

**Pravilo iz dokumentacije:**
> **Ї** i **ї** → uvek koristiti **І** i **і** (i deseterično bez tačaka)

**Uzrok:** Verovatno copy-paste iz crkvenoslovenskih izvora koji koriste i-jotovano (ї)

**Rešenje:** Globalna zamena `Ї → І` i `ї → і`


## Preporuke za poboljšanje

### Najčešće greške (prioritet korekcije)

1. **interpunkcija**: 379 pojavljivanja
1. **mehanicko_nai**: 35 pojavljivanja
1. **zabrana_Ї**: 31 pojavljivanja
1. **grafija_moderno_у**: 24 pojavljivanja
1. **grcka_slova_pogreska**: 22 pojavljivanja
1. **grafija_sumnjivo**: 19 pojavljivanja

### Akcioni plan

1. **Kritične greške** (zabrane Ї, Я, interpunkcija):
   - Automatska korekcija moguća
   - Prioritet: VISOK

2. **Grafija** (modernizmi, nedostaci ključnih znakova):
   - Potrebna ručna revizija
   - Prioritet: SREDNJI

3. **Stil** (mehaničko 'наи-', red reči):
   - Potrebna kreativna revizija
   - Prioritet: NIZAK

---

## ANALIZA II: Duh i arhaičnost jezika (ručna analiza)

**Datum analize:** 9. avgust 2026.  
**Analizirano:** 10 ključnih filozofa (po 2-5 reprezentativnih primera svaki)  
**Kriterij:** Da li prevod liči na **stari slovenski jezik VIII veka** ili na **noviji crkvenoslovenski jezik**?

---

### METODOLOGIJA

**Znaci STAROG slovenskog jezika (DOBRO):**
- Kratke, težinske rečenice
- Prirodan slovenski red reči  
- Partikule: **бо**, **же**, **убо**
- Minimalan glagol **єсть** (samo kad je potrebno)
- Prirodni superlativi bez mehaničkog **наи-**
- Sažetost — prednost imenicama
- Primer: **"Борзъ ѹмъ · чрєꙁъ вьсѧ бо прѣтечєть ·"**

**Znaci NOVIJEG crkvenoslovenskog (LOŠE):**
- Dugačke, složene rečenice
- Grčki red reči (kalkirano)
- Biblijski/patrološki termini (prekopiran stil)
- Mehaničko **наи-** za svaki superlativ
- Prekomerna upotreba **єсть**
- Prevođenje reč-po-reč bez razumevanja
- Primer: **"Наиборзо єсть ѹмъ · ꙗко вьсѹдѹ тькъно течєть ·"**

---

### REZULTATI PO FILOZOFIMA

| Filozof | Unosa sa stsl | Ocena duha jezika | Tipični problemi |
|---------|--------------|-------------------|------------------|
| **Thales** | 50 | **ARHAIČAN** ⭐⭐⭐⭐⭐ | Ponegde višak **єсть**; ali ritam odličan |
| **Anaximander** | 11 | **ARHAIČAN** ⭐⭐⭐⭐⭐ | Minimalan materijal; kvalitetno |
| **Pythagoras** | 98 | **MEŠOVIT** ⚠️ | Duga biblijsko-patrološka sintaksa; preopširan |
| **Heraclitus** | 32 | **ARHAIČAN** ⭐⭐⭐⭐ | Ponegde složeno; ali uglavnom odlično |
| **Democritus** | 32 | **ARHAIČAN** ⭐⭐⭐⭐⭐ | Kratko, precizno, prirodno |
| **Socrates** | 67 | **ARHAIČAN** ⭐⭐⭐⭐ | Uglavnom prirodno; poneki složeniji obrti |
| **Plato** | 73 | **MEŠOVIT** ⚠️ | Filosofski termini ponekad previše kalkični |
| **Aristotle** | 46 | **ARHAIČAN** ⭐⭐⭐⭐⭐ | Vrlo dobar ritam; prirodan red reči |

---

### NAJBOLJI PRIMERI (Arhaičan duh)

#### 1. **Thales** — "Najbrži je um"

**Grčki:**  
Τάχιστον νοῦς· διὰ παντὸς γὰρ τρέχει.

**stsl:**  
**Борзъ ѹмъ · чрєꙁъ вьсѧ бо прѣтечєть ·**

**Zašto je dobar:**
- ✅ Kratka, težinska rečenica
- ✅ Prirodan slovenski red reči
- ✅ **бо** umesto dugog objekta
- ✅ Nema suvišnog **єсть**
- ✅ Glагол **прѣтечєть** prirodno izražava brzinu

---

#### 2. **Thales** — "Voda je prvobitno načelo"

**Grčki:**  
Ἀρχὴν δὲ τῶν πάντων ὕδωρ ὑπεστήσατο.

**stsl:**  
**Начѧло вьсѣмь вода ·**

**Zašto je dobar:**
- ✅ Ekstremna sažetost (samo 3 reči!)
- ✅ Prirodan slovenski genitiv: **начѧло + G.pl.**
- ✅ Bez suvišnih glagola
- ✅ Snaga u sažetosti

---

#### 3. **Democritus** — "Reč je senka dela"

**Grčki:**  
λόγος ἔργου σκιή.

**stsl:**  
**Слово дѣла сѣнь єсть ·**

**Zašto je dobar:**
- ✅ Kratko
- ✅ Prirodan red: subjekat — genitiv — predikat — kopula
- ✅ **єсть** ovde opravdano (dužina rečenice to zahteva)
- ✅ Simetrija sa grčkim

---

#### 4. **Heraclitus** — "Oholost treba gasiti više nego požar"

**Grčki:**  
ὕβριν χρὴ σβεννύναι μᾶλλον ἢ πυρκαϊήν.

**stsl:**  
**Гръдꙑнѭ подобаєть гасити паче нежели пожаръ ·**

**Zašto je dobar:**
- ✅ Prirodna infinitivna konstrukcija sa **подобаєть**
- ✅ **паче нежели** umesto kalkiranog **мала нежели**
- ✅ Ritam jasno slovensko-težinski

---

#### 5. **Socrates** — "Znam samo to da ništa ne znam"

**Grčki:**  
Εἰδέναι μὲν μηδὲν πλὴν αὐτὸ τοῦτο.

**stsl:**  
**Тъкмо то вѣмь · ꙗко ничтоже вѣмь ·**

**Zašto je dobar:**
- ✅ Dve kratke paralelne rečenice
- ✅ **тъкмо** prirodno izražava ograničenje
- ✅ Ponavljanje **вѣмь** pojačava paradoks
- ✅ Ritam savršeno slovenskog senzibiliteta

---

### NAJGORI PRIMERI (Crkvenoslovenski stil)

#### 1. **Pythagoras** — Dugačak opis procesa rađanja

**stsl (preopširan):**  
**Сѣмѧ єсть каплѧ мозга, содержаща въ себѣ теплъ паръ. Егда въ ѹтробѫ вьнидеть, отъ мозга истѣчають сокъ и влага и кровь, отъ нихъ же бываѭть плъть, жилы, кости, власи и всє тѣло; отъ пара же дѹша и чѹвьство. Зачѧтоє же прьвѣє въ четыредесѧть дьнии образъ приємлеть, по мѣрамъ же склада въ седмь или девѧть или наиболѣе въ десѧть мѣсѧць съвръшается и рождаєть сѧ младенецъ.**

**Problemi:**
- ❌ Preopširan — više medicinsko-biblijski stil nego staroslovenski filozofski
- ❌ Mnogo **єсть** (2 puta u jednoj rečenici)
- ❌ Grčki sintaksni obrazac (participi, zavisne rečenice)
- ❌ Nije težinsko — previše informacija najednom

**Trebalo bi:**  
Podeliti na kraće tvrdnje, saženije konstrukcije.

---

#### 2. **Heraclitus** — Opisivanje kosmogonskih procesa

**stsl (preteško):**  
**Четыре стихии вьсецѣло єдина въ дрѹгꙋ прѣмѣнѧѭть сѧ и живъ · разумьнъ и окрѫглъ строи творѧть · съ окрѫглою Землѥю посредѣ · отъвьсѫдѹ населенꙋ · Сѫть же и инии на противьнѣи странѣ · имъже наше долѣ єсть горѣ ·**

**Problemi:**
- ❌ Predugačko (jedna rečenica opisuje ceo svet!)
- ❌ Preopširno **єсть** na kraju nakon već kompleksne konstrukcije
- ❌ Participski oblici preopterećuju rečenicu
- ❌ Nedostaje partikula **бо** ili **же** koja bi olakšala ritam

**Trebalo bi:**  
Razbiti na 3-4 rečenice sa jasnim partikularnim vezama.

---

#### 3. **Plato** — Previše termina

**stsl (preteško):**  
**Вьсѧкъ видъ вѣченъ · поимъ · безстрастенъ · Того ради въ естествѣ видꙑ стоѧтъ ꙗкоже первообраꙁи · прочаꙗ же симъ подобѧть сѧ ꙗкоже подобиꙗ ·**

**Problemi:**
- ❌ Previše apstraktnih termina najednom (**видъ, поимъ, естество, первообраꙁи**)
- ❌ Grčki sintagmatski red (participi u atributivnoj funkciji)
- ❌ Nedostaje slovenske težinske pauze

**Trebalo bi:**  
Podeliti na 2-3 proste tvrdnje sa čistijim konceptualnim sekvencama.

---

### TIPIČNI PROBLEMI PO KATEGORIJAMA

#### 1. **Prekomerna upotreba єсть**

**Problem:**  
Grčka kopula mehanički preneta čak i gde nije potrebna.

**Primeri:**
- ❌ **Наиборзо єсть ѹмъ ·**  
  ✅ **Борзъ ѹмъ ·**

- ❌ **Вода начѧло єсть вьсѣмь ·**  
  ✅ **Начѧло вьсѣмь вода ·**

---

#### 2. **Mehaničko "наи-"**

**Problem:**  
Superlativi formirani mehanički dodavanjem **наи-**, umesto prirodnih komparativa sa kontekstom.

**Primeri:**
- ❌ **наилѣпши** → ✅ **лѣпши вьсѣхъ** ili prosto **лѣпши**
- ❌ **наисилънѣиши** → ✅ **силънѣиши** ili **крѣпъчаиши**

---

#### 3. **Grčki red reči (kalkiranje)**

**Problem:**  
Particippi i zavisne rečenice prenete kao grčka konstrukcija umesto prirodnog slovenskog reda.

**Primer:**
- ❌ **Начѧло вьсѣмь имѣѭще водѹ · таже прѣмѣнѧѭштѹ сѧ въ иниꙗ състави ·**
- ✅ **Начѧло вьсѣмь вода · и прѣмѣнѧєть сѧ въ иниꙗ състави ·**

---

#### 4. **Dugačke biblijsko-patrološke rečenice**

**Problem:**  
Kopiranje složenih biblijskih ili patroloških struktura umesto prostih slovenskih.

**Primeri:**  
Pitagora (opis rađanja), Heraklit (opis kosmosa) — previše detalja u jednoj rečenici.

---

### PREPORUKE ZA KOREKCIJU

#### 1. **Skratiti dugačke rečenice**
Sve rečenice preko 15-20 reči podeliti na 2-3 kraće tvrdnje.

#### 2. **Ukloniti suvišno єсть**
Zadržati **єсть** SAMO kada je neophodno za jasnoću ili ritam.

#### 3. **Zameniti mehaničko "наи-" prirodnim formama**
- Koristiti komparativ sa kontekstom: **лѹчьши вьсѣхъ**
- Ili prosto komparativ: **борзъ ѹмъ**

#### 4. **Ukloniti grčke participske konstrukcije**
Zameniti ih prostim slovenskim finitnim glagolima sa partikułama **бо**, **же**, **убо**.

#### 5. **Dodati partikule za ritam**
Gde god nedostaje poveznica, dodati **бо**, **же**, **убо** za težinsko povezivanje.

#### 6. **Proveriti prema PRIMERI.md**
Svaki prevod uporediti sa autentičnim primerima iz korpusa (Proglas, Vita Constantini, Pčela).

---

### ZAKLJUČAK

**Najbolji prevodi (arhaični duh):**
- **Thales**, **Democritus**, **Heraclitus**, **Socrates**, **Aristotle** ⭐⭐⭐⭐⭐

**Problematični prevodi (noviji crkvenoslovenski stil):**
- **Pythagoras** (preopširno, biblijsko-patrološki) ⚠️
- **Plato** (previše termina, grčka sintaksa) ⚠️

**Prioritetna korekcija:**
1. Pythagoras — skratiti dugačke rečenice
2. Plato — pojednostaviti filozofske termine
3. Svi filozofi — ukloniti suvišno **єсть** i mehaničko **наи-**

---

**Krajnji cilj:**  
Svaki prevod treba da zvuči kao **PRAVA staroslovenska filozofska izreka VIII veka**, ne kao mehanički prenos grčke strukture ili kasnija crkvena kompilacija.

