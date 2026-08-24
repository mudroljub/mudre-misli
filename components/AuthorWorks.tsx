'use client'

import Link from 'next/link'
import { useTranslations } from '../utils/useTranslations'
import { workAuthorSlug } from '../utils/works'
import { getLocalizedWorkText, type Work } from '../types/works'
import type { Language } from '../types/data'
import styles from './AuthorPageClient.module.scss'

interface AuthorWorksProps {
  works: Work[]
  language: Language
}

export default function AuthorWorks({ works, language }: AuthorWorksProps) {
  const { t, transliterate } = useTranslations(language)
  if (!works.length) return null

  return (
    <section className={styles.authorSection}>
      <h3>{t.navWorks}</h3>
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
    </section>
  )
}
