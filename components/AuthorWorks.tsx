'use client'

import Link from 'next/link'
import { useTranslations } from '../utils/useTranslations'
import { workAuthorSlug } from '../utils/works'
import { getLocalizedWorkText, type Work } from '../types/works'
import QuoteCard from './QuoteCard'
import type { Language, Writing } from '../types/data'
import styles from './AuthorPageClient.module.scss'

interface AuthorWorksProps {
  works: Work[]
  entries?: Writing[]
  language: Language
  id?: string
  title?: string
}

export default function AuthorWorks({
  works,
  entries = [],
  language,
  id = 'writings',
  title,
}: AuthorWorksProps) {
  const { t, transliterate } = useTranslations(language)
  if (!works.length && !entries.length) return null

  return (
    <section id={id} className={styles.authorSection}>
      <h3>{title ?? t.sectionWritings}</h3>
      {works.length > 0 && (
        <div className={styles.grid}>
          {works.map(work => (
            <article className={styles.workCard} key={work.id}>
              <h4>{transliterate(getLocalizedWorkText(work.title, language))}</h4>
              <p>{work.originalTitle}</p>
              <Link href={`/${language}/dela/${workAuthorSlug(work)}/${work.slug}`}>
                {t.workUi.openWork}
              </Link>
            </article>
          ))}
        </div>
      )}
      {entries.length > 0 && (
        <div className={`${styles.grid} ${styles.workEntries}`}>
          {entries.map((entry) => (
            <QuoteCard key={entry.id} entry={entry} language={language} />
          ))}
        </div>
      )}
    </section>
  )
}
