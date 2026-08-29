'use client';

import { useTransliterate } from '../utils/useTransliterate';
import { greekToLatin, isGreek } from '../utils/greekToLatin';
import type { Language } from '../types/data';
import styles from './TagHeading.module.scss';

interface TagHeadingProps {
  language: Language;
  tag: string;
  translation?: string;
}

export default function TagHeading({ language, tag, translation }: TagHeadingProps) {
  const transliterate = useTransliterate(language);
  const wiktionaryUrl = `https://en.wiktionary.org/wiki/${encodeURIComponent(tag)}`;

  return (
    <header className={styles.heading}>
      <div className={styles.terms}>
        <div>
          <h2 className={styles.greek} lang="grc">{tag}</h2>
          {isGreek(tag) && (
            <div className={styles.greekLatin} lang="grc-Latn">{greekToLatin(tag)}</div>
          )}
        </div>
        {translation && (
          <span className={styles.translation} lang={language === 'stsl' ? 'cu' : 'sr'}>
            {transliterate(translation)}
          </span>
        )}
      </div>
      <a
        className={styles.wiktionary}
        href={wiktionaryUrl}
        target="_blank"
        rel="noreferrer"
        lang="en"
        aria-label={`${tag} — Wiktionary`}
      >
        Wiktionary ↗
      </a>
    </header>
  );
}
