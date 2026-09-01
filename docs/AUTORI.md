# Dodavanje autora

Dodavanje autora nije završeno samim unosima u `data/quotes/`. Autor mora biti
potpuno uključen i u prikaz sajta.

## Obavezna procedura

Ključ autora mora biti jednak tačnom naslovu njegovog članka na engleskoj
Vikipediji, uključujući dodatak za razlučivanje, na primer
`Melissus of Samos`. Isti ključ koristi se u `authors.json`, imenu fajla u
`data/quotes/`, polju `author`, prevodima i grupama autora. Tako se Vikipedijin
link i unutrašnji slug grade bez posebnih izuzetaka.

1. Dodati autora u `data/authors.json`: ime, godine života, izvorni oblik,
   mesto rođenja i `src` slike.
2. Dodati stvarnu sliku autora u `public/images/authors/` kada je dostupna;
   `unknown-author.svg` koristiti samo ako nema primerene slike. Profilna slika
   treba da bude približno **500 px široka**; veće slike smanjiti bez promene
   odnosa stranica, a manje izvorne slike ne povećavati veštački samo radi
   dostizanja te širine.
3. Dodati lokalizovana imena u `utils/translations.ts`.
4. Dodati izvorne unose u `data/quotes/<Autor>.json`.
5. Uvrstiti autora u odgovarajuće razdoblje i školu u
   `utils/authorGroups.ts`, tako da bude dostupan u bočnoj navigaciji i na
   stranici filozofa.
6. Proveriti da ključ autora vodi na odgovarajući članak engleske Vikipedije.
7. Pokrenuti `npm run build:quotes` i `npm run typecheck`.

Pre završetka proveriti da autor ima i profilnu sliku (ili obrazložen
podrazumevani prikaz) i link u navigaciji; nijedan novi autor ne sme ostati
samo u podacima.
