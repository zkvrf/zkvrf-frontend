import { useWeb3Modal } from "@web3modal/wagmi/react";
import Avatar from "boring-avatars";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";

export default function WalletButton() {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  if (isConnected) {
    return (
      <button onClick={() => open()}>
        <Avatar size={48} name={address} variant="beam" />
      </button>
    );
  }

  return (
    <Button variant="outline" onClick={() => open()}>
      Connect Wallet
    </Button>
  );
}
