'use client';

import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { getTranslation } from '../lib/translations';

export default function NotFound() {
  const language = 'stsl';
  const t = getTranslation(language);

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <LanguageSwitcher currentLang={language} />
        <h1>{t.pageNotFound}</h1>
        <p>{t.pageNotFoundMessage}</p>
        <Link href="/stsl">{t.goHome}</Link>
      </section>
    </main>
  );
}
