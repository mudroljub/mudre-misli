'use client';

import { useState, useEffect, useRef } from 'react';
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
const LANGUAGE_SWITCH_TARGET_KEY = 'mudre-misli:language-switch-target';

export default function HomeContent({ quotePool, language }: HomeContentProps) {
  const { t } = useTranslations(language);
  const [randomQuote, setRandomQuote] = useState<QuoteCardEntry | null>(null);
  const hasSelectedQuote = useRef(false);

  useEffect(() => {
    const languageSwitchTarget = sessionStorage.getItem(LANGUAGE_SWITCH_TARGET_KEY);
    const arrivedViaLanguageSwitch = Boolean(
      languageSwitchTarget && window.location.pathname.endsWith(languageSwitchTarget),
    );

    if (arrivedViaLanguageSwitch) {
      sessionStorage.removeItem(LANGUAGE_SWITCH_TARGET_KEY);
    }

    if (hasSelectedQuote.current) return;
    hasSelectedQuote.current = true;

    const storedId = sessionStorage.getItem(HOME_QUOTE_STORAGE_KEY);
    const storedQuote = quotePool.find((quote) => quote.id === storedId);

    if (storedQuote && arrivedViaLanguageSwitch) {
      setRandomQuote(storedQuote);
      return;
    }

    // Ignore the stored quote except when the language switcher requested it.
    const candidates = storedQuote && quotePool.length > 1
      ? quotePool.filter((quote) => quote.id !== storedQuote.id)
      : quotePool;
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const nextQuote = candidates[randomIndex];
    setRandomQuote(nextQuote);
    sessionStorage.setItem(HOME_QUOTE_STORAGE_KEY, nextQuote.id);
  }, [language, quotePool]);

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <h2>{t.randomQuote}</h2>
        {randomQuote && (
          <QuoteCard entry={randomQuote} language={language} showAuthor showAuthorImage />
        )}
      </section>
    </main>
  );
}
