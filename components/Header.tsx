'use client';

import LanguageSwitcher from './LanguageSwitcher';
import ScriptSwitcher from './ScriptSwitcher';
import Navigation from './Navigation';
import { useScript } from '../contexts/ScriptContext';
import type { Language } from '../types/data';
import styles from './Header.module.scss';

interface HeaderProps {
  language: Language;
}

export default function Header({ language }: HeaderProps) {
  const { script, setScript } = useScript();

  return (
    <div className={styles.header}>
      <Navigation language={language} />
      <div className={styles.controls}>
        <ScriptSwitcher
          language={language}
          currentScript={script}
          onScriptChange={setScript}
        />
        <LanguageSwitcher currentLang={language} />
      </div>
    </div>
  );
}
