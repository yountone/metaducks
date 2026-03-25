import type { Metadata } from "next";
import { Web3Provider } from "@/lib/web3-provider";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "MetaDucks - 뮤지컬 티켓 양도 플랫폼",
  description:
    "국내 최대 뮤지컬 티켓 양도 플랫폼. 안전한 거래, 크립토 결제 지원.",
  keywords: ["뮤지컬", "티켓", "양도", "MetaDucks", "크립토"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Web3Provider>
          <I18nProvider>{children}</I18nProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
