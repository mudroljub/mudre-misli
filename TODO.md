# TODO

Ovaj dokument je radni redosled narednih poslova. Završeni poslovi i njihova
obrazloženja ostaju u izveštajima u `docs/`, a ovde se čuvaju samo otvoreni
zadaci, trajna pravila i odluke potrebne za nastavak rada.

## 1. Popuniti sadržaj svih filozofa

Pre sistematskog usavršavanja prevoda pregledati svakog filozofa prema svim
dostupnim izvorima i dodati nedostajuće citate, svedočanstva, anegdote,
životopisne podatke i dela. Pri unosu napraviti tačan i razumljiv radni prevod,
ali završno terminološko i stilsko klesanje ostaviti za sledeću fazu.

- [ ] Prema inventaru u `docs/POTPUNOST_AUTORA.md` obraditi jednog po jednog
  autora dok ne budu pokriveni svi dostupni izvorni odeljci.
- [ ] Svakom novom unosu odmah dodeliti stabilan `id`, odgovarajući tip prema
  `types/data.ts`, datiranje, izvore i `originalText`. Pri obradi svakog autora
  ponovo proveriti granicu između `bio`, `anecdote`, `quote`, `reported`,
  `mention` i `works`.

### 1.1. Autentični fragmenti i kapitalna dela

- [ ] Za svaki fragment proveriti grčki tekst u pouzdanom izdanju; stari OCR
  koristiti samo kao pomagalo, ne kao autoritet.
- [ ] Neposredne filozofove reči označavati kao `quote`, a kasnija svedočanstva
  i doksografske prikaze kao `reported`, uz očuvane izvorne ograde.
- [ ] U `data/sources/` lokalno čuvati celovita dela samo kada se sistematski
  obrađuju kao glavni izvori. Kada se iz spoljnog dela koristi svega nekoliko
  navoda, u unosima sačuvati preciznu referencu, bez kopiranja čitavog dela u projekat.

## 2. Usavršiti prevode

Ovu fazu započeti tek kada su svi filozofi sadržajno popunjeni. Tada pregledati
ceo korpus jednog autora po jednog, bez dodavanja sadržaja kao glavnog cilja.

### 2.1. Projektni terminološki prolaz

- [ ] Proći stavke iz `docs/RECNIK.md` i proveriti da li su njihovi srpski i
  staroslovenski ekvivalenti dosledno primenjeni u celom korpusu. Jednoznačne
  neusaglašenosti ispraviti; svaki opravdani izuzetak izdvojiti i tražiti
  odluku pre promene.
- [ ] Ukloniti preostale oblike `etar` i `еѳеръ` i primeniti rečničko rešenje
  `nebesje` i `небєсьє`, uz proveru konkretnog grčkog konteksta.
- [ ] Svaku novu terminološku odluku prvo predložiti za `docs/RECNIK.md`, pa je
  tek onda dosledno primeniti na prevode.

### 2.2. Klesanje jednog autora

Po završetku sadržajne faze nastaviti jednog autora po jednog, hronološki od
**Heraklita**. Oba prevoda jednog autora završiti zajedno kroz sledeće prolaze;
oba se na kraju ponovo proveravaju prema grčkom.

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

### 2.3. Provera završenog autora

Autor je sređen tek kada su zajedno provereni:

- [ ] potpunost prema dostupnom izvornom odeljku;
- [ ] duplikati i deljeni unosi;
- [ ] tip svakog unosa;
- [ ] datiranje biografije i anegdota;
- [ ] grčki `originalText`, svi navodi izvora i obavezna polja;
- [ ] termini prema rečniku;
- [ ] staroslovenski i srpski prevod, grafija, završno klesanje i ritam;
- [ ] generator citata, provera tipova i produkcijski build.

Tek posle svih provera zabeležiti da je autor završen i preći na sledećeg.

## UI

- tekst na stranici O projektu da zauzima celu širinu
