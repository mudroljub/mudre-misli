# UPUTSTVO ZA AGENTE: Datiranje unosa

## Opšta pravila

Svaki `bio` i `anecdote` entry mora imati svoju godinu.

Tipovi `quote` i `reported` **ne smeju** imati polje `year`.

---

## Svrha datiranja

Godina prvenstveno služi **sortiranju unosa na vremenskoj liniji**.

Ne treba izmišljati prividnu istorijsku preciznost.

Godina ne tvrdi nužno da se događaj dogodio upravo te godine, već označava najprikladniju tačku za njegovo pozicioniranje na vremenskoj liniji.

---

## Procena godine

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

---

## Opseg života iz `authors.json`

**Obavezno koristiti opseg godina naveden u `authors.json`.**

Svaki filozof ima polja `born` i `died` koja definišu minimalne i maksimalne godine njegovog života.

**Ni jedan unos ne sme imati godinu van ovog opsega.**

### Primer

Ako je u `authors.json` navedeno:

```json
"Epimenides": {
  "born": -600,
  "died": -543
}
```

Svi unosi moraju imati godine između **-600** i **-543**.

---

## Logična raspodela kroz životni vek

Godine treba rasporediti tako da odgovaraju prirodnom toku života:

* **Rođenje i detinjstvo**: najranije godine (-600 do -598 za osobu rođenu -600)
* **Mladost**: rane do srednje godine života
* **Zrelost i aktivnost**: srednje godine
* **Pisanje i učenje**: zrele godine
* **Smrt**: završna godina

---

## Period trajan više godina

Ako događaj traje više godina, `year` predstavlja najkorisniju tačku za njegovo postavljanje na vremensku liniju.

### Primer

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

## Decimalni redosled

Ako više zasebnih događaja pripada istoj godini i njihov **redosled je poznat**, koristiti decimalni deo:

```text
-594.8  (prvi događaj)
-594.6  (drugi događaj)
-594.4  (treći događaj)
-594.2  (četvrti događaj)
```

**Decimalni deo označava samo redosled.**

Ne predstavlja precizniji datum (npr. -594.8 ne znači "oktobar 594. p. n. e.").

### Kada koristiti decimalne brojeve

Koristiti **samo** kada postoji više vezanih događaja koji čine jednu logičnu sekvencu u okviru iste godine:

* Poziv na pomoć → dolazak → obred → ishod
* Pitanje orakula → poruka → tumačenje → izvršenje
* Ponuda → pregovori → odbijanje → posledice

### Kada ne koristiti decimalne brojeve

**Ne** koristiti decimalne vrednosti samo zato što je jedna priča podeljena na više rečenica.

Ako nisu tesno povezani koraci jednog događaja, dati im različite cele godine prema prirodnom toku života.

---

## Praznine u hronologiji

Kada tekst opisuje veliki vremenski skok (npr. legenda o spavanju 57 godina), ostaviti **značajnu prazninu** u godinama.

### Primer

```json
{
  "type": "anecdote",
  "year": -585,
  "sr": "Zaspa u pećini."
},
{
  "type": "bio",
  "year": -574,
  "sr": "Probudivši se, postao poznat među Helenima."
}
```

Praznina od 11 godina pokazuje da se između dva unosa desio veliki vremenski period, bez pokušaja da se legendarnih 57 godina tretira bukvalno.

---

## Približne formulacije u prevodu

Kada je godina samo približno određena, to se može izraziti u samom prevodu:

```json
{
  "type": "bio",
  "year": -590,
  "sr": "Oko 590. godine p. n. e. povukao se sa vlasti."
}
```

Formulacije poput "oko", "otprilike", "u to vreme" pokazuju da je datiranje približno, ali `year` i dalje mora postojati radi sortiranja.

---

## Legendarne i mitske priče

Ako anegdota sadrži očigledno nemoguć vremenski period (npr. spavanje 57 godina, život 300 godina):

* **Ne tretirati bukvalno.**
* Dati jednu razumnu godinu za sortiranje.
* Ako je potrebno, ostaviti vremensku prazninu koja simbolički pokazuje veliki skok.

---

## Kontrolna lista za datiranje

Pre završetka proveriti:

* [ ] Ima li svaki `bio` i `anecdote` godinu?
* [ ] Jesu li sve godine u opsegu iz `authors.json`?
* [ ] Jesu li procenjene godine hronološki moguće?
* [ ] Odgovara li raspodela godina prirodnom toku života?
* [ ] Jesu li decimalni brojevi upotrebljeni samo za vezane sekvence?
* [ ] Jesu li legendarne priče datirane razumno, ne bukvalno?
* [ ] Postoje li praznine nakon velikih vremenskih skokova?
