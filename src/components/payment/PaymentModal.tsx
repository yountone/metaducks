"use client";

import { useState } from "react";
import { X, Wallet, CreditCard, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice, shortenAddress } from "@/lib/utils";
import { PAYMENT_TOKENS } from "@/constants";
import { useWallet } from "@/hooks/useWallet";
import { useAllTokenBalances } from "@/hooks/useTokenBalance";
import { usePayment, type PaymentStatus } from "@/hooks/usePayment";
import { useTranslation } from "@/lib/i18n";
import type { TokenSymbol } from "@/lib/web3";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  title: string;
  onPaymentSuccess?: (txHash: string, method: string) => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  amount,
  title,
  onPaymentSuccess,
}: PaymentModalProps) {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"crypto" | "card">("crypto");
  const [selectedToken, setSelectedToken] = useState<TokenSymbol>("XPASS");

  const STATUS_MESSAGES: Record<PaymentStatus, string> = {
    idle: "",
    approving: t("payment.approving"),
    approved: t("payment.approved"),
    transferring: t("payment.transferring"),
    confirming: t("payment.confirming"),
    success: t("payment.success"),
    error: t("payment.failed"),
  };

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
          <h2 className="font-bold text-text-primary">{t("payment.title")}</h2>
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
            {t("payment.crypto")}
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
            {t("payment.card")}
          </button>
        </div>

        <div className="p-4">
          {tab === "crypto" ? (
            <div className="space-y-4">
              {/* Payment status overlay */}
              {paymentStatus === "success" && (
                <div className="p-4 bg-success/5 border border-success/20 rounded-lg text-center">
                  <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="font-bold text-text-primary">{t("payment.success")}</p>
                  {txHash && (
                    <p className="text-xs text-text-secondary mt-1 font-mono break-all">
                      TX: {shortenAddress(txHash)}
                    </p>
                  )}
                  <Button className="mt-3" size="sm" onClick={onClose}>
                    {t("payment.confirm")}
                  </Button>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-accent-red" />
                    <p className="font-medium text-text-primary text-sm">{t("payment.failed")}</p>
                  </div>
                  <p className="text-xs text-text-secondary">{paymentError}</p>
                  <Button
                    className="mt-2"
                    size="sm"
                    variant="outline"
                    onClick={resetPayment}
                  >
                    {t("payment.retry")}
                  </Button>
                </div>
              )}

              {paymentStatus !== "success" && paymentStatus !== "error" && (
                <>
                  {/* Wallet connection */}
                  {!isConnected ? (
                    <div className="space-y-3">
                      <p className="text-sm text-text-secondary mb-3">
                        {t("payment.connectWallet")}
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
                            {isCorrectChain ? t("wallet.bscConnected") : t("wallet.chainSwitch")}
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
                            {t("payment.disconnect")}
                          </button>
                        </div>
                      </div>

                      {!isCorrectChain && (
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={ensureBscChain}
                        >
                          {t("wallet.switchBsc")}
                        </Button>
                      )}

                      {isCorrectChain && (
                        <>
                          {/* Token selection */}
                          <div>
                            <p className="text-sm font-medium text-text-primary mb-2">
                              {t("payment.selectToken")}
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
                                      {t("payment.balance")}:{" "}
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
                              {t("payment.insufficient")}
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
                              ? t("payment.processing")
                              : `${selectedToken}${t("payment.payWith")}`}
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
                {t("payment.cardDesc")}
              </p>
              <div className="p-6 border border-border rounded-lg text-center">
                <CreditCard className="w-8 h-8 text-text-secondary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">
                  {t("payment.stripeRedirect")}
                </p>
              </div>
              <Button className="w-full" size="lg" variant="secondary">
                {t("payment.cardPay")} ({formatPrice(amount)})
              </Button>
            </div>
          )}
        </div>

        {/* Footer notice */}
        <div className="px-4 pb-4">
          <p className="text-[10px] text-text-secondary text-center leading-relaxed whitespace-pre-line">
            {t("payment.footer")}
          </p>
        </div>
      </div>
    </div>
  );
}
