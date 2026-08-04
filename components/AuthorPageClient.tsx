'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from './Sidebar';
import LanguageSwitcher from './LanguageSwitcher';
import { getTextForLanguage } from '../lib/data';
import { getTranslation } from '../lib/translations';
import type { AuthorMetadata, Language, QuoteWithId } from '../types/data';

interface AuthorPageClientProps {
  author: string;
  authorMeta: AuthorMetadata;
  authorQuotes: QuoteWithId[];
}

export default function AuthorPageClient({
  author,
  authorMeta,
  authorQuotes,
}: AuthorPageClientProps) {
  const [language, setLanguage] = useState<Language>('stsl');
  const t = getTranslation(language);

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <LanguageSwitcher currentLang={language} onChange={setLanguage} />
        <h2>{author}</h2>
        {authorMeta.src ? (
          <img className="author-portrait" src={authorMeta.src} alt={author} />
        ) : null}
        {authorQuotes.length === 0 ? (
          <p>{t.noQuotesForAuthor}</p>
        ) : (
          authorQuotes.map((entry) => (
            <div key={entry._id} className="quote-card">
              <p>{getTextForLanguage(entry, language)}</p>
              <Link href={`/quotes/${entry._id}`}>{t.openQuote}</Link>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
