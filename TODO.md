# TODO

Ovaj dokument je radni redosled narednih poslova. Detaljni izveštaji ostaju u
`docs/`, dok se ovde čuvaju samo otvoreni zadaci i odluke.

## Trenutno stanje

- [x] Postoji 48 autorskih JSON fajlova sa ukupno 2.067 unosa.
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

- [x] Nastaviti sistematsko dodavanje Diels–Kranz fragmenata, počev od
  **Empedokla**, a zatim obraditi Anaksagoru, Demokrita i Protagoru.
  Empedoklov završni prolaz je dovršen sa 107 povezanih ili unetih DK referenci: B 1–6,
  B 8, B 9, B 11–17, B 20–23, B 25–32, B 35–40, B 42, B 44–45,
  B 47–48, B 50,
  B 52, B 54–59, B 61–62, B 64–65, B 67–68, B 71, B 73, B 75, B 77–79, B 81–86,
  B 88–91, B 96, B 98, B 100, B 102–15, B 117–19, B 121, B 124–25,
  B 127–41 i B 144–147. B 8 je unet kontekstualnim prevodom
  `φύσις` kao rađanja, a B 27a razlikovanjem značenja `στάσις` kao
  mirovanja odnosno razdora/pobune. Preostale oznake proverene su u celini;
  nisu dodati jednorečni glosari, teško oštećeni stihovi, zavisne polurečenice
  ni varijante čija se samostalna poenta već nalazi u dužem sačuvanom fragmentu.
  Anaksagorin završni prolaz je dovršen sa 23 povezane ili unete DK reference:
  B 1–22 i B 21a. B 20 je sačuvan u latinskom Galenovom navodu, pa je u
  `originalText` zadržan latinski tekst umesto naknadno konstruisanog grčkog.
  Izreke koje Diels izričito odvaja kao pozne falsifikate, počev od B 23, nisu
  unošene kao Anaksagorine reči. Kod Demokrita je započet sistematski prolaz;
  završni prolaz dovršen je sa 221 povezanom ili unetom DK referencom. U dopunskim paketima dodati
  su B 56, B 63, B 69–101, B 103–104, B 109–111, B 142, B 144–146, B 149–150;
  potom B 154–157, B 159–160, B 164, B 166, B 169, B 171–179 i B 181.
  Postojeći Diogenovi navodi povezani su i sa B 116–117. B 36 nije dodat jer
  je u izdanju samo upućivanje na tekst B 187, a ne zaseban fragment; B 120–141
  pretežno su jednorečni tehnički glosari ili tekstualno nesigurni ostaci.
  B 180 nije unet jer samo izdanje označava pripisivanje kao sumnjivo. Obrada
  je potom nastavljena sa B 183–190, B 192–197, B 199–204, B 206–208 i
  B 210–218. B 182, B 198, B 205 i B 209 ostavljeni su izvan korpusa zbog
  oštećene, urednički dopunjene ili nerešene lekcije. Sledeći paket obuhvatio
  je B 219–244; B 225 je kao druga potvrda povezan sa već postojećim B 44,
  umesto da bude unet kao duplikat. Politički i pravni niz nastavljen je sa
  B 245–257 i B 259–262, a završni paket B 264–265, B 267–270, B 273–280,
  B 283–287 i B 289–297. B 258, B 263, B 266, B 271–272, B 281–282 i B 288
  nisu uneti jer ključna mesta zavise od lakuna, nesigurnih lekcija ili
  nejasnog prenosa. B 298 je samo gramatička glosa, dok izdanje od B 298a
  nadalje izričito odvaja sumnjive fragmente. Protagorin prolaz dovršen je sa
  sedam povezanih DK referenci: B 1, B 3–4, B 7 i B 9–11. B 2, B 5–6 i B 8
  ostali su izvan korpusa kao bibliografska ili posredna svedočanstva bez
  neposrednog fragmenta, a B 12 jer ga samo izdanje označava kao slabo
  potvrđenog.
- [ ] Za svaki fragment proveriti grčki tekst u pouzdanom izdanju; stari OCR
  koristiti samo kao pomagalo, ne kao autoritet.
- [x] Dopuniti `originalText` u postojećim unosima uz proveru prema pouzdanom
  grčkom izdanju. Dopunjeno je 18 Empedoklovih, 14 Anaksagorinih, tri
  Parmenidova i tri Zenonova polja; svih 1.797 unosa sada ima izvorni tekst.
- [ ] Jasno razlikovati `A` svedočanstva od `B` fragmenata i ne predstavljati
  kasniju doksografiju kao neposredne filozofove reči.
- [x] Pre daljeg oslanjanja na Dielsovu dokumentaciju uskladiti
  `data/sources/INDEX_DIELS.md` i stare analize sa sadašnjim stanjem izvora;
  indeks sada opisuje 16 postojećih tekstualnih isečaka, uklonjene izvedene
  JSON fajlove i ograničenja OCR-a, a stare analize su označene kao istorijske.
- [x] Proveren je lokalni grčki tekst Diogena Laertija IX.7 uz Heraklitov DK
  22 B 3. Diogen kaže samo da je Sunce veličine kakvom se pokazuje
  (`ὁ ἥλιός ἐστι τὸ μέγεθος οἷος φαίνεται`), a ne da ima širinu ljudskog
  stopala, pa nije dodat kao izvor drugačijem iskazu.

## 3. Kvalitet prevoda

Za svakog autora prvo proveriti grčki smisao i rečničku terminologiju, zatim
zasebno isklesati staroslovenski i srpski prevod prema
`docs/KLESANJE_PREVODA.md`.

- [x] **Platon:** prvi veliki prolaz kroz preteške termine, grčku sintaksu i
  nedovoljno prirodan ritam. Pregledan je početni paket III.2–40: ispravljeni
  su, između ostalog, `εὐρυθμία`, odnos `γένεσις`/`οὐσία` i razlikovanje
  `εἶδος`/`ἰδέα`, isklesani srpski i staroslovenski izrazi i uklonjen jedan
  dupli unos iz III.40. Dovršen je i doktrinarni niz III.63–109: ispravljeni
  su pogrešni prenosi `συγκρίματα`, `διαφορά` i `ἀκρισία`, terminologija je
  usklađena sa rečnikom, a duge podele preoblikovane su u prirodnije slovenske
  celine. Završni biografsko-anegdotski paket takođe je pregledan: razjašnjen
  je Aristotel u III.37, ispravljeni tipovi dva unosa, uklonjene zabranjene
  grafeme i pet kraćih sadržajnih duplikata. Platon sada ima 67 unosa bez
  praznih polja, pogrešnog datiranja i doslovnih duplikata.
- [ ] Ostale autore pregledati jednog po jednog, ne masovnom zamenom. Talesov
  prvi veliki prolaz je dovršen: ispravljeni su smisao i ograde izvora,
  razjašnjeni Anaksimandar, tronožac, spisi i doksografska pripisivanja, a
  četiri preklopljena unosa spojena su sa potpunijim verzijama. Ostalo je 47
  unosa bez grafijskih prekršaja, praznih polja i pogrešnog datiranja.
  Anaksimandrov pregled je započet ispravkom sistematskog pomeranja 33
  staroslovenska polja, koja su ranije pripadala narednim srpskim i grčkim
  unosima. Odbačena je i napomena o Polikratu koju Diels izričito vraća
  Pitagori. Završnim prolazom spojena su četiri sadržajna preklapanja o
  učeništvu, kartografiji i Zemlji, dok su neposredni B 1–3 fragmenti jasno
  sačuvani odvojeno od A-svedočanstava. Anaksimandar sada ima 39 usklađenih
  unosa bez grafijskih prekršaja, praznih polja i pogrešnog datiranja.
  Završen je i Anaksimen sa 33 unosa: precizirani su beskrajni vazduh kao
  određeno načelo, razređivanje i zgušnjavanje, kosmološki ciklusi i
  meteorološki iskazi; uklonjeni su grafijski prekršaji i mešano pismo, bez
  sadržajnih duplikata i promene broja unosa.
  Ksenofanov pregled završen je sa 23 unosa. Usklađene su ograde i grčki tekst
  Diogena IX.18–21, razdvojeni su podaci o učiteljima, javnom kazivanju pesama
  i protivljenju drugim misliocima, a dodata su ranije izostavljena učenja o
  četiri prvine, beskrajnim nepromenljivim svetovima i nesaznatljivosti svega.
  Doksografski sažeci sada su označeni kao `reported`, a duplirana biografska
  parafraza vlastitog fragmenta o devedeset dve godine uklonjena je.
  Pitagorin pregled završen je sa 139 unosa. Provereni su Diogenovi odeljci
  VIII.1–50, razdvojene su neposredne izreke od kasnijih pitagorejskih
  svedočanstava, sačuvane su suprotne tradicije o spisima, ishrani, žrtvama i
  smrti, a dopunjeni su Temistokleja, Dama, pravila života i kosmološki iskazi.
  Uklonjeni su sadržajni preklopi, ispravljeni tipovi i usklađeni srpski i
  staroslovenski prevodi.
- [ ] Uklanjati suvišno `єсть`, mehaničko `наи-`, teške participe, nepotrebne
  povratne oblike i opisne izraze kada se smisao potpuno čuva.
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
- [ ] Doraditi `data/sources/source-map.json` samo kroz
  `npm run build:sources`; ne menjati generisani fajl ručno.
- [ ] Za Ferekida koristiti Wikipedia slug `Pherecydes_of_Syros`, preimenovati projektni ključ `Pherecydes`.
- [ ] Za Hiparhiju koristiti Wikipedia slug `Hipparchia_of_Maroneia`, preimenovati projektni ključ `Hipparchia`.

## 7. UI i prikaz sadržaja

- [ ] Proveriti prikaz veoma dugih `works` unosa, naročito Epikurovih pisama:
  čitljivost, sidra, navigaciju unutar dela i ponašanje na telefonu.
- [x] Prikaz izvora sa više navoda koristi strukturisani niz `sources` i ne
  parsira slobodan tekst reference u komponentama.
- [ ] Proveriti mobilni raspored zaglavlja, bočne trake, slike autora i mape
  nakon svake promene zajedničkog layouta.
- [ ] Dodati vizuelne regresione ili bar dokumentovane ručne provere za uske i
  široke ekrane.
- [ ] Dodati greekToLatin(quote.originalText) na stranicu recnik ako je moguće
- [ ] Da prikaz pisama (ima kod Solona) bude pregledniji, možda u jednom redu
- [ ] Prikazati tip quote s velikim ukrasnim navodnicima
- [ ] BUG: kada korisnik dođe na početnu stranicu, vidi stsl citata, klikne na srpski da vidi prevod i promeni se citat. citat treba da ostane isti ako je moguće bez komplikovane implementacije.
- [ ] Napraviti stranicu o projektu (tekst: 🏛️ Училище Мѫдрости Блатьнограда je zamišljena slovenska filozofska škola iz 9. veka koje se nalazila u Blatogradu, jednom od središta panonskih Slovena. Tamo su u to vreme boravili Ćirilo (Konstantin Filozof) i Metodije sa 50-ak učenika, a grad je postao značajno središte slovenske pismenosti. Ovaj projekat pokušava da dočara kako bi izgledale studije filozofije da su Sloveni imali univerzitete u srednjem veku i kakav bi bio slovenski učeni jezik toga vremena.)

## Redosled narednih paketa rada

1. Dovršiti Empedoklove autentične fragmente.
2. Nastaviti Diels–Kranz fragmente kod Anaksagore, Demokrita i Protagore.
3. Platonov prevodilački i stilski prolaz.
4. Stabilni ID-jevi i objedinjena validacija podataka.
5. Prikaz dugih dela, mobilne provere i ostala UI poboljšanja.

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
