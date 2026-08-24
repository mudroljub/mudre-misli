'use client'

import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import type { Language } from '../../../types/data'
import { useTranslations } from '../../../utils/useTranslations'
import { withBasePath } from '../../../utils/helpers'
import styles from './page.module.scss'

interface AboutPageClientProps {
  language: Language
}

export default function AboutPageClient({ language }: AboutPageClientProps) {
  const { t } = useTranslations(language)

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <article className={styles.about}>
          <h2>{t.navAbout}</h2>
          <p>{t.about.intro}</p>

          <figure>
            <img src={withBasePath('/images/Blatnograd.jpg')} alt={t.about.schoolImageAlt} />
            <figcaption>{t.about.schoolCaption}</figcaption>
          </figure>

          <p>{t.about.balatongrad}</p>

          <figure>
            <img src={withBasePath('/images/Grande_Moravie.png')} alt={t.about.mapImageAlt} />
            <figcaption>{t.about.mapCaption}</figcaption>
          </figure>

          <p>{t.about.tradition}</p>

          <figure>
            <img
              src={withBasePath('/images/Bratia_sv._Cyril_a_Metod_Sečovce_19_Slovensko.jpg')}
              alt={t.about.cyrilMethodiusImageAlt}
            />
            <figcaption>{t.about.cyrilMethodiusCaption}</figcaption>
          </figure>
        </article>
      </section>
    </main>
  )
}
