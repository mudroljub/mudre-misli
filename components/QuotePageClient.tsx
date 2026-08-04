'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from './Sidebar';
import LanguageSwitcher from './LanguageSwitcher';
import { getTextForLanguage, authorSlugs } from '../lib/data';
import { getTranslation } from '../lib/translations';
import type { AuthorMetadata, Language, QuoteWithId } from '../types/data';

interface QuotePageClientProps {
  quote: QuoteWithId;
  authorMeta?: AuthorMetadata;
}

export default function QuotePageClient({ quote, authorMeta }: QuotePageClientProps) {
  const [language, setLanguage] = useState<Language>('stsl');
  const t = getTranslation(language);

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <LanguageSwitcher currentLang={language} onChange={setLanguage} />
        <div className="quote-card">
          {authorMeta?.src ? <img src={authorMeta.src} alt={quote.author} /> : null}
          <h2>{quote.author}</h2>
          <p>{getTextForLanguage(quote, language)}</p>
          <p className="source-line">{t.source}: {quote.source || '—'}</p>
          <Link href={`/authors/${authorSlugs[quote.author] ?? quote.author}`}>
            {t.viewAllQuotes}
          </Link>
        </div>
      </section>
    </main>
  );
}
