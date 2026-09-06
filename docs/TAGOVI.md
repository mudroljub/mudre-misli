# Sistem tagova

Tagovi se automatski prepoznaju u grčkom tekstu citata i posredno prenesenih
iskaza prema oblicima iz `data/tags.json`.

Termin iz rečnika dobija link ka svojoj stranici čim postoji **najmanje jedan**
takav unos sa njegovim tagom. Samo prisustvo termina u rečniku ili u
`tags.json` nije dovoljno. Posle izmene oblika potrebno je pokrenuti:

```
npm run build:data
```