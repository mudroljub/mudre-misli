'use client'

import Link from 'next/link'
import Header from './Header'
import Sidebar from './Sidebar'
import { getAuthorName } from '../utils/catalog'
import { useTranslations } from '../utils/useTranslations'
import { useTransliterate } from '../utils/useTransliterate'
import { greekToLatin, isGreek } from '../utils/greekToLatin'
import { getLocalizedWorkText, type Work, type WorkOriginal } from '../types/works'
import type { Language } from '../types/data'
import styles from './WorkReaderClient.module.scss'

interface WorkReaderClientProps {
  language: Language
  work: Work
  sectionIndex: number
  text: string
  original?: WorkOriginal
  authorSlug: string
}

export default function WorkReaderClient({ language, work, sectionIndex, text, original, authorSlug }: WorkReaderClientProps) {
  const { t, transliterate } = useTranslations(language)
  const transliterateText = useTransliterate(language)
  const section = work.sections[sectionIndex]
  const paragraphs = transliterateText(text).split(/\n\s*\n/u).map(value => value.trim()).filter(Boolean)
  const basePath = `/${language}/dela/${authorSlug}/${work.slug}`
  const previous = work.sections[sectionIndex - 1]
  const next = work.sections[sectionIndex + 1]

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <article className={styles.reader}>
          <header>
            <p>{transliterate(getAuthorName(work.author, language))}</p>
            <h2>{transliterate(getLocalizedWorkText(work.title, language))}</h2>
            <h3>{section.title ? transliterate(getLocalizedWorkText(section.title, language)) : `§ ${section.anchor}`}</h3>
          </header>

          <details className={styles.contents}>
            <summary>{t.contents}</summary>
            <ol>
              {work.sections.map(item => (
                <li key={item.anchor}>
                  <Link href={`${basePath}/${encodeURIComponent(item.anchor)}`}>
                    {item.anchor}{item.title ? ` · ${transliterate(getLocalizedWorkText(item.title, language))}` : ''}
                  </Link>
                </li>
              ))}
            </ol>
          </details>

          <div className={styles.text}>
            {paragraphs.map((paragraph, index) => paragraph === '***'
              ? <hr key={index} />
              : <p key={index}>{paragraph}</p>)}
          </div>

          {original && (
            <details className={styles.original}>
              <summary>{t.source}: {work.originalTitle} · {section.anchor}</summary>
              <p lang="grc">{original.text}</p>
              {isGreek(original.text) && <p className={styles.greekLatin}>{greekToLatin(original.text)}</p>}
            </details>
          )}

          <nav className={styles.pager}>
            {previous ? <Link href={`${basePath}/${encodeURIComponent(previous.anchor)}`}>← {t.workUi.previousSection}</Link> : <span />}
            {next ? <Link href={`${basePath}/${encodeURIComponent(next.anchor)}`}>{t.workUi.nextSection} →</Link> : <span />}
          </nav>
        </article>
      </section>
    </main>
  )
}
