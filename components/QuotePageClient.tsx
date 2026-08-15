"use client";

import Link from "next/link";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { getAuthorName, authorSlugs, getSourceName, getSourceAuthor } from "../utils/catalog";
import { useTranslations } from "../utils/useTranslations";
import { useTransliterate } from "../utils/useTransliterate";
import { greekToLatin, isGreek } from "../utils/greekToLatin";
import { getLongFormTitle, isLongFormEntry, splitLongFormParagraphs } from "../utils/longForm";
import type { AuthorData, Language, Entry } from "../types/data";
import styles from "./QuotePageClient.module.scss";

interface QuotePageClientProps {
  quote: Entry;
  authorData?: AuthorData;
  language: Language;
}

export default function QuotePageClient({
  quote,
  authorData,
  language,
}: QuotePageClientProps) {
  const { t, transliterate } = useTranslations(language);
  const transliterateStsl = useTransliterate('stsl');
  const transliterateSr = useTransliterate('sr');
  const authorKey = Array.isArray(quote.author) ? quote.author[0] : quote.author;
  const authorName = transliterate(getAuthorName(authorKey, language));
  const isLongForm = isLongFormEntry(quote);
  const activeText = language === 'stsl'
    ? transliterateStsl(quote.stsl)
    : transliterateSr(quote.sr);
  const activeParagraphs = splitLongFormParagraphs(activeText);

  if (isLongForm) {
    return (
      <main className="page-shell">
        <Sidebar language={language} />
        <section className="content">
          <Header language={language} />
          <article className={styles.reader}>
            <header>
              <p className={styles.readerAuthor}>{authorName}</p>
              <h2>{getLongFormTitle(activeText)}</h2>
            </header>

            {activeParagraphs.length >= 8 && (
              <details className={styles.readerContents}>
                <summary>{t.contents}</summary>
                <ol>
                  {activeParagraphs.map((_, index) => (
                    <li key={index}><a href={`#p-${index + 1}`}>§ {index + 1}</a></li>
                  ))}
                </ol>
              </details>
            )}

            <div className={styles.readerText}>
              {activeParagraphs.map((paragraph, index) => (
                <p id={`p-${index + 1}`} key={index}>{paragraph}</p>
              ))}
            </div>

            <details className={styles.originalDetails}>
              <summary>{t.source}</summary>
              <div>{quote.originalText}</div>
              {isGreek(quote.originalText) && (
                <div className={styles.greekLatin}>{greekToLatin(quote.originalText)}</div>
              )}
            </details>

            <p className={styles.sourceLine}>
              <b>{t.source}</b>: {quote.sources.map((src, idx) => (
                <span key={idx}>
                  {idx > 0 && "; "}
                  {getSourceAuthor(src.name)}, {transliterate(getSourceName(src.name, language))}
                  {src.reference && `, ${src.reference}`}
                </span>
              ))}
            </p>

            <Link href={`/${language}/authors/${authorSlugs[authorKey] ?? authorKey}`} className={styles.authorLink}>
              {t.gotoAuthor}
            </Link>
          </article>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <div className={styles.card}>
          {authorData?.src && <img src={authorData.src} alt={authorName} />}
          <h2>{authorName}</h2>

          {quote.originalText && (
            <blockquote className={styles.originalQuote}>
              <div>{quote.originalText}</div>
              {isGreek(quote.originalText) && (
                <div className={styles.greekLatin}>{greekToLatin(quote.originalText)}</div>
              )}
            </blockquote>
          )}

          {quote.stsl && (
            <blockquote className={classNames(styles.stslQuote, {
              [styles.selectedQuote]: language === 'stsl'
            })}>
              {transliterateStsl(quote.stsl)}
            </blockquote>
          )}

          {quote.sr && (
            <blockquote className={classNames(styles.srQuote, {
              [styles.selectedQuote]: language === 'sr'
            })}>
              {transliterateSr(quote.sr)}
            </blockquote>
          )}

          <p className={styles.sourceLine}>
            <b>{t.source}</b>: {quote.sources.map((src, idx) => (
              <span key={idx}>
                {idx > 0 && "; "}
                {getSourceAuthor(src.name)}, {transliterate(getSourceName(src.name, language))}
                {src.reference && `, ${src.reference}`}
              </span>
            ))}
          </p>

          <Link href={`/${language}/authors/${authorSlugs[authorKey] ?? authorKey}`} className={styles.authorLink}>
            {t.gotoAuthor}
          </Link>
        </div>
      </section>
    </main>
  );
}
