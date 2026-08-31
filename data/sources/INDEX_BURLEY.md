# Walter Burley — *De vita et moribus philosophorum*

Operativni pregled lokalnog Burleyjevog sloja. Za bibliografske podatke i
pravila upotrebe vidi [README](walter-burley/README.md); mašinski sažetak je u
`walter-burley/philosophers_index.json`.

## Lokalni materijal

- izvorno Knustovo izdanje iz 1886. čuva se kao PDF;
- `walter-burley/chapters/` sadrži pet detaljnije strukturisanih poglavlja;
- `walter-burley/chapters-generated/` sadrži 132 ponovljivo generisana OCR
  poglavlje latinskog teksta sa oznakama Knustovih strana;
- `walter-burley/ocr/` čuva izvorni DjVu XML, mapu listova i kontrolne sume;
- direktorijum, a ne ručno vođen spisak, merodavan je inventar ekstrakcija.

Ekstrakcija nije isto što i završena obrada. Pre integracije treba proveriti
granice poglavlja i latinski tekst prema PDF-u, odvojiti paralelni španski
prevod i urednički aparat, zatim obraditi sav raspoloživ tekst iz poglavlja.

## Sadržaj izdanja

Izvorni redosled sadržaja, uz lokalni radni ekstrakt i broj unosa čiji je neposredni izvor `walter-burley`. Knjiga ima 132 redosledne jedinice i 133 ličnosti: Polistrat i Ipoklid dele jedan red. Crta znači da lokalni ekstrakt, odnosno takav JSON unos, još ne postoji.

| Redosled | Ličnost | Ekstrakt | JSON unosi |
|---|---|---|---:|
| I | Tales | [001_tales.md](walter-burley/chapters-generated/001_tales.md) | 1 |
| II | Solon | [002_solon.md](walter-burley/chapters-generated/002_solon.md) | 8 |
| III | Hilon | [003_hilon.md](walter-burley/chapters-generated/003_hilon.md) | 1 |
| IV | Pitak | [004_pitak.md](walter-burley/chapters-generated/004_pitak.md) | 1 |
| V | Bijant | [005_bijant.md](walter-burley/chapters-generated/005_bijant.md) | 6 |
| VI | Kleobul | [006_kleobul.md](walter-burley/chapters-generated/006_kleobul.md) | 5 |
| VII | Perijandar | [007_perijandar.md](walter-burley/chapters-generated/007_perijandar.md) | — |
| VIII | Zoroaster | [008_zoroaster.md](walter-burley/chapters-generated/008_zoroaster.md) | — |
| IX | Anaksimandar | [009_anaksimandar.md](walter-burley/chapters-generated/009_anaksimandar.md) | 1 |
| X | Anaharsis | [010_anaharsis.md](walter-burley/chapters-generated/010_anaharsis.md) | 1 |
| XI | Misosternon (Mizon) | [011_misosternon-mizon.md](walter-burley/chapters-generated/011_misosternon-mizon.md) | — |
| XII | Epimenid | [012_epimenid.md](walter-burley/chapters-generated/012_epimenid.md) | — |
| XIII | Ferekid | [013_ferekid.md](walter-burley/chapters-generated/013_ferekid.md) | 5 |
| XIV | Homer | [014_homer.md](walter-burley/chapters-generated/014_homer.md) | — |
| XV | Likurg | [015_likurg.md](walter-burley/chapters-generated/015_likurg.md) | — |
| XVI | Anaksimen iz Mileta | [016_anaksimen-iz-mileta.md](walter-burley/chapters-generated/016_anaksimen-iz-mileta.md) | 1 |
| XVII | Pitagora | [017_pitagora.md](walter-burley/chapters-generated/017_pitagora.md) | 12 |
| XVIII | Anaksagora | [018_anaksagora.md](walter-burley/chapters-generated/018_anaksagora.md) | — |
| XIX | Kratet | [019_kratet.md](walter-burley/chapters-generated/019_kratet.md) | 1 |
| XX | Stilbon | [020_stilbon.md](walter-burley/chapters-generated/020_stilbon.md) | — |
| XXI | Arhiloh | [021_arhiloh.md](walter-burley/chapters-generated/021_arhiloh.md) | — |
| XXII | Simonid | [022_simonid.md](walter-burley/chapters-generated/022_simonid.md) | — |
| XXIII | Arhita | [023_arhita.md](walter-burley/chapters-generated/023_arhita.md) | — |
| XXIV | Ezop | [024_ezop.md](walter-burley/chapters-generated/024_ezop.md) | — |
| XXV | Zenon iz Kitijuma (pomešan sa Elejcem) | [025_zenon-iz-kitijuma-pomesan-sa-elejcem.md](walter-burley/chapters-generated/025_zenon-iz-kitijuma-pomesan-sa-elejcem.md) | — |
| XXVI | Gorgija | [026_gorgija.md](walter-burley/chapters-generated/026_gorgija.md) | 3 |
| XXVII | Isokrat | [027_isokrat.md](walter-burley/chapters-generated/027_isokrat.md) | — |
| XXVIII | Protagora | [028_protagora.md](walter-burley/chapters-generated/028_protagora.md) | — |
| XXIX | Hrisip | [029_hrisip.md](walter-burley/chapters-generated/029_hrisip.md) | 19 |
| XXX | Sokrat | [030_sokrat.md](walter-burley/chapters-generated/030_sokrat.md) | 1 |
| XXXI | Aristip | [031_aristip.md](walter-burley/chapters-generated/031_aristip.md) | — |
| XXXII | Ksenofont | [032_ksenofont.md](walter-burley/chapters-generated/032_ksenofont.md) | 1 |
| XXXIII | Antisten | [033_antisten.md](walter-burley/chapters-generated/033_antisten.md) | 3 |
| XXXIV | Alkibijad | [034_alkibijad.md](walter-burley/chapters-generated/034_alkibijad.md) | — |
| XXXV | Eshin | [035_eshin.md](walter-burley/chapters-generated/035_eshin.md) | — |
| XXXVI | Euripid | [036_euripid.md](walter-burley/chapters-generated/036_euripid.md) | — |
| XXXVII | Demosten | [037_demosten.md](walter-burley/chapters-generated/037_demosten.md) | 7 |
| XXXVIII | Sofokle | [038_sofokle.md](walter-burley/chapters-generated/038_sofokle.md) | — |
| XXXIX | Perikle | [039_perikle.md](walter-burley/chapters-generated/039_perikle.md) | — |
| XL | Temistokle | [040_temistokle.md](walter-burley/chapters-generated/040_temistokle.md) | — |
| XLI | Aristid | [041_aristid.md](walter-burley/chapters-generated/041_aristid.md) | — |
| XLII | Eudoks | [042_eudoks.md](walter-burley/chapters-generated/042_eudoks.md) | — |
| XLIII | Arat | [043_arat.md](walter-burley/chapters-generated/043_arat.md) | — |
| XLIV | Demokrit | [044_demokrit.md](walter-burley/chapters-generated/044_demokrit.md) | — |
| XLV | Hipokrat | [045_hipokrat.md](walter-burley/chapters-generated/045_hipokrat.md) | — |
| XLVI | Euripid (ponovljen u registru) | [046_euripid-ponovljen-u-registru.md](walter-burley/chapters-generated/046_euripid-ponovljen-u-registru.md) | — |
| XLVII | Heraklit | [047_heraklit.md](walter-burley/chapters-generated/047_heraklit.md) | 1 |
| XLVIII | Empedokle | [048_empedokle.md](walter-burley/chapters-generated/048_empedokle.md) | 4 |
| XLIX | Parmenid | [049_parmenid.md](walter-burley/chapters-generated/049_parmenid.md) | — |
| L | Diogen iz Sinope | [050_diogen-iz-sinope.md](walter-burley/chapters-generated/050_diogen-iz-sinope.md) | 8 |
| LI | Karnead | [051_karnead.md](walter-burley/chapters-generated/051_karnead.md) | — |
| LII | Platon | [052_platon.md](walter-burley/chapters-generated/052_platon.md) | — |
| LIII | Aristotel | [053_aristotel.md](walter-burley/chapters-generated/053_aristotel.md) | — |
| LIV | Ksenofil | [054_ksenofil.md](walter-burley/chapters-generated/054_ksenofil.md) | — |
| LV | Fedon | [055_fedon.md](walter-burley/chapters-generated/055_fedon.md) | — |
| LVI | Eshil | [056_eshil.md](walter-burley/chapters-generated/056_eshil.md) | — |
| LVII | Speusip | [057_speusip.md](walter-burley/chapters-generated/057_speusip.md) | — |
| LVIII | Apulej | [058_apulej.md](walter-burley/chapters-generated/058_apulej.md) | — |
| LIX | Plotin | [059_plotin.md](walter-burley/chapters-generated/059_plotin.md) | 2 |
| LX | Hermes Trismegist | [060_hermes-trismegist.md](walter-burley/chapters-generated/060_hermes-trismegist.md) | — |
| LXI | Ksenokrat | [061_ksenokrat.md](walter-burley/chapters-generated/061_ksenokrat.md) | — |
| LXII | Demad | [062_demad.md](walter-burley/chapters-generated/062_demad.md) | — |
| LXIII | Anaksimen iz Lampsaka | [063_anaksimen-iz-lampsaka.md](walter-burley/chapters-generated/063_anaksimen-iz-lampsaka.md) | — |
| LXIV | Epikur | [064_epikur.md](walter-burley/chapters-generated/064_epikur.md) | 4 |
| LXV | Polistrat i Ipoklid | [065_polistrat-i-ipoklid.md](walter-burley/chapters-generated/065_polistrat-i-ipoklid.md) | — |
| LXVI | Kalisten | [066_kalisten.md](walter-burley/chapters-generated/066_kalisten.md) | — |
| LXVII | Anaksarh | [067_anaksarh.md](walter-burley/chapters-generated/067_anaksarh.md) | — |
| LXVIII | Teofrast | [068_teofrast.md](walter-burley/chapters-generated/068_teofrast.md) | — |
| LXIX | Diodor Kron | [069_diodor-kron.md](walter-burley/chapters-generated/069_diodor-kron.md) | — |
| LXX | Polemon | [070_polemon.md](walter-burley/chapters-generated/070_polemon.md) | — |
| LXXI | Antipatar iz Sidona | [071_antipatar-iz-sidona.md](walter-burley/chapters-generated/071_antipatar-iz-sidona.md) | — |
| LXXII | Arkesilaj | [072_arkesilaj.md](walter-burley/chapters-generated/072_arkesilaj.md) | — |
| LXXIII | Erasistrat | [073_erasistrat.md](walter-burley/chapters-generated/073_erasistrat.md) | — |
| LXXIV | Arhimed | [074_arhimed.md](walter-burley/chapters-generated/074_arhimed.md) | 2 |
| LXXV | Ptolemej II Filadelf | [075_ptolemej-ii-filadelf.md](walter-burley/chapters-generated/075_ptolemej-ii-filadelf.md) | — |
| LXXVI | Menandar | [076_menandar.md](walter-burley/chapters-generated/076_menandar.md) | — |
| LXXVII | Filemon | [077_filemon.md](walter-burley/chapters-generated/077_filemon.md) | — |
| LXXVIII | Zenon iz Kitijuma | [078_zenon-iz-kitijuma.md](walter-burley/chapters-generated/078_zenon-iz-kitijuma.md) | — |
| LXXIX | Zenon iz Eleje | [079_zenon-iz-eleje.md](walter-burley/chapters-generated/079_zenon-iz-eleje.md) | 5 |
| LXXX | Hegesija | [080_hegesija.md](walter-burley/chapters-generated/080_hegesija.md) | — |
| LXXXI | Enije | [081_enije.md](walter-burley/chapters-generated/081_enije.md) | — |
| LXXXII | Aristarh iz Samotrake | [082_aristarh-iz-samotrake.md](walter-burley/chapters-generated/082_aristarh-iz-samotrake.md) | — |
| LXXXIII | Pankupije | [083_pankupije.md](walter-burley/chapters-generated/083_pankupije.md) | — |
| LXXXIV | Stacije | [084_stacije.md](walter-burley/chapters-generated/084_stacije.md) | — |
| LXXXV | Valerije Katul | [085_valerije-katul.md](walter-burley/chapters-generated/085_valerije-katul.md) | — |
| LXXXVI | Plokije | [086_plokije.md](walter-burley/chapters-generated/086_plokije.md) | — |
| LXXXVII | Panetije | [087_panetije.md](walter-burley/chapters-generated/087_panetije.md) | — |
| LXXXVIII | Livije | [088_livije.md](walter-burley/chapters-generated/088_livije.md) | — |
| LXXXIX | Posejdonije | [089_posejdonije.md](walter-burley/chapters-generated/089_posejdonije.md) | — |
| XC | Hekaton | [090_hekaton.md](walter-burley/chapters-generated/090_hekaton.md) | — |
| XCI | Marko | [091_marko.md](walter-burley/chapters-generated/091_marko.md) | — |
| XCII | Diodor Sicilijski | [092_diodor-sicilijski.md](walter-burley/chapters-generated/092_diodor-sicilijski.md) | — |
| XCIII | Kurion | [093_kurion.md](walter-burley/chapters-generated/093_kurion.md) | — |
| XCIV | Scipion | [094_scipion.md](walter-burley/chapters-generated/094_scipion.md) | — |
| XCV | Ciceron | [095_ciceron.md](walter-burley/chapters-generated/095_ciceron.md) | 9 |
| XCVI | Katon | [096_katon.md](walter-burley/chapters-generated/096_katon.md) | — |
| XCVII | Diogen iz Vavilona | [097_diogen-iz-vavilona.md](walter-burley/chapters-generated/097_diogen-iz-vavilona.md) | — |
| XCVIII | Antipatar iz Tarsa | [098_antipatar-iz-tarsa.md](walter-burley/chapters-generated/098_antipatar-iz-tarsa.md) | — |
| XCIX | Salustije | [099_salustije.md](walter-burley/chapters-generated/099_salustije.md) | — |
| C | Lucije Munacije Plank | [100_lucije-munacije-plank.md](walter-burley/chapters-generated/100_lucije-munacije-plank.md) | — |
| CI | Tit Lukrecije | [101_tit-lukrecije.md](walter-burley/chapters-generated/101_tit-lukrecije.md) | 2 |
| CII | Lucije | [102_lucije.md](walter-burley/chapters-generated/102_lucije.md) | — |
| CIII | Plaut | [103_plaut.md](walter-burley/chapters-generated/103_plaut.md) | — |
| CIV | Vergilije | [104_vergilije.md](walter-burley/chapters-generated/104_vergilije.md) | — |
| CV | Julije | [105_julije.md](walter-burley/chapters-generated/105_julije.md) | — |
| CVI | Lucije Akcije | [106_lucije-akcije.md](walter-burley/chapters-generated/106_lucije-akcije.md) | — |
| CVII | Terencije | [107_terencije.md](walter-burley/chapters-generated/107_terencije.md) | — |
| CVIII | Varon | [108_varon.md](walter-burley/chapters-generated/108_varon.md) | — |
| CIX | Gal | [109_gal.md](walter-burley/chapters-generated/109_gal.md) | — |
| CX | Horacije | [110_horacije.md](walter-burley/chapters-generated/110_horacije.md) | — |
| CXI | Sist | [111_sist.md](walter-burley/chapters-generated/111_sist.md) | — |
| CXII | Marko Nerije | [112_marko-nerije.md](walter-burley/chapters-generated/112_marko-nerije.md) | — |
| CXIII | Atenodor | [113_atenodor.md](walter-burley/chapters-generated/113_atenodor.md) | — |
| CXIV | Ovidije | [114_ovidije.md](walter-burley/chapters-generated/114_ovidije.md) | — |
| CXV | Valerije | [115_valerije.md](walter-burley/chapters-generated/115_valerije.md) | — |
| CXVI | Kalkiter | [116_kalkiter.md](walter-burley/chapters-generated/116_kalkiter.md) | — |
| CXVII | Seneka | [117_seneka.md](walter-burley/chapters-generated/117_seneka.md) | 10 |
| CXVIII | Kvintilijan | [118_kvintilijan.md](walter-burley/chapters-generated/118_kvintilijan.md) | — |
| CXIX | Plutarh | [119_plutarh.md](walter-burley/chapters-generated/119_plutarh.md) | — |
| CXX | Plinije | [120_plinije.md](walter-burley/chapters-generated/120_plinije.md) | — |
| CXXI | Klaudije Ptolemej | [121_klaudije-ptolemej.md](walter-burley/chapters-generated/121_klaudije-ptolemej.md) | — |
| CXXII | Sekund | [122_sekund.md](walter-burley/chapters-generated/122_sekund.md) | — |
| CXXIII | Apolonije | [123_apolonije.md](walter-burley/chapters-generated/123_apolonije.md) | — |
| CXXIV | Vasilid | [124_vasilid.md](walter-burley/chapters-generated/124_vasilid.md) | — |
| CXXV | Taur | [125_taur.md](walter-burley/chapters-generated/125_taur.md) | — |
| CXXVI | Galen | [126_galen.md](walter-burley/chapters-generated/126_galen.md) | — |
| CXXVII | Trog | [127_trog.md](walter-burley/chapters-generated/127_trog.md) | — |
| CXXVIII | Justin | [128_justin.md](walter-burley/chapters-generated/128_justin.md) | — |
| CXXIX | Porfirije iz Tira | [129_porfirije-iz-tira.md](walter-burley/chapters-generated/129_porfirije-iz-tira.md) | — |
| CXXX | Klaudije | [130_klaudije.md](walter-burley/chapters-generated/130_klaudije.md) | — |
| CXXXI | Simah | [131_simah.md](walter-burley/chapters-generated/131_simah.md) | — |
| CXXXII | Priscijan | [132_priscijan.md](walter-burley/chapters-generated/132_priscijan.md) | — |

## Pravilo za dalju obradu

1. Izabrati poglavlje prema manifestu u `chapters-generated/`.
2. Proveriti ceo odlomak u PDF-u.
3. Razdvojiti Burleyjev tekst, starije izvore koje navodi, španski prevod i
   Knustov aparat.
4. Atomizovati i prevesti sav upotrebljiv sadržaj poglavlja.
5. Tek tada autora označiti kao potpuno obrađenog.

Poslednja strukturna provera: 26. avgust 2026.
