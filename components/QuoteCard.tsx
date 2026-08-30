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

const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const findTermStarts = (text: string, term: string): number[] => {
  const pattern = new RegExp(`(?<!\\p{L})${escapeRegExp(term)}(?!\\p{L})`, 'giu');
  return [...text.matchAll(pattern)].map((match) => match.index ?? -1).filter((index) => index >= 0);
};

const getExcerptAroundTerm = (
  text: string,
  annotation: { text: string; occurrence: number },
): string => {
  const termStart = findTermStarts(text, annotation.text)[annotation.occurrence - 1] ?? -1;
  if (termStart === -1) return getExcerpt(text);

  const words = [...text.matchAll(/\S+/gu)];
  const termWordIndex = words.findIndex((word) => (
    (word.index ?? 0) <= termStart
      && (word.index ?? 0) + word[0].length > termStart
  ));

  if (termWordIndex === -1) return getExcerpt(text);

  const firstWord = Math.max(0, termWordIndex - 14);
  const lastWord = Math.min(words.length, firstWord + 42);
  const excerpt = words.slice(firstWord, lastWord).map((word) => word[0]).join(' ');

  return `${firstWord > 0 ? '…' : ''}${excerpt}${lastWord < words.length ? '…' : ''}`;
};

export type QuoteCardEntry = Pick<Entry, 'id' | 'type' | 'sr' | 'stsl' | 'author' | 'display' | 'sources' | 'termAnnotations'>;

interface QuoteCardProps {
  entry: QuoteCardEntry;
  language: Language;
  highlightTag?: string;
  showAuthor?: boolean;
  showAuthorImage?: boolean;
  showSource?: boolean;
  className?: string;
}

export default function QuoteCard({
  entry,
  language,
  highlightTag,
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
  const annotations = (entry.termAnnotations?.[language] ?? [])
    .filter((annotation) => annotation.tag === highlightTag)
    .map((annotation) => ({
      ...annotation,
      text: transliterate(annotation.text),
      occurrence: annotation.occurrence ?? 1,
    }));
  const isLongForm = isLongFormEntry(entry);
  const [isExpanded, setIsExpanded] = useState(false);

  const renderText = (
    value: string,
    visibleAnnotations = annotations,
  ) => {
    if (visibleAnnotations.length === 0) return value;

    const ranges = visibleAnnotations.flatMap((annotation) => {
      const start = findTermStarts(value, annotation.text)[annotation.occurrence - 1] ?? -1;
      if (start === -1) return [];

      return [{ start, end: start + annotation.text.length }];
    }).sort((left, right) => left.start - right.start);

    if (ranges.length === 0) return value;

    const parts = [];
    let offset = 0;

    for (const [index, range] of ranges.entries()) {
      if (range.start < offset) continue;
      parts.push(value.slice(offset, range.start));
      parts.push(
        <span key={`${range.start}-${index}`} className={styles.termHighlight}>
          {value.slice(range.start, range.end)}
        </span>,
      );
      offset = range.end;
    }

    parts.push(value.slice(offset));
    return parts;
  };

  const showsTermExcerpt = isLongForm && !isExpanded && annotations.length > 0;
  const visibleText = isLongForm && !isExpanded
    ? (showsTermExcerpt ? getExcerptAroundTerm(text, annotations[0]) : getExcerpt(text))
    : text;
  const visibleAnnotations = showsTermExcerpt
    ? annotations.map((annotation) => ({ ...annotation, occurrence: 1 }))
    : annotations;

  return (
    <div
      className={classNames(styles.card, styles[entry.type], className)}
      lang={language === 'stsl' ? 'cu' : 'sr'}
    >
      <p className={classNames(styles.quoteText, {
        [styles.expandedQuote]: isLongForm && isExpanded,
      })}>
        {renderText(visibleText, visibleAnnotations)}
      </p>

      {showAuthor && (
        <div className={styles.authorAttribution}>
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
            —{' '}
            <Link href={`/${language}/authors/${slug}`} className={styles.noLink}>
              {localizedAuthorName}
            </Link>
          </p>
        </div>
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
