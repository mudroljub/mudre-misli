# Prioriteti projekta

## P0 — dovršiti i proveriti ono što je već objavljeno

### Poravnati sidra svih celih dela

- proveriti svih 12 dela prema kanonskim granicama grčkog izvornika;
- dovršiti mape za dela koja ih još nemaju, naročito Platonovog `Iona` i
  `Parmenida`, Epiktetovih `Razgovora` i `Priručnika` i četiri Epikurova dela;
- ne menjati tekst tokom poravnanja; nerešene slučajeve voditi u
  `docs/PROBLEMI_CELIH_DELA.md`;
- posle svakog dela pokrenuti proveru sidara i `npm run build:data`.

### Oceniti kvalitet dugih prevoda

1. Epiktetovi `Razgovori`, jer su najobimniji i najskorije integrisani;
2. Platonov `Parmenid`, zbog terminološke i sintaksičke težine;
3. ostalih pet Platonovih dijaloga;
4. Epikurova pisma i glavne misli;
5. Epiktetov `Priručnik`.

Za svako delo posebno proveriti srpski i staroslovenski prevod, doslednost sa
`docs/RECNIK.md`, prirodnost jezika i međusobnu podudarnost prevoda. Kao uzore
koristiti `data/sources/corpus/isus.json` za etiku i
`data/sources/corpus/Бытиѥ.md` za kosmologiju.

## P1 — obraditi neiskorišćene primarne izvore koji su već izdvojeni

- obraditi nove filozofe na osnovu izvora projekta (Diels, Leartije, Burley...):
  - Euklid Megaranin
  - Plotin

## P3 — širiti korpus celih dela tek posle zatvaranja P0 i P1

### Najprirodniji sledeći paketi

1. Epiktetovi fragmenti (`tlg0557.tlg003`), pošto stranica i terminološki
   sistem već postoje;
2. preostali Epiktetov gnomologij (`tlg004`–`tlg005`), uz proveru preklapanja
   sa `Razgovorima` i `Priručnikom`;
3. kraći centralni Platonovi dijalozi, prvo `Apologija`, zatim `Fedon`;
4. provereni stoički fragmentarni korpusi: Kleant, Hrisip, Ariston sa Hiosa i
   Antipatar iz Tarsa;
5. tek zatim veliko novo područje: Aristotel, Sekst Empirik, Plotin ili Filon.

Ne započinjati više velikih autora istovremeno. Za svaki novi korpus prvo
odrediti obuhvat, kanonske identifikatore, podelu odeljaka i terminološke
probleme.

## P4 — terminologija i UI

- napraviti spisak filozofski najvažnijih termina i u rečniku naglasiti samo
  njihove cele redove, u sva tri jezika;
