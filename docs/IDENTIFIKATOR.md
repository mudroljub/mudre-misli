# Trajni identitet unosa

Svaki izvorni unos u `data/quotes/*.json` ima obavezno polje `id` oblika
`mm-000001`. Identifikator je neproziran i trajan: ne izvodi se iz autora,
izvora, položaja u nizu ni teksta, jer se svi ti podaci mogu promeniti.

## Pravila

- Dodavanje ili uklanjanje izvora ne menja `id`.
- Deljeni unos sa više autora ima jedan `id`, jer je i dalje jedan unos.
- Pri razdvajanju, deo koji najvernije nastavlja prvobitni unos zadržava njegov
  `id`; svaki novi deo dobija nov `id`.
- Pri spajanju duplikata zadržava se `id` potpunijeg ili starijeg kanonskog
  unosa. Uklonjeni identifikator se ne koristi ponovo.
- Celovito delo ili pismo ima jedan `id`. Njegovi unutrašnji odeljci dobijaju
  zasebna stabilna sidra, ali ne postaju samostalni unosi samo radi navigacije.
- Promena prevoda, tipa, datiranja, redosleda ili autora ne menja `id`.

Novi identifikator dodeljuje se samo jednom, narednim slobodnim brojem. Alat
`tools/assign-entry-ids.mjs` dopunjava samo unose bez identifikatora i nikada ne
menja postojeće vrednosti. Generator odbija nedostajuće, neispravne i duplirane
identifikatore.

Generisano polje `_id` ostaje privremeni redni broj radi kompatibilnosti. Ne
sme se koristiti za trajne veze, identitet unosa ili buduće odnose među
podacima.
