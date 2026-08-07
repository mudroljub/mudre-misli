import { useScript } from '../contexts/ScriptContext';
import { transliterate } from './transliterate';
import type { Language } from '../types/data';

export function useTransliterate(language: Language) {
  const { script } = useScript();

  return (text: string): string => {
    const lang = language === 'sr' ? 'sr' : 'stsl';

    // For Serbian: data is in Latin, convert to Cyrillic first, then optionally back to Latin
    if (language === 'sr') {
      if (script === 'cyr') {
        // Convert Latin → Cyrillic
        return transliterate(text, 'cyr', lang);
      } else {
        // Keep as Latin (original)
        return text;
      }
    }

    // For Old Church Slavonic: data is in Cyrillic, optionally convert to Latin
    if (script === 'lat') {
      return transliterate(text, 'lat', lang);
    }

    return text; // Keep as Cyrillic (original)
  };
}
