import { notFound } from 'next/navigation';
import { authorsData, quotesData, authorFromSlug, authorSlugs } from '@/lib/data';
import AuthorPageClient from '@/components/AuthorPageClient';

export function generateStaticParams() {
  return Object.values(authorSlugs).map((slug) => ({ author: slug }));
}

export default function AuthorPage({ params }) {
  const author = authorFromSlug[params.author] || null;

  if (!author || !authorsData[author]) {
    notFound();
  }

  const authorMeta = authorsData[author];
  const authorQuotes = quotesData.filter((quote) => quote.author === author);

  return <AuthorPageClient author={author} authorMeta={authorMeta} authorQuotes={authorQuotes} />;
}
