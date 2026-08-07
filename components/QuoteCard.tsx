import Link from "next/link";
import { getTextForLanguage, getAuthorName, authorSlugs } from "../lib/data";
import { getTranslation } from "../lib/translations";
import type { Entry, Language } from "../types/data";
import styles from "./QuoteCard.module.scss";

interface QuoteCardProps {
  entry: Entry;
  language: Language;
  showAuthor?: boolean;
  showSource?: boolean;
}

export default function QuoteCard({
  entry,
  language,
  showAuthor = false,
  showSource = true,
}: QuoteCardProps) {
  const t = getTranslation(language);
  const authorName = Array.isArray(entry.author) ? entry.author[0] : entry.author;
  const slug = authorSlugs[authorName];

  return (
    <div className={styles.card}>
      <p>{getTextForLanguage(entry, language)}</p>

      {showAuthor && (
        <p className={styles.authorLine}>
          —{" "}
          <Link href={`/authors/${slug}`} className={styles.noLink}>
            {getAuthorName(authorName, language)}
          </Link>
        </p>
      )}

      {showSource && <Link href={`/quotes/${entry._id}`} className={styles.sourceLink}>{t.source}</Link>}
    </div>
  );
}
