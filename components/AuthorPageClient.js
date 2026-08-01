'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getTextForLanguage } from '@/lib/data';

export default function AuthorPageClient({ author, authorMeta, authorQuotes }) {
  const [lang, setLang] = useState('sr');

  return (
    <main className="page-shell">
      <Sidebar />
      <section className="content">
        <LanguageSwitcher currentLang={lang} onChange={setLang} />
        <h2>{author}</h2>
        {authorMeta.src ? <img src={authorMeta.src} alt={author} /> : null}
        {authorQuotes.length === 0 ? (
          <p>Nema citata za ovog autora.</p>
        ) : (
          authorQuotes.map((quote) => (
            <div key={quote._id} className="quote-card">
              <p>{getTextForLanguage(quote, lang)}</p>
              <Link href={`/quotes/${quote._id}`}>Otvori citat</Link>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
