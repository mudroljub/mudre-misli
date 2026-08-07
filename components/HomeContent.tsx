'use client';

import Sidebar from './Sidebar';
import LanguageSwitcher from './LanguageSwitcher';
import { getTranslation } from '../lib/translations';
import type { Language, Entry } from '../types/data';
import QuoteCard from './QuoteCard';

interface HomeContentProps {
  featured: Entry;
  language: Language;
}

export default function HomeContent({ featured, language }: HomeContentProps) {
  const t = getTranslation(language);

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <LanguageSwitcher currentLang={language} />
        <h2>{t.randomQuote}</h2>
        <QuoteCard entry={featured} language={language} showAuthor />
      </section>
    </main>
  );
}
