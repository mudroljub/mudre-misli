# Kandidati za duplikate i deljene unose

Izveštaj je automatski izveden iz `data/quotes.json`. Kandidat nije automatski
duplikat: isti izvorni paragraf može namerno biti podeljen na više unosa.
Posle izmene korpusa izveštaj se obnavlja komandom `npm run audit:duplicates`.

## Potpuno isti pointer — kandidati za proveru atomizacije

Broj grupa: **6**.

### `data/sources/hermann-diels/philosophers/46-Anaxagoras.txt:1827#χρημάτων`

| ID | Autor | Tip | Referenca | Srpski |
| --- | --- | --- | --- | --- |
| `mm-000056` | Anaxagoras | `quote` | B.4 | U onome što se sastavlja sadržane su mnoge i svakovrsne stvari, semena svih stvari, sa svakovrsnim oblicima, bojama i ukusima. |
| `mm-000075` | Anaxagoras | `quote` | B.4 | A pre nego što se razlučiše, dok sve stvari behu zajedno, nijedna boja ne beše razaznatljiva; jer to sprečavaše mešavina svih stvari: vlažnog i suv… |

- [ ] Odluka: duplikat / deljeni unos / pravilna atomizacija / neprecizan pointer

### `data/sources/porphyry/vita-plotini.el-wikisource.parse.json#p2`

| ID | Autor | Tip | Referenca | Srpski |
| --- | --- | --- | --- | --- |
| `mm-900094` | Plotinus | `quote` | 2 | Još te čekam. Nastojim božansko u nama uzvesti ka božanskom u svemu. |
| `mm-900093` | Plotinus | `bio` | 2 | Plotin umre u šezdeset šestoj godini, pri kraju druge godine Klaudijeve vladavine. Uz njega beše samo Eustohije. |

- [ ] Odluka: duplikat / deljeni unos / pravilna atomizacija / neprecizan pointer

### `data/sources/hermann-diels/band1.txt:36784`

| ID | Autor | Tip | Referenca | Srpski |
| --- | --- | --- | --- | --- |
| `mm-001519` | Protagoras | `quote` | 80 B 3 | Poučavanju su potrebni prirodna obdarenost i vežbanje. |
| `mm-001520` | Protagoras | `quote` | 80 B 3 | Učenje treba započeti od mladosti. |

- [ ] Odluka: duplikat / deljeni unos / pravilna atomizacija / neprecizan pointer

### `data/sources/canonical-greekLit/data/tlg0059/tlg022/tlg0059.tlg022.perseus-grc2.xml:313`

| ID | Autor | Tip | Referenca | Srpski |
| --- | --- | --- | --- | --- |
| `mm-900126` | Protagoras | `mention` | 329b | Sokrat u Platonovom dijalogu kaže da je Protagora umeo i govoriti duge i lepe govore i kratko odgovarati na pitanja, kao i saslušati tuđ odgovor — … |
| `mm-900139` | Protagoras | `quote` | 329d–e | Vrlina je jedno, ali pravda, umerenost, pobožnost i ostale vrline jesu njeni različiti delovi, kao što su usta, nos, oči i uši delovi lica. Zato mn… |

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

