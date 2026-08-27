'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { languages } from '../utils/catalog';
import type { Language } from '../types/data';
import styles from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
  currentLang: Language;
}

const languageNames: Record<Language, string> = {
  stsl: 'Словѣньскъ',
  sr: 'Srpski',
};

const LANGUAGE_SWITCH_TARGET_KEY = 'mudre-misli:language-switch-target';

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const getPathForLanguage = (language: Language): string => {
    // Extract path segments after the language code
    const segments = pathname.split('/').filter(Boolean);

    // If current path starts with a language code, replace it
    if (segments.length > 0 && languages.includes(segments[0] as Language)) {
      segments[0] = language;
      return `/${segments.join('/')}`;
    }

    // Otherwise prepend the language
    return `/${language}${pathname === '/' ? '' : pathname}`;
  };

  return (
    <div className={styles.switch}>
      {languages.map((language) => {
        const targetPath = getPathForLanguage(language);

        return (
          <Link
            key={language}
            href={targetPath}
            className={currentLang === language ? styles.active : ''}
            onClick={() => {
              if (language !== currentLang) {
                sessionStorage.setItem(LANGUAGE_SWITCH_TARGET_KEY, targetPath);
              }
            }}
          >
            {languageNames[language]}
          </Link>
        );
      })}
    </div>
  );
}
