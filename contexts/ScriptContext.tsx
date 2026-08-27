'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import type { Script } from '../utils/transliterate';

interface ScriptContextType {
  script: Script | null;
  setScript: (script: Script) => void;
}

const ScriptContext = createContext<ScriptContextType | undefined>(undefined);

export function ScriptProvider({ children }: { children: ReactNode }) {
  const [script, setScript] = useState<Script | null>(null);
  const pathname = usePathname();
  const language = pathname.split('/').filter(Boolean)[0] === 'sr' ? 'sr' : 'stsl';
  const effectiveScript = script ?? (language === 'stsl' ? 'cyr' : 'lat');

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language === 'stsl' ? 'cu' : 'sr';
    root.dataset.language = language;
    root.dataset.script = effectiveScript;
  }, [effectiveScript, language]);

  return (
    <ScriptContext.Provider value={{ script, setScript }}>
      {children}
    </ScriptContext.Provider>
  );
}

export function useScript() {
  const context = useContext(ScriptContext);
  if (!context) {
    throw new Error('useScript must be used within ScriptProvider');
  }
  return context;
}
