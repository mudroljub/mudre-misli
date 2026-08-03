'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getTextForLanguage } from '@/lib/data';

export default function HomeContent({ featured }) {
  const [lang, setLang] = useState('sl');

  return (
    <main className="page-shell">
      <Sidebar />
      <section className="content">
        <LanguageSwitcher currentLang={lang} onChange={setLang} />
        <h2>Najnoviji citat</h2>
        <div className="quote-card">
          <p>{getTextForLanguage(featured, lang)}</p>
          <p className="author-line">— {featured.author}</p>
          <Link href={`/quotes/${featured._id}`}>Detalji citata</Link>
        </div>
      </section>
    </main>
  );
}
