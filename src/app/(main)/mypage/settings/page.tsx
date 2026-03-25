"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href={ROUTES.MYPAGE} className="text-text-secondary hover:text-primary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-text-primary">설정</h1>
      </div>

      <div className="space-y-6">
        {/* Profile settings */}
        <Card>
          <h3 className="font-bold text-text-primary mb-4">프로필 설정</h3>
          <div className="space-y-3">
            <Input label="닉네임" defaultValue="뮤덕이" />
            <Input label="이메일" defaultValue="museum@metaducks.io" disabled />
            <Input label="전화번호" placeholder="010-0000-0000" />
          </div>
          <Button className="mt-4" size="md">
            저장
          </Button>
        </Card>

        {/* Notification settings */}
        <Card>
          <h3 className="font-bold text-text-primary mb-4">알림 설정</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-text-primary">
                티켓 등록 알림
              </span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-text-primary">거래 알림</span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-text-primary">
                커뮤니티 댓글 알림
              </span>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </label>
          </div>
        </Card>

        {/* Danger zone */}
        <Card>
          <h3 className="font-bold text-text-primary mb-4">계정</h3>
          <div className="space-y-3">
            <button className="text-sm text-text-secondary hover:text-primary">
              로그아웃
            </button>
            <button className="text-sm text-accent-red hover:underline block">
              회원탈퇴
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
