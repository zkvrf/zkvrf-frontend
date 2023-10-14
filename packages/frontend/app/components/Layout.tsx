import { Container } from './Container';
import WalletButton from './WalletButton';
import { ReactNode } from 'react';
import { ThemeSwitch } from '~/routes/action.set-theme';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="border-b">
        <Container className="flex min-h-[4rem] items-center">
          <div className="flex-grow">
            <strong className="font-bold">
              <span className="mr-2">🎲</span> zkVRF
            </strong>
          </div>

          <div className="flex items-center gap-4">
            <WalletButton />
            <ThemeSwitch />
          </div>
        </Container>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
