'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from './Sidebar';
import LanguageSwitcher from './LanguageSwitcher';
import { getTextForLanguage } from '../lib/data';
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

  return (
    <main className="page-shell">
      <Sidebar />
      <section className="content">
        <LanguageSwitcher currentLang={language} onChange={setLanguage} />
        <h2>{author}</h2>
        {authorMeta.src ? (
          <img className="author-portrait" src={authorMeta.src} alt={author} />
        ) : null}
        {authorQuotes.length === 0 ? (
          <p>Nema citata za ovog autora.</p>
        ) : (
          authorQuotes.map((entry) => (
            <div key={entry._id} className="quote-card">
              <p>{getTextForLanguage(entry, language)}</p>
              <Link href={`/quotes/${entry._id}`}>Otvori citat</Link>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
