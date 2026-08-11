import { notFound, redirect } from 'next/navigation';
import { supportedLanguages } from '../../../../types/data';
import { authorsData, quotesData } from '../../../../utils/data';
import QuotePageClient from '../../../../components/QuotePageClient';
import type { Language } from '../../../../types/data';

interface QuotePageProps {
  params: {
    lang: string;
    id: string;
  };
}

export function generateStaticParams(): QuotePageProps['params'][] {
  const params: QuotePageProps['params'][] = [];

  for (const lang of supportedLanguages) {
    for (const entry of quotesData) {
      params.push({ lang, id: String(entry._id) });
    }
  }

  return params;
}

export default function QuotePage({ params }: QuotePageProps) {
  const lang = params.lang as Language;

  if (!supportedLanguages.includes(lang)) {
    redirect('/stsl');
  }

  const id = Number(params.id);
  const quote = quotesData.find((entry) => entry._id === id);

  if (!quote) {
    notFound();
  }

  const authorName = Array.isArray(quote.author) ? quote.author[0] : quote.author;
  const authorData = authorsData[authorName];

  return <QuotePageClient quote={quote} authorData={authorData} language={lang} />;
}
