'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { authorsData, authorSlugs } from '../lib/data';
import { authorGroups } from '../lib/authorGroups';
import { getTranslation } from '../lib/translations';
import type { Language } from '../types/data';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  language: Language;
}

export default function Sidebar({ language }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(['presocratics-6-5. vek p.n.e.'])
  );
  const t = getTranslation(language);

  const toggleGroup = (groupTitle: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupTitle)) {
      newExpanded.delete(groupTitle);
    } else {
      newExpanded.add(groupTitle);
    }
    setExpandedGroups(newExpanded);
  };

  const renderAuthor = (authorKey: string) => {
    const metadata = authorsData[authorKey];
    if (!metadata) return null;

    const slug = authorSlugs[authorKey];
    const displayName = metadata[language] || authorKey;
    const isActive = pathname === `/authors/${slug}`;

    return (
      <Link
        key={authorKey}
        href={`/authors/${slug}`}
        className={`${styles.author} ${isActive ? styles.active : ''}`}
      >
        <span>{displayName}</span>
      </Link>
    );
  };

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
          {authorGroups.map((group) => {
            const groupKey = `${group.titleKey}-${group.period}`;
            const isExpanded = expandedGroups.has(groupKey);
            const groupTitle = (t.sidebarGroups as any)[group.titleKey] || group.title;

            return (
              <div key={groupKey} className={styles.group}>
                <button
                  className={`${styles.groupHeader} ${isExpanded ? styles.expanded : ''}`}
                  onClick={() => toggleGroup(groupKey)}
                >
                  <span className={styles.groupTitle}>
                    {groupTitle}
                  </span>
                  <span className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>›</span>
                </button>

                {isExpanded && (
                  <div className={styles.groupContent}>
                    {group.subgroups ? (
                      group.subgroups.map((subgroup) => {
                        const subgroupTitle = (t.sidebarSubgroups as any)[subgroup.titleKey] || subgroup.title;
                        return (
                          <div key={subgroup.titleKey} className={styles.subgroup}>
                            <div className={styles.subgroupTitle}>{subgroupTitle}</div>
                            {subgroup.authors.map(renderAuthor)}
                          </div>
                        );
                      })
                    ) : (
                      group.authors?.map(renderAuthor)
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
