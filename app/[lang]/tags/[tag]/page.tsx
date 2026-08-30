import { notFound, redirect } from 'next/navigation';
import fs from 'node:fs';
import path from 'node:path';
import { supportedLanguages } from '../../../../types/data';
import { quotesData } from '../../../../utils/quotes';
import { findDictionaryEntry } from '../../../../utils/dictionary';
import QuoteCard from '../../../../components/QuoteCard';
import Sidebar from '../../../../components/Sidebar';
import Header from '../../../../components/Header';
import TagHeading from '../../../../components/TagHeading';
import { authorsData } from '../../../../utils/catalog';
import type { Language, Entry } from '../../../../types/data';
import styles from './page.module.scss';

interface TagPageProps {
  params: {
    lang: string;
    tag: string;
  };
}

export function generateStaticParams(): TagPageProps['params'][] {
  if (process.env.STATIC_EXPORT !== 'true') return [];

  const params: TagPageProps['params'][] = [];

  // Collect all unique tags from quotes
  const allTags = new Set<string>();
  for (const entry of quotesData) {
    if (entry.tags) {
      entry.tags.forEach(tag => allTags.add(tag));
    }
  }

  // Generate params for each language + tag combination
  for (const lang of supportedLanguages) {
    for (const tag of allTags) {
      // Return URL-encoded tag for static export
      params.push({ lang, tag: encodeURIComponent(tag) });
    }
  }

  return params;
}

export default function TagPage({ params }: TagPageProps) {
  const lang = params.lang as Language;
  // Decode the tag from URL
  const tag = decodeURIComponent(params.tag);

  if (!supportedLanguages.includes(lang)) {
    redirect('/stsl');
  }

  // Filter quotes that have this tag
  const taggedEntries = quotesData.filter((entry): entry is Extract<Entry, { type: 'quote' | 'reported' }> => {
    return (entry.type === 'quote' || entry.type === 'reported') && (entry.tags?.includes(tag) ?? false);
  }).sort((left, right) => {
    const leftAuthor = Array.isArray(left.author) ? left.author[0] : left.author;
    const rightAuthor = Array.isArray(right.author) ? right.author[0] : right.author;
    const byBirth = (authorsData[leftAuthor]?.born ?? Number.MAX_SAFE_INTEGER)
      - (authorsData[rightAuthor]?.born ?? Number.MAX_SAFE_INTEGER);

    return byBirth || leftAuthor.localeCompare(rightAuthor, 'sr') || left.id.localeCompare(right.id);
  });

  if (taggedEntries.length === 0) {
    notFound();
  }

  const dictionaryPath = path.join(process.cwd(), 'docs', 'RECNIK.md');
  const dictionaryContent = fs.readFileSync(dictionaryPath, 'utf8');
  const dictionaryEntry = findDictionaryEntry(dictionaryContent, tag);
  const translation = dictionaryEntry?.[lang];

  return (
    <main className="page-shell">
      <Sidebar language={lang} />

      <section className={styles.content}>
        <Header language={lang} />

        <TagHeading language={lang} tag={tag} translation={translation} />

        <div className={styles.grid}>
          {taggedEntries.map((entry) => (
            <QuoteCard
              key={entry.id}
              entry={entry}
              language={lang}
              showAuthor={true}
              highlightTag={tag}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
