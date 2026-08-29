'use client';

import Link from 'next/link';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTranslations } from '../utils/useTranslations';
import { useTransliterate } from '../utils/useTransliterate';
import { greekToLatin, isGreek } from '../utils/greekToLatin';
import type { Language } from '../types/data';
import styles from './DictionaryPageClient.module.scss';

interface DictionaryPageClientProps {
  language: Language;
  content: string;
  tags: string[];
}

// Simple markdown parser for italic and bold
function parseMarkdown(text: string) {
  // Parse italic *text* and bold **text**
  const parts: Array<{ text: string; italic?: boolean; bold?: boolean }> = [];
  let current = '';
  let i = 0;

  while (i < text.length) {
    if (text[i] === '*') {
      if (text[i + 1] === '*') {
        // Bold
        if (current) parts.push({ text: current });
        current = '';
        i += 2;
        let boldText = '';
        while (i < text.length && !(text[i] === '*' && text[i + 1] === '*')) {
          boldText += text[i++];
        }
        parts.push({ text: boldText, bold: true });
        i += 2;
      } else {
        // Italic
        if (current) parts.push({ text: current });
        current = '';
        i += 1;
        let italicText = '';
        while (i < text.length && text[i] !== '*') {
          italicText += text[i++];
        }
        parts.push({ text: italicText, italic: true });
        i += 1;
      }
    } else {
      current += text[i++];
    }
  }

  if (current) parts.push({ text: current });
  return parts;
}

export default function DictionaryPageClient({ language, content, tags }: DictionaryPageClientProps) {
  const { t } = useTranslations(language);
  const transliterateStsl = useTransliterate('stsl');
  const transliterateSr = useTransliterate('sr');
  const allTags = new Set(tags);

  // Parse markdown table into array of rows
  // Remove HTML comments
  let cleanedContent = content;
  cleanedContent = cleanedContent.replace(/<!--[\s\S]*?-->/g, '');

  const cleanedLines = cleanedContent.split('\n');
  const cleanedTableStart = cleanedLines.findIndex(line => line.startsWith('| Grčki'));
  const tableLines = cleanedLines.slice(cleanedTableStart + 2); // Skip header and separator

  const entries = tableLines
    .filter(line => line.trim().startsWith('|') && line.trim() !== '|')
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
        <h2>{t.dictionaryTitle}</h2>

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
              {entries.map((entry, idx) => {
                // Check if this Greek term has a tag
                const hasTag = allTags.has(entry.greek);
                const plainGreek = entry.greek.replace(/\*/g, '');

                return (
                  <tr key={idx} className={hasTag ? styles.linkedTerm : styles.unlinkedTerm}>
                    <td className={styles.greek} lang="grc">
                      {hasTag ? (
                        <Link href={`/${language}/tags/${encodeURIComponent(entry.greek)}`} className={styles.tagLink}>
                          <span className={styles.linkLabel}>
                            {parseMarkdown(entry.greek).map((part, i) => (
                              part.bold ? <strong key={i}>{part.text}</strong> :
                              part.italic ? <em key={i}>{part.text}</em> :
                              <span key={i}>{part.text}</span>
                            ))}
                          </span>
                        </Link>
                      ) : (
                        parseMarkdown(entry.greek).map((part, i) => (
                          part.bold ? <strong key={i}>{part.text}</strong> :
                          part.italic ? <em key={i}>{part.text}</em> :
                          <span key={i}>{part.text}</span>
                        ))
                      )}
                      {isGreek(plainGreek) && (
                        <span lang="grc-Latn" className={styles.greekLatin}>
                          {greekToLatin(plainGreek)}
                        </span>
                      )}
                    </td>
                    <td className={styles.stsl} lang="cu">
                      {parseMarkdown(entry.stsl).map((part, i) => (
                        part.bold ? <strong key={i}>{transliterateStsl(part.text)}</strong> :
                        part.italic ? <em key={i}>{transliterateStsl(part.text)}</em> :
                        <span key={i}>{transliterateStsl(part.text)}</span>
                      ))}
                    </td>
                    <td className={styles.sr} lang="sr">
                      {parseMarkdown(entry.sr).map((part, i) => (
                        part.bold ? <strong key={i}>{transliterateSr(part.text)}</strong> :
                        part.italic ? <em key={i}>{transliterateSr(part.text)}</em> :
                        <span key={i}>{transliterateSr(part.text)}</span>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
