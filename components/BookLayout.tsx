'use client';

import { getTextForLanguage } from "../lib/data";
import { useTransliterate } from "../lib/useTransliterate";
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
          <p key={entry._id} className={styles.entry}>
            {transliterate(getTextForLanguage(entry, language))}
          </p>
        ))}
      </div>
    </div>
  );
}
