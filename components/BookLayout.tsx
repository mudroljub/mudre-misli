'use client';

import classNames from "classnames";
import { getSourceCitation, getTextForLanguage } from "../utils/catalog";
import { useTransliterate } from "../utils/useTransliterate";
import { useTranslations } from '../utils/useTranslations';
import type { Entry, Language } from "../types/data";
import styles from "./BookLayout.module.scss";

interface BookLayoutProps {
  entries: Entry[];
  language: Language;
}

export default function BookLayout({ entries, language }: BookLayoutProps) {
  const transliterate = useTransliterate(language);
  const { t } = useTranslations(language);

  return (
    <div className={styles.book}>
      <div className={styles.page}>
        {entries.map((entry) => {
          const sourceCitation = entry.sources
            .map((source) => transliterate(getSourceCitation(source, language)))
            .join('; ');
          return (
            <p
              key={entry.id}
              className={classNames(styles.entry, styles[entry.type])}
            >
              {transliterate(getTextForLanguage(entry, language))}
              {sourceCitation && (
                <span
                  className={styles.sourceInfo}
                  aria-label={`${t.source}: ${sourceCitation}`}
                  title={sourceCitation}
                >
                  ⓘ
                </span>
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}
