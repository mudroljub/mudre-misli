'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from './Sidebar';
import LanguageSwitcher from './LanguageSwitcher';
import { getTextForLanguage, getAuthorName } from '../lib/data';
import { getTranslation } from '../lib/translations';
import type { AuthorData, Language, Entry } from '../types/data';

interface AuthorPageClientProps {
  author: string;
  authorMeta: AuthorData;
  authorQuotes: Entry[];
}

export default function AuthorPageClient({
  author,
  authorMeta,
  authorQuotes,
}: AuthorPageClientProps) {
  const [language, setLanguage] = useState<Language>('stsl');
  const t = getTranslation(language);
  const authorName = getAuthorName(author, language);

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <LanguageSwitcher currentLang={language} onChange={setLanguage} />
        <h2>{authorName}</h2>
        {authorMeta.src ? (
          <img className="author-portrait" src={authorMeta.src} alt={authorName} />
        ) : null}
        {authorQuotes.length === 0 ? (
          <p>{t.noQuotesForAuthor}</p>
        ) : (() => {
          const quotesSection = authorQuotes.filter((e) => e.type === 'quote' || e.type === 'reported');
          const anecdotesSection = authorQuotes.filter((e) => e.type === 'anecdote' || e.type === 'bio');
          return (
            <>
              {anecdotesSection.length > 0 && (
                <section>
                  <h3>{t.sectionAnecdotes}</h3>
                  {anecdotesSection.map((entry) => (
                    <div key={entry._id} className="quote-card">
                      <p>{getTextForLanguage(entry, language)}</p>
                      <Link href={`/quotes/${entry._id}`}>{t.openQuote}</Link>
                    </div>
                  ))}
                </section>
              )}
              {quotesSection.length > 0 && (
                <section>
                  <h3>{t.sectionQuotes}</h3>
                  {quotesSection.map((entry) => (
                    <div key={entry._id} className="quote-card">
                      <p>{getTextForLanguage(entry, language)}</p>
                      <Link href={`/quotes/${entry._id}`}>{t.openQuote}</Link>
                    </div>
                  ))}
                </section>
              )}
            </>
          );
        })()}
      </section>
    </main>
  );
}
