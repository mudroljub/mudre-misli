import { notFound, redirect } from 'next/navigation'
import WorkReaderClient from '../../../../../../components/WorkReaderClient'
import { supportedLanguages, type Language } from '../../../../../../types/data'
import { findWorkReadingPage, getWorkReadingPages, readWorkSection } from '../../../../../../utils/workFiles'
import { findWorkOriginal } from '../../../../../../utils/workOriginals'
import { findWork, workAuthorSlug, worksData } from '../../../../../../utils/works'

interface WorkSectionPageProps {
  params: { lang: string; author: string; work: string; section: string }
}

export function generateStaticParams(): WorkSectionPageProps['params'][] {
  if (process.env.STATIC_EXPORT !== 'true') return []

  return supportedLanguages.flatMap(lang => worksData.flatMap(work =>
    getWorkReadingPages(work).map(page => ({
      lang,
      author: workAuthorSlug(work),
      work: work.slug,
      section: work.sections[page.startIndex].anchor,
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
  const page = findWorkReadingPage(work, sectionIndex)
  const sections = work.sections.slice(page.startIndex, page.endIndex + 1).map(section => ({
    section,
    text: readWorkSection(work, section, language),
    original: findWorkOriginal(work.id, section.anchor),
  }))
  const readingPages = getWorkReadingPages(work)
  const pageIndex = readingPages.findIndex(item => item.startIndex === page.startIndex)
  return <WorkReaderClient language={language} work={work} sections={sections} readingPages={readingPages} pageIndex={pageIndex} authorSlug={params.author} />
}
