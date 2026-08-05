import { getTextForLanguage } from "../lib/data";
import type { Entry, Language } from "../types/data";
import styles from "./BookLayout.module.scss";

interface BookLayoutProps {
  entries: Entry[];
  language: Language;
}

export default function BookLayout({ entries, language }: BookLayoutProps) {
  return (
    <div className={styles.book}>
      <div className={styles.page}>
        {entries.map((entry) => (
          <p key={entry._id} className={styles.entry}>
            {getTextForLanguage(entry, language)}
          </p>
        ))}
      </div>
    </div>
  );
}
