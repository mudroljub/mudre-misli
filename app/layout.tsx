import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from '../components/Providers';
import '../styles/globals.scss';

export const metadata: Metadata = {
  title: 'Училище мѫдрости',
  description: 'Slovensko učilište mudrosti Blatnograd',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="sr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
