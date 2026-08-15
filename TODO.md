# TODO

## 2. Usavršiti prevode

### 2.1. Projektni terminološki prolaz

- [ ] Proći stavke iz `docs/RECNIK.md` i proveriti da li su njihovi srpski i
  staroslovenski ekvivalenti dosledno primenjeni u celom korpusu. Jednoznačne
  neusaglašenosti ispraviti; svaki opravdani izuzetak izdvojiti i tražiti
  odluku pre promene.
- [x] Ukloniti preostale oblike `etar` i `еѳеръ` i primeniti rečničko rešenje
  `nebesje` i `небєсьє`, uz proveru konkretnog grčkog konteksta.
- [ ] Svaku novu terminološku odluku prvo predložiti za `docs/RECNIK.md`, pa je
  tek onda dosledno primeniti na prevode.

### 2.2. Klesanje jednog autora

Usavršavati prevod jednog po jednog autora, kroz sledeće prolaze:

- [x] **Heraklit** — završen sadržinski, terminološki i prevodilački prolaz.
  Zastupljena su 123 od 126 Dilsovih B-brojeva. B58 je tekstološki oštećen,
  B69 nema izdvojive Heraklitove reči, a B81 je korumpirano posredno retoričko
  svedočanstvo; zato nisu predstavljeni kao njegove izreke. Svih 154 unosa
  imaju prevodni par, izvornik, izvor i stabilan jedinstven ID; provera tipova
  i provera duplikata prolaze.

- [x] **Parmenid** — završen sadržinski, terminološki i prevodilački prolaz.
  Svih 19 Dilsovih B-fragmenata predstavljeno je u 54 zapisa, sa 30 preciznih
  upućivanja na stihove; dopunjen je gotovo ceo proem B1 i izostavljeni B7.
  Uklonjen je duplikat svedočanstva o zakonima, ispravljene su vrste zapisa i
  oba prevoda proverena prema izvorniku. JSON, generator i provera tipova
  prolaze. Tekstološka nedoumica u B1.31–32 zabeležena je za kasniju odluku.

- [ ] **Anaksagora** — u toku. Početno stanje: 65 unosa; proveriti potpunost
  po `46-Anaxagoras.txt`, ukloniti sadržinska preklapanja i isklesati oba
  prevoda prema grčkom, bez mehaničkog ujednačavanja legitimnih alt termina.

Posvećenu grafijsku kontrolu zasad preskočiti; ispravljati samo očigledne
grafijske greške uočene tokom sadržinskog rada.

1. **Utvrditi izvornik i smisao** — proveriti `originalText`, izdanje,
   referencu i izvornu ogradu. Raščlaniti grčku sintaksu, ključne reči,
   participe, pojmovne porodice, antiteze, ponavljanja, igre reči i moguće
   dvosmislenosti. U ovoj fazi još ne klesati izraz.
2. **Proveriti srpski neposredno prema grčkom** — napraviti veran srpski
   prevod nezavisno od postojećeg `stsl`. Čuvati smisao, odnose među pojmovima
   i prirodne grčke participe i infinitive; ne prilagođavati značenje
   staroslovenskom prevodu.
3. **Proveriti ili izgraditi staroslovenski** — prevesti sa grčkog prema
   `docs/PREVODJENJE_NA_STAROSLOVENSKI.md`. Za svaki termin prvo primeniti
   `docs/RECNIK.md`; ako ga nema, istražiti slovensku porodicu i tek posle
   terminološke odluke uneti novo rešenje u rečnik. Proveriti morfologiju,
   grafiju, imena i srednje tačke.
4. **Isklesati staroslovenski** — redom proveriti reči, ukloniti višak,
   razbiti preslikanu grčku sintaksu, sačuvati građu misli i na kraju isklesati
   ritam prema `docs/KLESANJE_PREVODA.md`. Uklanjati suvišno `єсть`, mehaničko
   `наи-`, teške participe, nepotrebne povratne oblike i opisne izraze samo
   kada se ništa iz izvornika ne gubi. Kao jezičke uzore koristiti
   `data/sources/corpus/isus.json` i `data/sources/corpus/Бытиѥ.pdf`, ali ne kao
   zatvoren normativni rečnik.
5. **Drugi srpski prolaz i klesanje** — ponovo proveriti vernost grčkom, pa
   srpski približiti isklesanom staroslovenskom u terminima, slovenskim
   porodicama, konstrukciji i redu misli gde grčki dopušta. Zatim istim redom
   isklesati reči, višak, sintaksu, građu i ritam. Čuvati prirodne participe,
   infinitive i aorist; ukloniti akademsku parafrazu i nepotrebne navodnike.
6. **Završno čitanje para** — pročitati `stsl` i `sr` zajedno i naglas, pa oba
   poslednji put uporediti sa grčkim. Moraju nositi isti smisao, iste utvrđene
   pojmove i pojmovne veze i sličnu zbijenost, a svaki mora ostati prirodan u
   sopstvenom jeziku. Prevod je završen kada se više ništa ne može oduzeti bez
   gubitka izvorne misli.

## UI

- tekst na stranici O projektu da zauzima celu širinu
- odvojiti duže radove u poseban json, posebno Epikurova pisma. smisliti sistem da kasnije podrži i Platonove dijaloge.

## Razno

- odvojiti duže radove u poseban json, posebno Epikurova pisma. smisliti sistem da kasnije podrži i Platonove dijaloge.
- proveriti u izvorima tumačenja Kleobulinih zagonetki
