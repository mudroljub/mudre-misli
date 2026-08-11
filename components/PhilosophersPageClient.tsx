'use client';

import Link from 'next/link';
import Sidebar from './Sidebar';
import Header from './Header';
import { authorsData, authorSlugs } from '../utils/data';
import { authorGroups } from '../utils/authorGroups';
import { useTranslations } from '../utils/useTranslations';
import type { Language } from '../types/data';
import styles from './PhilosophersPageClient.module.scss';

interface PhilosophersPageClientProps {
  language: Language;
}

export default function PhilosophersPageClient({ language }: PhilosophersPageClientProps) {
  const { t, transliterate } = useTranslations(language);

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <h2>{t.navPhilosophers}</h2>

        <div className={styles.groups}>
          {authorGroups.map((group) => {
            const groupKey = `${group.titleKey}-${group.period}`;
            const groupTitle = (t.sidebarGroups as any)[group.titleKey] || group.title;

            return (
              <div key={groupKey} className={styles.group}>
                <h3>{groupTitle}</h3>

                {group.subgroups ? (
                  <div className={styles.subgroups}>
                    {group.subgroups.map((subgroup) => {
                      const subgroupTitle = (t.sidebarSubgroups as any)[subgroup.titleKey] || subgroup.title;
                      return (
                        <div key={subgroup.titleKey} className={styles.subgroup}>
                          <h4>{subgroupTitle}</h4>
                          <div className={styles.authors}>
                            {subgroup.authors.map((authorKey) => {
                              const metadata = authorsData[authorKey];
                              if (!metadata) return null;

                              const slug = authorSlugs[authorKey];
                              const displayName = transliterate(t.philosophers[authorKey as keyof typeof t.philosophers] || authorKey);

                              return (
                                <Link
                                  key={authorKey}
                                  href={`/${language}/authors/${slug}`}
                                  className={styles.authorCard}
                                >
                                  {metadata.src ? (
                                    <img src={metadata.src} alt={displayName} />
                                  ) : (
                                    <div className={styles.placeholder}>
                                      {displayName.charAt(0)}
                                    </div>
                                  )}
                                  <span>{displayName}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={styles.authors}>
                    {group.authors?.map((authorKey) => {
                      const metadata = authorsData[authorKey];
                      if (!metadata) return null;

                      const slug = authorSlugs[authorKey];
                      const displayName = transliterate(t.philosophers[authorKey as keyof typeof t.philosophers] || authorKey);

                      return (
                        <Link
                          key={authorKey}
                          href={`/${language}/authors/${slug}`}
                          className={styles.authorCard}
                        >
                          {metadata.src ? (
                            <img src={metadata.src} alt={displayName} />
                          ) : (
                            <div className={styles.placeholder}>
                              {displayName.charAt(0)}
                            </div>
                          )}
                          <span>{displayName}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
