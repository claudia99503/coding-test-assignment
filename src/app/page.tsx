"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-2xl font-semibold">PG 대시보드</h1>

      <div className="flex flex-col gap-4 w-48">
        <Link
          href="/dashboard"
          className="text-center py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-md hover:from-blue-500 hover:to-blue-600 transition shadow-sm hover:shadow-md"
        >
          대시보드 보기
        </Link>

        <Link
          href="/payments"
          className="text-center py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition shadow-sm hover:shadow-md"
        >
          거래내역 보기
        </Link>

        <Link
          href="/merchants/list"
          className="text-center py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md hover:from-blue-700 hover:to-blue-800 transition shadow-sm hover:shadow-md"
        >
          가맹점 상세 보기
        </Link>
      </div>
    </main>
  );
}

