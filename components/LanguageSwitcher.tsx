'use client';

import { useState } from 'react';
import { languages } from '../lib/data';
import type { Language } from '../types/data';

interface LanguageSwitcherProps {
  currentLang?: Language;
  onChange?: (language: Language) => void;
}

const languageNames: Record<Language, string> = {
  stsl: 'Словѣньскъ',
  sr: 'Srpski',
  el: 'Ελληνικά',
};

export default function LanguageSwitcher({
  currentLang = 'stsl',
  onChange,
}: LanguageSwitcherProps) {
  const [selected, setSelected] = useState<Language>(currentLang);

  const changeLanguage = (language: Language): void => {
    setSelected(language);
    onChange?.(language);
  };

  return (
    <div className="language-switch">
      {languages.map((language) => (
        <button
          type="button"
          key={language}
          onClick={() => changeLanguage(language)}
          disabled={selected === language}
        >
          {languageNames[language]}
        </button>
      ))}
    </div>
  );
}
