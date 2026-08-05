'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from './Sidebar';
import LanguageSwitcher from './LanguageSwitcher';
import { getTextForLanguage, getAuthorName } from '../lib/data';
import { getTranslation } from '../lib/translations';
import type { Language, EntryWithId } from '../types/data';

interface HomeContentProps {
  featured: EntryWithId;
}

export default function HomeContent({ featured }: HomeContentProps) {
  const [language, setLanguage] = useState<Language>('stsl');
  const t = getTranslation(language);

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <LanguageSwitcher currentLang={language} onChange={setLanguage} />
        <h2>{t.randomQuote}</h2>
        <div className="quote-card">
          <p>{getTextForLanguage(featured, language)}</p>
          <p className="author-line">— {getAuthorName(featured.author, language)}</p>
          <Link href={`/quotes/${featured._id}`}>{t.quoteDetails}</Link>
        </div>
      </section>
    </main>
  );
}
