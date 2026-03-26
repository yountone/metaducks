"use client";

import { useState } from "react";
import { X, Wallet, CreditCard, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice, shortenAddress } from "@/lib/utils";
import { PAYMENT_TOKENS } from "@/constants";
import { useWallet } from "@/hooks/useWallet";
import { useAllTokenBalances } from "@/hooks/useTokenBalance";
import { usePayment, type PaymentStatus } from "@/hooks/usePayment";
import type { TokenSymbol } from "@/lib/web3";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  title: string;
  onPaymentSuccess?: (txHash: string, method: string) => void;
}

const STATUS_MESSAGES: Record<PaymentStatus, string> = {
  idle: "",
  approving: "토큰 승인 중...",
  approved: "승인 완료, 전송 준비 중...",
  transferring: "토큰 전송 중...",
  confirming: "트랜잭션 확인 대기 중...",
  success: "결제 완료!",
  error: "결제 실패",
};

export function PaymentModal({
  isOpen,
  onClose,
  amount,
  title,
  onPaymentSuccess,
}: PaymentModalProps) {
  const [tab, setTab] = useState<"crypto" | "card">("crypto");
  const [selectedToken, setSelectedToken] = useState<TokenSymbol>("XPASS");

  const {
    address,
    isConnected,
    isConnecting,
    isCorrectChain,
    connectMetaMask,
    connectWalletConnect,
    disconnect,
    ensureBscChain,
  } = useWallet();

  const balances = useAllTokenBalances(address as `0x${string}` | undefined);
  const selectedBalance = balances[selectedToken];

  const {
    status: paymentStatus,
    txHash,
    error: paymentError,
    pay,
    reset: resetPayment,
    isProcessing,
  } = usePayment({
    token: selectedToken,
    amount,
    decimals: selectedBalance.decimals ?? 18,
    onSuccess: (hash) => {
      onPaymentSuccess?.(hash, selectedToken);
    },
  });

  if (!isOpen) return null;

  const handleConnect = async (type: "metamask" | "walletconnect") => {
    try {
      if (type === "metamask") {
        await connectMetaMask();
      } else {
        await connectWalletConnect();
      }
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const handleCryptoPayment = async () => {
    if (!address) return;
    if (!isCorrectChain) {
      await ensureBscChain();
    }
    await pay(address as `0x${string}`);
  };

  const insufficientBalance =
    selectedBalance.balance !== undefined && selectedBalance.balance < amount;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between rounded-t-2xl">
          <h2 className="font-bold text-text-primary">결제하기</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-surface rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount */}
        <div className="px-4 py-4 border-b border-border">
          <p className="text-xs text-text-secondary">{title}</p>
          <p className="text-2xl font-bold text-text-primary">
            {formatPrice(amount)}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setTab("crypto")}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1.5 ${
              tab === "crypto"
                ? "text-primary border-b-2 border-primary"
                : "text-text-secondary"
            }`}
          >
            <Wallet className="w-4 h-4" />
            크립토 결제
          </button>
          <button
            onClick={() => setTab("card")}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1.5 ${
              tab === "card"
                ? "text-primary border-b-2 border-primary"
                : "text-text-secondary"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            카드 결제
          </button>
        </div>

        <div className="p-4">
          {tab === "crypto" ? (
            <div className="space-y-4">
              {/* Payment status overlay */}
              {paymentStatus === "success" && (
                <div className="p-4 bg-success/5 border border-success/20 rounded-lg text-center">
                  <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="font-bold text-text-primary">결제 완료!</p>
                  {txHash && (
                    <p className="text-xs text-text-secondary mt-1 font-mono break-all">
                      TX: {shortenAddress(txHash)}
                    </p>
                  )}
                  <Button className="mt-3" size="sm" onClick={onClose}>
                    확인
                  </Button>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-accent-red" />
                    <p className="font-medium text-text-primary text-sm">결제 실패</p>
                  </div>
                  <p className="text-xs text-text-secondary">{paymentError}</p>
                  <Button
                    className="mt-2"
                    size="sm"
                    variant="outline"
                    onClick={resetPayment}
                  >
                    다시 시도
                  </Button>
                </div>
              )}

              {paymentStatus !== "success" && paymentStatus !== "error" && (
                <>
                  {/* Wallet connection */}
                  {!isConnected ? (
                    <div className="space-y-3">
                      <p className="text-sm text-text-secondary mb-3">
                        지갑을 연결해주세요
                      </p>
                      <button
                        onClick={() => handleConnect("metamask")}
                        disabled={isConnecting}
                        className="w-full p-3 border border-border rounded-xl hover:border-primary/30 transition-colors flex items-center gap-3 disabled:opacity-50"
                      >
                        <span className="text-xl">🦊</span>
                        <span className="text-sm font-medium">MetaMask</span>
                        {isConnecting && (
                          <Loader2 className="w-4 h-4 animate-spin ml-auto" />
                        )}
                      </button>
                      <button
                        onClick={() => handleConnect("walletconnect")}
                        disabled={isConnecting}
                        className="w-full p-3 border border-border rounded-xl hover:border-primary/30 transition-colors flex items-center gap-3 disabled:opacity-50"
                      >
                        <span className="text-xl">🔗</span>
                        <span className="text-sm font-medium">
                          WalletConnect
                        </span>
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Connected wallet info */}
                      <div className="p-3 bg-success/5 border border-success/20 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-success" />
                          <span className="text-xs text-text-primary">
                            {isCorrectChain ? "BSC 연결됨" : "체인 전환 필요"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-secondary font-mono">
                            {address ? shortenAddress(address) : ""}
                          </span>
                          <button
                            onClick={disconnect}
                            className="text-xs text-text-secondary hover:text-accent-red"
                          >
                            해제
                          </button>
                        </div>
                      </div>

                      {!isCorrectChain && (
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={ensureBscChain}
                        >
                          BSC 네트워크로 전환
                        </Button>
                      )}

                      {isCorrectChain && (
                        <>
                          {/* Token selection */}
                          <div>
                            <p className="text-sm font-medium text-text-primary mb-2">
                              결제 토큰 선택
                            </p>
                            <div className="space-y-2">
                              {PAYMENT_TOKENS.map((token) => {
                                const tokenBalance =
                                  balances[token.value as TokenSymbol];
                                return (
                                  <button
                                    key={token.value}
                                    onClick={() =>
                                      setSelectedToken(
                                        token.value as TokenSymbol
                                      )
                                    }
                                    disabled={isProcessing}
                                    className={`w-full p-3 rounded-lg border flex items-center justify-between transition-colors ${
                                      selectedToken === token.value
                                        ? "border-primary bg-primary-light/30"
                                        : "border-border hover:border-primary/20"
                                    } disabled:opacity-50`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span>{token.icon}</span>
                                      <span className="text-sm font-medium">
                                        {token.label}
                                      </span>
                                    </div>
                                    <span className="text-xs text-text-secondary">
                                      잔액:{" "}
                                      {tokenBalance.isLoading
                                        ? "..."
                                        : tokenBalance.formatted}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Insufficient balance warning */}
                          {insufficientBalance && (
                            <p className="text-xs text-accent-red">
                              잔액이 부족합니다. 다른 토큰을 선택해주세요.
                            </p>
                          )}

                          {/* Processing status */}
                          {isProcessing && (
                            <div className="flex items-center gap-2 p-3 bg-primary-light/30 rounded-lg">
                              <Loader2 className="w-4 h-4 animate-spin text-primary" />
                              <span className="text-sm text-text-primary">
                                {STATUS_MESSAGES[paymentStatus]}
                              </span>
                            </div>
                          )}

                          {/* Pay button */}
                          <Button
                            className="w-full"
                            size="lg"
                            onClick={handleCryptoPayment}
                            disabled={isProcessing || insufficientBalance}
                          >
                            {isProcessing
                              ? "처리 중..."
                              : `${selectedToken}로 결제하기`}
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-text-secondary">
                카드 결제는 Stripe를 통해 안전하게 처리됩니다.
              </p>
              <div className="p-6 border border-border rounded-lg text-center">
                <CreditCard className="w-8 h-8 text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">
                  Stripe Checkout으로 이동합니다
                </p>
              </div>
              <Button className="w-full" size="lg" variant="secondary">
                카드로 결제하기 ({formatPrice(amount)})
              </Button>
            </div>
          )}
        </div>

        {/* Footer notice */}
        <div className="px-4 pb-4">
          <p className="text-[10px] text-text-secondary text-center leading-relaxed">
            결제는 싱가포르 법인(MetaDucks Pte. Ltd.)을 통해 처리됩니다.
            <br />
            크립토 결제 시 BSC(BNB Smart Chain) 네트워크가 사용됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
