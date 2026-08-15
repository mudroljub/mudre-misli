import QuoteCard from "./QuoteCard"
import type { Entry, Language } from "../types/data"
import styles from "./AuthorPageClient.module.scss"

interface AuthorSectionProps {
  title: string
  entries: Entry[]
  language: Language
}

export default function AuthorSection({
  title,
  entries,
  language,
}: AuthorSectionProps) {
  if (!entries.length) return null

  return (
    <section className={styles.authorSection}>
      <h3>{title}</h3>

      <div className={styles.grid}>
        {entries.map((entry) => (
          <QuoteCard
            key={entry.id}
            entry={entry}
            language={language}
          />
        ))}
      </div>
    </section>
  )
}
