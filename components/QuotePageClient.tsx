"use client";

import Link from "next/link";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { getTextForLanguage, getAuthorName, authorSlugs, getSourceName, getSourceAuthor } from "../lib/data";
import { useTranslations } from "../lib/useTranslations";
import { useTransliterate } from "../lib/useTransliterate";
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

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <div className={styles.card}>
          {authorData?.src && <img src={authorData.src} alt={authorName} />}
          <h2>{authorName}</h2>

          {quote.originalText && (
            <blockquote className={styles.originalQuote}>{quote.originalText}</blockquote>
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
