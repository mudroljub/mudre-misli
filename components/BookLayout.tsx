'use client';

import classNames from "classnames";
import { getTextForLanguage } from "../utils/catalog";
import { useTransliterate } from "../utils/useTransliterate";
import type { Entry, Language } from "../types/data";
import styles from "./BookLayout.module.scss";

interface BookLayoutProps {
  entries: Entry[];
  language: Language;
}

export default function BookLayout({ entries, language }: BookLayoutProps) {
  const transliterate = useTransliterate(language);

  return (
    <div className={styles.book}>
      <div className={styles.page}>
        {entries.map((entry) => (
          <p
            key={entry.id}
            className={classNames(styles.entry, styles[entry.type])}
          >
            {transliterate(getTextForLanguage(entry, language))}
          </p>
        ))}
      </div>
    </div>
  );
}
