import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const quotesDir = path.join(rootDir, 'data', 'quotes')
const generatedQuotesFile = path.join(rootDir, 'data', 'quotes.json')
const dictionaryFile = path.join(rootDir, 'docs', 'RECNIK.md')
const shouldWrite = process.argv.includes('--write')
const shouldRefresh = process.argv.includes('--refresh')

const translationPatterns = {
  sr: {
    'ἀγαθόν': /\p{L}*(?:dobar|dobra|dobre|dobri|dobara|blag)\p{L}*/iu,
    'ἀΐδιος': /\p{L}*več\p{L}*/iu,
    'ἀνάγκη': /\p{L}*(?:nužn|morati|mora|potreb)\p{L}*/iu,
    'ἄπειρον': /\p{L}*(?:beskonač|bezgranič|bezbroj)\p{L}*/iu,
    'ἀρχή': /\p{L}*(?:počel|počet|počinj|isprva|vlast|vladajuć)\p{L}*/iu,
    'γένεσις': /\p{L}*(?:nastan|bivanj|rađ)\p{L}*/iu,
    'γίγνομαι': /\p{L}*(?:nasta|posta|rađa|rodi|biva|zbiva|događa|dolazi|pristane|našao)\p{L}*|(?<!\p{L})(?:je|su|bio|bila|bilo|biti|bude|budu|beše|beh)(?!\p{L})/iu,
    'γνώμη': /\p{L}*(?:znanj|spoznaj|rasuđ|mišljen|misao|navik|slav|odvažnost)\p{L}*/iu,
    'γνῶσις': /\p{L}*poznanj\p{L}*/iu,
    'δίκη': /\p{L}*(?:spor|parnic|tuž|osud|poput)\p{L}*/iu,
    'δόξα': /\p{L}*(?:slav|taštin|ugled|mnjenj|mišljen|uverenj)\p{L}*/iu,
    'εἶδος': /\p{L}*(?:oblik|izgled|način)\p{L}*/iu,
    'ἐπιστήμη': /\p{L}*znanj\p{L}*/iu,
    'εὐδαιμονία': /\p{L}*blažen\p{L}*/iu,
    'ζεύς': /\p{L}*(?:vazduh|zeus)\p{L}*/iu,
    'ἦθος': /\p{L}*(?:strast|karakter|ironič)\p{L}*/iu,
    'θεός': /\p{L}*bož\p{L}*/iu,
    'θεωρία': /\p{L}*(?:posmatr|prouč|istraž)\p{L}*/iu,
    'ἰδέα': /\p{L}*(?:oblik|oblic|vid)\p{L}*/iu,
    'κακόν': /\p{L}*(?:zl|zal|loš|rđav|pogrešn|man|ružn|nevolj)\p{L}*/iu,
    'καλόν': /\p{L}*(?:lep|dobr|miris|plemenit|kras)\p{L}*/iu,
    'κενόν': /\p{L}*prazn\p{L}*/iu,
    'κόσμος': /\p{L}*(?:mir|ukras)\p{L}*/iu,
    'λόγος': /\p{L}*(?:reč|govor|kaziv|kaza|iskaz|razlog|odnos|rasuđ|tvrdnj|besed|odgovor|učenj|nauk|naziv|zvuk|prekor)\p{L}*/iu,
    'μανία': /\p{L}*(?:ludil|pomam)\p{L}*/iu,
    'μέτρον': /\p{L}*izmer\p{L}*/iu,
    'μὴ ὄν': /\p{L}*(?:nebić|nije|ne\s+biti|bez\s+zakona)\p{L}*/iu,
    'νόημα': /\p{L}*(?:poimanj|misao)\p{L}*/iu,
    'νόμος': /\p{L}*(?:običaj|dvosmislenost)\p{L}*/iu,
    'νοῦς': /\p{L}*pamet\p{L}*/iu,
    'οἶδα': /\p{L}*(?:ume|zna|vidim)\p{L}*/iu,
    'οὐσία': /\p{L}*(?:imanj|prirod)\p{L}*/iu,
    'πάθος': /\p{L}*trpljenj\p{L}*/iu,
    'παιδεία': /\p{L}*(?:obrazovanj|učenj)\p{L}*/iu,
    'πνεῦμα': /\p{L}*vetr\p{L}*/iu,
    'πῦρ': /\p{L}*(?:ognj|sličnost)\p{L}*/iu,
    'σοφία': /\p{L}*(?:mudar|mudro)\p{L}*/iu,
    'στοιχεῖον': /\p{L}*počel\p{L}*/iu,
    'σχῆμα': /\p{L}*(?:oblik|lik|valj|lopt|držanj)\p{L}*/iu,
    'τὰ ὄντα': /\p{L}*postoj\p{L}*/iu,
    'τέλος': /\p{L}*(?:cilj|kraj|konac|krajnj|svršetak)\p{L}*/iu,
    'τέχνη': /\p{L}*(?:umeć|umenj)\p{L}*/iu,
    'τύχη': /\p{L}*(?:sreć|sudbin)\p{L}*/iu,
    'ὕδωρ': /\p{L}*kiš\p{L}*/iu,
    'φθορά': /\p{L}*(?:propast|razaranj|opada)\p{L}*/iu,
    'φιλία': /\p{L}*(?:ljubav|družb)\p{L}*/iu,
    'φιλοσοφία': /\p{L}*(?:filosof|filozof|učenj|škol)\p{L}*/iu,
    'φρόνησις': /\p{L}*mudrost\p{L}*/iu,
    'φύσις': /\p{L}*(?:prirod|smrtn|teles|tel)\p{L}*/iu,
    'χρόνος': /\p{L}*(?:dugo|kratko|život|uvek|nekada|doveka)\p{L}*/iu,
    'ψυχή': /\p{L}*(?:um|smrtnik)\p{L}*/iu,
  },
  stsl: {
    'θάνατος': /\p{L}*съмрьт\p{L}*/iu,
    'ἀγαθόν': /\p{L}*(?:благ|добр)\p{L}*/iu,
    'ἀλήθεια': /\p{L}*(?:истин|істин)\p{L}*/iu,
    'ἀήρ': /\p{L}*(?:въздѹс|небєсь)\p{L}*/iu,
    'ἀρετή': /\p{L}*добродѣт\p{L}*/iu,
    'ἄπειρον': /\p{L}*бесъ?кра\p{L}*/iu,
    'ἀρχή': /\p{L}*(?:начѧл|начал|начьн|начина|прьвѣе|искони)\p{L}*/iu,
    'γένεσις': /\p{L}*(?:ражд|рожден|бꙑван|бытиꙗ|родить)\p{L}*/iu,
    'γίγνομαι': /\p{L}*(?:бꙑва|быва|бꙑст|бꙑт|бых|род|ражда|поста|наста|подобѧ)\p{L}*|(?<!\p{L})(?:єсть|сѫть|быти|бꙑти|бѣ|быстъ|бѫдеть|бѫдѫть)(?!\p{L})/iu,
    'γνώμη': /\p{L}*(?:знан|разсѫжд|слав|мьнѣн|обыч)\p{L}*/iu,
    'γνῶσις': /\p{L}*познан\p{L}*/iu,
    'δίκη': /\p{L}*(?:сѫд|тѧж|подоб|правд|правь|рѣк)\p{L}*/iu,
    'δόξα': /\p{L}*(?:слав|тъшт|мьнѣн|вѣр)\p{L}*/iu,
    'εἶδος': /\p{L}*(?:образ|вид|подоб)\p{L}*/iu,
    'ἐπιστήμη': /\p{L}*(?:знан|вѣдѣн)\p{L}*/iu,
    'ἔρως': /\p{L}*люб\p{L}*/iu,
    'εὐδαιμονία': /\p{L}*блаженьств\p{L}*/iu,
    'ζεύς': /\p{L}*(?:Зевс|Ꙁевс|Діꙗ|Дии|неб|въздѹх)\p{L}*/iu,
    'ἦθος': /\p{L}*(?:страст|обыча|посмѣв)\p{L}*/iu,
    'θεός': /\p{L}*(?:бож|боз)\p{L}*/iu,
    'θεωρία': /\p{L}*(?:съзерц|испыт|зрѣн|видов)\p{L}*/iu,
    'ἰδέα': /\p{L}*(?:образ|вид)\p{L}*/iu,
    'κακόν': /\p{L}*(?:зъл|зол|зл|погрѣш|порок|грѫб|бѣд)\p{L}*/iu,
    'καλόν': /\p{L}*(?:добр|люб|благоѹх|лѣп)\p{L}*/iu,
    'κενόν': /\p{L}*празн\p{L}*/iu,
    'κόσμος': /\p{L}*(?:мир|ѹкрас)\p{L}*/iu,
    'λόγος': /\p{L}*(?:реч|глагол|глас|изреч|разсѫжд|повѣст|отъвѣщ|ѹчен|хѹл)\p{L}*/iu,
    'μανία': /\p{L}*(?:безѹм|неистов)\p{L}*/iu,
    'μέτρον': /\p{L}*измѣр\p{L}*/iu,
    'μὴ ὄν': /(?:не\s+сѫ[щш]\p{L}*|не\s+быти|нѣсть|безъ\s+закон)/iu,
    'νόημα': /\p{L}*мꙑсл\p{L}*/iu,
    'νόμος': /\p{L}*(?:обыча|ꙁакон|закон)\p{L}*/iu,
    'νοῦς': /\p{L}*(?:ѹм|ум|разѹм)\p{L}*/iu,
    'οἶδα': /\p{L}*(?:вѣд|вѣм|вѣст|зна|ꙁна|вижд|ѹмѣ)\p{L}*/iu,
    'οὐσία': /\p{L}*(?:имѣн|имовин|мовин|природ|твар|вещ|сѫштьств)\p{L}*/iu,
    'παιδεία': /\p{L}*(?:образован|оврꙁован|наказан|ѹчен)\p{L}*/iu,
    'πνεῦμα': /\p{L}*(?:вѣтр|ветр|дыхан|небєсь)\p{L}*/iu,
    'πολιτεία': /\p{L}*(?:градьск|мир|дрьжав)\p{L}*/iu,
    'πῦρ': /\p{L}*(?:огн|подоби)\p{L}*/iu,
    'στοιχεῖον': /\p{L}*начѧл\p{L}*/iu,
    'σχῆμα': /\p{L}*(?:подоб|вид|облик)\p{L}*/iu,
    'τὰ ὄντα': /\p{L}*сѫ[щш]т?\p{L}*/iu,
    'τέλος': /\p{L}*(?:цѣль|коньц|конц|наконец|съврьх)\p{L}*/iu,
    'τέχνη': /\p{L}*(?:ѹмѣн|умѣн|хѫдож|хитрост|вѣшт)\p{L}*/iu,
    'τὸ ὄν': /\p{L}*сѫщ\p{L}*/iu,
    'τύχη': /\p{L}*(?:сѫдьб|слѹча|приклѹч|ѹчаст)\p{L}*/iu,
    'ὕδωρ': /\p{L}*дъжд\p{L}*/iu,
    'φαινόμενον': /\p{L}*ꙗвл\p{L}*/iu,
    'φθορά': /\p{L}*(?:тлѣ|пагѹб|погꙑб|погиб|разорен)\p{L}*/iu,
    'φιλία': /\p{L}*(?:люб|друж)\p{L}*/iu,
    'φιλοσοφία': /\p{L}*(?:философ|ѹчен|ѹчилищ)\p{L}*/iu,
    'φρόνησις': /\p{L}*мѫдр\p{L}*/iu,
    'φύσις': /\p{L}*(?:єстество|єстьство|естьство|естеств|природ|смрьтн|земьн|тѣлес)\p{L}*/iu,
    'χρόνος': /\p{L}*(?:длъго|жити|присно|нѣкогда|лѣт)\p{L}*/iu,
    'ψυχή': /\p{L}*(?:ѹм|смрьтън)\p{L}*/iu,
  },
}

const parseDictionaryTerms = value => Array.from(new Set(
  value
    .replace(/\((?:alt[.:]?\s*)?([^)]*)\)/giu, ',$1')
    .split(',')
    .map(term => term
      .replace(/^\s*\d+\.\s*/u, '')
      .replace(/^\s*alt[.:]?\s*/iu, '')
      .trim())
    .filter(Boolean),
))

const normalizeWord = value => value.toLocaleLowerCase().replace(/[^\p{L}]/gu, '')

const commonPrefixLength = (left, right) => {
  let index = 0
  while (index < left.length && index < right.length && left[index] === right[index]) index += 1
  return index
}

const expandToWordBoundaries = (text, start, end) => {
  while (start > 0 && /\p{L}/u.test(text[start - 1])) start -= 1
  while (end < text.length && /\p{L}/u.test(text[end])) end += 1
  return text.slice(start, end)
}

const findTranslatedTerm = (text, dictionaryValue, language, tag) => {
  const terms = parseDictionaryTerms(dictionaryValue).sort((left, right) => right.length - left.length)
  const normalizedText = text.toLocaleLowerCase()

  for (const term of terms) {
    const start = normalizedText.indexOf(term.toLocaleLowerCase())
    if (start !== -1) return expandToWordBoundaries(text, start, start + term.length)
  }

  const words = [...text.matchAll(/\p{L}+/gu)].map(match => match[0])
  for (const term of terms) {
    for (const termWord of term.split(/\s+/u)) {
      const normalizedTerm = normalizeWord(termWord)
      for (const word of words) {
        const normalizedCandidate = normalizeWord(word)
        const prefixLength = commonPrefixLength(normalizedTerm, normalizedCandidate)
        const shorterLength = Math.min(normalizedTerm.length, normalizedCandidate.length)

        if (prefixLength >= 3 && prefixLength / shorterLength >= 0.75) return word
      }
    }
  }

  const contextualPattern = translationPatterns[language]?.[tag]
  const contextualMatch = contextualPattern?.exec(text)
  if (contextualMatch) {
    return expandToWordBoundaries(
      text,
      contextualMatch.index,
      contextualMatch.index + contextualMatch[0].length,
    )
  }

  return null
}

const dictionaryContent = await fs.readFile(dictionaryFile, 'utf8')
const dictionaryRows = dictionaryContent
  .replace(/<!--[\s\S]*?-->/gu, '')
  .split(/\r?\n/u)
  .filter(line => line.trim().startsWith('|'))
  .slice(2)
  .map(line => line.split('|').slice(1, -1).map(column => column.trim()))
  .filter(columns => columns.length >= 3)

const dictionary = new Map(dictionaryRows.map(([greek, stsl, sr]) => [greek, { stsl, sr }]))
const generatedQuotes = JSON.parse(await fs.readFile(generatedQuotesFile, 'utf8'))
const tagsById = new Map(generatedQuotes.map(entry => [entry.id, entry.tags ?? []]))
const missing = { sr: new Map(), stsl: new Map() }
const coverage = { sr: { total: 0, annotated: 0 }, stsl: { total: 0, annotated: 0 } }
const files = (await fs.readdir(quotesDir)).filter(file => file.endsWith('.json')).sort()

for (const file of files) {
  const filePath = path.join(quotesDir, file)
  const entries = JSON.parse(await fs.readFile(filePath, 'utf8'))
  let changed = false

  for (const entry of entries) {
    const tags = tagsById.get(entry.id) ?? []
    if (tags.length === 0) continue

    const termAnnotations = { ...(entry.termAnnotations ?? {}) }

    for (const language of ['sr', 'stsl']) {
      const existing = shouldRefresh ? [] : [...(termAnnotations[language] ?? [])]
      if (shouldRefresh && (termAnnotations[language]?.length ?? 0) > 0) changed = true

      for (const tag of tags) {
        coverage[language].total += 1
        if (existing.some(annotation => annotation.tag === tag)) {
          coverage[language].annotated += 1
          continue
        }

        const dictionaryEntry = dictionary.get(tag)
        const translatedTerm = dictionaryEntry
          ? findTranslatedTerm(entry[language], dictionaryEntry[language], language, tag)
          : null

        if (translatedTerm) {
          existing.push({ tag, text: translatedTerm })
          coverage[language].annotated += 1
          changed = true
        } else {
          const tagMissing = missing[language].get(tag) ?? []
          tagMissing.push({ id: entry.id, text: entry[language] })
          missing[language].set(tag, tagMissing)
        }
      }

      if (existing.length > 0) termAnnotations[language] = existing
    }

    if (Object.keys(termAnnotations).length > 0) entry.termAnnotations = termAnnotations
  }

  if (shouldWrite && changed) {
    await fs.writeFile(filePath, `${JSON.stringify(entries, null, 2)}\n`, 'utf8')
  }
}

for (const language of ['sr', 'stsl']) {
  const { total, annotated } = coverage[language]
  console.log(`${language}: ${annotated}/${total} annotated; ${total - annotated} missing`)
  for (const [tag, entries] of missing[language]) {
    console.log(`  ${tag}: ${entries.length}`)
    if (process.argv.includes('--details')) {
      for (const entry of entries) console.log(`    ${entry.id}: ${entry.text}`)
    }
  }
}

if (!shouldWrite) console.log('Dry run only; pass --write to update source files.')
