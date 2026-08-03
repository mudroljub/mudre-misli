'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from './Sidebar';
import LanguageSwitcher from './LanguageSwitcher';
import { getTextForLanguage, authorSlugs } from '../lib/data';
import type { AuthorMetadata, Language, QuoteWithId } from '../types/data';

interface QuotePageClientProps {
  quote: QuoteWithId;
  authorMeta?: AuthorMetadata;
}

export default function QuotePageClient({ quote, authorMeta }: QuotePageClientProps) {
  const [language, setLanguage] = useState<Language>('sl');

  return (
    <main className="page-shell">
      <Sidebar />
      <section className="content">
        <LanguageSwitcher currentLang={language} onChange={setLanguage} />
        <div className="quote-card">
          {authorMeta?.src ? <img src={authorMeta.src} alt={quote.author} /> : null}
          <h2>{quote.author}</h2>
          <p>{getTextForLanguage(quote, language)}</p>
          <p className="source-line">Source: {quote.source || '—'}</p>
          <Link href={`/authors/${authorSlugs[quote.author] ?? quote.author}`}>
            Pogledaj sve citate ovog autora
          </Link>
        </div>
      </section>
    </main>
  );
}
