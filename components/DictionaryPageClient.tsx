'use client';

import Sidebar from './Sidebar';
import Header from './Header';
import { getTranslation } from '../lib/translations';
import type { Language } from '../types/data';
import styles from './DictionaryPageClient.module.scss';

interface DictionaryPageClientProps {
  language: Language;
  content: string;
}

export default function DictionaryPageClient({ language, content }: DictionaryPageClientProps) {
  const t = getTranslation(language);

  // Parse markdown table into array of rows
  const lines = content.split('\n');
  const tableStart = lines.findIndex(line => line.startsWith('| Grčki'));
  const tableLines = lines.slice(tableStart + 2); // Skip header and separator

  const entries = tableLines
    .filter(line => line.trim().startsWith('|'))
    .map(line => {
      const columns = line.split('|').map(col => col.trim()).filter(Boolean);
      return {
        greek: columns[0] || '',
        stsl: columns[1] || '',
        sr: columns[2] || '',
      };
    });

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <Header language={language} />
        <h2>{t.navDictionary}</h2>

        <div className={styles.dictionary}>
          <table>
            <thead>
              <tr>
                <th>Grčki</th>
                <th>Staroslovenski</th>
                <th>Srpski</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, idx) => (
                <tr key={idx}>
                  <td className={styles.greek}>{entry.greek}</td>
                  <td className={styles.stsl}>{entry.stsl}</td>
                  <td className={styles.sr}>{entry.sr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
