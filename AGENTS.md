# Uputstvo za agente

Pre rada pročitaj `docs/INSTRUKCIJE.md`.

Zavisno od zadatka koristi:

* `docs/RECNIK.md` — glavni terminološki autoritet projekta
* `docs/GRAMATIKA.md` — gramatika i normativna pravila rekonstruisanog slovenskog jezika
* `docs/PREVODJENJE_NA_STAROSLOVENSKI.md` — pravila rekonstrukcije i staroslovenskog prevoda
* `docs/PREVODJENJE_NA_SRPSKI.md` — pravila srpskog prevoda
* `docs/KORPUS.md` — sastav i hijerarhija istorijskog korpusa
* `docs/PODELA_UNOSA.md` — podela i atomizacija unosa
* `docs/DELJENI_UNOSI.md` — unosi koji pripadaju više filozofa

## Osnovna pravila

`docs/RECNIK.md` je glavni autoritet za terminologiju.

Ako je termin već utvrđen u rečniku, koristi taj oblik. Ne menjaj ga samostalno na osnovu korpusa, Wiktionaryja ili drugih izvora. Ako postoji razlog za promenu termina, prvo treba promeniti odluku u rečniku.

Cilj staroslovenskog prevoda nije ograničavanje na reči neposredno potvrđene u sačuvanim spomenicima, već rekonstrukcija autentičnog i istorijski mogućeg slovenskog filozofskog jezika VIII veka.

Istorijska potvrđenost je prednost, ali nije uslov za upotrebu reči.

Kod istraživanja novih termina koristi naročito:

1. `docs/RECNIK.md` i već izgrađene porodice termina;
2. istorijski slovenski korpus opisan u `docs/KORPUS.md`;
3. Wiktionary — Proto-Slavic lemmas:
   https://en.wiktionary.org/wiki/Category:Proto-Slavic_lemmas
4. praslovenske korene, rekonstruisane oblike i etimologiju;
5. istorijski moguće slovenske tvorbene obrasce;
6. kasnije slovenske jezike i izvore kao pomoćni komparativni materijal.

Rekonstruisana praslovenska reč ili koren predstavlja važnu pozitivnu evidenciju čak i kada odgovarajući oblik nije neposredno potvrđen u staroslovenskom korpusu.

Odsustvo reči iz sačuvanog korpusa ne znači da je ona istorijski nemoguća.

Pri rekonstrukciji novog termina proveri:

* da li postoji odgovarajući praslovenski koren;
* njegovo osnovno i izvedeno značenje;
* porodicu srodnih slovenskih reči;
* istorijske tvorbene obrasce;
* fonološku i morfološku mogućnost oblika;
* analogne oblike u istorijskom korpusu;
* uklapanje u terminološki sistem `docs/RECNIK.md`.

Prednost ima rešenje koje je slovensko, istorijski moguće, semantički precizno i sistemski povezano sa ostalim terminima projekta.

Čuvaj porodice reči: isti grčki koren treba, gde značenje dopušta, predstavljati istim slovenskim korenom.

Korpus koristi za proveru stvarne istorijske upotrebe, morfologije, sintakse, značenja, tvorbenih obrazaca i autentičnosti jezika. Ne koristi ga kao zatvoren spisak dozvoljenih reči.

Ako tvrdiš da je određeni oblik istorijski potvrđen, potvrdi ga u korpusu ili drugom istorijskom izvoru. Jasno razlikuj:

* istorijski potvrđen oblik;
* rekonstruisan praslovenski oblik;
* projektnu rekonstrukciju.

Za gramatičke oblike i konstrukcije poštuj `docs/GRAMATIKA.md`. Ako gramatika još ne propisuje konkretan slučaj, istraži istorijski korpus i praslovenski sistem pre donošenja nove projektne norme.

Ne menjaj generisane fajlove ako postoji izvorni fajl iz kojeg se generišu.
