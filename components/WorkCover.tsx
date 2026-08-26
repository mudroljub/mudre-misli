'use client'

import Link from 'next/link'
import { getAuthorName } from '../utils/catalog'
import { useTranslations } from '../utils/useTranslations'
import { workAuthorSlug } from '../utils/works'
import { getLocalizedWorkText, type Work } from '../types/works'
import type { Language } from '../types/data'
import styles from './WorksPageClient.module.scss'

interface WorkCoverProps {
  language: Language
  work: Work
}

export default function WorkCover({ language, work }: WorkCoverProps) {
  const { t, transliterate } = useTranslations(language)

  return (
    <article className={styles.card}>
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
  )
}
