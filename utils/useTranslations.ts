import { getTranslation } from './translations';
import { useTransliterate } from './useTransliterate';
import type { Language } from '../types/data';
import type { Translations } from './translations';

/**
 * Hook that returns translations with automatic transliteration applied
 */
export function useTranslations(language: Language) {
  const t = getTranslation(language);
  const transliterate = useTransliterate(language);

  // Create a proxy that automatically transliterates all string values
  const translatedT = new Proxy(t, {
    get(target, prop) {
      const value = target[prop as keyof Translations];

      if (typeof value === 'string') {
        return transliterate(value);
      }

      if (typeof value === 'object' && value !== null) {
        // Recursively wrap nested objects
        return new Proxy(value as any, {
          get(nestedTarget, nestedProp) {
            const nestedValue = nestedTarget[nestedProp];
            if (typeof nestedValue === 'string') {
              return transliterate(nestedValue);
            }
            return nestedValue;
          }
        });
      }

      return value;
    }
  });

  return { t: translatedT, transliterate };
}
