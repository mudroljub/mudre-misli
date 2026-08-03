'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getTextForLanguage, authorSlugs } from '@/lib/data';

export default function QuotePageClient({ quote, authorMeta }) {
  const [lang, setLang] = useState('sl');

  return (
    <main className="page-shell">
      <Sidebar />
      <section className="content">
        <LanguageSwitcher currentLang={lang} onChange={setLang} />
        <div className="quote-card">
          {authorMeta.src ? <img src={authorMeta.src} alt={quote.author} /> : null}
          <h2>{quote.author}</h2>
          <p>{getTextForLanguage(quote, lang)}</p>
          <p className="source-line">Source: {quote.source || '—'}</p>
          <Link href={`/authors/${authorSlugs[quote.author] || quote.author}`}>Pogledaj sve citate ovog autora</Link>
        </div>
      </section>
    </main>
  );
}
