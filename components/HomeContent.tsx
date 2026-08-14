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

export default function HomeContent({ quotePool, language }: HomeContentProps) {
  const { t } = useTranslations(language);
  const [randomQuote, setRandomQuote] = useState<QuoteCardEntry>(quotePool[0]);

  useEffect(() => {
    // Randomize on client after hydration
    const randomIndex = Math.floor(Math.random() * quotePool.length);
    setRandomQuote(quotePool[randomIndex]);
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
