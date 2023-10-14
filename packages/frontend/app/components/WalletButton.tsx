import { Button } from './ui/button';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { AvatarProps } from 'boring-avatars';
import { ComponentType, Suspense, lazy } from 'react';
import { useAccount } from 'wagmi';

const Avatar = lazy<ComponentType<AvatarProps>>(() =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import('boring-avatars').then((m) => m.default)
);

export default function WalletButton() {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  if (isConnected && !!address) {
    return (
      <button onClick={() => open()}>
        <Suspense>
          <Avatar size={38} name={address} />
        </Suspense>
      </button>
    );
  }

  return (
    <Button variant="outline" onClick={() => open()}>
      Connect Wallet
    </Button>
  );
}
