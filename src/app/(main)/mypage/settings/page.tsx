"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants";
import { useTranslation } from "@/lib/i18n";

export default function SettingsPage() {
  const { t } = useTranslation();
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href={ROUTES.MYPAGE} className="text-text-secondary hover:text-primary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-text-primary">{t("settings.title")}</h1>
      </div>

      <div className="space-y-6">
        {/* Profile settings */}
        <Card>
          <h3 className="font-bold text-text-primary mb-4">{t("settings.profile")}</h3>
          <div className="space-y-3">
            <Input label={t("settings.nickname")} defaultValue="뮤덕이" />
            <Input label={t("settings.email")} defaultValue="museum@metaducks.io" disabled />
            <Input label={t("settings.phone")} placeholder="010-0000-0000" />
          </div>
          <Button className="mt-4" size="md">
            {t("settings.save")}
          </Button>
        </Card>

        {/* Notification settings */}
        <Card>
          <h3 className="font-bold text-text-primary mb-4">{t("settings.notification")}</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-text-primary">
                {t("settings.ticketAlert")}
              </span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-text-primary">{t("settings.tradeAlert")}</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-text-primary">
                {t("settings.commentAlert")}
              </span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </label>
          </div>
        </Card>

        {/* Danger zone */}
        <Card>
          <h3 className="font-bold text-text-primary mb-4">{t("settings.account")}</h3>
          <div className="space-y-3">
            <button className="text-sm text-text-secondary hover:text-primary">
              {t("settings.logout")}
            </button>
            <button className="text-sm text-accent-red hover:underline block">
              {t("settings.delete")}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
