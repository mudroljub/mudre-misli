# Izveštaj o datiranju unosa po filozofima

Datum provere: 11. avgust 2026.

## Obuhvat i metod

Provereni su svi pojedinačni fajlovi u `data/quotes/`, osim Talesa, Heraklita i Platona, koji su već sređeni. Provera je obuhvatila:

1. formalna pravila iz `docs/DATIRANJE.md`;
2. usklađenost godina sa opsegom `born`–`died` iz `data/authors.json`;
3. prirodan raspored događaja kroz život;
4. unutrašnju saglasnost događaja, ličnosti, olimpijada i vladara;
5. preterano grupisanje procenjenih godina i lažnu preciznost;
6. duplikate koji stvaraju različita datiranja istog događaja.

Ovo je izveštaj za ispravke, ne izmena podataka. Oznaka **uredno** znači da nisu pronađene očigledne greške prema sadašnjim projektnim podacima; ne znači da je svaka procenjena godina istorijski dokaziva.

## Sažetak

- Provereno je 46 fajlova.
- Trinaest unosa tipa `bio` ili `anecdote` nema obavezno polje `year`.
- Šezdeset unosa tipa `quote` ili `reported` pogrešno ima `year`.
- Jedan autor nema zapis u `authors.json`: Zoroaster. Kleobul, Demosten i Ferekid su u međuvremenu dodati, dok je Likurg uklonjen iz zbirke.
- Ksenofan ima jedan nedozvoljen datum izvan životnog opsega.
- Pitagorin unos iz 450. p. n. e. takođe je izvan njegovog života, ali ispravno opisuje posthumno objavljivanje Filolajevih knjiga.
- Najozbiljniji sadržinski problemi nalaze se kod Anaksagore, Anaksimandra, Anaksimena, Gorgije, Ksenofana i Ksenofonta: događaji iz zrelog života postavljeni su u godinu rođenja ili se povezane ličnosti hronološki ne preklapaju.

## Formalne greške

### Obavezna godina nedostaje

| Filozof | Redni broj unosa | Tip | Kratak opis |
|---|---:|---|---|
| Antisten | 6 | `bio` | Teopompova pohvala |
| Kleobul | 2, 3 | `bio`, `anecdote` | Kleobulina; zagonetka |
| Gorgija | 3 | `bio` | lekar i retor |
| Solon | 7 | `anecdote` | razgovor s Perijandrom o ćutanju |
| Zoroaster | 2–4 | `anecdote`, `bio` | rođenje, prvi mag i posthumni uticaj na Demokrita |

### Godina stoji na tipu koji je ne sme imati

Prema `docs/DATIRANJE.md`, `quote`, `reported` i `works` nemaju `year`.

| Filozof | Broj takvih unosa | Napomena |
|---|---:|---|
| Anaksarh | 0 | Dva duplirana citata uklonjena su jer već postoje u anegdotama; gozba kod Aleksandra pretipizirana je u `anecdote`. |
| Antisten | 2 | Pitanje i odgovor u narativnom okviru; proveriti tip pre uklanjanja godine. |
| Hrisip | 16 | Samostalne izreke; godine treba ukloniti. |
| Epikur | 9 | Učenja i izreke; godine treba ukloniti. |
| Menedem | 6 | Većinom kratke epizode; potrebna provera `quote` naspram `anecdote`. |
| Pitak | 14 | Mešavina izreka, prenesenih stavova i razgovora; rešavati pojedinačno. |
| Piron | 4 | Uglavnom učenja i izreke; ukloniti godinu osim ako se unos proširi u anegdotu. |
| Timon | 4 | Razgovorne epizode; proveriti tip. |
| Zenon iz Kitija | 2 | Kontekstualne izreke; proveriti tip. |

## Hronološki i sadržinski problemi

### Anaksagora — kritično

- Unos 2, „Učenik Anaksimena“, smešten je u Anaksagorinu mladost (-480), kada prema projektnom opsegu ima oko dvadeset godina. Time je uređena Anaksagorina vremenska linija, ali ostaje spoljašnja nesaglasnost sa projektnim datumom Anaksimenove smrti (-525); Diogenova tvrdnja se uprkos tome čuva bez ograde.
- Unos 28 je pretipiziran u `bio`, sveden na sadržaj koji zaista postoji u pripadajućem grčkom tekstu i pomeren na -456.
- Unos 3 kaže da je imao dvadeset godina pri Kserksovom prelasku preko Helesponta i stoji na -480; to je saglasno rođenju -500.
- Unos 4 je vezan za Kalijino arhontstvo -456 i sada izričito čuva Demetrijevo pripisivanje. Navod o dvadesetoj godini ostaje izvorna protivrečnost sa opsegom -500–-428.
- Predviđanje pada meteorskog kamena kod Egospotama pomereno je sa -442 na istorijski potvrđenu godinu pada -467.
- Suđenje i neposredno povezana vest o smrti sinova pomereni su na približno -433; poslednja želja i smrt u Lampsaku ostaju u -428.

### Anaksimandar — visoki prioritet

- Unos 2 ga već u godini rođenja (-610) predstavlja kao Talesovog učenika. Pomeriti u mladost.
- Unos 9 otkriće i postavljanje sunčanika datira u -610. To je delo odraslog čoveka i treba ga pomeriti u zrelo doba; po sadržaju je `bio`, ne `anecdote`.
- Unos 1, identitet i poreklo, može ostati uz godinu rođenja.

### Anaksimen — visoki prioritet

- Unos 2 stavlja učeništvo kod Anaksimandra u godinu rođenja (-585); treba ga pomeriti u mladost.
- Isti unos prenosi da je slušao Parmenida. Prema `authors.json`, Parmenid je rođen -515, deset godina posle Anaksimenove smrti (-525). To je hronološki nemoguće u sadašnjem modelu i mora ostati jasno označeno kao sporno predanje ili biti odvojeno od pouzdanije biografije.

### Gorgija — visoki prioritet

- Unos 1 u -483 spaja rođenje, učeništvo kod Empedokla, govorništvo i životni vek. Samo rođenje pripada toj godini; unos treba razdvojiti.
- Unos 2 stavlja Gorgijinu atinsku slavu i učiteljstvo Izokratu u godinu rođenja. Pomeriti u zrelo doba.
- Unos 8, legenda o rođenju u kovčegu, pravilno pripada rođenju.
- Unosu 3 nedostaje godina.

### Ksenofan — kritično

- Unosi 2 i 18 dupliraju progonstvo i boravak u Zankli i Katani, oba u godini rođenja (-570). Zadržati jedan unos i pomeriti ga u odraslo doba.
- Unos 8 je datiran -470, osam godina posle smrti navedene u `authors.json`. Pritom delimično duplira unos 20 iz -509 i unos 21 o sahrani sinova. Ukloniti duplikat i sačuvati događaje odvojeno samo ako imaju različite izvore ili smisao.
- Razgovor sa Empedoklom u -539 prethodi Empedoklovom rođenju (-494). Njihovi životni opsezi preklapaju se svega približno šesnaest godina, dok je Ksenofan već veoma star; predanje treba označiti kao hronološki problematično, ne samo proizvoljno pomeriti.

### Ksenofont — visoki prioritet

- Unosi 13–15, susret mladog Ksenofonta sa Sokratom i početak učeništva, stoje u godini Ksenofontovog rođenja (-430). Pomeriti ih u mladost, približno oko -410, uz proveru izvora.
- Unosi 3–4 i 24–25 dupliraju naseljavanje u Skiluntu, imanje i pisanje, svi u -394. Deduplikacija treba da prethodi konačnom datiranju.
- Opšte karakterne osobine u unosima 7–8 veštački su vezane za -360. Kao `bio` moraju imati godinu, ali tekst treba predstaviti kao osobinu zrelog/dotrajalog života ili ga spojiti sa prikladnijim biografskim unosom, da godina ne izgleda kao datum nastanka osobine.

### Solon — srednji prioritet

- Unosu 7 nedostaje godina; razgovor s Perijandrom može se približno smestiti u Solonovo zrelo doba, ali tek nakon provere redosleda među pričama o sedmorici mudraca.
- Unos 30, žalost za detetom, vezan je za -558 samo zato što je to godina Solonove smrti. Tekst ne tvrdi da se događaj zbio pred njegovu smrt; dati mu razumnu raniju procenu.
- Zakonodavstvo je raspoređeno na -592 i -590, uz vrhunac -594. To nije formalno nemoguće, ali više unosa opisuje isti zakonodavni period i treba ih uskladiti oko jedne proverene hronološke tačke, bez privida višestrukih zasebnih zakonodavstava.

### Anaharsid — uređeno prema Diogenovom predanju

- Usvojen je projektni životni opseg -620–-580, koji omogućava Diogenov dolazak u Atinu tokom 47. olimpijade.
- Susret sa Solonom ostaje u -592, podatak o uzdržljivosti smešten je približno u -590, a povratak i smrt u -580.
- Ovaj raspored prati unutrašnju hronologiju Diogenovog narativa; savremena istorijska rekonstrukcija smatra susret sa Solonom legendarnim i Anaharsida smešta kasnije u 6. vek p. n. e.

### Pitagora — napomena, ne greška

- Unos 47 iz -450 nalazi se posle Pitagorine smrti, ali govori o Filolajevom kasnijem objavljivanju pitagorejskih knjiga. To je dozvoljeni posthumni događaj. Preporučljivo je da formulacija izričito zadrži Filolaja kao nosioca događaja, kako vremenska linija ne bi delovala kao produženje Pitagorinog života.

### Teofrast — sigurna greška

- Unos 2 kaže da je Teofrast preuzeo školu „po Aristotelovoj smrti“, ali je datiran -343. Aristotel je prema `authors.json` umro -322, pa je događaj postavljen dvadeset jednu godinu prerano. Treba ga smestiti posle -322; tradicionalno preuzimanje Likeja pripada približno toj godini.
- Isti unos dodaje da je tada, posredstvom Demetrija Falerskog, dobio vrt. Izvorni tekst i prevod treba ponovo razdvojiti: preuzimanje škole i sticanje vrta nisu nužno isti događaj niti ista godina.

## Autori bez životnog opsega

Za sledeće autore nije moguće sprovesti obaveznu proveru `born`–`died`, jer ih nema u `authors.json`:

- **Cleobulus** — dodat je projektni životni opseg -630–-560; dva unosa još nemaju godinu.
- **Demosthenes** — dodat je opseg -384–-322; početni biografski unos o njegovoj atinskoj slavi pomeren je iz godine rođenja u -355.
- **Pherecydes** — dodat je projektni opseg -580–-520, a svih pet postojećih unosa je datirano unutar njega.
- **Zoroaster** — postoje veoma udaljene legendarne godine i posthumna veza sa Demokritom; bez jasno izabrane projektne hronologije ne treba dopunjavati godine napamet.

## Pregled po filozofima

| Filozof | Status | Nalaz / sledeći korak |
|---|---|---|
| Anaharsid | uređeno datiranje | Usvojen je Diogenov projektni opseg -620–-580; svi obavezni unosi imaju godinu. |
| Anaksagora | kritično | Godina rođenja korišćena za učeništvo i atinsku delatnost; sukob s Anaksimenom i sopstvenim uzrastom. |
| Anaksarh | uređeno | Uklonjena su dva duplikata, a gozba kod Aleksandra pravilno je označena kao anegdota. |
| Anaksimandar | kritično | Učeništvo i sunčanik pogrešno stavljeni u godinu rođenja. |
| Anaksimen | kritično | Učeništvo u godini rođenja; Parmenidova veza nemoguća po metapodacima. |
| Antisten | dorada | Jedan `bio` bez godine; dva `quote` unosa sa godinom i mogućim pogrešnim tipom. |
| Aristip | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Ariston sa Hiosa | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Aristotel | uredno | Datumi su u životnom opsegu i nema očiglednog pogrešnog redosleda. |
| Bijant iz Prijene | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Hilon iz Sparte | uglavnom uredno | Formalno uredno; navode o olimpijadama i eforatu vredi proveriti pri izvornoj reviziji. |
| Hrisip | formalna greška | Šesnaest citata ima nedozvoljenu godinu -250. |
| Kleant | uredno | Datumi su u opsegu i prirodno raspoređeni. |
| Kleobul | blokirano metapodacima | Nema `authors.json`; dva unosa nemaju godinu. |
| Kratet iz Tebe | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Demokrit | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Demosten | uređeno datiranje | Dodat je životni opseg -384–-322; atinska slava više nije smeštena u godinu rođenja. |
| Diogen | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Empedokle | uredno | Nema formalnih grešaka; procenjene godine ostaju u životnom opsegu. |
| Epikur | formalna greška | Devet citata ima nedozvoljene godine. |
| Epimenid | uredno | Datumi su formalno uredni i u projektnom opsegu; legendarna hronologija je već približna. |
| Eudoks | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Gorgija | kritično | Zrela delatnost smeštena u godinu rođenja; jedan `bio` bez godine. |
| Hiparhija | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Leukip | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Menedem | dorada tipova | Šest citata ima godinu; mnogo procena je sabijeno u -310 i zahteva prirodniju raspodelu. |
| Metrokl | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Monim | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Parmenid | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Ferekid | uredno datiranje | Dodat je životni opseg -580–-520; svih pet postojećih unosa ima godinu u tom opsegu. |
| Pitak | dorada tipova | Četrnaest `quote`/`reported` unosa ima godinu; razdvojiti izreke od anegdotskih razgovora. |
| Protagora | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Piron | formalna greška | Četiri `quote`/`reported` unosa imaju godinu; pre uklanjanja proveriti jedan po jedan tip. |
| Pitagora | uredno uz napomenu | Posthumni unos -450 je opravdan Filolajem. |
| Sokrat | uredno | Datumi su u životnom opsegu i završna sekvenca je dosledna. |
| Solon | dorada | Jedna anegdota bez godine; događaj o detetu i zakonodavni period treba prerasporediti/proveriti. |
| Sfer | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Teofrast | kritično | Preuzimanje škole „posle Aristotelove smrti“ pogrešno je datirano -343, pre Aristotelove smrti -322. |
| Timon iz Flijunta | dorada tipova | Četiri citata imaju godinu i delom izgledaju kao anegdotski razgovori. |
| Ksenokrat | uredno | Nema formalnih ni očiglednih unutrašnjih hronoloških grešaka. |
| Ksenofan | kritično | Duplikati, događaji u godini rođenja, jedan datum posle smrti i nemoguć razgovor s nerođenim Empedoklom. |
| Ksenofont | kritično | Sokratov učenik u godini rođenja; duplirano naseljavanje u Skiluntu. |
| Zenon iz Kitija | dorada tipova | Dva citata imaju godinu; proveriti da li su zapravo anegdote. |
| Zenon iz Eleje | uredno | Datumi su u opsegu; alternativna predanja o smrti opravdano dele završnu godinu. |
| Zoroaster | blokirano metapodacima | Nema životni opseg; tri unosa bez godine i mešanje životnih i posthumnih predanja. |

## Predloženi redosled rada

1. Dodati nedostajuće autore i njihove projektne životne opsege u `authors.json`.
2. Ispraviti očigledne godine rođenja korišćene za zrele događaje: Anaksagora, Anaksimandar, Anaksimen, Gorgija, Ksenofan i Ksenofont.
3. Rešiti hronološki nemoguća predanja: Anaksagora–Anaksimen, Anaksimen–Parmenid i Ksenofan–Empedokle.
4. Dodeliti 13 nedostajućih godina.
5. Pregledati tipove 60 unosa sa nedozvoljenim `year`; ukloniti godinu sa pravih citata, a narativne epizode pretipizirati u `anecdote` i zadržati razumno datiranje.
6. Deduplikovati Ksenofana i Ksenofonta pre finog raspoređivanja godina.
7. Tek zatim proveriti procenjene godine prema lokalnim izvornim odeljcima i istorijskim sidrima.
