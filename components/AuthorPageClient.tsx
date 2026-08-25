"use client"

import Sidebar from "./Sidebar"
import Header from "./Header"
import BookLayout from "./BookLayout"
import BirthplaceMap from "./BirthplaceMap"
import AuthorSection from "./AuthorSection"
import AuthorWorks from "./AuthorWorks"
import CollapsibleAuthorSection from './CollapsibleAuthorSection'
import { getAuthorName, placesData } from "../utils/catalog"
import { useTranslations } from "../utils/useTranslations"
import { withBasePath } from "../utils/helpers"
import { worksData } from "../utils/works"
import type {
  AuthorData,
  Language,
  Entry,
  LifeEvent,
  Saying,
  Writing,
  Letter,
  Mention,
} from "../types/data"
import styles from "./AuthorPageClient.module.scss"

interface AuthorPageClientProps {
  author: string
  authorData: AuthorData
  authorEntries: Entry[]
  language: Language
}

export default function AuthorPageClient({
  author,
  authorData,
  authorEntries,
  language,
}: AuthorPageClientProps) {
  const { t, transliterate } = useTranslations(language)

  const authorName = transliterate(getAuthorName(author, language))

  const birthplaceName = authorData.birthplace
    ? t.cities[authorData.birthplace as keyof typeof t.cities] ||
      authorData.birthplace
    : null

  const birthplaceCoordinates = authorData.birthplace
    ? placesData[authorData.birthplace]
    : null

  const lifeEvents = authorEntries.filter(
    (entry): entry is LifeEvent =>
      entry.type === "anecdote" || entry.type === "bio",
  )

  const quotes = authorEntries.filter(
    (entry): entry is Saying =>
      entry.type === "quote" || entry.type === "reported",
  )

  const mentions = authorEntries.filter(
    (entry): entry is Mention => entry.type === "mention",
  )

  const works = authorEntries.filter(
    (entry): entry is Writing => entry.type === "works",
  )

  const letters = authorEntries.filter(
    (entry): entry is Letter => entry.type === "letter",
  )

  const fullWorks = worksData.filter((work) => work.author === author)
  const navigation = [
    lifeEvents.length && { id: 'life', label: t.sectionLife },
    quotes.length && { id: 'quotes', label: t.sectionQuotes },
    (fullWorks.length || works.length) && { id: 'writings', label: t.sectionWritings },
    mentions.length && { id: 'mentions', label: t.sectionOthersAbout },
    letters.length && { id: 'letters', label: t.sectionLetters },
  ].filter(Boolean) as { id: string; label: string }[]

  const formatYear = (year: number) =>
    year < 0 ? `${Math.abs(year)} ${t.bce}` : year

  return (
    <main className="page-shell">
      <Sidebar language={language} />

      <section className={styles.content}>
        <Header language={language} />

        <div className={styles.authorOverview}>
          <h2 className={styles.authorName}>
            {authorName}{" "}
            <span className={styles.authorDates}>
              ({formatYear(authorData.born)} – {formatYear(authorData.died)})
            </span>
          </h2>

          {birthplaceName && birthplaceCoordinates && (
            <p className={styles.birthplaceName}>{birthplaceName}</p>
          )}

          <div className={styles.portraitColumn}>
            {authorData.src && (
              <img
                className={styles.authorPortrait}
                src={withBasePath(authorData.src)}
                alt={authorName}
              />
            )}

            <a
              href={`https://en.wikipedia.org/wiki/${author.replace(/ /g, "_")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.subtleLink}
              title={t.wikipedia}
            >
              {t.wikipedia}
            </a>
          </div>

          {birthplaceName && birthplaceCoordinates && (
            <BirthplaceMap
              coordinates={birthplaceCoordinates}
              placeName={birthplaceName}
            />
          )}
        </div>

        {navigation.length > 1 && (
          <nav className={styles.sectionNav} aria-label={t.contents}>
            {navigation.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {lifeEvents.length > 0 && (
          <CollapsibleAuthorSection
            id="life"
            title={t.sectionLife}
            total={lifeEvents.length}
            language={language}
            initialLimit={8}
          >
            {(visibleCount) => (
              <BookLayout entries={lifeEvents.slice(0, visibleCount)} language={language} />
            )}
          </CollapsibleAuthorSection>
        )}

        <AuthorSection
          title={t.sectionQuotes}
          entries={quotes}
          language={language}
          id="quotes"
          initialLimit={16}
        />

        <AuthorWorks works={fullWorks} entries={works} language={language} />

        <AuthorSection
          title={t.sectionOthersAbout}
          entries={mentions}
          language={language}
          id="mentions"
          initialLimit={12}
        />

        <AuthorSection
          title={t.sectionLetters}
          entries={letters}
          language={language}
          id="letters"
          initialLimit={6}
        />
      </section>
    </main>
  )
}
