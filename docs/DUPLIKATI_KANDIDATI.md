# Kandidati za duplikate i deljene unose

Izveštaj je automatski izveden iz `data/quotes.json`. Kandidat nije automatski
duplikat: isti izvorni paragraf može namerno biti podeljen na više unosa.
Posle izmene korpusa izveštaj se obnavlja komandom `npm run audit:duplicates`.

## Potpuno isti pointer — kandidati za proveru atomizacije

Broj grupa: **3**.

### `data/sources/porphyry/vita-plotini.el-wikisource.parse.json#p2`

| ID | Autor | Tip | Referenca | Srpski |
| --- | --- | --- | --- | --- |
| `mm-900094` | Plotinus | `quote` | 2 | Još te čekam. Nastojim božansko u nama uzvesti ka božanskom u svemu. |
| `mm-900093` | Plotinus | `bio` | 2 | Plotin umre u šezdeset šestoj godini, pri kraju druge godine Klaudijeve vladavine. Uz njega beše samo Eustohije. |

- [ ] Odluka: duplikat / deljeni unos / pravilna atomizacija / neprecizan pointer

### `data/sources/porphyry/vita-plotini.el-wikisource.parse.json#p3`

| ID | Autor | Tip | Referenca | Srpski |
| --- | --- | --- | --- | --- |
| `mm-900068` | Plotinus | `bio` | 3 | U dvadeset osmoj godini Plotin se okrenu filozofiji. Nezadovoljan aleksandrijskim učiteljima dođe Amoniju, pa čim ga ču reče drugu: Ovoga sam tražio. |
| `mm-900069` | Plotinus | `bio` | 3 | Plotin provede jedanaest godina uz Amonija. |
| `mm-900070` | Plotinus | `bio` | 3 | Želeći upoznati persijsku i indijsku filozofiju, Plotin se u trideset devetoj godini pridruži pohodu cara Gordijana na Persijance. Posle careve pog… |
| `mm-900071` | Plotinus | `bio` | 3 | Kada Filip preuze carstvo, četrdesetogodišnji Plotin dođe u Rim. |
| `mm-900072` | Plotinus | `bio` | 3 | Plotin deset godina u Rimu poučavaše iz Amonijevih predavanja, ali ništa ne pisaše. |

- [ ] Odluka: duplikat / deljeni unos / pravilna atomizacija / neprecizan pointer

### `data/sources/porphyry/vita-plotini.el-wikisource.parse.json#p9`

| ID | Autor | Tip | Referenca | Srpski |
| --- | --- | --- | --- | --- |
| `mm-900074` | Plotinus | `bio` | 9 | Mnogi plemeniti ljudi na samrti poveravahu Plotinu svoju decu i imanje kao svetom i božanskom čuvaru. Njegova kuća zato beše puna dečaka i devojčic… |
| `mm-900075` | Plotinus | `bio` | 9 | Plotin provede dvadeset šest godina u Rimu, mnogima sudeći u međusobnim sporovima, a nikada ne steče neprijatelja među javnim ljudima. |

- [ ] Odluka: duplikat / deljeni unos / pravilna atomizacija / neprecizan pointer

## Kako pregledati

1. Isti normalizovani izvornik najjači je signal duplikata.
2. Kod sličnog izvornika proveriti da li je jedan unos skraćena verzija drugog.
3. Ne spajati unose samo zato što dele paragraf ili pointer.
4. Ako isti događaj pripada više autora, sačuvati jedan deljeni unos umesto kopija.

