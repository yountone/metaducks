"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MEMBERSHIP_PLANS, ROUTES } from "@/constants";
import { formatPrice } from "@/lib/utils";
import { Check, Crown } from "lucide-react";

export default function MembershipPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Crown className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          MetaDucks 멤버십
        </h1>
        <p className="text-sm text-text-secondary">
          더 많은 혜택과 함께 안전한 티켓 거래를 경험하세요
        </p>
      </div>

      {/* Current membership */}
      <Card className="mb-8 bg-primary-light/30 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">현재 멤버십</p>
            <p className="text-lg font-bold text-text-primary">Basic (무료)</p>
          </div>
          <Badge variant="default">활성</Badge>
        </div>
      </Card>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MEMBERSHIP_PLANS.map((plan) => (
          <Card
            key={plan.plan}
            className={`relative ${
              plan.plan === "PREMIUM"
                ? "border-primary ring-1 ring-primary/20"
                : ""
            }`}
          >
            {plan.plan === "PREMIUM" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="premium">추천</Badge>
              </div>
            )}

            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-text-primary">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold text-primary mt-1">
                {plan.price === 0 ? "무료" : formatPrice(plan.price)}
              </p>
              {plan.price > 0 && (
                <p className="text-xs text-text-secondary">/ 월</p>
              )}
            </div>

            <ul className="space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              variant={plan.plan === "BASIC" ? "outline" : "primary"}
              disabled={plan.plan === "BASIC"}
            >
              {plan.plan === "BASIC" ? "현재 플랜" : "업그레이드"}
            </Button>
          </Card>
        ))}
      </div>

      {/* Payment info */}
      <p className="text-xs text-text-secondary text-center mt-8">
        멤버십 결제는 XPASS, USDT/USDC 크립토 또는 카드로 가능합니다.
        <br />
        언제든 해지할 수 있으며, 잔여 기간은 환불됩니다.
      </p>
    </div>
  );
}
