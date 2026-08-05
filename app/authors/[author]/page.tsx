import { notFound } from 'next/navigation';
import { authorsData, quotesData, authorFromSlug, authorSlugs } from '../../../lib/data';
import AuthorPageClient from '../../../components/AuthorPageClient';

interface AuthorPageProps {
  params: {
    author: string;
  };
}

export function generateStaticParams(): AuthorPageProps['params'][] {
  return Object.values(authorSlugs).map((author) => ({ author }));
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = authorFromSlug[params.author];

  if (!author) {
    notFound();
  }

  const authorData = authorsData[author];

  if (!authorData) {
    notFound();
  }

  const authorEntries = quotesData.filter((entry) => entry.author === author);

  return <AuthorPageClient author={author} authorData={authorData} authorEntries={authorEntries} />;
}
