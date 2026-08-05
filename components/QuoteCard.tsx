import Link from "next/link";
import { getTextForLanguage, getAuthorName, authorSlugs } from "../lib/data";
import { getTranslation } from "../lib/translations";
import type { Entry, Language } from "../types/data";

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
  const slug = authorSlugs[entry.author];

  return (
    <div className="quote-card">
      <p>{getTextForLanguage(entry, language)}</p>

      {showAuthor && (
        <p className="author-line">
          —{" "}
          <Link href={`/authors/${slug}`} className="plain-link">
            {getAuthorName(entry.author, language)}
          </Link>
        </p>
      )}

      {showSource && <Link href={`/quotes/${entry._id}`}>{t.viewSource}</Link>}
    </div>
  );
}
