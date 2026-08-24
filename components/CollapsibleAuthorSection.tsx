'use client'

import { useState, type ReactNode } from 'react'
import { useTranslations } from '../utils/useTranslations'
import type { Language } from '../types/data'
import styles from './AuthorPageClient.module.scss'

interface CollapsibleAuthorSectionProps {
  id: string
  title: string
  total: number
  language: Language
  children: (visibleCount: number) => ReactNode
  initialLimit?: number
}

export default function CollapsibleAuthorSection({
  id,
  title,
  total,
  language,
  children,
  initialLimit,
}: CollapsibleAuthorSectionProps) {
  const { t } = useTranslations(language)
  const collapsible = initialLimit !== undefined && total > initialLimit
  const [expanded, setExpanded] = useState(false)
  const visibleCount = collapsible && !expanded ? initialLimit : total

  return (
    <section id={id} className={styles.authorSection}>
      <h3>
        {title} <span className={styles.sectionCount}>({total})</span>
      </h3>
      {children(visibleCount)}
      {collapsible && (
        <button
          type="button"
          className={styles.expandButton}
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
        >
          {expanded ? t.showLess : `${t.showMore} (${total - initialLimit})`}
        </button>
      )}
    </section>
  )
}
