"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { MEMBERSHIP_PLANS } from "@/constants";
import { formatPrice } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function MembershipPlansPage() {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const plan = MEMBERSHIP_PLANS.find((p) => p.plan === selectedPlan);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-text-primary mb-6">
        {t("membership.selectPlan")}
      </h1>

      <div className="space-y-3">
        {MEMBERSHIP_PLANS.filter((p) => p.price > 0).map((p) => (
          <Card
            key={p.plan}
            onClick={() => setSelectedPlan(p.plan)}
            className={
              selectedPlan === p.plan
                ? "border-primary bg-primary-light/20"
                : ""
            }
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-text-primary">{p.name}</h3>
                <p className="text-xl font-bold text-primary">
                  {formatPrice(p.price)}
                  <span className="text-xs text-text-secondary font-normal">
                    {t("membership.perMonth")}
                  </span>
                </p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedPlan === p.plan
                    ? "border-primary bg-primary"
                    : "border-border"
                }`}
              >
                {selectedPlan === p.plan && (
                  <Check className="w-full h-full text-white p-0.5" />
                )}
              </div>
            </div>
            <ul className="space-y-1">
              {p.features.map((f) => (
                <li key={f} className="text-xs text-text-secondary flex items-center gap-1">
                  <Check className="w-3 h-3 text-success" />
                  {f}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Button
        className="w-full mt-6"
        size="lg"
        disabled={!selectedPlan}
        onClick={() => setShowPayment(true)}
      >
        {t("membership.pay")}
      </Button>

      {plan && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          amount={plan.price}
          title={`${plan.name} 멤버십 구독`}
        />
      )}
    </div>
  );
}
