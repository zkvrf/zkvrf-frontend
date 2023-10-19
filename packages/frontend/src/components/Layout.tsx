import { Container } from './Container';
import { WalletButton } from './WalletButton';
import Link from 'next/link';
import { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="border-b">
        <Container className="flex min-h-[4rem] items-center">
          <div className="flex-grow">
            <Link href="/" className="font-bold">
              <span className="mr-2">🎲</span> zkVRF
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <WalletButton />
          </div>
        </Container>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
