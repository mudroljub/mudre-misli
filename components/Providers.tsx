'use client';

import { ReactNode } from 'react';
import { ScriptProvider } from '../contexts/ScriptContext';

export function Providers({ children }: { children: ReactNode }) {
  return <ScriptProvider>{children}</ScriptProvider>;
}
