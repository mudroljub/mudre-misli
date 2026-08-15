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
            Училище Блатьнограда je zamišljena slovenska filozofska
            škola iz 9. veka koje se nalazila u Blatnogradu, tadašnjem sedištu
            panonskih Slovena i jednom od prvih središta slovenske pismenosti. Ovaj projekat pokušava dočarati kako
            bi izgledao studij filozofije da su Sloveni imali univerzitete u
            srednjem veku, i kakav bi bio učeni slovenski jezik toga vremena.
          </p>

          <figure>
            <img src="/images/Blatnograd.jpg" alt="Blatnohrad" />
            <figcaption>Učilište Blatnograda, savremena rekonstrukcija</figcaption>
          </figure>

           <p>
            U Blatnogradu su u 9. veku boravili Konstantin
            Filozof (poznat kao Ćirilo) i brat njegov Metodije, koji su doneli pismo Slovenima. Tu su osnovali slovensku školu sa 50-ak učenika, a grad je postao značajno središte slovenske pismenosti. 
          </p>

          <figure>
            <img src="/images/Bratia_sv._Cyril_a_Metod_Sečovce_19_Slovensko.jpg" alt="Kiril i Metod" />
            <figcaption>Konstantin Filozof i brat njegov Metod, donositelji pismenosti.</figcaption>
          </figure>

          <p>Blatnograd, na obali Blatnog jezera, bio je prestonica Blatenske zemlje (Блатьньскъ), koja je povezivala južne i zapadne Slovene pre dolaska Ugara.</p>

          <figure>
            <img src="/images/Grande_Moravie.png" alt="Blatenska i Velika Moravska" />
            <figcaption>Blatenska zemlja između Hrvatske i Velike Moravske.</figcaption>
          </figure>
        </article>
      </section>
    </main>
  )
}
