# INDEX --- grčki izvori za filozofski korpus

Izvor: `First1KGreek` i `canonical-greekLit` GitHub repos.

Ovaj direktorijum sadrži izdvojeni grčki korpus namenjen radu na
filozofskim tekstovima, terminologiji i istoriji grčkog filozofskog
jezika. Izvori su zadržani u originalnoj TLG/CTS organizaciji i
podeljeni prema repozitorijumu iz kojeg potiču.

U spiskovima se navode samo filozofski relevantna dela koja zaista
postoje u odgovarajućem GitHub `tlgXXXX` folderu. Istorijska,
biografska i druga nerelevantna dela nisu navedena.

## Struktura izvora

- `canonical-greekLit/data/` --- izabrani autori iz PerseusDL `canonical-greekLit`.
- `First1KGreek/data/` --- izabrani autori i korpusi iz OpenGreekAndLatin `First1KGreek`.
- `tlgXXXX` --- TLG identifikator autora ili autorskog korpusa.
- `__cts__.xml` --- CTS metapodaci: ime autora, naslov dela, URN i podaci o izdanju.
- `*.grc*.xml` --- grčki TEI/XML tekst koji se koristi za pretragu i analizu.

Ne treba mešati foldere iz dva repozitorijuma: isti TLG autor ili delo
može postojati u različitim izdanjima ili transkripcijama.

------------------------------------------------------------------------

# canonical-greekLit

## `tlg0007` --- Plutarh

Plutarh iz Heroneje, srednjeplatonski filozof i važan doksografski
izvor. `Moralia` sadrže rasprave o platonizmu, stoicizmu,
epikurejstvu, etici, psihologiji, kosmologiji i teologiji.

Filozofski relevantna dela u korpusu:

- `tlg074` --- O sreći
- `tlg075` --- O vrlini i poroku
- `tlg080` --- O sujeverju
- `tlg089` --- O Izidi i Ozirisu
- `tlg090` --- O E u Delfima
- `tlg091` --- O tome da Pitija više ne proriče u stihovima
- `tlg092` --- O prestanku proročišta
- `tlg093` --- Može li se vrlina naučiti
- `tlg094` --- O moralnoj vrlini
- `tlg095` --- O obuzdavanju gneva
- `tlg096` --- O smirenosti duha
- `tlg107` --- O sporoj božanskoj kazni
- `tlg108` --- O sudbini
- `tlg109` --- O Sokratovom daimonionu
- `tlg113` --- Ljubavni razgovor
- `tlg115` --- Da filozof naročito treba da razgovara s vladarima
- `tlg116` --- Neobrazovanom vladaru
- `tlg119` --- O monarhiji, demokratiji i oligarhiji
- `tlg125` --- Prirodna pitanja
- `tlg126` --- O licu koje se vidi na Mesecu
- `tlg127` --- O prvobitnoj hladnoći
- `tlg129` --- O inteligenciji životinja
- `tlg131` --- O jedenju mesa I
- `tlg132` --- O jedenju mesa II
- `tlg133` --- Platonska pitanja
- `tlg134` --- O nastanku duše u Timaju
- `tlg136` --- O stoičkim protivrečnostima
- `tlg137` --- Stoici govore besmislenije od pesnika
- `tlg138` --- O opštim pojmovima protiv stoika
- `tlg139` --- Da ni po Epikuru nije moguće živeti prijatno
- `tlg140` --- Protiv Kolota
- `tlg141` --- Da li je dobro živeti nepoznato

------------------------------------------------------------------------

## `tlg0012` --- Homer

Osnovni izvor za arhaični grčki leksikon i prvobitna značenja reči
koje će kasnije postati filozofski termini.

Relevantna dela u korpusu:

- `tlg001` --- Ilijada
- `tlg002` --- Odiseja
- `tlg003` --- Homerske himne

------------------------------------------------------------------------

## `tlg0020` --- Hesiod

Važan za kosmološku, teološku, etičku i antropološku terminologiju
neposredno pre nastanka grčke filozofije.

Relevantna dela u korpusu:

- `tlg001` --- Poslovi i dani
- `tlg002` --- Teogonija

------------------------------------------------------------------------

## `tlg0032` --- Ksenofont

Atinski pisac i Sokratov učenik. Važan kao nezavisan svedok sokratske
filozofije i terminologije pored Platona.

Filozofski relevantna dela u korpusu:

- `tlg002` --- Memorabilia / Uspomene na Sokrata
- `tlg003` --- Oikonomikos
- `tlg004` --- Gozba
- `tlg005` --- Apologija Sokratova
- `tlg006` --- Hijeron

------------------------------------------------------------------------

## `tlg0059` --- Platon

Centralni izvor korpusa. Glavni izvor za razvoj tehničke filozofske
terminologije: biće, znanje, mišljenje, ideja, duša, vrlina, država,
dijalektika, uzrok i dr.

Dela u korpusu:

- `tlg001` --- Eutifron
- `tlg002` --- Apologija Sokratova
- `tlg003` --- Kriton
- `tlg004` --- Fedon
- `tlg005` --- Kratil
- `tlg006` --- Teetet
- `tlg007` --- Sofist
- `tlg008` --- Državnik
- `tlg009` --- Parmenid
- `tlg010` --- Fileb
- `tlg011` --- Gozba
- `tlg012` --- Fedar
- `tlg013` --- Alkibijad I
- `tlg014` --- Alkibijad II
- `tlg015` --- Hiparh
- `tlg016` --- Ljubavnici
- `tlg017` --- Teag
- `tlg018` --- Harmid
- `tlg019` --- Lahet
- `tlg020` --- Lisid
- `tlg021` --- Eutidem
- `tlg022` --- Protagora
- `tlg023` --- Gorgija
- `tlg024` --- Menon
- `tlg025` --- Hipija Veći
- `tlg026` --- Hipija Manji
- `tlg027` --- Ion
- `tlg028` --- Meneksen
- `tlg029` --- Klitofont
- `tlg030` --- Država
- `tlg031` --- Timaj
- `tlg032` --- Kritija
- `tlg033` --- Minos
- `tlg034` --- Zakoni
- `tlg035` --- Epinomis
- `tlg036` --- Pisma

------------------------------------------------------------------------

## `tlg0086` --- Aristotel

Centralni izvor uz Platona. Ovde se navode samo dela koja zaista
postoje u `canonical-greekLit/data/tlg0086/`, a ne ceo tradicionalni
Aristotelov opus.

Filozofski relevantna dela u korpusu:

- `tlg009` --- Eudemova etika
- `tlg010` --- Nikomahova etika
- `tlg025` --- Metafizika
- `tlg029` --- Ekonomika
- `tlg034` --- Poetika
- `tlg035` --- Politika
- `tlg038` --- Retorika
- `tlg045` --- O vrlinama i porocima

U istom folderu postoji i:

- `tlg003` --- Atinski ustav

ali nije uključen u glavni filozofski izbor.

------------------------------------------------------------------------

## `tlg0557` --- Epiktet

Stoički filozof carskog doba. Važan za stoičku etiku i praktičnu
filozofsku terminologiju.

Dela u korpusu:

- `tlg001` --- Razgovori / Dissertationes
- `tlg002` --- Priručnik / Encheiridion
- `tlg003` --- Fragmenti
- `tlg004` --- Gnomologij, knjige 1–2
- `tlg005` --- Gnomologij, knjige 3–4

`tlg003a` sadrži samo engleske prevode fragmenata, bez grčkog izdanja.

------------------------------------------------------------------------

## `tlg0562` --- Marko Aurelije

Rimski car i stoički filozof koji piše na grčkom.

Dela u korpusu:

- `tlg001` --- Meditacije / Ad se ipsum / Τὰ εἰς ἑαυτόν

------------------------------------------------------------------------

# First1KGreek

## `tlg0018` --- Filon Aleksandrijski

Helenistički jevrejski filozof. Spaja grčku filozofsku terminologiju,
naročito platonizam i stoicizam, sa tumačenjem Septuaginte.

Filozofski relevantna dela u korpusu:

- `tlg001` --- De opificio mundi
- `tlg002` --- Legum allegoriarum I–III
- `tlg003` --- De Cherubim
- `tlg004` --- De sacrificiis Abelis et Caini
- `tlg005` --- Quod deterius potiori insidiari soleat
- `tlg006` --- De posteritate Caini
- `tlg007` --- De gigantibus
- `tlg008` --- Quod deus sit immutabilis
- `tlg009` --- De agricultura
- `tlg010` --- De plantatione
- `tlg011` --- De ebrietate
- `tlg012` --- De sobrietate
- `tlg013` --- De confusione linguarum
- `tlg014` --- De migratione Abrahami
- `tlg015` --- Quis rerum divinarum heres sit
- `tlg016` --- De congressu eruditionis gratia
- `tlg017` --- De fuga et inventione
- `tlg018` --- De mutatione nominum
- `tlg019` --- De somniis I–II
- `tlg020` --- De Abrahamo
- `tlg022` --- De vita Mosis I–II
- `tlg023` --- De decalogo
- `tlg024` --- De specialibus legibus I–IV
- `tlg025` --- De virtutibus
- `tlg026` --- De praemiis et poenis / De exsecrationibus
- `tlg027` --- Quod omnis probus liber sit
- `tlg028` --- De vita contemplativa
- `tlg029` --- De aeternitate mundi

------------------------------------------------------------------------

## `tlg0544` --- Sekst Empirik

Glavni sačuvani izvor za antički skepticizam i važan doksografski
izvor.

Dela u korpusu:

- `tlg001` --- Pironove postavke / Pyrrhoniae Hypotyposes
- `tlg002` --- Protiv učenjaka / Adversus Mathematicos

Drugi tradicionalni naslovi poput „Protiv logičara“, „Protiv fizičara“
i „Protiv etičara“ nalaze se unutar `tlg002`, a nisu zasebni TLG
folderi u ovom repozitorijumu.

------------------------------------------------------------------------

## `tlg0693` --- Albin / Alcinous korpus

Srednjeplatonska tradicija.

Dela u korpusu:

- `tlg001` --- Didaskalikos / Priručnik Platonovih učenja
- `tlg002` --- Uvod u Platonove dijaloge

------------------------------------------------------------------------

## `tlg0732` --- Aleksandar Afrodizijski

Jedan od najvažnijih antičkih komentatora Aristotela.

Filozofski relevantna dela u korpusu:

- `tlg001` --- O mešanju / De mixtione
- `tlg004` --- Komentar Aristotelove Metafizike
- `tlg005` --- Komentar prve knjige Prve analitike
- `tlg006` --- Komentar Topike
- `tlg007` --- Komentar O čulima
- `tlg008` --- Komentar Meteorologije
- `tlg010` --- O duši
- `tlg011` --- Mantissa uz O duši
- `tlg012` --- Quaestiones / Pitanja i rešenja
- `tlg013` --- Etički problemi [sporno]
- `tlg014` --- O sudbini
- `tlgX01` --- Komentar Sofističkih pobijanja [sporno]

Izostavljeno kao nerelevantno:

- `tlg003` --- O groznicama [sporno]

------------------------------------------------------------------------

## `tlg1146` --- Antipatar iz Tarsa

Stoički filozof.

Dela u korpusu:

- `tlg001` --- Svedočanstva i fragmenti / Testimonia et Fragmenta

------------------------------------------------------------------------

## `tlg1188` --- Aristokle iz Mesene

Peripatetički filozof i doksografski svedok.

Dela u korpusu:

- `tlg002` --- Fragmenti / Fragmenta

------------------------------------------------------------------------

## `tlg1193` --- Ariston sa Hiosa

Rani stoički filozof.

Dela u korpusu:

- `tlg001` --- Svedočanstva i fragmenti / Testimonia et Fragmenta

------------------------------------------------------------------------

## `tlg1264` --- Hrisip

Jedan od najvažnijih stoičkih filozofa.

Dela u korpusu:

- `tlg001` --- Logički i fizički fragmenti / Fragmenta Logica et Physica
- `tlg002` --- Etički fragmenti / Fragmenta Moralia
- `tlg003` --- Fragmenti o tumačenju Homerovih pesama
- `tlg004` --- Fragmenti raspoređeni prema pojedinačnim knjigama

------------------------------------------------------------------------

## `tlg1269` --- Kleant

Drugi poglavar Stoe posle Zenona.

Dela u korpusu:

- `tlg002` --- Svedočanstva i fragmenti / Testimonia et Fragmenta

Himna Zevsu nalazi se unutar ovog fragmentarnog korpusa, a nije zaseban
TLG folder.

------------------------------------------------------------------------

## `tlg1286` --- Corpus Hermeticum / hermetički korpus

Grčki hermetički filozofsko-religijski tekstovi.

Dela u korpusu:

- `tlg001` --- Corpus Hermeticum I — Poimandres
- `tlg002` --- Corpus Hermeticum II
- `tlg003` --- Corpus Hermeticum III — Sveti govor
- `tlg004` --- Corpus Hermeticum IV — Krater ili Jedinstvo
- `tlg005` --- Corpus Hermeticum V
- `tlg006` --- Corpus Hermeticum VI
- `tlg007` --- Corpus Hermeticum VII
- `tlg008` --- Corpus Hermeticum VIII
- `tlg009` --- Corpus Hermeticum IX
- `tlg010` --- Corpus Hermeticum X — Ključ
- `tlg011` --- Corpus Hermeticum XI
- `tlg012` --- Corpus Hermeticum XII
- `tlg013` --- Corpus Hermeticum XIII
- `tlg014` --- Corpus Hermeticum XIV
- `tlg016` --- Corpus Hermeticum XVI
- `tlg017` --- Corpus Hermeticum XVII
- `tlg018` --- Corpus Hermeticum XVIII
- `tlg019` --- Fragmenti iz Stobeja
- `tlg020` --- Fragmenti iz Stobeja

------------------------------------------------------------------------

## `tlg2000` --- Plotin

Osnivač neoplatonizma.

Dela u korpusu:

- `tlg001` --- Eneade

Svih šest Eneada i 54 rasprave nalaze se unutar jednog TLG dela
`tlg001`; nisu šest zasebnih foldera.

------------------------------------------------------------------------

## `tlg4013` --- Simplikije

Kasnoantički neoplatonički komentator Aristotela. Posebno važan jer
prenosi duže fragmente predsokratovaca.

Dela u korpusu:

- `tlg001` --- Komentar Aristotelovog spisa O nebu
- `tlg003` --- Komentar Aristotelovih Kategorija
- `tlg004` --- Komentar Aristotelove Fizike
- `tlg005` --- Komentar Aristotelovog spisa O duši

Napomena: atribucija komentara `O duši` Simplikiju je sporna.

------------------------------------------------------------------------

# Preporučena upotreba

Za filozofsku terminologiju prvenstveno koristiti Platona (`tlg0059`)
i Aristotela (`tlg0086`).

Za predsokratovce posebno koristiti Simplikija (`tlg4013`), Seksta
Empirika (`tlg0544`) i Plutarha (`tlg0007`).

Za stoičku terminologiju koristiti Epikteta (`tlg0557`), Marka
Aurelija (`tlg0562`) i stoičke fragmente (`tlg1264`, `tlg1269`,
`tlg1146`, `tlg1193`).

Za starija značenja reči koristiti Homera (`tlg0012`) i Hesioda
(`tlg0020`).

Za kasniju filozofsku terminologiju koristiti Aleksandra Afrodizijskog
(`tlg0732`) i Plotina (`tlg2000`).

# Napomena o izvorima

Ovi XML fajlovi nisu antički autografi. U pravilu predstavljaju
digitalizovana moderna kritička izdanja zasnovana na grčkoj rukopisnoj
tradiciji, papirusima i drugim tekstualnim svedocima.

Spiskovi dela u ovom indeksu odnose se samo na filozofski relevantna
dela prisutna u konkretnim GitHub folderima, a ne na celokupan
tradicionalno pripisani opus pojedinog autora.
