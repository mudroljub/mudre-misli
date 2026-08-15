'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTranslations } from '../utils/useTranslations';
import type { Language } from '../types/data';
import QuoteCard, { type QuoteCardEntry } from './QuoteCard';

interface HomeContentProps {
  quotePool: QuoteCardEntry[];
  language: Language;
}

const HOME_QUOTE_STORAGE_KEY = 'mudre-misli:home-quote-id';

export default function HomeContent({ quotePool, language }: HomeContentProps) {
  const { t } = useTranslations(language);
  const [randomQuote, setRandomQuote] = useState<QuoteCardEntry>(quotePool[0]);

  useEffect(() => {
    const storedId = sessionStorage.getItem(HOME_QUOTE_STORAGE_KEY);
    const storedQuote = quotePool.find((quote) => quote.id === storedId);

    if (storedQuote) {
      setRandomQuote(storedQuote);
      return;
    }

    // Choose once per browser tab so changing the language keeps the quote.
    const randomIndex = Math.floor(Math.random() * quotePool.length);
    const nextQuote = quotePool[randomIndex];
    setRandomQuote(nextQuote);
    sessionStorage.setItem(HOME_QUOTE_STORAGE_KEY, nextQuote.id);
  }, [quotePool]);

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <h2>{t.randomQuote}</h2>
        <QuoteCard entry={randomQuote} language={language} showAuthor />
      </section>
    </main>
  );
}
