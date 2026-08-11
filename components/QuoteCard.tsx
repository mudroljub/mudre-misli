'use client';

import Link from "next/link";
import classNames from "classnames";
import { getTextForLanguage, getAuthorName, authorSlugs } from "../utils/data";
import { useTranslations } from "../utils/useTranslations";
import type { Entry, Language } from "../types/data";
import styles from "./QuoteCard.module.scss";

interface QuoteCardProps {
  entry: Entry;
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

  return (
    <div className={classNames(styles.card, styles[entry.type], className)}>
      <p>{text}</p>

      {showAuthor && (
        <p className={styles.authorLine}>
          —{" "}
          <Link href={`/${language}/authors/${slug}`} className={styles.noLink}>
            {transliterate(getAuthorName(authorName, language))}
          </Link>
        </p>
      )}

      {showSource && <Link href={`/${language}/quotes/${entry._id}`} className={styles.sourceLink}>{t.source}</Link>}
    </div>
  );
}
