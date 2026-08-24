# Kandidati za duplikate i deljene unose

Izveštaj je automatski izveden iz `data/quotes.json`. Kandidat nije automatski
duplikat: isti izvorni paragraf može namerno biti podeljen na više unosa.
Posle izmene korpusa izveštaj se obnavlja komandom `npm run audit:duplicates`.

## Isti normalizovani izvornik — najjači kandidati

Broj grupa: **1**.

### `mm-001966` / `mm-002030`

Normalizovani izvornik: `ερωτηθεις τις εστι φιλος αλλος εφη εγω`

| ID | Autor | Tip | Izvor | Pointer | Srpski |
| --- | --- | --- | --- | --- | --- |
| `mm-001966` | Zeno of Citium | `reported` | diogenes-laertius:VII.23 | data/sources/diogenes-laertius/diogenes-laertius.xml#7.23 | Upitan ko je prijatelj, Zenon odgovori: Drugi ja. |
| `mm-002030` | Zeno of Citium | `reported` | diogenes-laertius:VII.23 | data/sources/diogenes-laertius/diogenes-laertius.xml#7.23 | Upitan ko je prijatelj, Zenon odgovori: Drugi ja. |

- [ ] Odluka: duplikat / deljeni unos / opravdano odvojeno

## Kako pregledati

1. Isti normalizovani izvornik najjači je signal duplikata.
2. Kod sličnog izvornika proveriti da li je jedan unos skraćena verzija drugog.
3. Ne spajati unose samo zato što dele paragraf ili pointer.
4. Ako isti događaj pripada više autora, sačuvati jedan deljeni unos umesto kopija.

