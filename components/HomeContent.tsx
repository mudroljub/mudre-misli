'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from './Sidebar';
import LanguageSwitcher from './LanguageSwitcher';
import { getTextForLanguage } from '../lib/data';
import type { Language, QuoteWithId } from '../types/data';

interface HomeContentProps {
  featured: QuoteWithId;
}

export default function HomeContent({ featured }: HomeContentProps) {
  const [language, setLanguage] = useState<Language>('sl');

  return (
    <main className="page-shell">
      <Sidebar />
      <section className="content">
        <LanguageSwitcher currentLang={language} onChange={setLanguage} />
        <h2>Najnoviji citat</h2>
        <div className="quote-card">
          <p>{getTextForLanguage(featured, language)}</p>
          <p className="author-line">— {featured.author}</p>
          <Link href={`/quotes/${featured._id}`}>Detalji citata</Link>
        </div>
      </section>
    </main>
  );
}
