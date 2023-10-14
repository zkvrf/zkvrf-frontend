import { useWeb3Modal } from "@web3modal/wagmi/react";
import { AvatarProps } from "boring-avatars";
import { ComponentType, Suspense, lazy } from "react";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";

const Avatar = lazy<ComponentType<AvatarProps>>(() =>
  // @ts-ignore
  import("boring-avatars").then((m) => m.default)
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
