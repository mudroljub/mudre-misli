'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Script } from '../lib/transliterate';

interface ScriptContextType {
  script: Script;
  setScript: (script: Script) => void;
}

const ScriptContext = createContext<ScriptContextType | undefined>(undefined);

export function ScriptProvider({ children }: { children: ReactNode }) {
  const [script, setScript] = useState<Script>('cyr');

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('script');
    if (saved === 'lat' || saved === 'cyr') {
      setScript(saved);
    }
  }, []);

  const handleSetScript = (newScript: Script) => {
    setScript(newScript);
    localStorage.setItem('script', newScript);
  };

  return (
    <ScriptContext.Provider value={{ script, setScript: handleSetScript }}>
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
