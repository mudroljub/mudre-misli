'use client'

import Link from 'next/link'
import Header from './Header'
import Sidebar from './Sidebar'
import { getAuthorName } from '../utils/catalog'
import { useTranslations } from '../utils/useTranslations'
import { useTransliterate } from '../utils/useTransliterate'
import { greekToLatin, isGreek } from '../utils/greekToLatin'
import { getLocalizedWorkText, type Work, type WorkOriginal, type WorkSection } from '../types/works'
import type { WorkReadingPage } from '../utils/workFiles'
import type { Language } from '../types/data'
import styles from './WorkReaderClient.module.scss'

interface WorkReaderClientProps {
  language: Language
  work: Work
  sections: Array<{ section: WorkSection; text: string; original?: WorkOriginal }>
  readingPages: WorkReadingPage[]
  pageIndex: number
  authorSlug: string
}

export default function WorkReaderClient({ language, work, sections, readingPages, pageIndex, authorSlug }: WorkReaderClientProps) {
  const { t, transliterate } = useTranslations(language)
  const transliterateText = useTransliterate(language)
  const basePath = `/${language}/dela/${authorSlug}/${work.slug}`
  const previousPage = readingPages[pageIndex - 1]
  const nextPage = readingPages[pageIndex + 1]
  const firstSection = sections[0].section
  const lastSection = sections[sections.length - 1].section
  const pageLabel = firstSection.anchor === lastSection.anchor
    ? firstSection.anchor
    : `${firstSection.anchor}–${lastSection.anchor}`

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <article className={styles.reader}>
          <header>
            <p><Link href={`/${language}/authors/${authorSlug}`}>{transliterate(getAuthorName(work.author, language))}</Link></p>
            <h2>{transliterate(getLocalizedWorkText(work.title, language))}</h2>
            <h3>§ {pageLabel}</h3>
          </header>

          <details className={styles.contents}>
            <summary>{t.contents}</summary>
            <ol>
              {readingPages.map(item => {
                const start = work.sections[item.startIndex]
                const end = work.sections[item.endIndex]
                return (
                <li key={start.anchor}>
                  <Link href={`${basePath}/${encodeURIComponent(start.anchor)}`}>
                    {start.anchor === end.anchor ? start.anchor : `${start.anchor}–${end.anchor}`}
                    {start.title ? ` · ${transliterate(getLocalizedWorkText(start.title, language))}` : ''}
                  </Link>
                </li>
              )})}
            </ol>
          </details>

          <div className={styles.text}>
            {sections.map(({ section, text }) => (
              <section id={section.anchor} className={styles.canonicalSection} key={section.anchor}>
                <h4>{section.title ? transliterate(getLocalizedWorkText(section.title, language)) : `§ ${section.anchor}`}</h4>
                {transliterateText(text).split(/\n\s*\n/u).map(value => value.trim()).filter(Boolean).map((paragraph, index) => paragraph === '***'
                  ? <hr key={index} />
                  : <p key={index}>{paragraph}</p>)}
              </section>
            ))}
          </div>

          {sections.some(item => item.original) && (
            <details className={styles.original}>
              <summary>{t.source}: {work.originalTitle} · {pageLabel}</summary>
              {sections.map(({ section, original }) => original && (
                <section key={section.anchor}>
                  <h4>§ {section.anchor}</h4>
                  <p lang="grc">{original.text}</p>
                  {isGreek(original.text) && <p className={styles.greekLatin}>{greekToLatin(original.text)}</p>}
                </section>
              ))}
            </details>
          )}

          <nav className={styles.pager}>
            {previousPage ? <Link href={`${basePath}/${encodeURIComponent(work.sections[previousPage.startIndex].anchor)}`}>← {t.workUi.previousSection}</Link> : <span />}
            {nextPage ? <Link href={`${basePath}/${encodeURIComponent(work.sections[nextPage.startIndex].anchor)}`}>{t.workUi.nextSection} →</Link> : <span />}
          </nav>
        </article>
      </section>
    </main>
  )
}
