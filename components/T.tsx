'use client';

import { ReactNode } from 'react';
import { useTransliterate } from '../utils/useTransliterate';
import type { Language } from '../types/data';

interface TProps {
  children: string;
  language: Language;
}

/**
 * Transliterate wrapper component - automatically applies script conversion
 */
export default function T({ children, language }: TProps) {
  const transliterate = useTransliterate(language);
  return <>{transliterate(children)}</>;
}
