# Dodavanje autora

Dodavanje autora nije završeno samim unosima u `data/quotes/`. Autor mora biti
potpuno uključen i u prikaz sajta.

## Obavezna procedura

1. Dodati autora u `data/authors.json`: ime, godine života, izvorni oblik,
   mesto rođenja i `src` slike.
2. Dodati stvarnu sliku autora u `public/images/authors/` kada je dostupna;
   `unknown-author.svg` koristiti samo ako nema primerene slike.
3. Dodati lokalizovana imena u `utils/translations.ts`.
4. Dodati izvorne unose u `data/quotes/<Autor>.json`.
5. Uvrstiti autora u odgovarajuće razdoblje i školu u
   `utils/authorGroups.ts`, tako da bude dostupan u bočnoj navigaciji i na
   stranici filozofa.
6. Dodati link ka Wikipediji
7. Pokrenuti `npm run build:quotes` i `npm run typecheck`.

Pre završetka proveriti da autor ima i profilnu sliku (ili obrazložen
podrazumevani prikaz) i link u navigaciji; nijedan novi autor ne sme ostati
samo u podacima.
