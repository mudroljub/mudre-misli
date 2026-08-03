# Uputstvo za AI agente

## Cilj projekta

Projekat se zasniva na obradi javno dostupnog dela:

**Diogen Laertije – Životi i mišljenja znamenitih filozofa**

Cilj je napraviti zbirku svih dostupnih filozofskih citata i anegdota koje Diogen Laertije prenosi o poznatim filozofima, a zatim ih prevesti na staroslovenski filozofski jezik.

Radi se **jedan filozof po jedan**, redosledom kojim korisnik zatraži.

Za svakog filozofa potrebno je:

1. izdvojiti sve direktne citate koje Diogen Laertije pripisuje tom filozofu;
2. izdvojiti sve anegdote koje se odnose na tog filozofa;
3. jasno razdvojiti citate i anegdote;
4. prevesti ih na staroslovenski.

Ne preskakati nijedan dostupan citat ili anegdotu.

---

# Izvori

Koristiti sledeće javno dostupne izvore:

- Grčki original:
  [https://el.wikisource.org/wiki/%CE%92%CE%AF%CE%BF%CE%B9_%CF%86%CE%B9%CE%BB%CE%BF%CF%83%CF%8C%CF%86%CF%89%CE%BD](https://el.wikisource.org/wiki/%CE%92%CE%AF%CE%BF%CE%B9_%CF%86%CE%B9%CE%BB%CE%BF%CF%83%CF%8C%CF%86%CF%89%CE%BD)

- Engleski prevod (Robert Drew Hicks, 1925):
  [https://en.wikisource.org/wiki/Lives_of_the_Eminent_Philosophers](https://en.wikisource.org/wiki/Lives_of_the_Eminent_Philosophers)

## Lokalna kopija izvora (obavezno)

U ovom repozitorijumu postoji lokalna kopija izvora i ona ima prioritet pri radu.

- Engleski izvor: `data/sources/en/`
- Grčki izvor: `data/sources/el/`
- Manifest svih originalno preuzetih stranica: `data/sources/manifest.json`
- Manifest deduplikovanih grčkih stranica: `data/sources/manifest.el.json`

Pravila upotrebe:

1. Prvo koristiti lokalne fajlove iz `data/sources/`.
2. Veb izvore koristiti samo za proveru ili osvežavanje kada lokalni fajl nedostaje ili je neispravan.
3. Kod citiranja izvora u polju `source` i dalje navoditi Diogena po knjizi i odeljku (npr. `I.35`), a ne putanju fajla.

Grčki tekst koristiti za proveru izvornog značenja.

Engleski prevod koristiti kao pomoć pri razumevanju, ali ne kao zamenu za original.

---

# Citat

Citat je svaka izjava koju Diogen Laertije izričito pripisuje filozofu.

Uključiti:

- direktne izreke filozofa;
- fragmente dela sačuvane kod Diogena;
- filozofske tvrdnje koje Diogen prenosi kao njihove.

Ne uključivati:

- Diogenove komentare;
- komentare drugih autora;
- biografske podatke;
- tuđa mišljenja o filozofu.

---

# Anegdota

Anegdota je događaj ili pripovest koja slikovito opisuje filozofa, njegov karakter, način života ili filozofski stav.

Uključiti samo anegdote koje imaju:

- filozofski značaj;
- karakterološki značaj;
- istorijsku vrednost za razumevanje filozofa.

Ne uključivati:

- gole biografske podatke (rođenje, poreklo, roditelji, datumi);
- obične istorijske činjenice bez filozofskog značaja.

---

# JSON format

Svaki zapis mora imati sledeći format:

```json
{
  "type": "quote",
  "sr": "",
  "sl": "",
  "author": "",
  "source": ""
}
```

Za anegdote:

```json
{
  "type": "anecdote",
  "sr": "",
  "sl": "",
  "author": "",
  "source": ""
}
```

Polja:

- `type` — tip zapisa (`quote` ili `anecdote`);
- `sr` — savremeni srpski prevod;
- `sl` — staroslovenski prevod;
- `author` — filozof kome pripada citat ili koga opisuje anegdota;
- `source` — precizan izvor iz Diogena Laertija (knjiga i odeljak).

Dodatna polja (`el`, `en` itd.) dodavati samo ako su izričito zatražena.

---

# Podaci o autorima (obavezno)

Pri svakom dodavanju novog autora u `data/quotes.json` ili `data/anecdotes.json` obavezno istovremeno dodati njegovu sliku i vreme rođenja u `data/authors.json`.

Pravila:

1. ključ u `data/authors.json` mora biti potpuno isti kao vrednost polja `author`;
2. polje `src` ne sme ostati prazno i autor se ne sme dodati kao prazan objekat (`{}`);
3. koristiti pouzdan izvor slike sa slobodnom licencom, prvenstveno Wikimedia Commons;
4. proveriti da slika zaista prikazuje traženog autora, naročito kada postoji više istorijskih ličnosti sa istim imenom;
5. polje `born` je obavezno i sadrži celobrojno polje `year` i logičko polje `approximate`;
6. negativna godina označava vreme pre nove ere, nula je dozvoljena kao granična godina, a pozitivna godina označava novu eru;
7. kada tačna godina nije poznata, upisati najbolju približnu godinu i postaviti `approximate` na `true`;
8. kada je poznat samo vek ili raspon, koristiti približnu sredinu procenjenog razdoblja i postaviti `approximate` na `true`;
9. nakon izmene proveriti da je `data/authors.json` ispravan JSON i da su autori u bočnoj traci hronološki poređani.

Primer:

```json
"Ksenofan": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Xenophanes%20in%20Thomas%20Stanley%20History%20of%20Philosophy.jpg?width=160",
  "born": { "year": -570, "approximate": true }
}
```

---

# Pravila prevođenja na staroslovenski

Polje `sl` predstavlja staroslovenski filozofski prevod.

Cilj nije doslovna istorijska rekonstrukcija svakodnevnog praslovenskog jezika, već stvaranje mogućeg staroslovenskog filozofskog izraza.

Koristiti sledeći prioritet:

1. potvrđeni staroslovenski oblici;
2. stariji slovenski koreni kada nema odgovarajućeg potvrđenog oblika;
3. crkvenoslovenska filozofska terminologija kada preciznije izražava pojam;
4. međuslovenski kao poslednja rezerva kada ne postoji odgovarajući stariji izraz.

Ne koristiti moderne termine ako postoji stariji slovenski ekvivalent.

## Transkripcija imena

Grčka imena i termini se prenose prema izvornom grčkom izgovoru, a ne prema kasnijim tradicionalnim slovenskim oblicima koji menjaju glasovnu vrednost. Primeri:

- Ἑκαταῖος → Хекатей (ne Гекатей)
- Ἡράκλειτος → Хераклитъ (ne Ираклитъ)

---

## Terminološki rečnik

- ἀγαθόν → благо
- αἴσθησις → чꙋвьство
- αἰτία → вина (alt: начало — kada označava uzrok)
- αἰών → вѣкъ
- ἀλήθεια → истина
- ἀνάγκη → нѫжда
- ἄπειρον → безконьчноє
- ἀρετή → добродѣтель
- ἀρχή → начало
- βίος → животъ
- γένεσις → бытие
- γνώμη → помыслъ (alt: мысль, разумѣние)
- γνῶσις → вѣдѣние
- δαίμων → духъ
- διάνοια → разумъ
- δικαιοσύνη → правда
- δόξα → мьнѣние
- δουλεία → рабьство
- εἱμαρμένη → сѫдьба
- ἐλευθερία → свобода
- ἐλπίς → надѣжда
- ἕν → єдино
- ἐπιστήμη → вѣдѣние
- ἔρως → любовь
- εὐδαιμονία → блаженьство
- ἡδονή → сластъ
- ἦθος → нравъ
- θάνατος → смрьть
- θεός → богъ
- κακόν → зло
- καλόν → красно
- κίνησις → движенье
- κόσμος → миръ (alt: васєлєна — kada označava celokupni kosmos)
- λόγος → слово (alt: разумъ, законъ — zavisno od konteksta)
- λύπη → печаль
- μεταβολή → прѣмѣна
- νόμος → законъ
- νοῦς → умъ
- ὄν → сѫщее
- οὐσία → существо (alt: естество)
- πάθος → страдание (alt: страсть — kod stoika)
- πάντα → всѣ
- πέρας → прѣдѣлъ
- πόλις → градъ
- πολίτης → гражданинъ
- πολλοί → мнози
- σοφία → мѫдрость
- στάσις → покои
- τέλος → цѣль (alt: коньць — kada znači završetak)
- τέχνη → художьство
- τὸ εἶναι → бытие
- τόπος → мѣсто
- τύχη → случаи (alt: сѫдьба — u fatalističkom kontekstu)
- φθορά → тлѣние
- φιλία → дружьба
- φιλοσοφία → любомѫдрие
- φιλόσοφος → любомѫдрьць
- φόβος → страхъ
- φρόνησις → благоразумие
- φύσις → естество
- χρόνος → врѣмѧ
- ψεῦδος → ложь
- ψυχή → душа
- μέτρον → мѣра
- πῦρ → огнь
- ἕνωσις → съединение
- ἁρμονία → съвръзание (alt: съгласие)

---

## Doslednost

Ne menjati terminologiju bez razloga.

Isti grčki filozofski pojam treba prevoditi istim staroslovenskim terminom kroz ceo korpus, osim kada bi takav prevod promenio stvarno filozofsko značenje.

Ako postoji višeznačnost, koristiti postojeću alternativu iz rečnika.
