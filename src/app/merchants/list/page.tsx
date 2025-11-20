"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { fetchMerchantsDetails } from "@/app/api/merchants";
import MerchantTable from "@/app/components/MerchantTable";
import SearchInput from "@/app/components/SearchInput";
import { MerchantDetailItem } from "@/app/types/merchants";

const PAGE_CLASSES = "p-6 space-y-6";
const HEADER_CLASSES = "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between";
const LOADING_CLASSES = "p-6";
const ERROR_CLASSES = "p-6 text-red-500";
const BUTTON_CLASSES =
  "inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100";

const ERROR_MESSAGE = "가맹점 데이터를 불러오지 못했습니다.";
const LOADING_MESSAGE = "로딩중...";

const filterMerchants = (merchants: MerchantDetailItem[], searchTerm: string): MerchantDetailItem[] => {
  if (!searchTerm.trim()) return merchants;

  const keyword = searchTerm.trim().toLowerCase();
  return merchants.filter(
    (m) => m.mchtCode.toLowerCase().includes(keyword) || m.mchtName.toLowerCase().includes(keyword)
  );
};

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState<MerchantDetailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchMerchantsDetails();
        setMerchants(res.data);
      } catch (err) {
        console.error(err);
        setError(ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => filterMerchants(merchants, searchTerm), [merchants, searchTerm]);

  if (loading) return <div className={LOADING_CLASSES}>{LOADING_MESSAGE}</div>;
  if (error) return <div className={ERROR_CLASSES}>{error}</div>;

  return (
    <div className={PAGE_CLASSES}>
      <div className={HEADER_CLASSES}>
        <h1 className="text-lg font-semibold">가맹점 상세 목록</h1>
        <Link href="/" className={BUTTON_CLASSES}>
          홈 화면
        </Link>
      </div>

      <div className="w-full">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="가맹점 코드 · 가맹점명 검색"
        />
      </div>

      <MerchantTable merchants={filtered} />
    </div>
  );
}
