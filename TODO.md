# Prioriteti projekta

## P0 — dovršiti i proveriti ono što je već objavljeno

### Poravnati sidra svih celih dela

- proveriti svih 12 dela prema kanonskim granicama grčkog izvornika;
- dovršiti mape za dela koja ih još nemaju, naročito Platonovog `Parmenida`,
  Epiktetovih `Razgovora` i preostala tri Epikurova dela (`Priručnik` je
  proveren i mapiran u svih 53 odeljka; `Pismo Menoikeju` poravnato je prema
  odeljcima X.122–135; `Parmenid` je proveren i mapiran u svih 195 Stefanovih
  odeljaka 126a–166c; `Razgovori` su provereni i mapirani u svih 95 poglavlja
  I.1–IV.13, uz zabeležene tekstualne praznine u knjigama I i II);
- tokom poravnanja odmah ispraviti očigledne tekstualne greške, poput
  dupliranih odlomaka; ostale nerešene slučajeve voditi u
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

- u rečniku boldovati glavne (linkovane) termine, u sva tri jezika
- napraviti spisak filozofski najvažnijih termina
- rečnik -> Filozofski rečnik
- odlučiti da li zaseban font za stsls ćirilicu i ostalo ili jedan za sve?
