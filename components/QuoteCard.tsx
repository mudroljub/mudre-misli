import Link from 'next/link';
import { getTextForLanguage } from '../lib/data';
import { getTranslation } from '../lib/translations';
import type { Entry, Language } from '../types/data';

interface QuoteCardProps {
  entry: Entry;
  language: Language;
}

export default function QuoteCard({
  entry,
  language,
}: QuoteCardProps) {
  const t = getTranslation(language);

  return (
    <div className="quote-card">
      <p>{getTextForLanguage(entry, language)}</p>

      <Link href={`/quotes/${entry._id}`}>
        {t.viewSource}
      </Link>
    </div>
  );
}