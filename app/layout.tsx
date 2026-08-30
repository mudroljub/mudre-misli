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
  const basePath = process.env.STATIC_EXPORT === 'true' ? '/mudre-misli' : '';
  const fontPath = `${basePath}/fonts/BukyVede-Regular`;

  return (
    <html lang="sr" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href={`${fontPath}.woff`}
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `@font-face{font-family:'BukyVede';src:url('${fontPath}.woff') format('woff'),url('${fontPath}.ttf') format('truetype');size-adjust:110%;}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=location.pathname.split('/').filter(Boolean);var l=p.includes('sr')?'sr':'stsl';var s=l==='stsl'?'cyr':'lat';var e=document.documentElement;e.lang=l==='stsl'?'cu':'sr';e.dataset.language=l;e.dataset.script=s;}());`,
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
