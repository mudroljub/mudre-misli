'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Script } from '../lib/transliterate';

interface ScriptContextType {
  script: Script | null;
  setScript: (script: Script) => void;
}

const ScriptContext = createContext<ScriptContextType | undefined>(undefined);

export function ScriptProvider({ children }: { children: ReactNode }) {
  const [script, setScript] = useState<Script | null>(null);

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
