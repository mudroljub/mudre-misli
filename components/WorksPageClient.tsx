'use client'

import Header from './Header'
import Sidebar from './Sidebar'
import WorkCover from './WorkCover'
import { authorsData, getAuthorName } from '../utils/catalog'
import { useTranslations } from '../utils/useTranslations'
import { getLocalizedWorkText, type Work } from '../types/works'
import type { Language } from '../types/data'
import styles from './WorksPageClient.module.scss'

interface WorksPageClientProps {
  language: Language
  works: Work[]
}

export default function WorksPageClient({ language, works }: WorksPageClientProps) {
  const { t, transliterate } = useTranslations(language)
  const sortedWorks = [...works].sort((left, right) => {
    const birthYearOrder = (authorsData[left.author]?.born ?? Number.POSITIVE_INFINITY)
      - (authorsData[right.author]?.born ?? Number.POSITIVE_INFINITY)

    if (birthYearOrder !== 0) return birthYearOrder

    const leftAuthor = transliterate(getAuthorName(left.author, language))
    const rightAuthor = transliterate(getAuthorName(right.author, language))
    const authorOrder = leftAuthor.localeCompare(rightAuthor, language === 'sr' ? 'sr' : undefined)

    if (authorOrder !== 0) return authorOrder

    return transliterate(getLocalizedWorkText(left.title, language)).localeCompare(
      transliterate(getLocalizedWorkText(right.title, language)),
      language === 'sr' ? 'sr' : undefined,
    )
  })
  const worksByAuthor = sortedWorks.reduce<Array<{ author: string; works: Work[] }>>((groups, work) => {
    const author = transliterate(getAuthorName(work.author, language))
    const currentGroup = groups[groups.length - 1]

    if (currentGroup?.author === author) {
      currentGroup.works.push(work)
    } else {
      groups.push({ author, works: [work] })
    }

    return groups
  }, [])

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <h2>{t.workUi.allWorks}</h2>
        <div className={styles.catalog}>
          {worksByAuthor.map(group => (
            <section className={styles.authorGroup} key={group.author}>
              <h3 className={styles.authorHeading}>{group.author}</h3>
              <div className={styles.grid}>
                {group.works.map(work => (
                  <WorkCover language={language} work={work} key={work.id} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  )
}
