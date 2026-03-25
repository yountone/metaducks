"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import ko from "./dictionaries/ko.json";
import en from "./dictionaries/en.json";
import ja from "./dictionaries/ja.json";
import zh from "./dictionaries/zh.json";

export type Locale = "ko" | "en" | "ja" | "zh";

export const LOCALES: { value: Locale; label: string; flag: string }[] = [
  { value: "ko", label: "한국어", flag: "🇰🇷" },
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "ja", label: "日本語", flag: "🇯🇵" },
  { value: "zh", label: "中文", flag: "🇨🇳" },
];

type Dictionary = Record<string, string>;

const dictionaries: Record<Locale, Dictionary> = { ko, en, ja, zh };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
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
    (key: string, params?: Record<string, string>) => {
      let value =
        dictionaries[locale]?.[key] ?? dictionaries.ko[key] ?? key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          value = value.replace(`{${k}}`, v);
        });
      }
      return value;
    },
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
