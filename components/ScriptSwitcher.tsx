'use client';

import { getTranslation } from '../lib/translations';
import type { Language } from '../types/data';
import type { Script } from '../lib/transliterate';
import styles from './ScriptSwitcher.module.scss';

interface ScriptSwitcherProps {
  language: Language;
  currentScript: Script | null;
  onScriptChange: (script: Script) => void;
}

export default function ScriptSwitcher({ language, currentScript, onScriptChange }: ScriptSwitcherProps) {
  const t = getTranslation(language);

  return (
    <div className={styles.switch}>
      <button
        type="button"
        onClick={() => onScriptChange('cyr')}
        className={currentScript === 'cyr' ? styles.active : ''}
      >
        {t.scriptCyr}
      </button>
      <button
        type="button"
        onClick={() => onScriptChange('lat')}
        className={currentScript === 'lat' ? styles.active : ''}
      >
        {t.scriptLat}
      </button>
    </div>
  );
}
