import { http, createConfig, createStorage } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

export const wagmiConfig = createConfig({
  chains: [bsc, bscTestnet],
  connectors: [
    metaMask(),
    ...(projectId ? [walletConnect({ projectId })] : []),
  ],
  storage: createStorage({ storage: typeof window !== "undefined" ? window.localStorage : undefined }),
  transports: {
    [bsc.id]: http(
      process.env.NEXT_PUBLIC_BSC_RPC_URL || "https://bsc-dataseed.binance.org/"
    ),
    [bscTestnet.id]: http(
      process.env.NEXT_PUBLIC_BSC_TESTNET_RPC_URL ||
        "https://data-seed-prebsc-1-s1.binance.org:8545/"
    ),
  },
});

// ERC-20 ABI (minimal for payments)
export const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
  {
    name: "symbol",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
] as const;

// Token contract addresses on BSC
export const TOKEN_CONTRACTS = {
  XPASS: (process.env.NEXT_PUBLIC_XPASS_CONTRACT_ADDRESS || "") as `0x${string}`,
  USDT: (process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS ||
    "0x55d398326f99059fF775485246999027B3197955") as `0x${string}`,
  USDC: (process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS ||
    "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d") as `0x${string}`,
} as const;

// Payment receiver wallet (Singapore entity)
export const PAYMENT_RECEIVER = (process.env.NEXT_PUBLIC_PAYMENT_RECEIVER_ADDRESS ||
  "") as `0x${string}`;

export type TokenSymbol = keyof typeof TOKEN_CONTRACTS;
