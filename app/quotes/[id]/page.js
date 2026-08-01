import { notFound } from 'next/navigation';
import { authorsData, quotesData } from '@/lib/data';
import QuotePageClient from '@/components/QuotePageClient';

export function generateStaticParams() {
  return quotesData.map((quote) => ({ id: String(quote._id) }));
}

export default function QuotePage({ params }) {
  const id = Number(params.id);
  const quote = quotesData.find((item) => item._id === id);

  if (!quote) {
    notFound();
  }

  const authorMeta = authorsData[quote.author] || {};

  return <QuotePageClient quote={quote} authorMeta={authorMeta} />;
}
