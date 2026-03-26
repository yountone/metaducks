"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function OnboardingPage() {
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
              닉네임을 정해주세요
            </h1>
            <p className="text-sm text-text-secondary mb-6">
              MetaDucks에서 사용할 닉네임이에요
            </p>
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="2~12자 한글/영문/숫자"
              className="mb-4"
            />
            <Button
              className="w-full"
              size="lg"
              onClick={() => setStep(2)}
              disabled={nickname.length < 2}
            >
              다음
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              지갑을 연결해보세요
            </h1>
            <p className="text-sm text-text-secondary mb-6">
              크립토로 빠르고 안전하게 거래할 수 있어요 (선택)
            </p>

            <div className="space-y-3 mb-6">
              <button className="w-full p-4 border border-border rounded-xl hover:border-primary/30 transition-colors text-left flex items-center gap-3">
                <span className="text-2xl">🦊</span>
                <div>
                  <p className="font-medium text-text-primary">MetaMask</p>
                  <p className="text-xs text-text-secondary">
                    브라우저 확장 프로그램
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
                    QR코드로 모바일 지갑 연결
                  </p>
                </div>
              </button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" size="lg" onClick={() => setStep(3)}>
                건너뛰기
              </Button>
              <Button className="flex-1" size="lg" onClick={() => setStep(3)}>
                연결하기
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <span className="text-6xl">🎉</span>
            <h1 className="text-2xl font-bold text-text-primary mt-4 mb-2">
              환영합니다, {nickname || "사용자"}님!
            </h1>
            <p className="text-sm text-text-secondary mb-8">
              MetaDucks에서 안전한 티켓 거래를 시작해보세요
            </p>
            <Button className="w-full" size="lg" asChild>
              <a href="/">시작하기</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
