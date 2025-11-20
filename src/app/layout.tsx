import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PG Dashboard",
  description: "과제 — PG 결제 대시보드",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}

