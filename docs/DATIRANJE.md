# Struktura i datiranje biografskih podataka

## Osnovni princip

Svaki zaseban događaj predstavlja zaseban entry.

Ne spajati više vremenski ili sadržajno odvojenih događaja u isti entry.

### Loše

```json
{
  "type": "bio",
  "year": -650,
  "sr": "Pitak sin Hiradija, Mitilenanin. Sa Alkejevom braćom sruši tiranina. Pobedio je Frinona u dvoboju."
}
```

### Dobro

```json
{
  "type": "bio",
  "year": -650,
  "sr": "Pitak je bio sin Hiradija i Mitilenanin. Duris kaže da mu je otac bio Trakijanac."
},
{
  "type": "bio",
  "year": -640,
  "sr": "Sa Alkejevom braćom srušio je Melanhra, tiranina Lesbosa."
},
{
  "type": "bio",
  "year": -635,
  "sr": "Pobedio je Frinona u dvoboju."
}
```

## Odvajanje događaja

Rođenje i smrt uvek moraju biti zasebni entriji.

```json
{
  "type": "bio",
  "year": -650,
  "sr": "Rođen je u Mitileni kao sin Hiradija."
}
```

```json
{
  "type": "bio",
  "year": -570,
  "sr": "Umro je proživevši osamdeset godina."
}
```

Poreklo i porodica mogu stajati uz rođenje samo ako čine jednu kratku i neposredno povezanu celinu.

## Datiranje

Svaki entry mora imati sopstvenu godinu.

Ne stavljati događaje iz različitih razdoblja pod istu godinu.

Kada tačna godina nije poznata, proceniti je prema:

* uzrastu osobe;
* redosledu događaja;
* poznatom trajanju vlasti, putovanja ili službe;
* istorijskom kontekstu;
* olimpijadama, vladarima, ratovima i drugim datiranim događajima.

Procena mora biti istorijski moguća i hronološki dosledna.

```json
{
  "type": "bio",
  "year": -650,
  "sr": "Rođen je u Mitileni."
},
{
  "type": "bio",
  "year": -620,
  "sr": "Uključio se u politički život Mitilene."
},
{
  "type": "bio",
  "year": -600,
  "sr": "Mitilenjani su mu poverili vlast."
},
{
  "type": "bio",
  "year": -590,
  "sr": "Položio je vlast nakon deset godina vladavine."
}
```

Ne izmišljati prividno preciznu godinu kada izvori dopuštaju samo širu procenu.

## Dužina

Jedan entry treba da sadrži jedan kratak pasus:

* najviše dve ili tri kratke rečenice;
* po mogućnosti jedan do dva reda u knjižnom prikazu;
* bez naknadno dodatih događaja koji pripadaju drugom vremenu ili temi.

**Rečenica je najmanja celina za odvajanje.** Ako je rečenica preduga, može se dodati tačka umesto zareza gde ima smisla.

Ako se tekst može prirodno podeliti bez gubitka smisla, podeliti ga u više entrija.

## Povezani događaji

Više entrija može imati istu godinu kada opisuju različite delove istog događaja.

```json
{
  "type": "bio",
  "year": -635,
  "sr": "U ratu za Ahilejidsku zemlju bio je strateg Mitilenjana."
},
{
  "type": "bio",
  "year": -635,
  "sr": "Pobedio je Frinona u dvoboju koristeći mrežu skrivenu pod štitom."
}
```

Vremenski ili sadržajno odvojeni događaji moraju imati zasebne godine.

```json
{
  "type": "bio",
  "year": -590,
  "sr": "Položio je vlast nakon deset godina vladavine."
},
{
  "type": "bio",
  "year": -585,
  "sr": "Odbio je Krezov dar."
}
```

### Decimalni sistem za sortiranje sekvence

Kada je poznato da se više događaja odigralo istog dana ili u poznatoj sekvenci, koristiti decimale za označavanje redosleda.

```json
{
  "type": "anecdote",
  "year": -336.1,
  "sr": "Kada je Aleksandar stao pred njega i rekao: Ja sam Aleksandar Veliki, Diogen je odgovorio: A ja Diogen pas."
},
{
  "type": "anecdote",
  "year": -336.2,
  "sr": "Aleksandar mu priđe i reče: Ne bojiš li se mene? Diogen odgovori: Šta si ti, dobro ili zlo?"
},
{
  "type": "anecdote",
  "year": -336.3,
  "sr": "Aleksandar mu prišao i rekao: Zatraži od mene što hoćeš. Diogen odgovori: Makni mi se sa sunca."
}
```

Decimalni deo označava **logički redosled unutar iste godine**, ne precizno vreme.

Prednosti ovog sistema:

* **Sortabilnost** - događaji se automatski sortiraju ispravnim redom
* **Bez lažnih datuma** - ne izmišljamo različite godine za događaje istog dana
* **Logička jasnoća** - decimalni redosled eksplicitno pokazuje sekvencu
* **Neograničena granularnost** - može se koristiti -336.01, -336.02 ili -336.001 ako je potrebno

Koristiti ovaj sistem samo kada je **poznat ili logički izveden redosled**, ne proizvoljno.

## Prioritet datiranja

Cilj datiranja je **sortabilnost**, ne istorijska preciznost. Prioritet ima sledeći redosled:

1. **Logički** - hronološka doslednost prema uzročno-posledičnim vezama
   - Prvo putovao, pa se vratio
   - Prvo školovao, pa radio
   - Prvo dobio poziciju, pa izvršio dužnost
   
2. **Klasterovano** - povezani događaji grupisani u kratak vremenski period
   - Više anegdota iz istog susreta (koristi decimale: -336.1, -336.2, -336.3)
   - Serija povezanih aktivnosti u istoj godini
   - Izvršenje više dužnosti u istom ratu
   
3. **Linearno** - ravnomerno raspoređeno između poznatih tačaka
   - Kada nema drugih indicija, ravnomerno rasporediti događaje
   - Prazan period između rođenja/školovanja i zrelih godina
   - Događaji bez spoljnih markera

### Datiranje prema spoljnim faktorima

#### Olimpijade

- **"Procvetao u X olimpijadi"** → akme = ~40 godina života
- Rođenje ≈ (olimpijada × 4) - 1780 - 40

#### Vladavine

- **"Za vreme vladavine cara X"** → sredina perioda vladavine
- Ako je poznato samo da se desilo tokom nečije vlasti

#### Ratovi i vojni događaji

- **"Otišao u rat"** → početak rata
- **"Vratio se iz rata"** → kraj rata
- **"Učestvovao u ratu"** → sredina rata

#### Susreti sa istorijskim ličnostima

- **"Sreo se sa filozofom Y"** → istorijski kontekst
- Preklapanje geografskih boravaka (oba u istom gradu)
- Poznati datumi kada su obe osobe bile u istoj oblasti

### Cilj: Sortabilnost, ne preciznost

**Ključni princip**: Glavni cilj datiranja je omogućiti **ispravan hronološki redosled** pri sortiranju, ne postići istorijsku preciznost.

Kada ne znamo tačne datume:
- Procenjujemo godine prema dostupnim indicijama (uzrast, spoljni faktori, logički sled)
- Procena mora biti **istorijski moguća** (unutar životnog veka osobe)
- Procena može biti **neprecizna** ±10-20 godina ako omogućava ispravan sled

Klasterovani događaji (isti dan/godina) koriste:
- **Decimale** za sortiranje unutar iste godine (-336.1, -336.2, -336.3)
- **Istu godinu** bez decimala ako je redosled nevažan

### Primer: Psihološki redosled

Diogenov susret sa Aleksandrom - **logički redosled** važniji od izvorne sekvence u tekstu:

```json
{
  "year": -336.1,
  "sr": "Aleksandar se predstavi: Ja sam Aleksandar Veliki. Diogen odgovori: A ja Diogen pas."
},
{
  "year": -336.2,
  "sr": "Aleksandar preti: Ne bojiš li se mene? Diogen filozofski odgovara."
},
{
  "year": -336.3,
  "sr": "Aleksandar nudi: Zatraži što hoćeš. Diogen ga kulira: Makni mi se sa sunca."
}
```

**Objašnjenje**: Psihološka eskalacija (ignorisanje → testiranje → totalno odbacivanje) ima prednost nad redosledom u izvornom tekstu.

## Tipovi entrija

### `bio`

Koristiti za biografske i istorijske podatke:

* rođenje i smrt;
* poreklo i porodicu;
* obrazovanje;
* zanimanje i službu;
* političku aktivnost;
* ratove i javne dužnosti;
* putovanja;
* susrete sa istorijskim ličnostima.

### `anecdote`

Koristiti za zaokruženu priču koja:

* ima jasnu poentu;
* pokazuje karakter osobe;
* sadrži karakterističnu zgodu ili duhovit odgovor;
* može stajati kao samostalna celina.

Kratku i kompaktnu priču zadržati kao jedan `anecdote` entry.

Ako tekst sadrži više odvojenih događaja ili se prostire kroz duže razdoblje, razbiti ga na odgovarajuće `bio` ili `anecdote` entrije.

### `quote` i `reported`

Ovi tipovi ne podležu pravilima razbijanja biografskog narativa.

Izreke, odgovori i učenja ostaju celina dok god predstavljaju jednu zaokruženu misao.

## Podela izvornog teksta

Svaki entry treba da sadrži samo deo izvornog grčkog ili latinskog teksta koji odgovara njegovom prevodu.

Ne ponavljati ceo izvorni odlomak u svakom izdvojenom entry-ju.

Podela `originalText` mora pratiti podelu polja `sr`.

## Primer refaktorisanja

### Pre

```json
{
  "type": "bio",
  "year": -600,
  "sr": "Tada ga poštovahu i vlast mu poveriše. On deset godina držeći položi vlast. Zemlju mu dodeliše; on kao svetu predade. Od Kreza ne prihvati novce.",
  "originalText": "Τότε δ' οὖν... [kompletan grčki tekst]"
}
```

### Posle

```json
{
  "type": "bio",
  "year": -600,
  "sr": "Tada ga silno poštovahu Mitilenjani i vlast mu poveriše.",
  "originalText": "Τότε δ' οὖν τὸν Πιττακὸν ἰσχυρῶς ἐτίμησαν οἱ Μυτιληναῖοι, καὶ τὴν ἀρχὴν ἐνεχείρισαν αὐτῷ."
},
{
  "type": "bio",
  "year": -590,
  "sr": "Deset godina držeći vlast i uredivši državu, položio je vlast.",
  "originalText": "Ὁ δὲ δέκα ἔτη κατασχὼν καὶ εἰς τάξιν ἀγαγὼν τὸ πολίτευμα, κατέθετο τὴν ἀρχήν, καὶ δέκα ἐπεβίω ἄλλα."
},
{
  "type": "bio",
  "year": -590,
  "sr": "Mitilenjani mu dodeliše zemlju, a on je proglasi svetom; sada se naziva Pitakejeva.",
  "originalText": "Καὶ χώραν αὐτῷ ἀπένειμαν οἱ Μυτιληναῖοι· ὁ δὲ ἱερὰν ἀνῆκεν, ἥτις νῦν Πιττάκειος καλεῖται."
},
{
  "type": "bio",
  "year": -585,
  "sr": "Nije prihvatio novac koji mu je Krez nudio, rekavši da već ima dvostruko više nego što želi.",
  "originalText": "Ἀλλὰ καὶ Κροίσου διδόντος χρήματα οὐκ ἐδέξατο, εἰπὼν ἔχειν ὧν ἐβούλετο διπλάσια."
}
```

## Provera

Pri rastavljanju dužeg teksta proveriti:

* [ ] Da li svaki entry opisuje samo jedan događaj?
* [ ] Jesu li rođenje i smrt odvojeni?
* [ ] Ima li svaki događaj sopstvenu godinu?
* [ ] Jesu li procenjene godine hronološki moguće?
* [ ] Sadrži li entry najviše dve ili tri kratke rečenice?
* [ ] Jesu li povezani događaji pravilno grupisani?
* [ ] Prati li `originalText` podelu prevoda?
* [ ] Jesu li `quote` i `reported` ostali zaokružene celine?
