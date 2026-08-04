# Walter Burley - De Vita et Moribus Philosophorum

## O izvoru

**Walter Burley** (latinski: Gualterus Burlaeus, c. 1275–1344/45) bio je engleski skolastički filozof i logičar. Njegov *Liber de vita et moribus philosophorum* (Knjiga o životu i običajima filozofa) postao je jedan od najpopularnijih biografskih kompendijuma o antičkim filozofima u srednjem veku.

## O ovom izdanju

Ovo kritičko izdanje objavio je **Hermann Knust** 1886. godine u Tübingenu kao deo edicije *Bibliothek des Litterarischen Vereins in Stuttgart* (br. 177).

**Karakteristike izdanja:**
- **Paralelni tekst**: Latinski original sa starim španskim prevodom (15-16. vek)
- **Naučni aparat**: Opsežne fusnote sa referencama na izvore (Diogen Laertije, Plutarh, itd.)
- **Varijante rukopisa**: Označene kraticama (CRLNADGB, HADGB, itd.)

## Format podataka

### `latin_text_raw.txt`

**Sadržaj**: Ceo latinski tekst ekstraovan iz PDF-a pomoću `pdftotext`

**Format**: Plain text, sa očuvanim layout-om (dvostubni format)

**Veličina**: ~2-3 MB (procena)

**Upotreba**: 
- Glavni izvor za dalju obradu
- Sadrži latinski tekst + španski prevod + nemačke fusnote (sve pomiješano)
- Potrebno dalje filtriranje i čišćenje

### Planirana struktura (TODO)

```
data/sources/walter-burley/
├── README.md                    # Ovaj fajl
├── metadata.json                # Bibliografski podaci
├── latin_text_raw.txt          # ✅ Sirovi tekst (latinski + španski + fusnote)
├── latin_text_clean.txt        # ⏳ Samo latinski tekst
└── chapters/                    # ⏳ Tekst podeljen po filozofima
    ├── 01_thales.txt
    ├── 02_solon.txt
    ├── 03_chilon.txt
    └── ...
```

## Kako koristiti

### 1. Čitanje sirovog teksta

```bash
cat latin_text_raw.txt | less
```

### 2. Pretraga po filozofu

```bash
# Pronađi poglavlje o Talesu
grep -n "Cap. I.*Thales" latin_text_raw.txt

# Pronađi sve reference na Sokrata
grep -i "socrat" latin_text_raw.txt
```

### 3. Ekstrakcija pojedinih poglavlja

```bash
# Ekstraktuj poglavlje I (Thales)
sed -n '/Cap. I.*Thales/,/Cap. II/p' latin_text_raw.txt > chapters/01_thales.txt
```

## Izvori

Burley je kompilirao materijal iz različitih izvora:
- **Diogen Laertije** - *Životi i mišljenja istaknutih filozofa* (glavni izvor)
- **Plutarh** - Razni biografski radovi
- **Ciceron** - Filozofski dijalozi
- **Valerius Maximus** - Factorum et dictorum memorabilium
- I mnogi drugi antički i srednjovekovni autori

## Značaj

Ovo delo je bilo:
- **Veoma popularno** u srednjem veku i renesansi
- **Prevedeno** na mnoge jezike (španski, francuski, engleski, nemački...)
- **Uticajno** za širenje znanja o antičkoj filozofiji
- **Izvor** za mnoge kasnije biografske kompilacije

## Licenca

Ovo delo je u **javnom vlasništvu** (Public Domain). Originalni tekst je iz 14. veka, a izdanje iz 1886. godine.

**Izvor**: [Wikimedia Commons](https://upload.wikimedia.org/wikipedia/commons/a/ab/BLV_177_Gualteri_Burlaei_liber_De_vita_et_moribus_philosophorum.pdf)

**Lokalni PDF**: `data/authors/walter-burley/BLV_177_Gualteri_Burlaei_liber_De_vita_et_moribus_philosophorum.pdf`

## Reference

- Knust, Hermann (ed.). *Gualteri Burlaei Liber de Vita et Moribus Philosophorum*. Tübingen: Litterarischer Verein, 1886.
- Burley, Walter. *De vita et moribus philosophorum*. 14th century.

## TODO

- [x] Ekstraktovati sirovi tekst iz PDF-a
- [ ] Očistiti tekst (ukloniti španski i fusnote)
- [ ] Podeliti po poglavljima/filozofima
- [ ] Kreirati indeks filozofa
- [ ] Dodati metadata za svakog filozofa
