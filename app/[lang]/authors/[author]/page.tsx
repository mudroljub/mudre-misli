import { notFound, redirect } from 'next/navigation';
import { supportedLanguages } from '../../../../types/data';
import { authorsData, quotesData, authorFromSlug, authorSlugs } from '../../../../utils/data';
import AuthorPageClient from '../../../../components/AuthorPageClient';
import type { Language } from '../../../../types/data';

interface AuthorPageProps {
  params: {
    lang: string;
    author: string;
  };
}

export function generateStaticParams(): AuthorPageProps['params'][] {
  const params: AuthorPageProps['params'][] = [];

  for (const lang of supportedLanguages) {
    for (const slug of Object.values(authorSlugs)) {
      params.push({ lang, author: slug });
    }
  }

  return params;
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const lang = params.lang as Language;

  if (!supportedLanguages.includes(lang)) {
    redirect('/stsl');
  }

  const author = authorFromSlug[params.author];

  if (!author) {
    notFound();
  }

  const authorData = authorsData[author];

  if (!authorData) {
    notFound();
  }

  const authorEntries = quotesData.filter((entry) =>
    Array.isArray(entry.author) ? entry.author.includes(author) : entry.author === author
  );

  return <AuthorPageClient author={author} authorData={authorData} authorEntries={authorEntries} language={lang} />;
}
