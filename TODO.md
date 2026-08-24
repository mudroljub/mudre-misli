# TODO

## Usavršiti prevode

OCENI STANJE PREVODA
- za svakog autora u data\quotes
  - uzmi 10 nasumičnih unosa tipa `quote` ili `reported`
  - za svaki citat oceni
    - tačnost stsl i sr prevoda sa izvornog jezika
    - stil stsl i sr prevoda (lepota i prirodnost jezika)
    - ujednačenost stsl i sr prevoda (isti koreni reči i ostalo)
- napravi izveštaj sa ocenama po autorima

POPRAVI LOŠE PREVODE
- popravljati lošije stsl prevode (isus.json uzor za etiku, Бытиѥ.md za kosmologiju)
- popravljati lošije sr prevode
- upodobiti sr prevod staroslovenskom dokle je prirodno (koristiti iste korene, imenice, glagole i sl kada je moguće)

## UI

- odvoji duže radove u poseban json, posebno Epikurova pisma. smisliti sistem da kasnije podrži i Platonove dijaloge.
- skrati prikaz dugih citata isto kao što su skraćena preduga dela (works)
- napraviti spisak filozofski najvažnijih termina
  - naglasiti samo njih u rečniku (ceo red, sve jezike)

## Razno

- `data\sources\INDEX_GREEK.md`: uraditi mašinski prolaz kroz __cts__.xml za Plutarha i Aristotela i dodati TLG broj uz baš svako njihovo delo.
- parsiraj u json prevode iz `data\works` i uklopi u sajt (koristi rešenje za duge radove)
