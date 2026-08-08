"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { getAuthorName } from "../lib/data";
import { useTranslations } from "../lib/useTranslations";
import type { AuthorData, Language, Entry, LifeEvent, Saying, Writing } from "../types/data";
import QuoteCard from "./QuoteCard";
import BookLayout from "./BookLayout";
import styles from "./AuthorPageClient.module.scss";

interface AuthorPageClientProps {
  author: string;
  authorData: AuthorData;
  authorEntries: Entry[];
  language: Language;
}

export default function AuthorPageClient({
  author,
  authorData,
  authorEntries,
  language,
}: AuthorPageClientProps) {
  const { t, transliterate } = useTranslations(language);
  const authorName = transliterate(getAuthorName(author, language));

  const isCrossReference = (entry: Entry) => {
    const authors = Array.isArray(entry.author) ? entry.author : [entry.author];
    return authors.length > 1;
  };

  const quotesSection = authorEntries.filter(
    (entry): entry is Saying =>
      (entry.type === "quote" || entry.type === "reported") && !isCrossReference(entry),
  );

  const crossReferencesSection = authorEntries.filter(
    (entry): entry is Saying =>
      (entry.type === "quote" || entry.type === "reported") && isCrossReference(entry),
  );

  const lifeEventsSection = authorEntries
    .filter((entry): entry is LifeEvent =>
      entry.type === "anecdote" || entry.type === "bio"
    )
    .sort((a, b) => a.year - b.year);

  const writingsSection = authorEntries.filter(
    (entry): entry is Writing => entry.type === "writing" && !isCrossReference(entry)
  );

  return (
    <main className="page-shell">
      <Sidebar language={language} />

      <section className={styles.content}>
        <Header language={language} />

        <h2 className={styles.authorName}>
          {authorName}{" "}
          <span className={styles.authorDates}>
            ({authorData.born < 0 ? `${Math.abs(authorData.born)} ${t.bce}` : authorData.born} – {authorData.died < 0 ? `${Math.abs(authorData.died)} ${t.bce}` : authorData.died})
          </span>
        </h2>

        {authorData.birthplace && (
          <p className={styles.birthplace}>
            {t.cities[authorData.birthplace as keyof typeof t.cities] || authorData.birthplace}
          </p>
        )}

        {authorData.src &&
          <img
            className={styles.authorPortrait}
            src={authorData.src}
            alt={authorName}
          />
        }

        <a
          href={`https://en.wikipedia.org/wiki/${author.replace(/ /g, "_")}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.subtleLink}
          title={t.wikipedia}
        >
          {t.wikipedia}
        </a>

        {lifeEventsSection.length > 0 && (
          <section className={styles.authorSection}>
            <h3>{t.sectionLife}</h3>

            <BookLayout entries={lifeEventsSection} language={language} />
          </section>
        )}

        {quotesSection.length > 0 && (
          <section className={styles.authorSection}>
            <h3>{t.sectionQuotes}</h3>

            <div className={styles.grid}>
              {quotesSection.map((entry) => (
                <QuoteCard
                  key={entry._id}
                  entry={entry}
                  language={language}
                />
              ))}
            </div>
          </section>
        )}

        {crossReferencesSection.length > 0 && (
          <section className={styles.authorSection}>
            <h3>{t.sectionOthersAbout}</h3>

            <div className={styles.grid}>
              {crossReferencesSection.map((entry) => (
                <QuoteCard
                  key={entry._id}
                  entry={entry}
                  language={language}
                />
              ))}
            </div>
          </section>
        )}

        {writingsSection.length > 0 && (
          <section className={styles.authorSection}>
            <h3>{t.sectionWritings}</h3>

            <div className={styles.grid}>
              {writingsSection.map((entry) => (
                <QuoteCard
                  key={entry._id}
                  entry={entry}
                  language={language}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}