# Uputstvo za AI agente

Pravimo zbirku filozofskih citata i anegdota koje Diogen Laertije prenosi o poznatim filozofima, i prevodimo ih na staroslovenski filozofski jezik iz vremena pre Kirila i Metoda (ciljamo 8. vek).

## Procedura izvlačenja citata

Radi se **jedan filozof po jedan**, redosledom kojim korisnik zatraži.

Za svakog filozofa potrebno je:

1. izdvojiti sve direktne i prepričane izjave koje Diogen Laertije pripisuje tom filozofu;
2. izdvojiti sve anegdote koje se odnose na tog filozofa;
3. jasno razdvojiti citate i anegdote;
4. prevesti ih na staroslovenski.

Ne preskakati nijedan dostupan citat ili anegdotu.

Ne izmišljati citate niti rekonstruisati izgubljene izreke. Uključivati samo ono što Diogen Laertije zaista prenosi ili jasno pripisuje filozofu.

# Izvori

Kopije javno dostupnih izvora se nalaze u folderu data/sources. Izvori imaju svoje manifeste, npr:

- Manifest svih originalno preuzetih stranica: `data/sources/diogenes-laertius/manifest.json`
- Manifest deduplikovanih grčkih stranica: `data/sources/diogenes-laertius/manifest.el.json`

Pravila upotrebe:

1. Prvo koristiti lokalne fajlove iz `data/sources/`.
2. Veb izvore koristiti samo za proveru ili osvežavanje kada lokalni fajl nedostaje ili je neispravan.
3. Kod citiranja izvora u polju `source` navoditi autora, knjigu i odeljak (npr. `I.35`), a ne putanju fajla.

Grčki tekst koristiti za proveru izvornog značenja.

Engleski prevod koristiti kao pomoć pri razumevanju, ali ne kao zamenu za original.

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

# Anegdota

Anegdota je događaj ili pripovest koja slikovito opisuje filozofa, njegov karakter, način života ili filozofski stav.

Uključiti samo anegdote koje imaju:

- filozofski značaj;
- karakterološki značaj;
- istorijsku vrednost za razumevanje filozofa.

Ne uključivati:

- gole biografske podatke (rođenje, poreklo, roditelji, datumi);
- obične istorijske činjenice bez filozofskog značaja.

# Sprečavanje dupliranja

Pre dodavanja novog zapisa proveriti da li ista izjava ili anegdota već postoji u zbirci.

Ne unositi isti sadržaj više puta u različitim oblicima:
- direktan citat i parafraza iste izreke;
- ista izjava kao deo anegdote i kao poseban `quote`;
- skraćena i proširena verzija istog događaja.

Ako je izjava deo šire priče sa filozofskim ili karakterološkim značajem, čuvati je kao `anecdote`.  
Ako je samostalna izreka bez konteksta, čuvati je kao `quote`.

# JSON format

Za detaljna objašnjenja svih polja pogledati JSDoc komentare u `types/data.ts`.

# Podaci o autorima (obavezno)

Pri svakom dodavanju novog autora u `data/quotes/[Ime_Filozofa].json` obavezno istovremeno dodati njegove podatke u `data/authors.json`.

Struktura podataka o autoru je definisana u **`types/data.ts`** interfejsu `AuthorMetadata`.

Pravila:

1. ključ u `data/authors.json` mora biti potpuno isti kao vrednost polja `author` u JSON fajlovima citata;
2. koristiti pouzdan izvor slike sa slobodnom licencom, prvenstveno Wikimedia Commons;
3. proveriti da slika zaista prikazuje traženog autora, naročito kada postoji više istorijskih ličnosti sa istim imenom;
4. negativan broj za `born`/`died` označava p.n.e., pozitivan n.e.;
5. nakon izmene proveriti da je `data/authors.json` ispravan JSON i da su autori u bočnoj traci hronološki poređani.

Vrednost polja `author` mora koristiti standardno srpsko ime filozofa koje se koristi u projektu, nezavisno od oblika u grčkom ili engleskom izvoru.

---

# Pravila prevođenja

Za sva pravila prevođenja na staroslovenski, transkripciju imena i terminološki rečnik, pogledati [TRANSLATION.md](TRANSLATION.md).
