import { notFound, redirect } from 'next/navigation'
import WorkReaderClient from '../../../../../../components/WorkReaderClient'
import { supportedLanguages, type Language } from '../../../../../../types/data'
import { readWorkSection } from '../../../../../../utils/workFiles'
import { findWorkOriginal } from '../../../../../../utils/workOriginals'
import { findWork, workAuthorSlug, worksData } from '../../../../../../utils/works'

interface WorkSectionPageProps {
  params: { lang: string; author: string; work: string; section: string }
}

export function generateStaticParams(): WorkSectionPageProps['params'][] {
  return supportedLanguages.flatMap(lang => worksData.flatMap(work =>
    work.sections.map(section => ({
      lang,
      author: workAuthorSlug(work),
      work: work.slug,
      section: section.anchor,
    })),
  ))
}

export default function WorkSectionPage({ params }: WorkSectionPageProps) {
  const language = params.lang as Language
  if (!supportedLanguages.includes(language)) redirect('/stsl')
  const work = findWork(params.author, params.work)
  if (!work) notFound()
  const sectionIndex = work.sections.findIndex(section => section.anchor === decodeURIComponent(params.section))
  if (sectionIndex < 0) notFound()
  const text = readWorkSection(work, work.sections[sectionIndex], language)
  const original = findWorkOriginal(work.id, work.sections[sectionIndex].anchor)
  return <WorkReaderClient language={language} work={work} sectionIndex={sectionIndex} text={text} original={original} authorSlug={params.author} />
}
