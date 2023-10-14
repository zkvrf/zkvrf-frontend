import { EIP6963Connector, walletConnectProvider } from "@web3modal/wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";

import { configureChains, createConfig } from "wagmi";
import { mantle, scroll } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

const projectId = "2a727e4cc02f0ba45c3d429027b2fad2";

const { chains, publicClient } = configureChains(
  [scroll, mantle],
  [walletConnectProvider({ projectId }), publicProvider()],
);

const metadata = {
  name: "zkVRF",
  description: "decentralized verifiable randomness",
  url: "https://zkvrf.com",
  icons: [],
};

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: { appName: metadata.name },
    }),
  ],
  publicClient,
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });
