import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles/globals.scss';

export const metadata: Metadata = {
  title: 'Mudre misli',
  description: 'Static quote site generator',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
