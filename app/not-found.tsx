'use client';

import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { getTranslation } from '../lib/translations';

export default function NotFound() {
  const language = 'stsl';
  const t = getTranslation(language);

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <h1>{t.pageNotFound}</h1>
        <p>{t.pageNotFoundMessage}</p>
        <Link href="/stsl">{t.goHome}</Link>
      </section>
    </main>
  );
}
