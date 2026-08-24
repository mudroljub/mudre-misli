import worksRaw from '../data/works-index.json'
import type { Work } from '../types/works'
import { slugifyAuthor } from './catalog'

export const worksData = worksRaw as Work[]

export const workAuthorSlug = (work: Pick<Work, 'author'>): string => slugifyAuthor(work.author)

export const findWork = (authorSlug: string, workSlug: string): Work | undefined =>
  worksData.find(work => workAuthorSlug(work) === authorSlug && work.slug === workSlug)

export const findWorkById = (id: string): Work | undefined =>
  worksData.find(work => work.id === id)
