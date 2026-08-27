# Walter Burley — *De vita et moribus philosophorum*

Operativni pregled lokalnog Burleyjevog sloja. Za bibliografske podatke i
pravila upotrebe vidi [README](walter-burley/README.md); mašinski sažetak je u
`walter-burley/philosophers_index.json`.

## Lokalni materijal

- izvorno Knustovo izdanje iz 1886. čuva se kao PDF;
- `walter-burley/latin_raw/` sadrži 78 radnih tekstualnih ekstrakcija;
- `walter-burley/chapters/` sadrži pet detaljnije strukturisanih poglavlja;
- direktorijum, a ne ručno vođen spisak, merodavan je inventar ekstrakcija.

Ekstrakcija nije isto što i završena obrada. Pre integracije treba proveriti
granice poglavlja i latinski tekst prema PDF-u, odvojiti paralelni španski
prevod i urednički aparat, zatim obraditi sav raspoloživ tekst iz poglavlja.

## Sadržaj izdanja

Izvorni redosled sadržaja, uz lokalni radni ekstrakt i broj unosa čiji je neposredni izvor `walter-burley`. Knjiga ima 131 redoslednu jedinicu i 132 ličnosti: Polistrat i Ipoklid dele jedan red. Crta znači da lokalni ekstrakt, odnosno takav JSON unos, još ne postoji.

| Redosled | Ličnost | Ekstrakt | JSON unosi |
|---|---|---|---:|
| I | Tales | [thales.txt](walter-burley/latin_raw/thales.txt) | — |
| II | Solon | [solon.txt](walter-burley/latin_raw/solon.txt) | 8 |
| III | Hilon | [chilon.txt](walter-burley/latin_raw/chilon.txt) | 1 |
| IV | Pitak | [pittacus.txt](walter-burley/latin_raw/pittacus.txt) | 1 |
| V | Bijant | [bias.txt](walter-burley/latin_raw/bias.txt) | 6 |
| VI | Kleobul | [cleobulus.txt](walter-burley/latin_raw/cleobulus.txt) | 5 |
| VII | Perijandar | [periander.txt](walter-burley/latin_raw/periander.txt) | — |
| VIII | Zoroaster | [zoroaster.txt](walter-burley/latin_raw/zoroaster.txt) | — |
| IX | Anaksimandar | [anaximander.txt](walter-burley/latin_raw/anaximander.txt) | — |
| X | Anaharsis | [anacharsis.txt](walter-burley/latin_raw/anacharsis.txt) | 1 |
| XI | Misosternon (Mizon) | [misosternon.txt](walter-burley/latin_raw/misosternon.txt) | — |
| XII | Epimenid | [epimenides.txt](walter-burley/latin_raw/epimenides.txt) | — |
| XIII | Ferekid | [pherecides.txt](walter-burley/latin_raw/pherecides.txt) | 5 |
| XIV | Homer | [homerus.txt](walter-burley/latin_raw/homerus.txt) | — |
| XV | Likurg | [lycurgus.txt](walter-burley/latin_raw/lycurgus.txt) | — |
| XVI | Anaksimen iz Mileta | [anaximenes.txt](walter-burley/latin_raw/anaximenes.txt) | — |
| XVII | Pitagora | [pythagoras.txt](walter-burley/latin_raw/pythagoras.txt) | — |
| XVIII | Anaksagora | [anaxagoras.txt](walter-burley/latin_raw/anaxagoras.txt) | — |
| XIX | Kratet | [crates.txt](walter-burley/latin_raw/crates.txt) | 1 |
| XX | Stilbon | [stilbon.txt](walter-burley/latin_raw/stilbon.txt) | — |
| XXI | Arhiloh | — | — |
| XXII | Simonid | — | — |
| XXIII | Arhita | [architas.txt](walter-burley/latin_raw/architas.txt) | — |
| XXIV | Ezop | — | — |
| XXV | Zenon | [zeno_eleates.txt](walter-burley/latin_raw/zeno_eleates.txt) | — |
| XXVI | Gorgija | [gorgias.txt](walter-burley/latin_raw/gorgias.txt) | 3 |
| XXVII | Isokrat | — | — |
| XXVIII | Protagora | [protagoras.txt](walter-burley/latin_raw/protagoras.txt) | — |
| XXIX | Hrisip | [chrysippus.txt](walter-burley/latin_raw/chrysippus.txt) | 19 |
| XXX | Sokrat | [socrates.txt](walter-burley/latin_raw/socrates.txt) | 1 |
| XXXI | Aristip | [aristippus.txt](walter-burley/latin_raw/aristippus.txt) | — |
| XXXII | Ksenofont | [xenophon.txt](walter-burley/latin_raw/xenophon.txt) | 1 |
| XXXIII | Antisten | [antisthenes.txt](walter-burley/latin_raw/antisthenes.txt) | 3 |
| XXXIV | Alkibijad | [alcibiades.txt](walter-burley/latin_raw/alcibiades.txt); [alcibiades_full.txt](walter-burley/latin_raw/alcibiades_full.txt) | — |
| XXXV | Eshin | [aeschines.txt](walter-burley/latin_raw/aeschines.txt) | — |
| XXXVI | Euripid | [euripides.txt](walter-burley/latin_raw/euripides.txt) | — |
| XXXVII | Demosten | [demosthenes.txt](walter-burley/latin_raw/demosthenes.txt) | 7 |
| XXXVIII | Sofokle | [sophocles.txt](walter-burley/latin_raw/sophocles.txt) | — |
| XXXIX | Perikle | — | — |
| XL | Temistokle | — | — |
| XLI | Aristid | — | — |
| XLII | Eudoks | [eudoxus.txt](walter-burley/latin_raw/eudoxus.txt) | — |
| XLIII | Arat | [aratus.txt](walter-burley/latin_raw/aratus.txt) | — |
| XLIV | Demokrit | [democritus.txt](walter-burley/latin_raw/democritus.txt) | — |
| XLV | Hipokrat | [hippocrates.txt](walter-burley/latin_raw/hippocrates.txt) | — |
| XLVI | Euripid (ponovljen u registru) | [euripides.txt](walter-burley/latin_raw/euripides.txt) | — |
| XLVII | Heraklit | [heraclitus.txt](walter-burley/latin_raw/heraclitus.txt) | 1 |
| XLVIII | Empedokle | [empedocles.txt](walter-burley/latin_raw/empedocles.txt) | 4 |
| XLIX | Parmenid | [parmenides.txt](walter-burley/latin_raw/parmenides.txt) | — |
| L | Diogen | [diogenes_cynicus.txt](walter-burley/latin_raw/diogenes_cynicus.txt) | 8 |
| LI | Karnead | — | — |
| LII | Platon | [plato.txt](walter-burley/latin_raw/plato.txt) | — |
| LIII | Aristotel | [aristotle.txt](walter-burley/latin_raw/aristotle.txt) | — |
| LIV | Ksenofil | [xenophilus.txt](walter-burley/latin_raw/xenophilus.txt) | — |
| LV | Fedon | [phaedo.txt](walter-burley/latin_raw/phaedo.txt) | — |
| LVI | Eshil | [aeschylus.txt](walter-burley/latin_raw/aeschylus.txt) | — |
| LVII | Speusip | [speusippus.txt](walter-burley/latin_raw/speusippus.txt) | — |
| LVIII | Apulej | — | — |
| LIX | Plotin | [plotinus.txt](walter-burley/latin_raw/plotinus.txt) | — |
| LX | Hermes Trismegist | [hermes_trismegistus.txt](walter-burley/latin_raw/hermes_trismegistus.txt) | — |
| LXI | Ksenokrat | [xenocrates.txt](walter-burley/latin_raw/xenocrates.txt) | — |
| LXII | Demad | [demetrius.txt](walter-burley/latin_raw/demetrius.txt) | — |
| LXIII | Anaksimen iz Lampsaka | [anaximenes_lampascus.txt](walter-burley/latin_raw/anaximenes_lampascus.txt) | — |
| LXIV | Epikur | [epicurus.txt](walter-burley/latin_raw/epicurus.txt) | 4 |
| LXV | Polistrat i Ipoklid | [polystratus.txt](walter-burley/latin_raw/polystratus.txt) | — |
| LXVI | Kalisten | [callisthenes.txt](walter-burley/latin_raw/callisthenes.txt) | — |
| LXVII | Anaksarh | — | — |
| LXVIII | Teofrast | [theophrastus.txt](walter-burley/latin_raw/theophrastus.txt) | — |
| LXIX | Diodor | [carneades.txt](walter-burley/latin_raw/carneades.txt) — latinski sloj; [diodorus_cronus.txt](walter-burley/latin_raw/diodorus_cronus.txt) — španski sloj | — |
| LXX | Polemon | [polemo.txt](walter-burley/latin_raw/polemo.txt) | — |
| LXXI | Antipatar | [antipater_sidonius.txt](walter-burley/latin_raw/antipater_sidonius.txt) | — |
| LXXII | Arkesilaj | [archesilaus.txt](walter-burley/latin_raw/archesilaus.txt) | — |
| LXXIII | Erasistrat | [eratosthenes.txt](walter-burley/latin_raw/eratosthenes.txt) | — |
| LXXIV | Arhimed | [archimedes.txt](walter-burley/latin_raw/archimedes.txt) | — |
| LXXV | Ptolemej | [ptolemaeus_philadelphus.txt](walter-burley/latin_raw/ptolemaeus_philadelphus.txt) | — |
| LXXVI | Menandar | — | — |
| LXXVII | Filemon | — | — |
| LXXVIII | Zenon (sporni stoik) | — | — |
| LXXIX | Zenon iz Kitijuma | [zeno_citieus.txt](walter-burley/latin_raw/zeno_citieus.txt) | 5 |
| LXXX | Hegesija | — | — |
| LXXXI | Enije | — | — |
| LXXXII | Aristarh iz Samotrake | [aristarchus.txt](walter-burley/latin_raw/aristarchus.txt) | — |
| LXXXIII | Pankupije | — | — |
| LXXXIV | Stacije | — | — |
| LXXXV | Valerije Katul | — | — |
| LXXXVI | Plokije | — | — |
| LXXXVII | Panetije | — | — |
| LXXXVIII | Livije | — | — |
| LXXXIX | Posejdonije | — | — |
| XC | Hekaton | — | — |
| XCI | Marko | — | — |
| XCII | Diodor | — | — |
| XCIII | Kurion | — | — |
| XCIV | Scipion | — | — |
| XCV | Ciceron | [cicero.txt](walter-burley/latin_raw/cicero.txt) | 9 |
| XCVI | Katon | — | — |
| XCVII | Diogen | — | — |
| XCVIII | Antipatar | — | — |
| XCIX | Salustije | — | — |
| C | Plaucije | — | — |
| CI | Tit Lukrecije | [lucretius.txt](walter-burley/latin_raw/lucretius.txt) | 2 |
| CII | Lucije | — | — |
| CIII | Plaucije | — | — |
| CIV | Vergilije | — | — |
| CV | Julije | — | — |
| CVI | Lucije Akcije | — | — |
| CVII | Terencije | — | — |
| CVIII | Varon | — | — |
| CIX | Gal | — | — |
| CX | Horacije | — | — |
| CXI | Sist | — | — |
| CXII | Marko Nerije | — | — |
| CXIII | Atenodor | — | — |
| CXIV | Ovidije | — | — |
| CXV | Valerije | — | — |
| CXVI | Kalkiter | — | — |
| CXVII | Seneka | [seneca.txt](walter-burley/latin_raw/seneca.txt) | 10 |
| CXVIII | Kvintilijan | [quintilianus.txt](walter-burley/latin_raw/quintilianus.txt) | — |
| CXIX | Plutarh | [plutarchus.txt](walter-burley/latin_raw/plutarchus.txt) | — |
| CXX | Plinije | — | — |
| CXXI | Ptolemej | — | — |
| CXXII | Sekund | — | — |
| CXXIII | Apolonije | — | — |
| CXXIV | Vasilid | [basilides.txt](walter-burley/latin_raw/basilides.txt) | — |
| CXXV | Taur | — | — |
| CXXVI | Galen | [galenus.txt](walter-burley/latin_raw/galenus.txt) | — |
| CXXVII | Trog | — | — |
| CXXVIII | Porfirije iz Tira | [porphyrius.txt](walter-burley/latin_raw/porphyrius.txt) | — |
| CXXIX | Klaudije | — | — |
| CXXX | Simah | — | — |
| CXXXI | Priscijan | — | — |

## Pravilo za dalju obradu

1. Izabrati ekstrakt prema stvarnom fajlu u `latin_raw/`.
2. Proveriti ceo odlomak u PDF-u.
3. Razdvojiti Burleyjev tekst, starije izvore koje navodi, španski prevod i
   Knustov aparat.
4. Atomizovati i prevesti sav upotrebljiv sadržaj poglavlja.
5. Tek tada autora označiti kao potpuno obrađenog.

Poslednja strukturna provera: 26. avgust 2026.
