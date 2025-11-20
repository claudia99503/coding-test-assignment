"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchPaymentsList } from "@/app/api/payments";
import StatCard from "@/app/components/StatCard";
import BaseTable from "@/app/components/Table/BaseTable";
import TableRow from "@/app/components/Table/TableRow";
import TableCell from "@/app/components/Table/TableCell";
import { PaymentItem } from "@/app/types/payments";
import { formatDate } from "@/app/utils/formateDate";
import ArrowRightSvg from "@/app/assets/images/arrow-right.svg";

const PAGE_CLASSES = "p-6 space-y-6";
const HEADER_CLASSES = "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between";
const BUTTON_CLASSES =
  "inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100";
const LINK_BUTTON_CLASSES = `${BUTTON_CLASSES} focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2`;
const LOADING_CLASSES = "p-6";
const ERROR_CLASSES = "p-6 text-red-500";

const TABLE_HEADERS = ["결제코드", "금액", "상태", "결제일시"];
const RECENT_COUNT = 5;
const ERROR_MESSAGE = "대시보드 데이터를 불러오지 못했습니다.";
const LOADING_MESSAGE = "로딩중...";

const sortPaymentsByDate = (payments: PaymentItem[]): PaymentItem[] =>
  [...payments].sort((a, b) => new Date(b.paymentAt).getTime() - new Date(a.paymentAt).getTime());

const calculateStats = (payments: PaymentItem[]) => {
  const totalCount = payments.length;
  const totalAmount = payments.reduce((sum, item) => sum + Number(item.amount), 0);
  const recent = payments.slice(0, RECENT_COUNT);
  return { totalCount, totalAmount, recent };
};

const renderTableRow = (item: PaymentItem) => (
  <TableRow key={item.paymentCode}>
    <TableCell className="text-left">{item.paymentCode}</TableCell>
    <TableCell className="text-left">{Number(item.amount).toLocaleString()} 원</TableCell>
    <TableCell className="text-left">{item.status}</TableCell>
    <TableCell className="text-left">{formatDate(item.paymentAt)}</TableCell>
  </TableRow>
);

export default function DashboardPage() {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchPaymentsList();
        setPayments(sortPaymentsByDate(res.data));
      } catch (err) {
        console.error(err);
        setError(ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className={LOADING_CLASSES}>{LOADING_MESSAGE}</div>;
  if (error) return <div className={ERROR_CLASSES}>{error}</div>;

  const { totalCount, totalAmount, recent } = calculateStats(payments);

  return (
    <div className={PAGE_CLASSES}>
      <div className={HEADER_CLASSES}>
        <h1 className="text-lg font-semibold">대시보드</h1>
        <Link href="/" className={BUTTON_CLASSES}>
          홈 화면
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="총 거래 건수" value={totalCount} />
        <StatCard title="총 거래 금액" value={`${totalAmount.toLocaleString()} 원`} />
        <StatCard title="최근 거래" value={`${recent.length} 건`} />
      </div>

      <div>
        <div className={`${HEADER_CLASSES} mt-6 mb-3`}>
          <h2 className="text-md font-semibold">최근 거래 {RECENT_COUNT}건</h2>
          <Link href="/payments" className={LINK_BUTTON_CLASSES}>
            전체 내역 보기
            <Image src={ArrowRightSvg} alt="arrow right" width={16} height={16} className="ml-1.5" />
          </Link>
        </div>

        <BaseTable headers={TABLE_HEADERS}>{recent.map(renderTableRow)}</BaseTable>
      </div>
    </div>
  );
}

