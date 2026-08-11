# Izveštaj o datiranju unosa po filozofima

Datum poslednje provere: 11. avgust 2026.

## Obuhvat i pravila

Provereno je 46 autorskih fajlova, odnosno svi fajlovi u `data/quotes/` osim Talesa, Heraklita i Platona, koji su ranije izdvojeni kao već sređeni. Provera prati `docs/DATIRANJE.md`:

- `bio` i `anecdote` moraju imati `year`;
- `quote`, `reported` i `works` ne smeju imati `year`;
- datum mora biti u životnom opsegu autora, osim kada tekst izričito opisuje posthumni događaj;
- procenjena godina treba da označava stvarno životno razdoblje, a ne da se automatski izjednači sa rođenjem ili smrću.

## Trenutno stanje

- Svi obuhvaćeni `quote`, `reported` i `works` unosi sada su bez polja `year`.
- Jedini preostali nedozvoljeni `year` nalazi se kod Platona, koji nije deo ove provere.
- Među obuhvaćenim autorima nedostaje godina samo trima Zoroasterovim unosima.
- Jedini datum izvan životnog opsega jeste Pitagorin posthumni unos iz -450, koji pravilno govori o Filolajevom objavljivanju pitagorejskih knjiga.
- Generator izvora, generator 1.358 citata, provera TypeScript tipova i puna produkcijska izgradnja prolaze; statički su generisane 2.854 stranice.
- Izgrađeno je 1.312 lokalnih pointera: svih 1.223 primarnih navoda iz Diogena Laertija i svih 89 iz lokalno sačuvanih Burleyjevih poglavlja; svaki ciljni fajl i broj reda postoje.

## Završene sigurne ispravke

### Formalna pravila i tipovi

- Uklonjene su nedozvoljene godine sa 49 samostalnih izreka i učenja: Hrisip 16, Epikur 9, Pitak 14, Piron 4, Timon 4 i Zenon iz Kitija 2.
- Šest Menedemovih kratkih razgovornih scena pretipizirano je iz `quote` u `anecdote`, uz zadržavanje godina.
- Pitakovo odbijanje Krezovog novca i Platonovo poređenje Ksenokrata sa Aristotelom pretipizirani su iz `bio` u `anecdote`, uz zadržavanje godina.
- Epikurov složeni unos X.11 razdvojen je na datirani biografski podatak o skromnom životu zajednice i zaseban `reported` stav protiv zajedničke imovine, bez godine.
- Kratetov zavet novca deci i Epikurova pripovest o smrti u kadi sa poslednjim savetom prijateljima pretipizirani su iz `bio` u `anecdote`.
- Aristotelovo povlačenje u Halkidu i odredbe oporuke, Gorgijino prisustvo Empedoklovim radnjama, Protagorino progonstvo, Kritonovo obrazovanje Sokrata i pet Ksenofontovih životnih podataka pretipizirani su iz `anecdote` u `bio`.
- Parmenidov unos IX.23 ispravljen je prema grčkom tekstu: ne govori o istovetnosti Večernjače i Zornjače, nego o loptastoj Zemlji smeštenoj u sredini; označen je kao `reported` bez godine.
- Grčki tekst Diogenove anegdote o tri predanja njegove smrti dopunjen je varijantom ujeda pri deljenju hobotnice psima, koju su prevodi već sadržali; izostavljena pesma sada je jasno označena uglastom elipsom.
- Dva Antistenova razgovorna unosa iz Burleyja i Anaksarhova gozba kod Aleksandra ranije su pretipizirani u anegdote.
- Uklonjeni su nedatirani Antistenov sažetak Teopompove pohvale i nekoliko njegovih kraćih biografskih sažetaka koji su već bili sadržani u potpunijim unosima.
- Kleobulov podatak o Kleobulini smešten je u -600, saglasno njenom zasebnom biografskom unosu.

### Datiranje i razdvajanje

- Anaharsid je uređen prema unutrašnjoj hronologiji Diogenovog predanja i projektnom opsegu -620–-580.
- Anaksagorino učeništvo smešteno je u mladost, dolazak u Atinu i prenos prirodne filozofije u -456, meteorit kod Egospotama u -467, a suđenje približno u -433.
- Napuštanje porodičnog imanja i povlačenje proučavanju prirode pomereno je iz Anaksagorine četrnaeste godine (`-486`) u odraslo doba (`-470`).
- Anaksimandrovo učeništvo kod Talesa i rad sa sunčanikom više nisu u godini rođenja.
- Anaksimenovo učeništvo smešteno je u mladost, a pad Sarda i njegova smrt razdvojeni su na -546 i -525.
- Gorgijino učeništvo, govornička delatnost, atinska slava, učiteljstvo Izokratu i podatak o dugovečnosti razdvojeni su u zasebne događaje.
- Demostenova atinska slava pomerena je iz godine rođenja u -355.
- Teofrastov složeni početni unos razdvojen je na poreklo (-371), školovanje (-350), preuzimanje škole (-322) i sticanje vrta posle Aristotelove smrti (-322). Grčki tekst o vrtu vraćen je prema Diogenu V.39.
- Eudoksov prvi boravak u Atini smešten je u -385, prema izričito navedenoj 23. godini života. Put u Egipat i priča o Apisu slede u -384, dok je smrt u 53. godini izdvojena u -355.
- Aristotelova anegdota o Platonovom poređenju sa ždrebetom pomerena je iz godine rođenja u zrelo akademijsko razdoblje (-350).
- Aristotelovo učiteljstvo Aleksandru i molba za obnovu Stagire pomereni su sa nemoguće `-368` na `-343`; unos je pretipiziran u `bio`, a nepotvrđeno davanje zakona uklonjeno iz prevoda prema grčkom V.4.
- Aristotelova peripatetička nastava u Likeju pomerena je sa `-376` na godinu osnivanja škole (`-335`) i označena kao `bio`; upozorenje Kalistenu pomereno je sa `-361` na poslednje godine Kalistenovog pohoda sa Aleksandrom (`-327`).
- Aristotelovo povlačenje u Halkidu zbog optužbe za bezbožnost pomereno je sa `-330` na `-323`, posle Aleksandrove smrti i zatvaranja njegovog atinskog razdoblja.
- Antistenovo pridruživanje Sokratu smešteno je u -426, posle Gorgijinog dolaska u Atinu; uklonjeni su kraći duplikati istog toka.
- Aristipovo poreklo iz Kirene odvojeno je od potpunijeg unosa o dolasku u Atinu zbog Sokratovog glasa (-416); dva kraća duplikata dolaska i naplaćivanja poduke uklonjena su.
- Aristipov spojeni navod `II.19, II.66` razdvojen je bez parsiranja zareza: datirani biografski unos sada sadrži samo predvođenje kirenajske škole iz II.19, dok je učenje o sadašnjem uživanju već sačuvano kao zaseban nedatirani citat II.66.
- Anaksarhov složeni početak razdvojen je na poreklo (-380), učeničku liniju (-350) i vrhunac u 110. olimpijadi (-340).
- Sferovo poreklo odvojeno je od odlaska Ptolemeju Filopatoru u Aleksandriju (-220); uklonjena je tvrdnja o učiteljima koje pripadajući grčki odlomak ne sadrži.
- Ksenokratovo poreklo odvojeno je od slušanja Platona u mladosti (-376) i puta sa njim na Siciliju (-361).
- Platonovo poređenje Ksenokrata sa Aristotelom pomereno je sa `-380`, kada je Aristotel imao četiri godine, u zajedničko akademijsko razdoblje (`-365`); drugi gotovo doslovan unos IV.6 je uklonjen.
- Timonov početni životopis razdvojen je na poreklo (-320), odlazak Stilponu (-300) i kasniji boravak kod Pirona (-290).
- Zenonovo učeništvo kod Parmenida pomereno je iz godine rođenja u mladost (-470). Tri navoda o prvenstvu u dijalektici, dijalozima i dokazu pretipizirana su u `reported`, a kraći duplikati života u Eleji i smrti uklonjeni.
- Kod Parmenida je uklonjen prošireni duplikat čiji srpski i staroslovenski tekst nisu odgovarali sačuvanom grčkom odlomku; učeništvo i podizanje svetilišta raspoređeni su u -500 i -490.
- Epikurovo poreklo i odrastanje na Samosu odvojeni su od izričito datovanog dolaska u Atinu u osamnaestoj godini (-323).
- Kleantovo poreklo odvojeno je od mladalačkog bavljenja boksom (-310), a Metroklovo srodstvo sa Hiparhijom od slušanja Teofrasta (-320).
- Aristonovo poreklo i nadimci odvojeni su od učenja o ravnodušnosti; učenje je pravilno označeno kao `reported` bez godine.
- Hrisipovo poreklo odvojeno je od mladalačkog trčanja (-260) i kasnijeg odvajanja od Kleanta (-250).
- Pironov početni unos razdvojen je na poreklo (-360), slikarski poziv (-340), put sa Anaksarhom do Indije (-327) i zaseban preneti filozofski stav bez godine.
- Bijantova priča o mesenijskim devojkama i Anaksimandrova anegdota o pevanju uklonjene su iz godine rođenja ili smrti i smeštene u odraslo doba.
- Demokritovo školovanje kod maga i Haldejaca pomereno je iz same godine rođenja u projektnu godinu detinjstva (-450); istorijska teškoća predanja o Kserksu ostaje zasebna dilema.
- Demokritova velika obrazovna putovanja pomerena su sa `-450`, kada bi imao deset godina, na `-440`, uz već datirano preuzimanje nasledstva kojim ih je finansirao.
- Metroklov prelazak od Teofrastove škole Kratu pomeren je sa -330 na -315, posle već datovanog slušanja Teofrasta (-320).
- Kritonovo izvođenje Sokrata iz vajarske radionice i njegovo obrazovanje pomereno je sa Sokratove pete godine na ranu odraslost (-450).
- Sokratova anegdota sa Ifikratom pomerena je sa `-408`, kada bi budući vojskovođa imao oko deset godina, na poslednje Sokratove godine (`-400`).
- Sokratovi razgovori o moralu po radionicama i trgu pomereni su iz petnaeste godine (`-455`) u odraslo razdoblje (`-440`).
- Protagorin složeni unos IX.50 razdvojen je na javna čitanja sa Prodikom (-450) i sastavljanje zakona za Turije oko osnivanja grada (-444); ponovljeno učeništvo kod Demokrita ostalo je samo u potpunijoj anegdoti IX.53.
- Leukipovo prvenstvo u atomizmu pretipizirano je iz anegdote u `reported` i ostavljeno bez godine.
- Kleantovo siromašno zapisivanje Zenonovih predavanja (-280) odvojeno je od nasleđivanja škole posle Zenonove smrti (-262). Podatak o smrti vraćen je grčkom tekstu: oko osamdeset, a ne devedeset devet godina.
- Sokratov složeni unos iz Diogena II.24 razdvojen je na glasanje o vojskovođama (-406), odbijanje naređenja Tridesetorice (-404) i odbijanje bekstva iz tamnice (-399); svaki deo sada ima odgovarajući grčki tekst.
- Favorinovo pripisivanje dokaza „Ahilej i kornjača“ Parmenidu označeno je kao `reported` bez proizvoljne godine.
- Solonov razgovor sa Perijandrom dobio je projektnu godinu zrelog doba (-590), a žalost za detetom pomerena je iz godine smrti u -580.
- Ispravljeni su preračuni iz olimpijada: Anaksimandar, druga godina 58. olimpijade (-547); Hilon kao starac oko 52. olimpijade (-570); Epimenidova povezana sekvenca očišćenja Atine u 46. olimpijadi (-596.8 do -596.2); Ksenokrat, druga godina 110. olimpijade (-339); Ksenofont, četvrta godina 94. olimpijade (-401).
- Solonovo upravljanje Atinom u trećoj godini 46. olimpijade ispravljeno je sa -592 na -594.
- Burleyjev složeni Hrisipov unos razdvojen je na pristupanje Kleantu (-260) i preuzimanje stoičke škole posle Kleantove smrti (-232).
- Ispravljeno je 130 kanonskih pokazivača kod Solona, Hilona, Pitaka, Anaharsida i Epimenida: odlomci I.58–I.113 pripadaju prvoj, a ne drugoj knjizi Diogena Laertija. Pointeri su potom ponovo uspešno izgrađeni.
- Ujednačen je i Walter Burley format u 21 pokazivaču kod Hrisipa i Gorgije: rimski broj poglavlja sada svuda ima oblik `Cap. XXIX`, odnosno `Cap. XXVI`.
- Jedini preostali latinski izvorni tekst pod nestandardnim poljem `la` (Sokrat–Alkibijad, Burley XXXIV) premešten je u zajedničko polje `originalText`.
- Burleyjev resolver proširen je na sve rimske cifre i na kanonske alias-e autora čiji lokalni fajl ima istorijski oblik imena (`bias`, `diogenes_cynicus`, `pherecides`, `zeno_citieus` i dr.); time i tih 36 lokalno dostupnih navoda ponovo dobija pointer.

### Duplikati

- Kod Anaksarha su uklonjena dva samostalna citata već sadržana u anegdotama.
- Kod Ksenofana su uklonjeni duplikati progonstva i zbirni unos koji je ponavljao prodaju u ropstvo i sahranu sinova. Progonstvo je pomereno u odraslo doba (-545).
- Kod Ksenofonta su uklonjena dva kraća duplikata naseljavanja i života u Skiluntu; sačuvani su potpuniji unosi. Susret sa Sokratom pomeren je iz godine rođenja u mladost (-410).
- Kod Antistena su sačuvani potpuniji biografski i anegdotski unosi, a kraći sažeci istih mesta iz Diogena uklonjeni.
- Kod Menedema je uklonjen kratki uvod o opasnosti kod Nikokreonta, jer ga naredni unos prenosi kao potpunu anegdotu iz istog odlomka.
- Kod Bijanta je uklonjen kratki sažetak smrti u dubokoj starosti, već u celini sadržan u anegdoti o njegovoj smrti na sudu; zaseban podatak o gradskoj sahrani je sačuvan.
- Kod Pitaka su dve verzije dvoboja sa Frinonom spojene u potpuniji Diogenov unos; Burley je sačuvan kao drugi izvor umesto kao kraći duplikat sa drugom godinom.
- Kod Demokrita je uklonjen zbirni duplikat povratka, čitanja *Velikog poretka sveta*, počasti i sahrane, jer su isti događaji već sačuvani u preciznije podeljenim unosima IX.39 i IX.40.
- Kod Aristotela su dva unosa o učiteljstvu Aleksandru i obnovi Stagire spojena; potpuniji V.2 zadržava V.4 kao drugi izvor.
- Uklonjene su kratke izreke već doslovno sadržane u potpunim anegdotama iz istog odlomka kod Antistena, Aristipa, Demostena, Timona i Zenona iz Eleje.
- Anaksagorin zbirni navod II.11 o Homeru, Metrodoru i prvom objavljivanju knjige označen je kao `reported` bez proizvoljne godine; kraći duplikat o Homeru je uklonjen.
- Kod Empedokla je uklonjen kratki podatak o Gorgijinom učeništvu već sadržan u potpunijem unosu VIII.57–59.
- Pitakova životna sekvenca potom je usklađena sa istorijskim sidrima i Diogenovim trajanjem: dvoboj sa Frinonom (-607), preuzimanje vlasti (-590), abdikacija posle deset godina (-580) i još deset godina života do -570.
- Pitakovo obaranje Melanhra sa Alkejevom braćom pomereno je sa `-640` na približno `-612`, u potvrđeni raspon 612–609. p. n. e.
- Hiparhijina odluka da živi sa Kratom pomerena je iz desete godine života na `-330`, a njena javna filozofska delatnost na `-325`, saglasno uobičajenom datiranju njenog procvata oko 325. p. n. e.

## Sačuvane dileme

Ove slučajeve ne treba automatski rešavati bez odluke o projektnom modelu:

1. **Anaksimen i Parmenid** — Diogen tvrdi da je Anaksimen slušao Parmenida, ali se njihovi sadašnji životni opsezi ne preklapaju. Po korisnikovoj odluci tvrdnja ostaje i smeštena je u Anaksimenovu mladost.
2. **Anaksagorina dvadeseta godina** — jedan izvor je vezuje za Kserksov prelazak -480, a Demetrije Falerski za Kalijino arhontstvo -456. Obe atribucije su sačuvane kao izvorna protivrečnost.
3. **Ksenofan i Empedokle** — razgovor je moguć samo uz vrlo kasnog Ksenofana i veoma mladog Empedokla; postojeća godina -539 je svakako nemoguća, ali nova godina zavisi od prihvaćene životne hronologije.
4. **Gorgijinih 109 godina** — Diogenov preneti podatak ne poklapa se potpuno sa projektnim opsegom -485–-380; navod je sačuvan kao navod, bez prilagođavanja opsega.
5. **Zoroaster** — nema zapis u `authors.json`; tri životna ili posthumna predanja ne treba datirati dok se ne izabere projektna hronologija.
6. **Demokrit i Kserksovi magi** — predanje o magima koje je Kserks ostavio njegovom ocu prethodi projektnom rođenju Demokrita; godina se ne može popraviti bez odluke o tome da li menjati opseg ili označiti legendu.
7. **Pitagorin posthumni unos** — godina -450 ostaje izvan njegovog života jer je nosilac događaja Filolaj; može se dodatno izdvojiti iz Pitagorine lične vremenske linije ako prikaz bude zahtevao strogo životne događaje.
8. **Parmenidova hronologija** — Diogen ga smešta na vrhunac u 69. olimpijadi (-504), što se teško slaže sa projektnim rođenjem -515 i kasnijim učeničkim tokom. Izvorno sidro je sačuvano, ali opseg ili tumačenje `ἤκμαζε` zahtevaju odluku.
9. **Kleantova starost** — Diogenov grčki tekst kaže da je umro sa oko osamdeset godina, dok projektni opseg -330–-232 daje približno devedeset osam. Prevod je usklađen sa izvorom, ali životni opseg ostaje za odluku.
10. **Ksenofontova smrt** — Diogen je vezuje za prvu godinu 105. olimpijade, arhonta Kalimeda i Filipovo stupanje na vlast, dakle približno -360/-359, dok projektni opseg i postojeći unos koriste -354. Potrebna je odluka da li prednost ima izvorno sidro ili savremeni približni datum smrti.
11. **Menedemova starost** — projektni opseg -345–-261 daje približno osamdeset četiri godine, dok sačuvani unos po Herakleidu kaže sedamdeset četiri. Treba proveriti godinu rođenja pre menjanja opsega.
12. **Sokrat i Ksenofont kod Delija** — Diogen II.22 kaže da je Sokrat u bici -424 spasao Ksenofonta koji je pao s konja, ali projektni Ksenofontov opseg počinje -430. Tekst izvora je sačuvan; atribucija ili datum Ksenofontovog rođenja zahtevaju proveru.
13. **Demokritova smrt** — projektni opseg i dva unosa koriste -370, dok anegdota o toplim hlebovima iz IX.43 ima -383. Pošto antička predanja daju različite starosti i hronologije, datum nije automatski izjednačen bez odluke koja se računica prihvata.
14. **Epimenidov san** — doslovno predanje o snu od pedeset sedam godina ne može se smestiti u projektni opseg -600–-543 niti uskladiti sa očišćenjem Atine oko -596. Anegdota ostaje približno datirana, ali ne predstavlja pouzdanu hronološku tačku.
15. **Pitagorina starost** — projektni opseg -570–-495 daje oko sedamdeset pet godina, dok Diogen prenosi Hermipovih osamdeset i Aristoksenovih devedeset. Izvorne varijante su sačuvane, a opseg nije automatski menjan.
16. **Pitagora posle Ferekidove smrti** — Diogen kaže da se Pitagora tek posle Ferekidove smrti vratio na Samos i potom otišao u Egipat. Trenutni Pitagorin datum -545 prethodi projektnom Ferekidovom kraju -520, dok pomeranje posle -520 remeti postojeći redosled Pitagorinih putovanja; potrebna je odluka o prihvaćenoj hronologiji.
17. **Protagora i Demokrit** — predanje da je Demokrit prepoznao Protagoru kao nosača i uzeo ga za učenika ne slaže se sa projektnim opsezima: Protagora počinje -490, a Demokrit -460, dok je događaj trenutno u -470. Tekst ostaje kao predanje, a datum i opsezi zahtevaju zajedničku odluku.
18. **Diogenov rani život** — izgnanstvo iz Sinope (`-400`), dolazak Antistenu (`-399`) i tumačenje proroštva (`-406`) u projektu padaju u Diogenovu šestu do trinaestu godinu, dok savremene rekonstrukcije njegov dolazak u Atinu smeštaju veoma različito, od oko 390. do posle Antistenove smrti. Bez izbora rekonstrukcije datumi nisu automatski pomerani.
19. **Menedemova mladost** — scenografski zanat, dekret i odlazak iz vojske u Akademiju trenutno su u njegovoj petoj, desetoj i petnaestoj godini. Redosled je izvorno jasan, ali apsolutne godine nisu; potrebno je zajednički pomeriti čitavu ranu sekvencu, ne pojedinačne stavke.

## Zaključak ove provere

Posle ponovljenog pregleda graničnih godina, starosti, olimpijada, istorijskih savremenika, tipova i duplikata nisu ostale nove sigurne ispravke. Dalje menjanje datuma zahteva odluke o 19 gore navedenih predajnih i projektnih nesaglasnosti; njih ne treba rešavati pojedinačnim približavanjem godina.
