"use client";

import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { bsc } from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

export function useWallet() {
  const { address, isConnected, chain } = useAccount();
  const { connectAsync, isPending: isConnecting } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();

  const isCorrectChain = chain?.id === bsc.id;

  const connectMetaMask = async () => {
    await connectAsync({ connector: metaMask() });
    if (!isCorrectChain) {
      await switchChainAsync({ chainId: bsc.id });
    }
  };

  const connectWalletConnect = async () => {
    if (!projectId) throw new Error("WalletConnect project ID not configured");
    await connectAsync({
      connector: walletConnect({ projectId }),
    });
    if (!isCorrectChain) {
      await switchChainAsync({ chainId: bsc.id });
    }
  };

  const disconnect = async () => {
    await disconnectAsync();
  };

  const ensureBscChain = async () => {
    if (!isCorrectChain) {
      await switchChainAsync({ chainId: bsc.id });
    }
  };

  return {
    address,
    isConnected,
    isConnecting,
    chain,
    isCorrectChain,
    connectMetaMask,
    connectWalletConnect,
    disconnect,
    ensureBscChain,
  };
}
