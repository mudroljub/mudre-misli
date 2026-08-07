'use client';

import LanguageSwitcher from './LanguageSwitcher';
import Navigation from './Navigation';
import type { Language } from '../types/data';
import styles from './Header.module.scss';

interface HeaderProps {
  language: Language;
}

export default function Header({ language }: HeaderProps) {
  return (
    <div className={styles.header}>
      <Navigation language={language} />
      <LanguageSwitcher currentLang={language} />
    </div>
  );
}
