# TODO

## Usavršiti prevode

PORAVNAJ SIDRA CELIH DELA
- format je uveden: sidra su nevidljivi komentari `<!-- anchor:… -->` i mogu stajati usred rečenice
- srpski i staroslovenski prevodi ponegde nisu podeljeni na istim kanonskim granicama kao grčki izvornik
- ne preimenovati sidra niti pomerati tekst automatski samo prema dužini
- delo po delo ponovo segmentirati oba prevoda prema grčkim granicama, ne menjajući sam tekst
- prvo srediti:
  1. Epiktetove `Razgovore`
  2. Platonov `Ion`
  3. `Eutifron`, `Lisid` i `Parmenid`
- zatim proveriti `Kritona` i `Klitofonta`
- posle svakog dela pokrenuti generatore i ručno proveriti početak, sredinu i kraj
- kada sva sidra budu poravnata, ponoviti ocenu kvaliteta celih dela iz `docs/ANALIZA_KVALITETA_CELIH_DELA.md`

POPRAVI LOŠE PREVODE
- popravljati lošije stsl prevode (isus.json uzor za etiku, Бытиѥ.md za kosmologiju)
- popravljati lošije sr prevode
- upodobiti sr prevod staroslovenskom dokle je prirodno (koristiti iste korene, imenice, glagole i sl kada je moguće)

## UI

OSTALO
- kod velikih filozofa ima previše sadržaja i stranica postaje nepregledna. možda foldovati sekcije ako imaju previše sadržaja. analizirati česte scenarije. npr. neko traži da čita platonove knjige, smeta mu što je biografija na vrhu stranice predugačka, a potom mnoštvo citata.
- skrati prikaz dugih citata isto kao što su skraćena preduga dela (works)
- napraviti spisak filozofski najvažnijih termina
  - naglasiti samo njih u rečniku (ceo red, sve jezike)

## Razno

- `data\sources\INDEX_GREEK.md`: uraditi mašinski prolaz kroz __cts__.xml za Plutarha i Aristotela i dodati TLG broj uz baš svako njihovo delo.
