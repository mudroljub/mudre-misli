# Kandidati za duplikate i deljene unose

Izveštaj je automatski izveden iz `data/quotes.json`. Kandidat nije automatski
duplikat: isti izvorni paragraf može namerno biti podeljen na više unosa.
Posle izmene korpusa izveštaj se obnavlja komandom `npm run audit:duplicates`.

## Sličan izvornik u istoj izvornoj referenci

Broj parova sa sličnošću najmanje 72%: **1**.

| Sličnost | Prvi unos | Drugi unos | Izvor |
| ---: | --- | --- | --- |
| 100% | `mm-900037` Euclid of Megara,Socrates — Videvši Euklida predanog prepiračkim govorima, Sokrat mu reče: Euklide, sa mudrijašima ćeš umeti opštiti, ali sa ljudima nikako. | `mm-001696` Socrates — Videvši da se Euklid ozbiljno bavi erističkim raspravama, Sokrat mu reče: Sa sofistima ćeš umeti, Euklide, ali sa ljudima nikako. | diogenes-laertius:II.30 |

## Kako pregledati

1. Isti normalizovani izvornik najjači je signal duplikata.
2. Kod sličnog izvornika proveriti da li je jedan unos skraćena verzija drugog.
3. Ne spajati unose samo zato što dele paragraf ili pointer.
4. Ako isti događaj pripada više autora, sačuvati jedan deljeni unos umesto kopija.

