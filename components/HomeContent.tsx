'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTranslations } from '../lib/useTranslations';
import { quotesData } from '../lib/data';
import type { Language, Entry } from '../types/data';
import QuoteCard from './QuoteCard';

interface HomeContentProps {
  featured: Entry;
  language: Language;
}

export default function HomeContent({ featured, language }: HomeContentProps) {
  const { t } = useTranslations(language);
  const [randomQuote, setRandomQuote] = useState<Entry>(featured);

  useEffect(() => {
    // Randomize on client after hydration
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    setRandomQuote(quotesData[randomIndex]);
  }, []);

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
