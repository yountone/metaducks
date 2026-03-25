"use client";

import { useState } from "react";
import { X, Wallet, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice, shortenAddress } from "@/lib/utils";
import { PAYMENT_TOKENS } from "@/constants";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  title: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  amount,
  title,
}: PaymentModalProps) {
  const [tab, setTab] = useState<"crypto" | "card">("crypto");
  const [selectedToken, setSelectedToken] = useState("XPASS");
  const [isConnected, setIsConnected] = useState(false);
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCryptoPayment = async () => {
    setProcessing(true);
    // Simulate payment
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    alert("결제가 완료되었습니다! (데모)");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between rounded-t-2xl">
          <h2 className="font-bold text-text-primary">결제하기</h2>
          <button onClick={onClose} className="p-1 hover:bg-surface rounded">
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
              {/* Wallet connection */}
              {!isConnected ? (
                <div className="space-y-3">
                  <p className="text-sm text-text-secondary mb-3">
                    지갑을 연결해주세요
                  </p>
                  <button
                    onClick={() => setIsConnected(true)}
                    className="w-full p-3 border border-border rounded-xl hover:border-primary/30 transition-colors flex items-center gap-3"
                  >
                    <span className="text-xl">🦊</span>
                    <span className="text-sm font-medium">MetaMask</span>
                  </button>
                  <button
                    onClick={() => setIsConnected(true)}
                    className="w-full p-3 border border-border rounded-xl hover:border-primary/30 transition-colors flex items-center gap-3"
                  >
                    <span className="text-xl">🔗</span>
                    <span className="text-sm font-medium">WalletConnect</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* Connected wallet info */}
                  <div className="p-3 bg-success/5 border border-success/20 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-xs text-text-primary">
                        BSC 연결됨
                      </span>
                    </div>
                    <span className="text-xs text-text-secondary font-mono">
                      {shortenAddress("0x1234567890abcdef1234567890abcdef12345678")}
                    </span>
                  </div>

                  {/* Token selection */}
                  <div>
                    <p className="text-sm font-medium text-text-primary mb-2">
                      결제 토큰 선택
                    </p>
                    <div className="space-y-2">
                      {PAYMENT_TOKENS.map((token) => (
                        <button
                          key={token.value}
                          onClick={() => setSelectedToken(token.value)}
                          className={`w-full p-3 rounded-lg border flex items-center justify-between transition-colors ${
                            selectedToken === token.value
                              ? "border-primary bg-primary-light/30"
                              : "border-border hover:border-primary/20"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{token.icon}</span>
                            <span className="text-sm font-medium">
                              {token.label}
                            </span>
                          </div>
                          <span className="text-xs text-text-secondary">
                            잔액: 1,000.00
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pay button */}
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleCryptoPayment}
                    disabled={processing}
                  >
                    {processing
                      ? "처리 중..."
                      : `${selectedToken}로 결제하기`}
                  </Button>
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
