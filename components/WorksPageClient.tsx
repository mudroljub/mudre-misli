'use client'

import Link from 'next/link'
import Header from './Header'
import Sidebar from './Sidebar'
import { getAuthorName } from '../utils/catalog'
import { useTranslations } from '../utils/useTranslations'
import { workAuthorSlug } from '../utils/works'
import { getLocalizedWorkText, type Work } from '../types/works'
import type { Language } from '../types/data'
import styles from './WorksPageClient.module.scss'

interface WorksPageClientProps {
  language: Language
  works: Work[]
}

export default function WorksPageClient({ language, works }: WorksPageClientProps) {
  const { t, transliterate } = useTranslations(language)
  const sortedWorks = [...works].sort((left, right) => {
    const leftAuthor = transliterate(getAuthorName(left.author, language))
    const rightAuthor = transliterate(getAuthorName(right.author, language))
    const authorOrder = leftAuthor.localeCompare(rightAuthor, language === 'sr' ? 'sr' : undefined)

    if (authorOrder !== 0) return authorOrder

    return transliterate(getLocalizedWorkText(left.title, language)).localeCompare(
      transliterate(getLocalizedWorkText(right.title, language)),
      language === 'sr' ? 'sr' : undefined,
    )
  })

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <h2>{t.workUi.allWorks}</h2>
        <div className={styles.grid}>
          {sortedWorks.map(work => (
            <article className={styles.card} key={work.id}>
              <Link
                className={styles.cover}
                href={`/${language}/dela/${workAuthorSlug(work)}/${work.slug}`}
              >
                <span className={styles.spine} aria-hidden="true" />
                <span className={styles.coverContent}>
                  <span className={styles.author}>
                    {transliterate(getAuthorName(work.author, language))}
                  </span>
                  <span className={styles.ornament} aria-hidden="true">◆</span>
                  <span className={styles.title}>
                    {transliterate(getLocalizedWorkText(work.title, language))}
                  </span>
                  <span className={styles.originalTitle}>{work.originalTitle}</span>
                  <span className={styles.footer}>
                    <span>{work.sections.length} §</span>
                    <span>{t.workUi.openWork} →</span>
                  </span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
