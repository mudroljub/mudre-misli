import quotes from '../data/quotes.json';
import type { EntriesByLanguage, Entry } from '../types/data';

const quotesData: Entry[] = quotes as Entry[];

const quotesByLanguage: EntriesByLanguage = {
  sr: quotesData.filter((entry) => entry.sr),
  stsl: quotesData.filter((entry) => entry.stsl),
};

export { quotesData, quotesByLanguage };
