import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Layout } from '~/components/Layout';
import { Providers } from '~/components/Providers';

export const metadata: Metadata = {
  title: 'zkVRF',
  description: 'decentralized verifiable randomness',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
