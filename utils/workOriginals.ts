import 'server-only'
import originalsRaw from '../data/work-originals.json'
import type { WorkOriginal } from '../types/works'

const originals = originalsRaw as Record<string, WorkOriginal>

export const findWorkOriginal = (workId: string, anchor: string): WorkOriginal | undefined =>
  originals[`${workId}#${anchor}`]
