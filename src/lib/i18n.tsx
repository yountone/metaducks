"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Locale = "ko" | "en" | "ja" | "zh";

export const LOCALES: { value: Locale; label: string; flag: string }[] = [
  { value: "ko", label: "한국어", flag: "🇰🇷" },
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "ja", label: "日本語", flag: "🇯🇵" },
  { value: "zh", label: "中文", flag: "🇨🇳" },
];

// Translation dictionaries
const dictionaries: Record<Locale, Record<string, string>> = {
  ko: {
    // Header
    "nav.tickets": "티켓",
    "nav.membership": "멤버십",
    "nav.community": "커뮤니티",
    "nav.login": "로그인 / 회원가입",
    "nav.sell": "판매등록",
    "nav.mypage": "마이페이지",

    // Hero
    "hero.title.prefix": "어떤 ",
    "hero.title.highlight": "티켓",
    "hero.title.suffix": "을 찾으세요?",
    "hero.subtitle": "안전한 뮤지컬 티켓 양도, MetaDucks에서 시작하세요",
    "hero.search.placeholder": "공연명, 가수명 등 검색",
    "hero.search.category": "뮤지컬/연극",
    "hero.popular": "인기 검색어",

    // Category
    "cat.musical": "뮤지컬/연극",
    "cat.concert": "콘서트",
    "cat.sports": "스포츠",
    "cat.movie": "영화/전시",
    "cat.voucher": "상품권/쿠폰",
    "cat.underface": "정가 이하",
    "cat.coming": "Coming Soon",

    // Popular Tickets
    "popular.title": "오늘의 ",
    "popular.highlight": "인기 티켓",
    "popular.subtitle": "지금 가장 많이 찾는 뮤지컬 티켓",
    "popular.viewAll": "모든 티켓 보기 →",
    "popular.perTicket": "한 매",
    "popular.consecutive": "연석",

    // Common
    "common.won": "원",
    "common.tickets": "매",
  },
  en: {
    "nav.tickets": "Tickets",
    "nav.membership": "Membership",
    "nav.community": "Community",
    "nav.login": "Login / Sign Up",
    "nav.sell": "Sell Ticket",
    "nav.mypage": "My Page",

    "hero.title.prefix": "What ",
    "hero.title.highlight": "ticket",
    "hero.title.suffix": " are you looking for?",
    "hero.subtitle": "Safe musical ticket transfer, start with MetaDucks",
    "hero.search.placeholder": "Search by show, artist name...",
    "hero.search.category": "Musical/Theater",
    "hero.popular": "Popular",

    "cat.musical": "Musical/Theater",
    "cat.concert": "Concerts",
    "cat.sports": "Sports",
    "cat.movie": "Movies/Exhibitions",
    "cat.voucher": "Gift Cards",
    "cat.underface": "Under Face Value",
    "cat.coming": "Coming Soon",

    "popular.title": "Today's ",
    "popular.highlight": "Popular Tickets",
    "popular.subtitle": "Most searched musical tickets right now",
    "popular.viewAll": "View all tickets →",
    "popular.perTicket": "per ticket",
    "popular.consecutive": "consecutive",

    "common.won": "KRW",
    "common.tickets": "tickets",
  },
  ja: {
    "nav.tickets": "チケット",
    "nav.membership": "メンバーシップ",
    "nav.community": "コミュニティ",
    "nav.login": "ログイン / 会員登録",
    "nav.sell": "販売登録",
    "nav.mypage": "マイページ",

    "hero.title.prefix": "どんな",
    "hero.title.highlight": "チケット",
    "hero.title.suffix": "をお探しですか？",
    "hero.subtitle": "安全なミュージカルチケット譲渡、MetaDucksで始めましょう",
    "hero.search.placeholder": "公演名、アーティスト名で検索",
    "hero.search.category": "ミュージカル/演劇",
    "hero.popular": "人気検索",

    "cat.musical": "ミュージカル/演劇",
    "cat.concert": "コンサート",
    "cat.sports": "スポーツ",
    "cat.movie": "映画/展示",
    "cat.voucher": "商品券/クーポン",
    "cat.underface": "定価以下",
    "cat.coming": "Coming Soon",

    "popular.title": "今日の",
    "popular.highlight": "人気チケット",
    "popular.subtitle": "今最も検索されているミュージカルチケット",
    "popular.viewAll": "すべてのチケットを見る →",
    "popular.perTicket": "1枚あたり",
    "popular.consecutive": "連番",

    "common.won": "ウォン",
    "common.tickets": "枚",
  },
  zh: {
    "nav.tickets": "门票",
    "nav.membership": "会员",
    "nav.community": "社区",
    "nav.login": "登录 / 注册",
    "nav.sell": "售票",
    "nav.mypage": "我的页面",

    "hero.title.prefix": "您在寻找什么",
    "hero.title.highlight": "门票",
    "hero.title.suffix": "？",
    "hero.subtitle": "安全的音乐剧门票转让，从MetaDucks开始",
    "hero.search.placeholder": "搜索演出名、艺人名...",
    "hero.search.category": "音乐剧/话剧",
    "hero.popular": "热门搜索",

    "cat.musical": "音乐剧/话剧",
    "cat.concert": "演唱会",
    "cat.sports": "体育",
    "cat.movie": "电影/展览",
    "cat.voucher": "礼品卡/优惠券",
    "cat.underface": "低于票面价",
    "cat.coming": "即将推出",

    "popular.title": "今日",
    "popular.highlight": "热门门票",
    "popular.subtitle": "现在最受欢迎的音乐剧门票",
    "popular.viewAll": "查看所有门票 →",
    "popular.perTicket": "每张",
    "popular.consecutive": "连座",

    "common.won": "韩元",
    "common.tickets": "张",
  },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: "ko",
  setLocale: () => {},
  t: (key) => key,
});

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "ko";
  const saved = document.cookie
    .split("; ")
    .find((c) => c.startsWith("locale="))
    ?.split("=")[1] as Locale | undefined;
  if (saved && dictionaries[saved]) return saved;
  return "ko";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `locale=${newLocale};path=/;max-age=${365 * 24 * 60 * 60}`;
  }, []);

  const t = useCallback(
    (key: string) => dictionaries[locale]?.[key] ?? dictionaries.ko[key] ?? key,
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}
