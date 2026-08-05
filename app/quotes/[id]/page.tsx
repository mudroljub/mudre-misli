import { notFound } from 'next/navigation';
import { authorsData, quotesData } from '../../../lib/data';
import QuotePageClient from '../../../components/QuotePageClient';

interface QuotePageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams(): QuotePageProps['params'][] {
  return quotesData.map((entry) => ({ id: String(entry._id) }));
}

export default function QuotePage({ params }: QuotePageProps) {
  const id = Number(params.id);
  const quote = quotesData.find((entry) => entry._id === id);

  if (!quote) {
    notFound();
  }

  const authorData = authorsData[quote.author];

  return <QuotePageClient quote={quote} authorData={authorData} />;
}
