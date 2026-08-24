# TODO

## Usavršiti prevode

PORAVNAJ SIDRA CELIH DELA
- format je uveden: sidra su nevidljivi komentari `<!-- anchor:… -->` i mogu stajati usred rečenice
- sve uočene probleme odmah beležiti u `docs/PROBLEMI_CELIH_DELA.md`; rešene zapise ne brisati, nego menjati njihov status
- srpski i staroslovenski prevodi ponegde nisu podeljeni na istim kanonskim granicama kao grčki izvornik
- ne preimenovati sidra niti pomerati tekst automatski samo prema dužini
- delo po delo ponovo segmentirati oba prevoda prema grčkim granicama, ne menjajući sam tekst
- prvo srediti:
  1. Epiktetove `Razgovore` — provera je otkrila pogrešan sadržaj IV.2 i 13 izostavljenih poglavlja; vidi dnevnik problema
  2. Platonov `Ion` — sidra poravnata; ostaje izostavljen tekst 540a
  3. `Eutifron` i `Lisid` — sidra poravnata; potom `Parmenid`
- zatim proveriti `Kritona` i `Klitofonta`
- posle svakog dela pokrenuti generatore i ručno proveriti početak, sredinu i kraj
- kada sva sidra budu poravnata, ponoviti ocenu kvaliteta celih dela iz `docs/ANALIZA_KVALITETA_CELIH_DELA.md`

POPRAVI LOŠE PREVODE
- popravljati lošije stsl prevode (isus.json uzor za etiku, Бытиѥ.md za kosmologiju)
- popravljati lošije sr prevode
- upodobiti sr prevod staroslovenskom dokle je prirodno (koristiti iste korene, imenice, glagole i sl kada je moguće)

## UI

OSTALO
- skrati prikaz dugih citata isto kao što su skraćena preduga pisma (works). koristi isti limit reči
- napraviti spisak filozofski najvažnijih termina
  - naglasiti samo njih u rečniku (ceo red, sve jezike)

## Razno

- `data\sources\INDEX_GREEK.md`: uraditi mašinski prolaz kroz __cts__.xml za Plutarha i Aristotela i dodati TLG broj uz baš svako njihovo delo.
