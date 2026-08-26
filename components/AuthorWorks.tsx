'use client'

import { useTranslations } from '../utils/useTranslations'
import type { Work } from '../types/works'
import QuoteCard from './QuoteCard'
import WorkCover from './WorkCover'
import type { Language, Writing } from '../types/data'
import styles from './AuthorPageClient.module.scss'
import bookStyles from './WorksPageClient.module.scss'

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
  const { t } = useTranslations(language)
  if (!works.length && !entries.length) return null

  return (
    <section id={id} className={styles.authorSection}>
      <h3>{title ?? t.sectionWritings}</h3>
      {works.length > 0 && (
        <div className={`${bookStyles.authorGroup} ${bookStyles.grid}`}>
          {works.map(work => (
            <WorkCover language={language} work={work} key={work.id} />
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
