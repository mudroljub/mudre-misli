'use client';

import { useState } from 'react';

const languages = ['sr', 'ms', 'en'];

export default function LanguageSwitcher({ currentLang = 'sr', onChange }) {
  const [selected, setSelected] = useState(currentLang);

  const changeLanguage = (lang) => {
    setSelected(lang);
    onChange?.(lang);
  };

  return (
    <div className="language-switch">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          disabled={selected === lang}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
