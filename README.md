# Mudre misli (мѫдрыѩ мысли)

🏛️ Домъ Мѫдрости въ Стариградѣ
🏛️ Училище Мѫдрости Стариградъ
🏛️ Училище Мѫдрости Блатьноградъ
🏛️ Училище Мѫдрости Блатьнограда

## Development

```
npm run dev
```

Production build:

```
npm run build
npm start
```

## TODO

- UI: različitim stilovima označi različite vrste unosa
- čistka (posebno Platon)
- proveriti previše rasečene i besmislene rečenice, koje su deo šire anegdote.
- proveriti sr prevode na osnovu rečnika
- dodaj tagove i stranice za tagove. klik na pojam u rečniku vodi ka upotrebi tog pojma.
- dodaj link ka vikipediji da bude knjiga pored imena filozofa
- prikaži godinu rođenja i smrti na strani autora
- dodaj 7 grčkih mudraca iz latinskog
- dodaj writing entryTypes, prikaži u UI kao zaseban odeljak na dnu. 

## Poboljšanje prevoda

1. Napravi precizan grčko → staroslovenski rečnik

* ne samo prevod, nego značenje i kontekst
* npr. λόγος kod Heraklita ≠ automatski samo „слово”

2. Dodaj napomene uz problematične termine

* dozvoljeni prevodi
* zabranjeni prevodi
* razlika između filozofskog i biblijskog značenja

Primer:

```
νοῦς
→ умъ
ne koristiti: разумъ
napomena: misaona moć, intelekt
```

3. Odvoji slojeve jezika

* staroslovenski (9–10. vek)
* kasniji crkvenoslovenski
* moderni srpski

Ne dozvoliti da kasniji oblici uđu automatski.

4. Koristi Bibliju za stil i gramatiku, ne za filozofsku terminologiju

* Biblija daje prirodan staroslovenski izraz
* filozofi zahtevaju poseban rečnik

5. Napravi mali skup uzornih prevoda

* 100–500 najboljih primera
* grčki original + tvoj idealni staroslovenski prevod
* model mnogo bolje imitira konkretan stil

6. Radi prevod u dva prolaza
   Prvo:

* analiza grčkog
* značenje termina

Drugo:

* konačan staroslovenski prevod

7. Uvedi proveru konzistentnosti
   Isti grčki termin treba uglavnom isto prevoditi:

```
νοῦς → умъ
διάνοια → размꙑслъ
φύσις → єстьство
```

osim kada kontekst zahteva promenu.

8. Daj modelu jasna pravila epohe
   Na primer:

* koristi starije oblike
* izbegavaj kasnije crkvenoslovenske inovacije
* izbegavaj moderne naučne termine

9. Proveravaj morfologiju
   Posle prevoda proveriti:

* padeže
* glagolske oblike
* slaganje prideva i imenica
* upotrebu jerova

10. Ne trenirati model kao prvi korak
    Za tvoj slučaj je korisnije:

* dobar rečnik
* pravila
* primeri
* automatsko ubacivanje konteksta

## Izvori

Online izvori:
* https://eulogikon.org/affiliations/presocratic

Glavni antički izvori za predsokratovce, pored Diogena Laertija:

* **Aristotel** – naročito *Metafizika*, *Fizika*, *O duši*, *O nebu*. Jedan od najvažnijih izvora za Talesa, Anaksimandra, Anaksimena, Heraklita, Parmenida, Empedokla, Anaksagoru i atomiste.
* **Teofrast** – *Mišljenja prirodnih filozofa* (*Physikōn doxai*). Delo je izgubljeno, ali je mnogo materijala sačuvano kod kasnijih autora.
* **Platon** – rasute reference na Heraklita, Parmenida, Anaksagoru, Empedokla, Protagoru itd.; posebno *Teetet*, *Sofist*, *Parmenid* i *Fedon*.
* **Simplicije** – izuzetno važan jer u komentarima Aristotela **doslovno citira duže fragmente** Parmenida, Empedokla, Anaksimandra i drugih.
* **Sekst Empirik** – čuva važne fragmente Heraklita, Ksenofana, Parmenida, Demokrita i sofista.
* **Klement Aleksandrijski** – *Stromata*; veliki broj citata ranih grčkih filozofa.
* **Hipolit Rimski** – *Pobijanje svih jeresi*; važan doksografski izvor.
* **Plutarh** – brojni citati i prikazi predsokratovskih učenja.
* **Aleksandar iz Afrodizijade** – komentari Aristotela, naročito važni za ranu prirodnu filozofiju.
* **Aetije (Pseudo-Plutarh)** – *Placita philosophorum*; sistematski pregled mišljenja filozofa.
* **Stobaj** – velika antologija koja je sačuvala fragmente inače izgubljenih dela.

Za **stvarne sačuvane reči predsokratovaca**, a ne samo kasnije prepričavanje, najvažniji su **Simplicije, Sekst Empirik, Klement i Stobaj**.

Standardna moderna zbirka je **Diels–Kranz, *Die Fragmente der Vorsokratiker***, koja upravo skuplja te izvore i deli ih na **A = svedočanstva** i **B = fragmente**.
