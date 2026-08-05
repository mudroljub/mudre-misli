import Link from 'next/link';
import { getTextForLanguage, getAuthorName } from '../lib/data';
import { getTranslation } from '../lib/translations';
import type { Entry, Language } from '../types/data';

interface QuoteCardProps {
  entry: Entry;
  language: Language;
  showAuthor?: boolean;
}

export default function QuoteCard({
  entry,
  language,
  showAuthor = false
}: QuoteCardProps) {
  const t = getTranslation(language);

  return (
    <div className="quote-card">
      <p>{getTextForLanguage(entry, language)}</p>

      {showAuthor && <p className="author-line">— {getAuthorName(entry.author, language)}</p>}

      <Link href={`/quotes/${entry._id}`}>
        {t.viewSource}
      </Link>
    </div>
  );
}