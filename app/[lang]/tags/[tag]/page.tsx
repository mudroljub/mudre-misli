import { notFound, redirect } from 'next/navigation';
import { supportedLanguages } from '../../../../types/data';
import { quotesData } from '../../../../lib/data';
import QuoteCard from '../../../../components/QuoteCard';
import Sidebar from '../../../../components/Sidebar';
import Header from '../../../../components/Header';
import type { Language, Entry } from '../../../../types/data';
import styles from './page.module.scss';

interface TagPageProps {
  params: {
    lang: string;
    tag: string;
  };
}

export function generateStaticParams(): TagPageProps['params'][] {
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
  });

  if (taggedEntries.length === 0) {
    notFound();
  }

  return (
    <main className="page-shell">
      <Sidebar language={lang} />

      <section className={styles.content}>
        <Header language={lang} />

        <h2 className={styles.tagTitle}>
          {tag}
        </h2>

        <p className={styles.count}>
          {taggedEntries.length} {taggedEntries.length === 1 ? 'citat' : 'citata'}
        </p>

        <div className={styles.grid}>
          {taggedEntries.map((entry) => (
            <QuoteCard
              key={entry._id}
              entry={entry}
              language={lang}
              showAuthor={true}
              className={styles.alignLeft}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
