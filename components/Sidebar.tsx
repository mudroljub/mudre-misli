import Link from 'next/link';
import { authors, authorsData, authorSlugs } from '../lib/data';
import { getTranslation } from '../lib/translations';
import type { Language } from '../types/data';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  language: Language;
}

export default function Sidebar({ language }: SidebarProps) {
  const t = getTranslation(language);

  return (
    <aside className={styles.sidebar}>
      <h1><Link href="/">{t.siteTitle}</Link></h1>
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
  );
}
