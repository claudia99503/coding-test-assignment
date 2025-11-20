"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchMerchantDetailByCode } from "@/app/api/merchants";
import { MerchantDetailItem } from "@/app/types/merchants";
import { formatDate } from "@/app/utils/formateDate";
import ArrowLeftSvg from "@/app/assets/images/arrow-left.svg";

const PAGE_CLASSES = "p-6 space-y-6";
const HEADER_CLASSES = "flex items-center gap-3";
const LOADING_CLASSES = "p-6";
const ERROR_CLASSES = "p-6 text-red-500";
const DETAIL_CARD_CLASSES = "border rounded-lg p-4 space-y-2 text-sm bg-white";

const ERROR_MESSAGE = "가맹점 상세 정보를 불러오지 못했습니다.";
const LOADING_MESSAGE = "로딩중...";
const NO_DATA_MESSAGE = "데이터 없음";

const detailFields: Array<{
  label: string;
  key: keyof MerchantDetailItem;
  format?: (value: string) => string;
}> = [
  { label: "가맹점 코드", key: "mchtCode" },
  { label: "가맹점명", key: "mchtName" },
  { label: "상태", key: "status" },
  { label: "업종", key: "bizType" },
  { label: "사업자번호", key: "bizNo" },
  { label: "전화번호", key: "phone" },
  { label: "주소", key: "address" },
  { label: "이메일", key: "email" },
  { label: "등록일", key: "registeredAt", format: formatDate },
  { label: "수정일", key: "updatedAt", format: formatDate },
];

const BUTTON_CLASSES =
  "inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2";

export default function MerchantDetailPage() {
  const { mchtCode } = useParams();
  const router = useRouter();
  const [merchant, setMerchant] = useState<MerchantDetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchMerchantDetailByCode(String(mchtCode));
        setMerchant(res.data);
      } catch (err) {
        console.error(err);
        setError(ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    })();
  }, [mchtCode]);

  if (loading) return <div className={LOADING_CLASSES}>{LOADING_MESSAGE}</div>;
  if (error) return <div className={ERROR_CLASSES}>{error}</div>;
  if (!merchant) return <div className={LOADING_CLASSES}>{NO_DATA_MESSAGE}</div>;

  const renderDetailItem = ({ label, key, format }: typeof detailFields[0]) => {
    const value = format ? format(String(merchant[key])) : String(merchant[key]);
    return (
      <p key={key}>
        <strong>{label}:</strong> {value}
      </p>
    );
  };

  return (
    <div className={PAGE_CLASSES}>
      <div className={HEADER_CLASSES}>
        <button onClick={() => router.back()} className={BUTTON_CLASSES}>
          <Image src={ArrowLeftSvg} alt="arrow left" width={16} height={16} className="mr-1.5" />
          이전
        </button>
        <h1 className="text-lg font-semibold">가맹점 상세 보기</h1>
      </div>

      <div className={DETAIL_CARD_CLASSES}>
        {detailFields.map(renderDetailItem)}
      </div>
    </div>
  );
}

