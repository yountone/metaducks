"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Copy } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants";

export default function WalletPage() {
  const isConnected = false;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href={ROUTES.MYPAGE} className="text-text-secondary hover:text-primary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-text-primary">지갑 관리</h1>
      </div>

      {!isConnected ? (
        <div className="text-center py-12">
          <span className="text-5xl">🦊</span>
          <h2 className="text-lg font-bold text-text-primary mt-4 mb-2">
            지갑을 연결해주세요
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            크립토 결제를 위해 지갑 연결이 필요합니다
            <br />
            BSC(BNB Smart Chain) 네트워크를 사용합니다
          </p>

          <div className="max-w-sm mx-auto space-y-3">
            <button className="w-full p-4 border border-border rounded-xl hover:border-primary/30 transition-colors flex items-center gap-3">
              <span className="text-2xl">🦊</span>
              <div className="text-left">
                <p className="font-medium text-text-primary">MetaMask</p>
                <p className="text-xs text-text-secondary">
                  브라우저 확장 프로그램
                </p>
              </div>
            </button>
            <button className="w-full p-4 border border-border rounded-xl hover:border-primary/30 transition-colors flex items-center gap-3">
              <span className="text-2xl">🔗</span>
              <div className="text-left">
                <p className="font-medium text-text-primary">WalletConnect</p>
                <p className="text-xs text-text-secondary">
                  QR코드로 모바일 지갑 연결
                </p>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Connected info */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-text-primary">연결된 지갑</h3>
              <Badge variant="verified">BSC 연결됨</Badge>
            </div>
            <div className="flex items-center gap-2 p-2 bg-surface rounded-lg">
              <span className="text-sm font-mono text-text-primary flex-1 truncate">
                0x1234...5678
              </span>
              <button className="text-text-secondary hover:text-primary">
                <Copy className="w-4 h-4" />
              </button>
              <button className="text-text-secondary hover:text-primary">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </Card>

          {/* Token balances */}
          <Card>
            <h3 className="font-bold text-text-primary mb-3">토큰 잔액</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <span>🪙</span>
                  <span className="text-sm font-medium">XPASS</span>
                </div>
                <span className="text-sm font-mono">1,000.00</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <span>💲</span>
                  <span className="text-sm font-medium">USDT</span>
                </div>
                <span className="text-sm font-mono">500.00</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <span>💵</span>
                  <span className="text-sm font-medium">USDC</span>
                </div>
                <span className="text-sm font-mono">250.00</span>
              </div>
            </div>
          </Card>

          <Button variant="outline" className="w-full">
            지갑 연결 해제
          </Button>
        </div>
      )}
    </div>
  );
}
