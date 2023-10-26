import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Layout } from '~/components/Layout';
import { Providers } from '~/components/Providers';
import { Toaster } from '~/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'zkVRF Explorer',
  description: 'decentralized verifiable randomness',
  icons:
    'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎲</text></svg>',
};

import { Domine } from 'next/font/google';

const domine = Domine({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-domine',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${domine.variable}`} suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          <Layout>{children}</Layout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
