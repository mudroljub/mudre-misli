import { redirect } from 'next/navigation';
import { supportedLanguages } from '../../types/data';
import { quotesData } from '../../lib/data';
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

  // Use first quote for static generation (deterministic)
  // Client-side randomization happens in HomeContent component
  const featured = quotesData[0];

  if (!featured) {
    return <main className="content">Nema dostupnih citata.</main>;
  }

  return <HomeContent featured={featured} language={lang} />;
}
