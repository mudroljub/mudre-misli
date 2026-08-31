'use client';

import { useState } from 'react';
import Link from "next/link";
import classNames from "classnames";
import { getTextForLanguage, getAuthorName, authorSlugs, authorsData } from "../utils/catalog";
import { withBasePath } from '../utils/helpers';
import { useTranslations } from "../utils/useTranslations";
import { getExcerpt, isLongFormEntry } from "../utils/longForm";
import type { Entry, Language } from "../types/data";
import styles from "./QuoteCard.module.scss";

export type QuoteCardEntry = Pick<Entry, 'id' | 'type' | 'sr' | 'stsl' | 'author' | 'display' | 'sources'>;

interface QuoteCardProps {
  entry: QuoteCardEntry;
  language: Language;
  showAuthor?: boolean;
  showAuthorImage?: boolean;
  showSource?: boolean;
  className?: string;
}

export default function QuoteCard({
  entry,
  language,
  showAuthor = false,
  showAuthorImage = false,
  showSource = true,
  className = '',
}: QuoteCardProps) {
  const { t, transliterate } = useTranslations(language);
  const authorName = Array.isArray(entry.author) ? entry.author[0] : entry.author;
  const slug = authorSlugs[authorName];
  const localizedAuthorName = transliterate(getAuthorName(authorName, language));
  const authorImage = authorsData[authorName]?.src;
  const hasAuthorImage = Boolean(authorImage && !authorImage.endsWith('/unknown-author.svg'));

  const text = transliterate(getTextForLanguage(entry, language));
  const isLongForm = isLongFormEntry(entry);
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleText = isLongForm && !isExpanded
    ? getExcerpt(text)
    : text;
  const authorAttribution = showAuthor ? (
    <div className={classNames(styles.authorAttribution, {
      [styles.authorAttributionBefore]: entry.type === 'reported',
    })}>
      {showAuthorImage && hasAuthorImage && authorImage && (
        <Link href={`/${language}/authors/${slug}`} className={styles.portraitLink}>
          <img
            className={styles.authorPortrait}
            src={withBasePath(authorImage)}
            alt={localizedAuthorName}
          />
        </Link>
      )}
      <p className={styles.authorLine}>
        {entry.type !== 'reported' && '— '}
        <Link href={`/${language}/authors/${slug}`} className={styles.noLink}>
          {localizedAuthorName}
        </Link>
      </p>
    </div>
  ) : null;

  return (
    <div
      className={classNames(styles.card, styles[entry.type], className)}
      lang={language === 'stsl' ? 'cu' : 'sr'}
    >
      {entry.type === 'reported' && authorAttribution}

      <p className={classNames(styles.quoteText, {
        [styles.expandedQuote]: isLongForm && isExpanded,
      })}>
        {visibleText}
      </p>

      {entry.type !== 'reported' && authorAttribution}

      {(isLongForm || showSource) && (
        <div className={styles.cardActions}>
          {isLongForm && (
            <button
              type="button"
              className={styles.expandButton}
              aria-expanded={isExpanded}
              onClick={() => setIsExpanded((expanded) => !expanded)}
            >
              {isExpanded ? t.showLess : t.showMore}
            </button>
          )}
          {showSource && (
            <Link
              href={`/${language}/quotes/${entry.id}`}
              className={styles.sourceLink}
            >
              {t.source}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
