import QuoteCard from "./QuoteCard"
import CollapsibleAuthorSection from './CollapsibleAuthorSection'
import type { Entry, Language } from "../types/data"
import styles from "./AuthorPageClient.module.scss"

interface AuthorSectionProps {
  title: string
  entries: Entry[]
  language: Language
  id?: string
  initialLimit?: number
}

export default function AuthorSection({
  title,
  entries,
  language,
  id,
  initialLimit,
}: AuthorSectionProps) {
  if (!entries.length) return null

  return (
    <CollapsibleAuthorSection
      id={id ?? `section-${title}`}
      title={title}
      total={entries.length}
      language={language}
      initialLimit={initialLimit}
    >
      {(visibleCount) => (
      <div className={styles.grid}>
        {entries.slice(0, visibleCount).map((entry) => (
          <QuoteCard
            key={entry.id}
            entry={entry}
            language={language}
          />
        ))}
      </div>
      )}
    </CollapsibleAuthorSection>
  )
}
