# UPUTSTVO ZA AGENTE: Podela i datiranje entrija

## Tipovi entrija

Postoje četiri tipa entrija:

### `bio`

Običan biografski podatak.

Koristi se za:

* rođenje i smrt;
* poreklo i porodicu;
* obrazovanje;
* zanimanje i službu;
* političku aktivnost;
* ratove i javne dužnosti;
* putovanja;
* susrete sa istorijskim ličnostima.

**Obavezno ima polje `year`.**

---

### `anecdote`

Zaokružena zgoda sa poentom.

Koristi se kada tekst:

* prikazuje karakter osobe;
* sadrži duhovit odgovor ili zanimljivu epizodu;
* može stajati kao samostalna priča.

**Obavezno ima polje `year`.**

Jedna anegdota može sadržati više uzastopnih radnji ako zajedno čine jednu zaokruženu priču.

---

### `quote`

Direktan citat filozofa.

* Nema polje `year`.
* Ne podleže pravilima datiranja.
* Ostaje jedna celina dok predstavlja jednu misao.

---

### `reported`

Prepričana izreka ili učenje.

* Nema polje `year`.
* Ne podleže pravilima datiranja.
* Ostaje jedna celina dok predstavlja jedno učenje ili jednu zaokruženu misao.

---

# Pravila za `bio` i `anecdote`

Sledeća pravila važe **isključivo** za `bio` i `anecdote` entrije.

## Osnovni principi

1. Jedan događaj predstavlja jedan entry.
2. Svaki entry mora imati svoju godinu.
3. Godina služi prvenstveno za pravilno hronološko sortiranje, ne za istorijsku preciznost.
4. Logički nerazdvojive celine ostaju u jednom entry-ju.
5. Nepovezani događaji razdvajaju se u više entrija.

---

## Razdvajanje događaja

Svaki zaseban događaj predstavlja zaseban entry.

Ne spajati vremenski ili sadržajno odvojene događaje u isti entry.

### Loše

```json
{
  "type": "bio",
  "year": -650,
  "sr": "Pitak je bio sin Hiradija. Sa Alkejevom braćom srušio je tiranina. Pobedio je Frinona u dvoboju."
}
```

### Dobro

```json
{
  "type": "bio",
  "year": -650,
  "sr": "Pitak je bio sin Hiradija."
},
{
  "type": "bio",
  "year": -640,
  "sr": "Sa Alkejevom braćom srušio je Melanhra."
},
{
  "type": "bio",
  "year": -635,
  "sr": "Pobedio je Frinona u dvoboju."
}
```

Rođenje i smrt uvek moraju biti zasebni entriji.

Poreklo i porodica mogu stajati uz rođenje samo ako čine jednu kratku i neposredno povezanu celinu.

---

## Kada ne razdvajati

Ne razdvajati tekst ako bi izdvojeni deo izgubio smisao.

Logička povezanost postoji kada:

* druga rečenica direktno nastavlja prvu;
* druga rečenica upućuje na prvu ("to", "taj", "njega", "ovaj");
* postoji odnos uzrok–posledica;
* postoji odnos akcija–reakcija;
* postoji odnos ponuda–odgovor;
* radnje predstavljaju jednu neprekinutu sekvencu.

### Pogrešna podela

* "Bio je već duboko star." (mora ostati uz smrt)
* "On novac ne primi. Prijateljstvo pak i savez načini." (jedan događaj)
* "Pretrpeo je to od radosti." (nejasno bez prethodne rečenice)

### Ispravna podela

* "Umro je u Korintu, već duboko star."
* "Ponudili su mu talenat. On odbio i sklopio savez."

Ako se tekst može prirodno podeliti bez gubitka smisla, podeliti ga.

---

## Datiranje

Svaki `bio` i `anecdote` entry mora imati svoju godinu.

Ne stavljati događaje iz različitih razdoblja pod istu godinu.

Ako tačna godina nije poznata, proceniti je prema:

* uzrastu osobe;
* redosledu događaja;
* istorijskom kontekstu;
* trajanju vlasti, putovanja ili službe;
* olimpijadama;
* vladarima;
* ratovima;
* drugim datiranim događajima.

Procena mora biti istorijski moguća i hronološki dosledna.

Ne izmišljati prividno precizne godine.

Ako nema dovoljno podataka, dovoljna je približna procena koja omogućava ispravno sortiranje.

Prioritet određivanja godine je:

1. logički sled događaja;
2. grupisanje povezanih događaja;
3. ravnomerna raspodela između poznatih tačaka života.

---

## Povezani događaji

Više entrija može imati istu godinu kada predstavljaju različite delove istog događaja.

```json
{
  "type": "bio",
  "year": -635,
  "sr": "Bio je strateg Mitilenjana."
},
{
  "type": "bio",
  "year": -635,
  "sr": "Pobedio je Frinona u dvoboju."
}
```

---

## Decimalni redosled

Ako se zna redosled više događaja unutar iste godine ili istog dana, koristiti decimalni deo godine.

```json
-336.1
-336.2
-336.3
```

Decimalni deo označava isključivo logički redosled.

Ne predstavlja precizniji datum.

Koristiti ga samo kada je redosled poznat ili se može pouzdano zaključiti.

---

## Podela izvornog teksta

Svaki entry treba da sadrži samo deo `originalText` koji odgovara njegovom prevodu.

Ne ponavljati ceo izvorni odlomak u svakom entry-ju.

Podela `originalText` mora pratiti podelu polja `sr` i `stsl`.

---

## Primer refaktorisanja

### Pre

```json
{
  "type": "bio",
  "year": -600,
  "sr": "Poveriše mu vlast. Vladao je deset godina. Dobio je zemlju. Odbio je Krezov novac."
}
```

### Posle

```json
{
  "type": "bio",
  "year": -600,
  "sr": "Mitilenjani su mu poverili vlast."
},
{
  "type": "bio",
  "year": -590,
  "sr": "Posle deset godina položio je vlast."
},
{
  "type": "bio",
  "year": -590,
  "sr": "Mitilenjani su mu dodelili zemlju."
},
{
  "type": "bio",
  "year": -585,
  "sr": "Odbio je Krezov novac."
}
```

---

# Kontrolna lista

Pre završetka proveriti:

* [ ] Da li je izabran odgovarajući tip (`bio`, `anecdote`, `quote` ili `reported`)?
* [ ] Ako je `bio` ili `anecdote`, ima li entry godinu?
* [ ] Da li svaki `bio` ili `anecdote` opisuje jedan događaj ili jednu zaokruženu priču?
* [ ] Jesu li rođenje i smrt odvojeni?
* [ ] Jesu li procenjene godine hronološki moguće?
* [ ] Jesu li logički povezane rečenice ostale zajedno?
* [ ] Prati li `originalText` podelu prevoda?
* [ ] Jesu li `quote` i `reported` ostali jedna zaokružena misao?
