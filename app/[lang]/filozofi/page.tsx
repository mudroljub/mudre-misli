import { redirect } from 'next/navigation';
import { supportedLanguages } from '../../../types/data';
import PhilosophersPageClient from '../../../components/PhilosophersPageClient';
import type { Language } from '../../../types/data';

interface PhilosophersPageProps {
  params: {
    lang: string;
  };
}

export function generateStaticParams(): PhilosophersPageProps['params'][] {
  return supportedLanguages.map((lang) => ({ lang }));
}

export default function PhilosophersPage({ params }: PhilosophersPageProps) {
  const lang = params.lang as Language;

  if (!supportedLanguages.includes(lang)) {
    redirect('/stsl');
  }

  return <PhilosophersPageClient language={lang} />;
}
