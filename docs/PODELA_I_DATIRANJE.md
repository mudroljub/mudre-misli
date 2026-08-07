# UPUTSTVO ZA AGENTE: Podela i datiranje unosa

## Glavno pravilo

Biografski tekst treba podeliti na **što manje samostalne činjenice ili događaje**, ali svaki izdvojeni entry mora biti razumljiv kada se čita potpuno samostalno.

**Atomizacija je poželjna kada se izdvojeni delovi mogu pretvoriti u smislene samostalne biografske podatke.**

Ne čuvati ceo odlomak zajedno samo zato što njegove rečenice pripadaju istoj široj priči.

Istovremeno, ne izdvajati rečenicu doslovno ako bi time postala nejasna. Dozvoljeno je minimalno je preformulisati ili dopuniti kontekstom koji je već sadržan u izvornom odlomku.

### Primer

Izvor:

```text
Poveriše mu vlast. Vladao je deset godina. Za to vreme uredio je grad. Posle deset godina položio je vlast.
```

Ispravno:

```json
{
  "type": "bio",
  "year": -600,
  "sr": "Mitilenjani su mu poverili vlast."
},
{
  "type": "bio",
  "year": -600,
  "sr": "Vladao je Mitilenom deset godina."
},
{
  "type": "bio",
  "year": -595,
  "sr": "Tokom svoje vladavine uredio je grad."
},
{
  "type": "bio",
  "year": -590,
  "sr": "Oko 590. godine p. n. e. povukao se sa vlasti."
}
```

Ovde su rečenice atomizovane jer svaka predstavlja zaseban biografski podatak i može samostalno stajati na vremenskoj liniji.

---

# Tipovi unosa

Postoje četiri tipa unosa:

## `bio`

Samostalan biografski podatak ili događaj.

Koristi se za:

* rođenje i smrt;
* poreklo i porodicu;
* obrazovanje;
* zanimanje i službu;
* političku aktivnost;
* ratove i javne dužnosti;
* putovanja;
* susrete sa istorijskim ličnostima;
* druge događaje iz života.

**Obavezno ima polje `year`.**

---

## `anecdote`

Zaokružena zgoda sa poentom.

Koristi se kada tekst:

* prikazuje karakter osobe;
* sadrži duhovit odgovor ili zanimljivu epizodu;
* zavisi od niza povezanih radnji;
* funkcioniše kao mala samostalna priča.

**Obavezno ima polje `year`.**

Za razliku od `bio`, anegdotu ne treba atomizovati na pojedinačne činjenice ako bi time nestala njena priča ili poenta.

---

## `quote`

Direktan citat filozofa.

* Nema polje `year`.
* Ne podleže pravilima datiranja.
* Ostaje jedna celina dok predstavlja jednu misao.

---

## `reported`

Prepričana izreka ili učenje.

* Nema polje `year`.
* Ne podleže pravilima datiranja.
* Ostaje jedna celina dok predstavlja jedno učenje ili jednu zaokruženu misao.

---

# Pravila za `bio`

## Atomizovati kada je moguće

Kod `bio` unosa težiti izdvajanju pojedinačnih biografskih činjenica i događaja.

Jedan entry može predstavljati:

* stupanje na vlast;
* trajanje vlasti;
* zakonodavnu ili drugu aktivnost tokom vlasti;
* povlačenje sa vlasti;
* vojnu funkciju;
* pojedinačnu bitku;
* putovanje;
* imenovanje;
* nagradu;
* susret;
* brak;
* rođenje deteta;
* drugi jasno izdvojiv događaj ili podatak.

Činjenica ne mora biti posebna rečenica u izvorniku da bi postala zaseban entry.

I obrnuto: jedna izvorna rečenica može sadržati više činjenica koje treba razdvojiti.

---

# Samostalnost entry-ja

Svaki `bio` entry mora biti razumljiv bez čitanja prethodnog entry-ja.

Zato pri atomizaciji treba vratiti neophodan kontekst.

### Loše

```json
{
  "type": "bio",
  "year": -595,
  "sr": "Za to vreme uredio je grad."
}
```

Nije jasno na koje vreme se odnosi "za to vreme".

### Dobro

```json
{
  "type": "bio",
  "year": -595,
  "sr": "Tokom svoje vladavine uredio je grad."
}
```

---

### Loše

```json
{
  "type": "bio",
  "year": -590,
  "sr": "Posle deset godina položio je vlast."
}
```

Entry zavisi od prethodnog podatka da bi se znalo kojih deset godina.

### Dobro

```json
{
  "type": "bio",
  "year": -590,
  "sr": "Posle deset godina vladavine položio je vlast."
}
```

ili, ako je godina samo približno određena:

```json
{
  "type": "bio",
  "year": -590,
  "sr": "Oko 590. godine p. n. e. povukao se sa vlasti."
}
```

---

# Dozvoljeno dopunjavanje konteksta

Pri razdvajanju `bio` unosa dozvoljeno je minimalno preformulisati tekst kako bi svaki entry postao samostalan.

Dozvoljeno je:

* zamenicu zameniti imenom osobe;
* "tada" zameniti konkretnim periodom;
* "za to vreme" zameniti sa "tokom njegove vladavine";
* "posle toga" zameniti konkretnom prethodnom okolnošću;
* ponoviti mesto, funkciju, rat ili drugu informaciju potrebnu za razumevanje;
* približnu godinu izraziti u samom prevodu kada je korisno.

**Ne dodavati nove istorijske činjenice.**

Dopuna sme sadržati samo kontekst koji već proizlazi iz izvornog teksta ili pouzdano utvrđene hronologije.

---

# Kada `bio` ipak ne razdvajati

Više radnji ostaviti zajedno kada one nisu korisne kao zasebne biografske činjenice, već predstavljaju delove jednog nedeljivog događaja.

Posebno ih ne razdvajati kada postoji:

* ponuda i neposredan odgovor;
* pitanje i odgovor;
* izazov i neposredna reakcija;
* uzrok i neposredna posledica;
* radnja čiji smisao zavisi od ishoda iste radnje;
* kratka sekvenca koja predstavlja jedan konkretan događaj.

### Loše

```json
{
  "type": "bio",
  "year": -585,
  "sr": "Krez mu je ponudio novac."
},
{
  "type": "bio",
  "year": -585.1,
  "sr": "Pitak je odbio novac."
},
{
  "type": "bio",
  "year": -585.2,
  "sr": "Pitak je sklopio savez sa Krezom."
}
```

Ako izvor sve ovo predstavlja kao jedan susret i jednu neposrednu razmenu, prirodnije je:

```json
{
  "type": "bio",
  "year": -585,
  "sr": "Krez mu je ponudio novac, ali ga je Pitak odbio i sa njim sklopio prijateljstvo i savez."
}
```

Dakle:

**atomizovati samostalne biografske činjenice, ali ne atomizovati pojedinačne korake jednog nedeljivog događaja.**

---

# Razlika između `bio` i `anecdote`

Kod `bio` je poželjna atomizacija.

Kod `anecdote` je poželjno očuvanje priče.

Ako odlomak samo prenosi činjenice:

```text
Postao je vladar. Vladao je deset godina. Tokom vlasti doneo je zakone. Zatim se povukao.
```

može se podeliti na više `bio` unosa.

Ako odlomak opisuje konkretnu zgodu:

```text
Kada su mu ponudili novac, odbio ga je. Na pitanje zašto ga ne uzima odgovorio je da već ima dvostruko više nego što mu je potrebno.
```

to treba ostaviti kao jednu `anecdote`, jer pitanje, odgovor i okolnosti zajedno nose poentu.

---

# Rođenje i smrt

Rođenje i smrt uvek su zasebni `bio` entriji.

Poreklo i porodica mogu biti odvojeni ako predstavljaju korisne samostalne podatke.

### Primer

```json
{
  "type": "bio",
  "year": -650,
  "sr": "Pitak je rođen oko 650. godine p. n. e."
},
{
  "type": "bio",
  "year": -650,
  "sr": "Pitakov otac bio je Hiradije."
}
```

Ako je podatak o poreklu veoma kratak i nema samostalnu vrednost, može ostati uz rođenje.

---

# Datiranje

Svaki `bio` i `anecdote` entry mora imati svoju godinu.

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

Godina prvenstveno služi sortiranju.

Ne izmišljati prividnu istorijsku preciznost.

Ako događaj traje više godina, `year` predstavlja najkorisniju tačku za njegovo postavljanje na vremensku liniju.

Na primer:

```json
{
  "type": "bio",
  "year": -600,
  "sr": "Oko 600. godine p. n. e. preuzeo je vlast u Mitileni."
},
{
  "type": "bio",
  "year": -595,
  "sr": "Tokom desetogodišnje vladavine uredio je grad."
},
{
  "type": "bio",
  "year": -590,
  "sr": "Oko 590. godine p. n. e. povukao se sa vlasti."
}
```

Srednja godina ne tvrdi nužno da se uređivanje grada dogodilo baš 595. godine. Ona omogućava približno hronološko pozicioniranje događaja unutar perioda vladavine.

---

# Decimalni redosled

Ako više zasebnih događaja pripada istoj godini i njihov redosled je poznat, koristiti decimalni deo:

```text
-336.1
-336.2
-336.3
```

Decimalni deo označava samo redosled.

Ne predstavlja precizniji datum.

Ne koristiti decimalne vrednosti samo zato što je jedna priča podeljena na više rečenica.

---

# `originalText`

Svaki entry treba da sadrži samo deo `originalText` koji odgovara njegovom sadržaju.

Podela `originalText` treba da prati podelu `sr` i `stsl`.

Međutim, pošto se prevod pri atomizaciji može minimalno dopuniti radi samostalnosti, nije potrebno da svaka reč dopune postoji doslovno u pripadajućem fragmentu `originalText`.

Bitno je da dopuna proizlazi iz neposrednog izvornog konteksta i da ne uvodi novu činjenicu.

---

# Test pre podele

Za svaku potencijalnu činjenicu postaviti dva pitanja:

**1. Predstavlja li ovo zaseban biografski podatak ili događaj?**

Ako da, pokušati napraviti zaseban entry.

**2. Može li entry biti razumljiv samostalno uz minimalno preformulisanje?**

Ako da, razdvojiti ga.

Ako ni uz prirodno i minimalno dopunjavanje konteksta nema smisla bez ostatka priče, ostaviti ga zajedno sa povezanim delom.

---

# Pravilo prednosti

Kada postoji dilema:

1. Izdvojiti samostalne biografske činjenice.
2. Minimalno ih preformulisati da budu razumljive bez okolnih entry-ja.
3. Ne izmišljati informacije radi njihove samostalnosti.
4. Ne razbijati nedeljiv događaj na njegove sitne korake.
5. Anegdote čuvati kao priče.
6. Godine koristiti za hronološko sortiranje, ne za prividnu preciznost.

Najkraće:

**`bio`: atomizuj činjenice, ali ih učini samostalnim.**

**`anecdote`: sačuvaj priču i poentu.**

**`quote` i `reported`: sačuvaj zaokruženu misao.**

---

# Kontrolna lista

Pre završetka proveriti:

* [ ] Da li je izabran odgovarajući tip?
* [ ] Ima li svaki `bio` i `anecdote` godinu?
* [ ] Jesu li samostalne biografske činjenice izdvojene?
* [ ] Može li svaki `bio` entry biti razumljiv bez prethodnog entry-ja?
* [ ] Jesu li zavisne formulacije poput "tada", "za to vreme", "posle toga", "njega" i "to" po potrebi razjašnjene?
* [ ] Je li pri razjašnjavanju korišćen samo kontekst koji već postoji u izvoru?
* [ ] Jesu li pojedinačni koraci nedeljivog događaja ostali zajedno?
* [ ] Jesu li anegdote sačuvane kao zaokružene priče?
* [ ] Jesu li rođenje i smrt zasebni?
* [ ] Jesu li procenjene godine hronološki moguće?
* [ ] Prati li `originalText` podelu sadržaja?
* [ ] Jesu li `quote` i `reported` ostali zaokružene misli?
