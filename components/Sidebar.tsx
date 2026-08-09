'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';
import { authorsData, authorSlugs } from '../lib/data';
import { authorGroups } from '../lib/authorGroups';
import { useTranslations } from '../lib/useTranslations';
import type { Language } from '../types/data';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  language: Language;
}

export default function Sidebar({ language }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set()
  );
  const { t, transliterate } = useTranslations(language);

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
    const displayName = t.philosophers[authorKey as keyof typeof t.philosophers] || authorKey;
    const isActive = pathname === `/${language}/authors/${slug}`;

    return (
      <Link
        key={authorKey}
        href={`/${language}/authors/${slug}`}
        className={classNames(styles.author, {
          [styles.active]: isActive
        })}
      >
        <span>{transliterate(displayName)}</span>
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

      <aside className={classNames(styles.sidebar, {
        [styles.open]: isOpen,
        [styles.closed]: !isOpen
      })}>
        <h2><Link href={`/${language}`}>{t.siteTitle}</Link></h2>
        <nav>
          {authorGroups.map((group) => {
            const groupKey = `${group.titleKey}-${group.period}`;
            const isExpanded = expandedGroups.has(groupKey);
            const groupTitle = (t.sidebarGroups as any)[group.titleKey] || group.title;

            return (
              <div key={groupKey} className={styles.group}>
                <button
                  className={classNames(styles.groupHeader, {
                    [styles.expanded]: isExpanded
                  })}
                  onClick={() => toggleGroup(groupKey)}
                >
                  <span className={styles.groupTitle}>
                    {groupTitle}
                  </span>
                  <span className={classNames(styles.expandIcon, {
                    [styles.expanded]: isExpanded
                  })}>›</span>
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
