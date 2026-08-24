import { notFound, redirect } from 'next/navigation'
import { supportedLanguages, type Language } from '../../../../../types/data'
import { findWork, workAuthorSlug, worksData } from '../../../../../utils/works'

interface WorkPageProps {
  params: { lang: string; author: string; work: string }
}

export function generateStaticParams(): WorkPageProps['params'][] {
  if (process.env.STATIC_EXPORT !== 'true') return []

  return supportedLanguages.flatMap(lang => worksData.map(work => ({
    lang,
    author: workAuthorSlug(work),
    work: work.slug,
  })))
}

export default function WorkPage({ params }: WorkPageProps) {
  const language = params.lang as Language
  if (!supportedLanguages.includes(language)) redirect('/stsl')
  const work = findWork(params.author, params.work)
  if (!work) notFound()
  redirect(`/${language}/dela/${params.author}/${params.work}/${encodeURIComponent(work.sections[0].anchor)}`)
}
