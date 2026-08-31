# Suda

**Grč.** Σοῦδα  
**Izdanje** Ada Adler, *Suidae lexicon*, tomovi 1–4 (1928–1935)

## Lokalni izvor

- tekst: `suda/suda.tei-grc.xml`
- CTS metapodaci: `suda/cts-metadata.xml`
- manifest: `suda/manifest.json`
- CTS: `urn:cts:greekLit:tlg9010.tlg001.1st1K-grc1`

TEI sadrži 24.078 odeljaka. Ovo nije linearna knjiga života, nego azbučni
leksikon u kojem se biografski članci biraju po lemi.

## Struktura XML-a

1. tom: poglavlja `pr`, `A`, `B`, `Γ` — 5.834 odeljka  
2. tom: poglavlja `Δ`, `Aι`, `E` — 4.955 odeljaka  
3. tom: poglavlja `Κ`, `Λ`, `Μ`, `Ν`, `Ξ`, `Ο255`, `Ω` — 7.322 odeljka  
4. tom: poglavlja `Π`, `Ρ`, `Σ`, `Τ` — 5.967 odeljaka

Pokazivač ima oblik `tom.poglavlje.odeljak`. Pre uvođenja nekog života u
projekat treba potvrditi da je odeljak zaista biografski, jer isto ime može
imati više leksikonskih članaka.

## Mašinski indeksi

Komanda `npm run build:source:suda` generiše tri sloja:

- `suda/entries-index.json` — svih 24.078 lema sa pokazivačem i snimkom teksta;
- `suda/biography-candidates.json` — automatski izdvojeni mogući biografski članci;
- `suda/lives-index.json` — ručno potvrđeni članci o ličnostima koje već postoje
  u projektu.

Za svaki potvrđeni članak alat pravi i pun, čitljiv grčki snimak u
`suda/lives/`; veze iz centralnog kataloga vode neposredno na te fajlove.

Centralni katalog koristi isključivo `lives-index.json`. Kandidati nisu
proglašeni biografijama dok njihov identitet i sadržaj nisu potvrđeni.
