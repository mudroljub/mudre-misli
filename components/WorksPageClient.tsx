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

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <h2>{t.workUi.allWorks}</h2>
        <div className={styles.grid}>
          {works.map(work => (
            <article className={styles.card} key={work.id}>
              <p className={styles.author}>{transliterate(getAuthorName(work.author, language))}</p>
              <h3>{transliterate(getLocalizedWorkText(work.title, language))}</h3>
              <p className={styles.originalTitle}>{work.originalTitle}</p>
              <p>{work.sections.length} §</p>
              <Link href={`/${language}/dela/${workAuthorSlug(work)}/${work.slug}`}>
                {t.workUi.openWork}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
