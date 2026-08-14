# TODO

Ovaj dokument je radni redosled narednih poslova. Detaljni izveštaji ostaju u
`docs/`, dok se ovde čuvaju samo otvoreni zadaci i odluke.

## Trenutno stanje

- [x] Postoji 48 autorskih JSON fajlova sa ukupno 1.581 unosom.
- [x] Svaki unos ima `sr`, `stsl`, `originalText` i najmanje jedan izvor.
- [x] Diogenovi i lokalno dostupni Burleyjevi navodi dobijaju generisane pointere.
- [x] Generisanje izvora i citata i provera TypeScript tipova prolaze.
- [x] Produkcijski build se kompajlira i započinje generisanje svih stranica.
- [x] Uvedena su pravila za datiranje, podelu unosa, deljene unose, prevođenje i
  završno klesanje prevoda.

## 1. Dovršiti korpus prema Diogenu Laertiju

Raditi jednog autora odjednom. Pre dodavanja novog unosa proveriti da li isti
sadržaj već postoji preko Valtera Burlija ili drugog izvora; tada postojećem
unosu dodati izvor umesto pravljenja duplikata.

### Potvrđeno nepotpuni

- [x] **Kleobul — I.89–93:** dopuniti životopis, izreke i pismo Solonu; povezati
  podudarne Burlijeve izreke sa Diogenom.
- [x] **Ferekid — I.116–122:** dopuniti proročanstva, predanja o smrti, odnos sa
  Pitagorom i Talesom, pismo i pripisano delo; pažljivo spojiti verzije koje već
  postoje preko Burlija.
- [x] **Piron — IX.63–68:** dodati sigurne lične i karakterološke epizode.
- [x] **Menedem — II.125–144:** ponovo izvući ceo odeljak i proveriti razgovorne
  epizode, tipove i duplikate.
- [x] **Teofrast — V.36–57:** dopuniti biografski i karakterološki materijal;
  odlučiti koji delovi testamenta pripadaju zbirci.
- [x] **Epikur — X.1–154:** dopuniti životopis i predanja, a Pisma Herodotu,
  Pitoklu i Menoikeju i *Glavne misli* preneti kao celovita dela u `works`.
  Biografski deo, sva tri pisma i svih 40 *Glavnih misli* su završeni.

### Visok rizik od propusta

- [x] Ksenokrat — IV.6–15; dopunjene sigurne anegdote, ispravljeni tipovi i
  vraćen kontekst izrekama. Katalog spisa i Diogenov epigram nisu pretvarani u
  autorske citate.
- [x] Timon — IX.109–116; dopunjeni porodica, dela, smrt, način rada i
  naslednici, a doslovni duplikat odgovora Arkesilaju uklonjen. Dve tekstualne
  nedoumice zabeležene su u `docs/OTVORENE_DILEME.md`.
- [x] Zenon iz Kitija — VII.1–160; dopunjeni životopis, izreke, anegdote i samo
  oni stavovi koje Diogen izričito pripisuje Zenonu. Opšta stoička doktrina i
  katalog spisa nisu pretvarani u njegove citate.
- [x] Hrisip — VII.179–202; dopunjeni životopis, druga verzija smrti,
  sačuvani sofizmi i izričito navedeni odlomci iz dela. Katalog spisa
  VII.189–202 nije pretvaran u citate.
- [x] Ksenofont — II.48–59; potvrđeno da nema doslovnih duplikata, a dopunjeni
  su spartansko gostoprimstvo i imanje, Filopidin dar, Diodorova sudbina i
  povratak iz progonstva. Sukob dva datiranja zrelosti ostavljen je u dilemama.
- [x] Aristip — II.65–85; proverena je cela njegova biografija i uklonjeno sedam
  kraćih unosa čija je ista poenta već sačuvana u potpunoj anegdoti. II.84–85
  su katalozi dela, a od II.86 počinju drugi pripadnici kirenske škole.
- [x] Diogen iz Sinope — VI.20–81; dopunjene samostalne poente izgubljene pri
  ranijem sažimanju, spojene dve varijante odgovora o ismevanju i objedinjena
  predanja o smrti. Katalog dela i spisak imenjaka nisu pretvarani u citate.
- [x] Pitagora — VIII.1–50; dopunjeni matematički i muzički rad, tumačenje
  simbola, način života, Ksenofanovo svedočenje, varijante smrti i sin Telaug.
  Komičarske poruge, Diogenovi epigrami i drugi ljudi istog imena nisu dodati.
- [x] Empedokle — VIII.51–77; dopunjeni porodični podaci, izgubljena dela,
  odnos sa Pausanijom i javno izvođenje *Očišćenja*. Tekstualna nedoumica o
  broju tragedija zabeležena je za kasniju proveru kritičkog aparata.
- [x] Gorgija i Demosten — pretražena sva pojavljivanja u deset knjiga. Gorgija
  je već bio potpuno pokriven; Demostenu su dodati Eubulid, Platon, smrt i dve
  deljene anegdote sa Diogenom.

Detalji i obrazloženja: `docs/IZVESTAJ_O_POTPUNOSTI_DIOGENA.md`.

## 2. Autentični fragmenti i druga kapitalna dela

- [ ] Nastaviti sistematsko dodavanje Diels–Kranz fragmenata, počev od
  **Empedokla**, a zatim obraditi Anaksagoru, Demokrita i Protagoru.
  Kod Empedokla su za početak prepoznati i bez dupliranja povezani postojeći
  odlomci B 1, B 2, B 6, B 17, B 111, B 112, B 117 i B 129, a kao prvi
  novi provereni unosi dodati su B 11–16, B 25, B 29, B 52, B 55, B 118 i
  B 124, izuzev
  terminološki spornog B 8 koji je zabeležen u otvorenim dilemama.
- [ ] Za svaki fragment proveriti grčki tekst u pouzdanom izdanju; stari OCR
  koristiti samo kao pomagalo, ne kao autoritet.
- [ ] Jasno razlikovati `A` svedočanstva od `B` fragmenata i ne predstavljati
  kasniju doksografiju kao neposredne filozofove reči.
- [ ] Kapitalna sačuvana dela čuvati cela kao `works`; kratke spoljne izvore ne
  kopirati lokalno samo radi nekoliko navoda.
- [x] Pre daljeg oslanjanja na Dielsovu dokumentaciju uskladiti
  `data/sources/INDEX_DIELS.md` i stare analize sa sadašnjim stanjem izvora;
  indeks sada opisuje 16 postojećih tekstualnih isečaka, uklonjene izvedene
  JSON fajlove i ograničenja OCR-a, a stare analize su označene kao istorijske.
- [ ] Pronaći fragment kod Diogena Leartija gde Heraklit govori o veličini sunca, i dodati ga.

## 3. Kvalitet prevoda

Za svakog autora prvo proveriti grčki smisao i rečničku terminologiju, zatim
zasebno isklesati staroslovenski i srpski prevod prema
`docs/KLESANJE_PREVODA.md`.

- [ ] **Platon:** prvi veliki prolaz kroz preteške termine, grčku sintaksu i
  nedovoljno prirodan ritam.
- [ ] Ostale autore pregledati jednog po jednog, ne masovnom zamenom.
- [ ] Uklanjati suvišno `єсть`, mehaničko `наи-`, teške participe, nepotrebne
  povratne oblike i opisne izraze kada se smisao potpuno čuva.
- [ ] Razbijati grčke periode u prirodne slovenske celine.
- [ ] Sačuvati termine iz `docs/RECNIK.md`, zajedničke korene, antiteze,
  paralelizme, namerna ponavljanja, igre reči i dvosmislenosti.
- [ ] Svaku prihvaćenu promenu termina prvo uneti u rečnik, pa je tek onda
  dosledno primeniti u prevodima.
- [ ] Srpske prevode pregledati istim kriterijumom: tačnost, sažetost,
  prirodnost i ritam, bez akademske parafraze.
- [ ] Korpus `data/sources/corpus/isus.json` koristiti kao stilsku i gramatičku
  potvrdu, ne kao zatvoren normativni rečnik.

## 4. Datiranje i tipovi

- [x] Razrešene su sve hronološke dileme izdvojene u `docs/IZVESTAJ_O_DATIRANJU.md`.
- [x] Proveriti i ukloniti nedozvoljeni `year` kod Platona. Nema godine kod
  nedozvoljenih tipova niti nedatiranih `bio`/`anecdote` unosa; pritom su
  ispravljena tri susedna unosa kojima su bili ukršteni prevodi i grčki tekst.
- [ ] Pri svakom uređivanju autora ponovo proveriti granicu između `bio`,
  `anecdote`, `quote`, `reported` i `works`.
- [x] Ne datirati `quote`, `reported` i `works`; `bio` i `anecdote` moraju imati
  godinu, osim privremeno dokumentovane nerešene hronologije. Svih 50
  nasleđenih nedatiranih unosa dobilo je razuman datum prema događaju i
  životnom rasponu, a objedinjena provera sada ovo pravilo sprovodi strogo.

## 5. Trajni identitet unosa

- [ ] Uvesti stabilan `id` za svaki izvorni unos; indeks u nizu ne sme biti
  identitet jer se menja pri razdvajanju, spajanju i preuređivanju.
- [ ] Pre implementacije odrediti pravila za:
  - jedan unos sa više izvora;
  - deljeni unos sa više autora;
  - razdvajanje jednog unosa na više novih;
  - spajanje duplikata;
  - celovita dela i njihove eventualne odlomke.
- [ ] Pointer ostaviti generisanim podatkom koji vodi do izvora; ne koristiti ga
  kao jedini identitet unosa, jer se lokalni fajl ili red može promeniti.
- [ ] Posle dogovora dodati validaciju jedinstvenosti i obaveznosti `id` polja u
  generator citata.

## 6. Izvori i pointeri

- [ ] Implementirati resolver za `hermann-diels` kada bude postojao stabilan
  lokalni sloj izvora vredan dugoročnog održavanja.
- [ ] Resolver dodavati samo za izvor koji je lokalno sačuvan; Plutarh,
  Aristotel, Atenej i *Dissoi Logoi* mogu ostati bez pointera dok imamo samo
  nekoliko navoda.
- [x] Dodati automatsku proveru da svaki generisani pointer vodi do postojećeg
  fajla i reda i da svaki sačuvani anchor postoji u ciljnom odeljku. Ako
  parafraza nema pouzdan tekstualni presek, generator ostavlja tačan pointer na
  odeljak bez lažnog anchora.
- [x] Uskladiti statistiku u `docs/POINTER_FORMAT.md` posle svake veće promene
  korpusa. Trenutni presek je 1.523/1.581 pointera i 1.211 proverenih anchora.
- [ ] Doraditi `data/sources/source-map.json` samo kroz
  `npm run build:sources`; ne menjati generisani fajl ručno.
- [ ] Pherecydes na wikipediji je Pherecydes of Syros, preimenovati
- [ ] preimenovati Hipparchia u Hipparchia of Maroneia

## 7. UI i prikaz sadržaja

- [ ] Proveriti prikaz veoma dugih `works` unosa, naročito Epikurovih pisama:
  čitljivost, sidra, navigaciju unutar dela i ponašanje na telefonu.
- [ ] Osmisliti prikaz izvora sa više navoda bez oslanjanja na parsiranje
  slobodnog teksta reference u komponentama.
- [ ] Proveriti mobilni raspored zaglavlja, bočne trake, slike autora i mape
  nakon svake promene zajedničkog layouta.
- [ ] Dodati vizuelne regresione ili bar dokumentovane ručne provere za uske i
  široke ekrane.
- [ ] Dodati greekToLatin(quote.originalText) na stranicu recnik ako je moguće
- [ ] Da prikaz pisama (ima kod Solona) bude pregledniji, možda u jednom redu
- [ ] Prikazati tip quote s velikim ukrasnim navodnicima
- [ ] Napraviti stranicu o projektu (tekst: 🏛️ Училище Мѫдрости Блатьнограда je zamišljena slovenska filozofska škola iz 9. veka koje se nalazila u Blatogradu, jednom od središta panonskih Slovena. Tamo su u to vreme boravili Ćirilo (Konstantin Filozof) i Metodije sa 50-ak učenika, a grad je postao značajno središte slovenske pismenosti. Ovaj projekat pokušava da dočara kako bi izgledale studije filozofije da su Sloveni imali univerzitete u srednjem veku i kakav bi bio slovenski učeni jezik toga vremena.)

## Redosled narednih paketa rada

1. Kleobul.
2. Ferekid.
3. Piron.
4. Menedem.
5. Teofrast.
6. Epikur kao poseban veći posao.
7. Empedoklovi autentični fragmenti.
8. Platonov prevodilački i stilski prolaz.
9. Stabilni ID-jevi i objedinjena validacija podataka.

## Pravilo završavanja jednog autora

Autor je sređen tek kada su zajedno provereni:

- [ ] potpunost prema dostupnom izvornom odeljku;
- [ ] duplikati i deljeni unosi;
- [ ] tip svakog unosa;
- [ ] datiranje biografije i anegdota;
- [ ] grčki `originalText` i svi navodi izvora;
- [ ] termini prema rečniku;
- [ ] staroslovenski prevod;
- [ ] srpski prevod;
- [ ] završno klesanje i ritam;
- [ ] generator citata, tipovi i produkcijski build.
