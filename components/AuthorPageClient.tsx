"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { getAuthorName, placesData } from "../utils/data";
import { useTranslations } from "../utils/useTranslations";
import type {
  AuthorData,
  Language,
  Entry,
  LifeEvent,
  Saying,
  Writing,
  Letter,
} from "../types/data";
import QuoteCard from "./QuoteCard";
import BookLayout from "./BookLayout";
import BirthplaceMap from "./BirthplaceMap";
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
  const birthplaceName = authorData.birthplace
    ? t.cities[authorData.birthplace as keyof typeof t.cities] || authorData.birthplace
    : null;
  const birthplaceCoordinates = authorData.birthplace
    ? placesData[authorData.birthplace]
    : null;

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

  const lifeEventsSection = authorEntries.filter(
    (entry): entry is LifeEvent => entry.type === "anecdote" || entry.type === "bio",
  );

  const works = authorEntries.filter(
    (entry): entry is Writing => entry.type === "works",
  );

  const letters = authorEntries.filter(
    (entry): entry is Letter => entry.type === "letter",
  );

  return (
    <main className="page-shell">
      <Sidebar language={language} />

      <section className={styles.content}>
        <Header language={language} />

        <div className={styles.authorOverview}>
          <h2 className={styles.authorName}>
            {authorName}{" "}
            <span className={styles.authorDates}>
              (
              {authorData.born < 0
                ? `${Math.abs(authorData.born)} ${t.bce}`
                : authorData.born}{" "}
              –{" "}
              {authorData.died < 0
                ? `${Math.abs(authorData.died)} ${t.bce}`
                : authorData.died}
              )
            </span>
          </h2>

          {birthplaceName && birthplaceCoordinates && (
            <p className={styles.birthplaceName}>{birthplaceName}</p>
          )}

          <div className={styles.portraitColumn}>
            {authorData.src && (
              <img
                className={styles.authorPortrait}
                src={authorData.src}
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

        {works.length > 0 && (
          <section className={styles.authorSection}>
            <h3>{t.sectionWritings}</h3>

            <div className={styles.grid}>
              {works.map((entry) => (
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

        {letters.length > 0 && (
          <section className={styles.authorSection}>
            <h3>{t.sectionLetters}</h3>

            <div className={styles.grid}>
              {letters.map((entry) => (
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