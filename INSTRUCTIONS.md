# Uputstvo za AI agente

## Cilj projekta

Projekat se zasniva na obradi javno dostupnog dela:

**Diogen Laertije – Životi i mišljenja znamenitih filozofa**

Cilj je napraviti zbirku svih dostupnih filozofskih citata i anegdota koje Diogen Laertije prenosi o poznatim filozofima, a zatim ih prevesti na staroslovenski filozofski jezik.

Radi se **jedan filozof po jedan**, redosledom kojim korisnik zatraži.

Za svakog filozofa potrebno je:

1. izdvojiti sve direktne i prepričane izjave koje Diogen Laertije pripisuje tom filozofu;
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

Citat je svaka izjava ili filozofski stav koji Diogen Laertije pripisuje filozofu, bez obzira na to da li je prenet upravnim ili neupravnim govorom.

Uključiti:

- direktne izreke filozofa;
- fragmente dela sačuvane kod Diogena;
- filozofske tvrdnje koje Diogen prenosi kao njihove;
- prepričane izjave i učenja u neupravnom govoru (npr. „Pitagora je govorio da meso ne treba jesti”);
- sažete prikaze filozofovih gledišta, zabrana, saveta i načela, kada su jasno pripisani tom filozofu.

Kada je stav pouzdano pripisan filozofu i smislen bez okolnog konteksta, poželjno ga je oblikovati kao samostalni aforizam, bez uvodne formule. Kada izvorna ograda, neizvesno pripisivanje ili potreban kontekst zahtevaju neupravni govor, koristiti obrazac „[ime filozofa] je govorio da…”. Ne koristiti oblike „učenje filozofa bilo je…”, „filozof je smatrao…”, „filozof je objašnjavao…” ili „filozof je učio…”. Ograde iz izvora zadržati ispred standardnog obrasca (npr. „Prema jednom predanju, Tales je govorio da…”), kako se parafraza ne bi lažno predstavila kao doslovan navod.

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
5. polje `born` je obavezno i sadrži `number`;
6. negativna godina označava vreme pre nove ere, nula je dozvoljena kao granična godina, a pozitivna godina označava novu eru;
7. nakon izmene proveriti da je `data/authors.json` ispravan JSON i da su autori u bočnoj traci hronološki poređani.

Primer:

```json
"Ksenofan": {
  "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Xenophanes%20in%20Thomas%20Stanley%20History%20of%20Philosophy.jpg?width=160",
  "born": -570
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

## Terminološki rečnik (staroslovenski, IX vek)

- ἀγαθόν → благо
- ἄγνοια → невѣдѣниѥ
- ἀέρας → вѫздꙋхъ
- αἴσθησις → чꙋвьство
- αἰτία → вина (alt: причина, начѧло)
- αἰών → вѣкъ
- ἀλήθεια → истина
- ἀνάγκη → нѫжда
- ἀπαρχή → прьвина (alt: начѧтъкъ)
- ἄπειρον → безконьчноѥ
- ἄπειρος → безмѣрьнъ
- ἀρετή → добродѣтель
- ἁρμονία → съвръзаниѥ (alt: съгласиѥ)
- ἀρχή → начѧло
- ἄτομος → недѣлимъ
- βίος → животъ
- βούλησις → хотѣниѥ
- γένεσις → рожениѥ (alt: бытиѥ)
- γῆ → землѧ
- γνωθι σεαυτόν → познѧи себе (alt: познѧи сѧ)
- γνώμη → познаниѥ (alt: помыслъ)
- γνώμων → слъньцѣпоказъ
- γνῶσις → знаниѥ
- δαίμων → духъ (alt: демонъ)
- διάνοια → разумѣниѥ
- δικαιοσύνη → правда
- δόξα → мьнѣниѥ
- δουλεία → рабьство
- δύναμις → сила
- εἱμαρμένη → сѫдьба
- ἐλευθερία → волѧ (alt: свобода)
- ἐλπίς → надѣжда
- ἕν → єдино
- ἐνέργεια → дѣиство
- ἕνωσις → съединениѥ
- ἐπιστήμη → наꙋка
- ἔρως → любовь
- εὐδαιμονία → блаженьство
- εὐθυμία → благодꙋшиѥ
- ἡδονή → сластъ
- ἦθος → нравъ
- θάνατος → смрьть
- θεός → богъ
- θεωρία → зрѣниѥ
- ἰδέα → видъ (alt: зракъ)
- ἰσότης → равьность
- κακόν → зло
- καλόν → красно (alt: добро — kada znači moralno dobro)
- κενόν → праздьно (alt: праздьно мѣсто)
- κίνησις → движениѥ
- κόσμος → миръ (alt: украшениѥ — izvorno značenje reda/ukrasa)
- κρᾶσις → смѣшение
- λόγος → слово (alt: разумъ, рѣчь, законъ)
- λόγος σπερματικός → словесьно сѣмѧ (alt: сѣмьноѥ слово)
- λύπη → печаль
- μεταβολή → прѣмѣнениѥ
- μέτρον → мѣра
- μορφή → образъ
- νεῖκος → вражда
- νόμος → законъ
- νοῦς → умъ
- ὄν → сѫщее
- οὐσία → сѫщество (alt: естество)
- πάθος → страданиѥ (alt: страсть)
- πάντα → всѧ
- πέρας → прѣдѣлъ
- πλῆθος → множьство
- πόλις → градъ
- πολίτης → градьнинъ
- πολλοί → мнози
- πῦρ → огнь
- Σελήνη → мѣсѧць
- σοφία → мѫдрость
- στάσις → стояниѥ (alt: покои)
- στοιχεῖον → пьрвосъставъ (alt: съставъ)
- τέλος → коньць (alt: цѣль)
- τέχνη → художьство
- τὸ εἶναι → бытиѥ
- τόπος → мѣсто
- τύχη → приклꙋчаи (alt: съчастьѥ)
- ὕδωρ → вода
- φθορά → тлѣниѥ
- φιλία → дружьба
- φιλοσοφία → любомѫдриѥ
- φιλόσοφος → любомѫдрьць
- φιλότης → любовь (Empedokleov termin)
- φόβος → страхъ
- φρόνησις → благоразꙋмиѥ
- φύσις → естество
- χρόνος → врѣмѧ
- ψεῦδος → ложь
- ψυχή → душа

четыри прьвины vs четыри състави

## Doslednost

Ne menjati terminologiju bez razloga.

Isti grčki filozofski pojam treba prevoditi istim staroslovenskim terminom kroz ceo korpus, osim kada bi takav prevod promenio stvarno filozofsko značenje.

Ako postoji višeznačnost, koristiti postojeću alternativu iz rečnika.
