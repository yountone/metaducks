"use client";

import { useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { ERC20_ABI, TOKEN_CONTRACTS, type TokenSymbol } from "@/lib/web3";

export function useTokenBalance(
  token: TokenSymbol,
  address: `0x${string}` | undefined
) {
  const contractAddress = TOKEN_CONTRACTS[token];

  const { data: rawBalance, isLoading, refetch } = useReadContract({
    address: contractAddress || undefined,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!contractAddress,
    },
  });

  const { data: decimals } = useReadContract({
    address: contractAddress || undefined,
    abi: ERC20_ABI,
    functionName: "decimals",
    query: {
      enabled: !!contractAddress,
    },
  });

  const balance = rawBalance !== undefined && decimals !== undefined
    ? parseFloat(formatUnits(rawBalance as bigint, decimals as number))
    : undefined;

  const formatted = balance !== undefined
    ? balance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  return {
    balance,
    formatted,
    isLoading,
    refetch,
    decimals: decimals as number | undefined,
    raw: rawBalance as bigint | undefined,
  };
}

export function useAllTokenBalances(address: `0x${string}` | undefined) {
  const xpass = useTokenBalance("XPASS", address);
  const usdt = useTokenBalance("USDT", address);
  const usdc = useTokenBalance("USDC", address);

  return { XPASS: xpass, USDT: usdt, USDC: usdc };
}
