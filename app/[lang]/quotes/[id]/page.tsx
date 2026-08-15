import { notFound, redirect } from 'next/navigation';
import { supportedLanguages } from '../../../../types/data';
import { authorsData } from '../../../../utils/catalog';
import { quotesData } from '../../../../utils/quotes';
import QuotePageClient from '../../../../components/QuotePageClient';
import type { Language } from '../../../../types/data';

interface QuotePageProps {
  params: {
    lang: string;
    id: string;
  };
}

export function generateStaticParams(): QuotePageProps['params'][] {
  if (process.env.NODE_ENV === 'development') {
    return [];
  }

  const params: QuotePageProps['params'][] = [];

  for (const lang of supportedLanguages) {
    for (const entry of quotesData) {
      params.push({ lang, id: entry.id });
    }
  }

  return params;
}

export default function QuotePage({ params }: QuotePageProps) {
  const lang = params.lang as Language;

  if (!supportedLanguages.includes(lang)) {
    redirect('/stsl');
  }

  const quote = quotesData.find((entry) => entry.id === params.id);

  if (!quote) {
    notFound();
  }

  const authorName = Array.isArray(quote.author) ? quote.author[0] : quote.author;
  const authorData = authorsData[authorName];

  return <QuotePageClient quote={quote} authorData={authorData} language={lang} />;
}
