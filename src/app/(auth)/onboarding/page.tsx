"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTranslation } from "@/lib/i18n";

export default function OnboardingPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full ${
                s <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              {t("onboarding.nickname")}
            </h1>
            <p className="text-sm text-text-secondary mb-6">
              {t("onboarding.nicknameDesc")}
            </p>
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={t("onboarding.nicknameHint")}
              className="mb-4"
            />
            <Button
              className="w-full"
              size="lg"
              onClick={() => setStep(2)}
              disabled={nickname.length < 2}
            >
              {t("ticketNew.next")}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              {t("onboarding.walletTitle")}
            </h1>
            <p className="text-sm text-text-secondary mb-6">
              {t("onboarding.walletDesc")}
            </p>

            <div className="space-y-3 mb-6">
              <button className="w-full p-4 border border-border rounded-xl hover:border-primary/30 transition-colors text-left flex items-center gap-3">
                <span className="text-2xl">🦊</span>
                <div>
                  <p className="font-medium text-text-primary">MetaMask</p>
                  <p className="text-xs text-text-secondary">
                    {t("wallet.browser")}
                  </p>
                </div>
              </button>
              <button className="w-full p-4 border border-border rounded-xl hover:border-primary/30 transition-colors text-left flex items-center gap-3">
                <span className="text-2xl">🔗</span>
                <div>
                  <p className="font-medium text-text-primary">
                    WalletConnect
                  </p>
                  <p className="text-xs text-text-secondary">
                    {t("wallet.qr")}
                  </p>
                </div>
              </button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" size="lg" onClick={() => setStep(3)}>
                {t("onboarding.skip")}
              </Button>
              <Button className="flex-1" size="lg" onClick={() => setStep(3)}>
                {t("onboarding.connectWallet")}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <span className="text-6xl">🎉</span>
            <h1 className="text-2xl font-bold text-text-primary mt-4 mb-2">
              {t("onboarding.welcome", { name: nickname || "사용자" })}
            </h1>
            <p className="text-sm text-text-secondary mb-8">
              {t("onboarding.welcomeDesc")}
            </p>
            <Button className="w-full" size="lg" asChild>
              <a href="/">{t("onboarding.start")}</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
