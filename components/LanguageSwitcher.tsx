'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { languages } from '../lib/data';
import type { Language } from '../types/data';
import styles from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
  currentLang: Language;
}

const languageNames: Record<Language, string> = {
  stsl: 'Словѣньскъ',
  sr: 'Srpski',
};

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
      {languages.map((language) => (
        <Link
          key={language}
          href={getPathForLanguage(language)}
          className={currentLang === language ? styles.active : ''}
        >
          {languageNames[language]}
        </Link>
      ))}
    </div>
  );
}
