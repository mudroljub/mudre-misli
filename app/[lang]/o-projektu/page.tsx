import { redirect } from 'next/navigation'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import { supportedLanguages, type Language } from '../../../types/data'
import { getTranslation } from '../../../utils/translations'
import styles from './page.module.scss'

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

  const t = getTranslation(language)

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <article className={styles.about}>
          <h2>{t.navAbout}</h2>
          <p>
            🏛️ Училище Мѫдрости Блатьнограда je zamišljena slovenska filozofska
            škola iz 9. veka koje se nalazila u Blatogradu, jednom od središta
            panonskih Slovena. Tamo su u to vreme boravili Ćirilo (Konstantin
            Filozof) i Metodije sa 50-ak učenika, a grad je postao značajno
            središte slovenske pismenosti. Ovaj projekat pokušava da dočara kako
            bi izgledale studije filozofije da su Sloveni imali univerzitete u
            srednjem veku i kakav bi bio slovenski učeni jezik toga vremena.
          </p>
        </article>
      </section>
    </main>
  )
}
