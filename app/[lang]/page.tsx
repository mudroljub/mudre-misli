import { redirect } from 'next/navigation';
import { supportedLanguages } from '../../types/data';
import { quotesData } from '../../utils/quotes';
import HomeContent from '../../components/HomeContent';
import type { Language } from '../../types/data';

interface LangPageProps {
  params: {
    lang: string;
  };
}

export function generateStaticParams(): LangPageProps['params'][] {
  return supportedLanguages.map((lang) => ({ lang }));
}

export default function LangPage({ params }: LangPageProps) {
  const lang = params.lang as Language;

  if (!supportedLanguages.includes(lang)) {
    redirect('/stsl');
  }

  // Keep client hydration light while preserving a broad, deterministic
  // sample across the complete chronologically ordered corpus.
  const filteredQuotes = quotesData.filter((item) => item.type === 'quote');

  const poolSize = Math.min(128, filteredQuotes.length);
  const quotePool = Array.from({ length: poolSize }, (_, index) => {
    const sourceIndex = Math.floor((index * filteredQuotes.length) / poolSize);
    return filteredQuotes[sourceIndex];
  }).map(({ id, type, sr, stsl, author, display }) => ({
    id,
    type,
    sr,
    stsl,
    author,
    display,
  }));

  if (quotePool.length === 0) {
    return <main className="content">Nema dostupnih citata.</main>;
  }

  return <HomeContent quotePool={quotePool} language={lang} />;
}
