'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authors, authorsData, authorSlugs } from '../lib/data';
import { getTranslation } from '../lib/translations';
import type { Language } from '../types/data';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  language: Language;
}

export default function Sidebar({ language }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const t = getTranslation(language);

  return (
    <>
      <button
        className={styles.toggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Zatvori meni' : 'Otvori meni'}
      >
        {isOpen ? '×' : '☰'}
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <h2><Link href="/">{t.siteTitle}</Link></h2>
        <nav>
          {authors.map((author) => {
            const metadata = authorsData[author];
            const slug = authorSlugs[author];
            const displayName = metadata[language] || author;

            return (
              <Link key={author} href={`/authors/${slug}`} className={styles.author}>
                {metadata.src ? <img src={metadata.src} alt={displayName} /> : null}
                <span>{displayName}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
