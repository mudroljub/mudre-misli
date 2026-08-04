'use client';

import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { getTranslation } from '../lib/translations';
import type { Language } from '../types/data';

export default function NotFound() {
  const [language, setLanguage] = useState<Language>('stsl');
  const t = getTranslation(language);

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <LanguageSwitcher currentLang={language} onChange={setLanguage} />
        <h1>{t.pageNotFound}</h1>
        <p>{t.pageNotFoundMessage}</p>
        <Link href="/">{t.returnHome}</Link>
      </section>
    </main>
  );
}
