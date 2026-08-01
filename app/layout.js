import './globals.css';

export const metadata = {
  title: 'Mudre misli',
  description: 'Static quote site generator',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
