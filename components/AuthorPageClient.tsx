"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import LanguageSwitcher from "./LanguageSwitcher";
import { getAuthorName } from "../lib/data";
import { getTranslation } from "../lib/translations";
import type { AuthorData, Language, Entry } from "../types/data";
import QuoteCard from "./QuoteCard";
import BookLayout from "./BookLayout";
import styles from "./AuthorPageClient.module.scss";

interface AuthorPageClientProps {
  author: string;
  authorData: AuthorData;
  authorEntries: Entry[];
}

export default function AuthorPageClient({
  author,
  authorData,
  authorEntries,
}: AuthorPageClientProps) {
  const [language, setLanguage] = useState<Language>("stsl");
  const t = getTranslation(language);
  const authorName = getAuthorName(author, language);

  const quotesSection = authorEntries.filter(
    (entry) => entry.type === "quote" || entry.type === "reported",
  );

  const lifeEventsSection = authorEntries
    .filter((entry): entry is Extract<Entry, { type: "anecdote" | "bio" }> =>
      entry.type === "anecdote" || entry.type === "bio"
    )
    .sort((a, b) => a.year - b.year);

  return (
    <main className="page-shell">
      <Sidebar language={language} />

      <section className={styles.content}>
        <LanguageSwitcher currentLang={language} onChange={setLanguage} />

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
      </section>
    </main>
  );
}