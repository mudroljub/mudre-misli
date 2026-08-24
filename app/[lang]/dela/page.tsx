import { redirect } from 'next/navigation'
import WorksPageClient from '../../../components/WorksPageClient'
import { supportedLanguages, type Language } from '../../../types/data'
import { worksData } from '../../../utils/works'

interface WorksPageProps {
  params: { lang: string }
}

export function generateStaticParams(): WorksPageProps['params'][] {
  return supportedLanguages.map(lang => ({ lang }))
}

export default function WorksPage({ params }: WorksPageProps) {
  const language = params.lang as Language
  if (!supportedLanguages.includes(language)) redirect('/stsl')
  return <WorksPageClient language={language} works={worksData} />
}
