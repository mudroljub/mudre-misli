# Dielsov lokalni sloj izvora

## Izvor i namena

Lokalni materijal potiče iz prvog izdanja dela Hermanna Dilsa *Die Fragmente
der Vorsokratiker* (1903), digitalizovanog iz primerka Internet Archive
`b24869673` i obrađenog OCR-om Tesseract 5.1.0 (`deu+grc`).

Ovaj sloj služi za pronalaženje mesta i početno poređenje. OCR nije kritičko
izdanje i ne sme biti jedini autoritet za grčki tekst koji se unosi u zbirku.
Svaki B fragment pre unošenja treba proveriti u pouzdanom izdanju ili drugom
vernom snimku teksta.

## Stvarno stanje fajlova

- `hermann-diels/band1.txt` — OCR glavnog toma, 44.337 redova;
- `hermann-diels/band2.txt` — pomoćni drugi tom/indeks, nije glavni izvor
  fragmenata u sadašnjem toku rada;
- `hermann-diels/manifest.json` — granice 54 odeljka i 16 odeljaka sa
  `B. FRAGMENTE`;
- `hermann-diels/philosophers/*.txt` — 16 mehanički izdvojenih odeljaka iz
  `band1.txt`.

Svih 16 tekstualnih odeljaka iz manifesta postoji:

| Diels | Odeljak | Fajl |
|---:|---|---|
| 3 | Anaksimen | `03-Anaximenes.txt` |
| 11 | Ksenofan | `11-Xenophanes.txt` |
| 12 | Heraklit | `12-Heraclitus.txt` |
| 13 | Epiharm | `13-Epicharmos.txt` |
| 14 | Alkmeon | `14-Alcmaeon.txt` |
| 18 | Parmenid | `18-Parmenides.txt` |
| 19 | Zenon Elejski | `19-Zeno.txt` |
| 20 | Melis | `20-Melissus.txt` |
| 21 | Empedokle | `21-Empedocles.txt` |
| 25 | Ion sa Hiosa | `25-Ion_of_Chios.txt` |
| 26 | Hipon | `26-Hippon.txt` |
| 32 | Filolaj | `32-Philolaus.txt` |
| 35 | Arhita | `35-Archytas.txt` |
| 46 | Anaksagora | `46-Anaxagoras.txt` |
| 47 | Arhelaj | `47-Archelaus.txt` |
| 51 | Diogen iz Apolonije | `51-Diogenes_of_Apollonia.txt` |

Kanonski lokalni anchor je odgovarajući `.txt` odeljak, dok je sam citat kanonski zapisan u autorskom JSON-u zbirke.

## A i B građa

- `A. LEBEN UND LEHRE` sadrži antička svedočanstva i doksografiju. Takav tekst
  nije neposredna filozofova reč i u zbirci pripada tipovima `bio`, `anecdote`
  ili `reported`, prema sadržaju.
- `B. FRAGMENTE` sadrži mesta koja izdanje predstavlja kao neposredne
  fragmente. Tek posle provere grčkog teksta mogu se unositi kao `quote` ili,
  kada je sačuvana veća celina, `works`.
- Oznaka `B` ne rešava sve sporove o autentičnosti. Ograde izvora i varijante
  moraju ostati vidljive.

## Presek sa sadašnjim projektom

Od izdvojenih odeljaka projekat već ima autorske JSON fajlove za Anaksimena,
Ksenofana, Heraklita, Parmenida, Zenona Elejskog, Empedokla i Anaksagoru.
Heraklit je ranije detaljno obrađen; ostale autore treba proveravati fragment po
fragment, bez oslanjanja na stare brojke iz analiza.

Demokrit nije obuhvaćen sadašnjim skupom od 16 izdvojenih odeljaka. Protagorin
odeljak, međutim, postoji u `band1.txt` (redovi 36149–37092), iako nije izdvojen
u poseban fajl niti naveden u starom manifestu. Njegove oznake u projektu prate
ustaljeno kasnije Diels–Kranzovo numerisanje `80 A/B/C`; lokalno prvo izdanje i
OCR imaju drukčiju brojku u naslovu odeljka. Za Protagoru resolver zato čita
neposredno taj raspon iz `band1.txt`.

## Pointeri

Resolver za `hermann-diels` uglavnom vodi na izdvojeni autorski `.txt` odeljak
kada u delu `B. FRAGMENTE` pronađe tekstualni presek sa poljem `originalText`.
Za Protagoru vodi na numerisani A, B ili C odeljak u `band1.txt`: broj je
pouzdaniji od tekstualnog sidra zato što OCR često lomi reči i meša grčko i
latiničko pismo. Objedinjeni validator proverava da lokalni fajl i red postoje.
Pointer služi navigaciji kroz OCR i nije potvrda kritičke pouzdanosti grčkog
teksta.

## Postupak za novi fragment

1. U izdvojenom odeljku pronaći Dielsovu oznaku i antički izvor.
2. Utvrditi da li je mesto `A` svedočanstvo ili `B` fragment.
3. Proveriti grčki tekst van OCR-a u pouzdanom izdanju.
4. Proveriti postoji li ista misao već u autorskom JSON-u preko drugog izvora.
5. Sačuvati kanonski `name: "hermann-diels"` i oznaku, na primer `B.17`.
6. Prevesti prema projektnom rečniku i pravilima, pa validirati podatke.

Prvi provereni Empedoklov paket povezan je na postojeće unose: B 1, B 2, B 6,
B 17, B 111, B 112, B 117 i B 129. Kao prvi novi unosi dodati su B 11–16,
B 25, B 29, B 52, B 55, B 118 i B 124, izuzev terminološki spornog B 8. Ovi
navodi služe kao kanonske oznake izdanja. Pointer nastaje samo kada resolver u
lokalnom Dielsovom odeljku pronađe dovoljno pouzdan tekstualni presek.
