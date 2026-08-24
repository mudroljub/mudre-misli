import { redirect } from 'next/navigation'
import { supportedLanguages, type Language } from '../../../types/data'
import AboutPageClient from './AboutPageClient'

interface AboutPageProps {
  params: {
    lang: string
  }
}

export function generateStaticParams(): AboutPageProps['params'][] {
  return supportedLanguages.map(lang => ({ lang }))
}

export default function AboutPage({ params }: AboutPageProps) {
  const language = params.lang as Language

  if (!supportedLanguages.includes(language)) {
    redirect('/stsl')
  }

  return <AboutPageClient language={language} />
}
