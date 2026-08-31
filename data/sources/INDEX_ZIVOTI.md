# Dodatni izvori za živote filozofa

Objedinjeni pregled svih poimenično indeksiranih života, uključujući ličnosti
koje još nisu deo projekta, nalazi se u
[`INDEX_FILOSOFI.md`](INDEX_FILOSOFI.md). Mašinski oblik je
`philosopher-catalog.json`, a oba se osvežavaju komandom
`npm run build:catalog:philosophers`.

Ovaj indeks povezuje šest lokalno preuzetih izvora. Pojedinačni indeksi daju
strukturu dela i način pokazivanja na odlomak.

| Izvor | Glavni lokalni oblik | Indeks |
| --- | --- | --- |
| Eunapije, *Životi filozofa i sofista* | potpuni engleski HTML | `INDEX_EUNAPIJE.md` |
| Filostrat, *Životi sofista* | potpuni grčki CTS/EpiDoc TEI | `INDEX_FILOSTRAT.md` |
| Jovan Velški, *Compendiloquium* | latinski hOCR, 116 stranica | `INDEX_JOVAN_VELSKI.md` |
| al-Mubaššir ibn Fatik, *Mukhtār al-ḥikam* | engleski i španski javnodomenski OCR prenosi | `INDEX_MUKHTAR_AL_HIKAM.md` |
| *Suda* | potpuni grčki CTS/EpiDoc TEI | `INDEX_SUDA.md` |
| Porfirije, *Život Plotina* | potpuni grčki MediaWiki JSON | `INDEX_PORFIRIJE_PLOTIN.md` |

## Hijerarhija pouzdanosti

Za neposredno citiranje prednost imaju grčki TEI izvori Filostrata i Sude i
grčki tekst Porfirija. Eunapijev fajl je potpuni prevod, ali nije izvornik.
Jovan Velški i oba prenosa al-Mubaššira služe prvenstveno za pretragu; zbog
OCR grešaka navod se mora proveriti prema faksimilu.
