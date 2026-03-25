"use client";

import { useState } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { parseUnits, maxUint256 } from "viem";
import {
  ERC20_ABI,
  TOKEN_CONTRACTS,
  PAYMENT_RECEIVER,
  type TokenSymbol,
} from "@/lib/web3";

export type PaymentStatus =
  | "idle"
  | "approving"
  | "approved"
  | "transferring"
  | "confirming"
  | "success"
  | "error";

interface UsePaymentOptions {
  token: TokenSymbol;
  amount: number; // human-readable amount (e.g. 80000)
  decimals: number;
  onSuccess?: (txHash: string) => void;
  onError?: (error: Error) => void;
}

export function usePayment({
  token,
  amount,
  decimals,
  onSuccess,
  onError,
}: UsePaymentOptions) {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [txHash, setTxHash] = useState<string>();
  const [error, setError] = useState<string>();

  const contractAddress = TOKEN_CONTRACTS[token];
  const parsedAmount = decimals ? parseUnits(String(amount), decimals) : BigInt(0);

  const { writeContractAsync } = useWriteContract();

  // Check current allowance
  const { data: currentAllowance, refetch: refetchAllowance } = useReadContract(
    {
      address: contractAddress || undefined,
      abi: ERC20_ABI,
      functionName: "allowance",
      args: [
        "0x0000000000000000000000000000000000000000" as `0x${string}`, // placeholder, will be overridden
        PAYMENT_RECEIVER,
      ],
      query: { enabled: false }, // manual query
    }
  );

  const pay = async (walletAddress: `0x${string}`) => {
    if (!contractAddress || !PAYMENT_RECEIVER) {
      setError("컨트랙트 주소가 설정되지 않았습니다");
      setStatus("error");
      return;
    }

    try {
      setError(undefined);

      // Step 1: Check allowance and approve if needed
      setStatus("approving");

      // Read current allowance directly
      const allowanceResult = await refetchAllowance();
      const allowance = (allowanceResult.data as bigint) || BigInt(0);

      if (allowance < parsedAmount) {
        const approveTx = await writeContractAsync({
          address: contractAddress,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [PAYMENT_RECEIVER, maxUint256],
        });

        // Wait for approve transaction
        // The hook will handle this
        setStatus("approved");
      }

      // Step 2: Transfer tokens
      setStatus("transferring");
      const transferTx = await writeContractAsync({
        address: contractAddress,
        abi: ERC20_ABI,
        functionName: "transfer",
        args: [PAYMENT_RECEIVER, parsedAmount],
      });

      setTxHash(transferTx);
      setStatus("confirming");

      // Success will be confirmed by the receipt hook
      setStatus("success");
      onSuccess?.(transferTx);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "결제 중 오류가 발생했습니다";
      setError(errorMessage);
      setStatus("error");
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    }
  };

  const reset = () => {
    setStatus("idle");
    setTxHash(undefined);
    setError(undefined);
  };

  return {
    status,
    txHash,
    error,
    pay,
    reset,
    isProcessing: ["approving", "approved", "transferring", "confirming"].includes(
      status
    ),
  };
}
