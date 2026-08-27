'use client';

import { useState } from 'react';
import Link from "next/link";
import classNames from "classnames";
import { getTextForLanguage, getAuthorName, authorSlugs } from "../utils/catalog";
import { useTranslations } from "../utils/useTranslations";
import { getExcerpt, isLongFormEntry } from "../utils/longForm";
import type { Entry, Language } from "../types/data";
import styles from "./QuoteCard.module.scss";

export type QuoteCardEntry = Pick<Entry, 'id' | 'type' | 'sr' | 'stsl' | 'author' | 'display'>;

interface QuoteCardProps {
  entry: QuoteCardEntry;
  language: Language;
  showAuthor?: boolean;
  showSource?: boolean;
  className?: string;
}

export default function QuoteCard({
  entry,
  language,
  showAuthor = false,
  showSource = true,
  className = '',
}: QuoteCardProps) {
  const { t, transliterate } = useTranslations(language);
  const authorName = Array.isArray(entry.author) ? entry.author[0] : entry.author;
  const slug = authorSlugs[authorName];

  const text = transliterate(getTextForLanguage(entry, language));
  const isLongForm = isLongFormEntry(entry);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={classNames(styles.card, styles[entry.type], className)}
      lang={language === 'stsl' ? 'cu' : 'sr'}
    >
      <p className={classNames(styles.quoteText, {
        [styles.expandedQuote]: isLongForm && isExpanded,
      })}>
        {isLongForm && !isExpanded ? getExcerpt(text) : text}
      </p>

      {showAuthor && (
        <p className={styles.authorLine}>
          —{" "}
          <Link href={`/${language}/authors/${slug}`} className={styles.noLink}>
            {transliterate(getAuthorName(authorName, language))}
          </Link>
        </p>
      )}

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
            <Link href={`/${language}/quotes/${entry.id}`} className={styles.sourceLink}>{t.source}</Link>
          )}
        </div>
      )}
    </div>
  );
}
