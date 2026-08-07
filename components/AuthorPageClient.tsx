"use client";

import Sidebar from "./Sidebar";
import LanguageSwitcher from "./LanguageSwitcher";
import { getAuthorName } from "../lib/data";
import { getTranslation } from "../lib/translations";
import type { AuthorData, Language, Entry, LifeEvent, Saying } from "../types/data";
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
  const t = getTranslation(language);
  const authorName = getAuthorName(author, language);

  // Separate own quotes from cross-references
  // Simple rule: multiple authors = cross-reference (goes to "Spominjanja")
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

  return (
    <main className="page-shell">
      <Sidebar language={language} />

      <section className={styles.content}>
        <LanguageSwitcher currentLang={language} />

        <h2>{authorName}</h2>

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
      </section>
    </main>
  );
}