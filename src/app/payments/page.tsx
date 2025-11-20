"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
import { PaymentItem } from "@/app/types/payments";
import { fetchPaymentsList } from "@/app/api/payments";
import { fetchPaymentStatusCodes, fetchPaymentTypeCodes } from "@/app/api/common";
import PaymentTable from "@/app/components/PaymentTable";
import FilterDropdown from "@/app/components/FilterDropdown";
import SearchInput from "@/app/components/SearchInput";
import DateRangePicker from "@/app/components/DateRangePicker";
import {
  PAGE_CLASSES,
  HEADER_CLASSES,
  LOADING_CLASSES,
  ERROR_CLASSES,
  BUTTON_CLASSES,
  FILTER_GROUP_CLASSES,
  FILTER_CONTAINER_CLASSES,
  ERROR_MESSAGE,
  LOADING_MESSAGE,
  SEARCH_PLACEHOLDER,
  sortPaymentsByDate,
  mapStatusCodesToOptions,
  mapTypeCodesToOptions,
  getDateRangeFromPicker,
  applyFilters,
} from "@/app/utils/paymentsUtils";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusCodes, setStatusCodes] = useState<{ code: string; description: string }[]>([]);
  const [typeCodes, setTypeCodes] = useState<{ type: string; description: string }[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchPaymentsList();
        setPayments(sortPaymentsByDate(res.data));
      } catch (err) {
        console.error(err);
        setError(ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    async function loadCodes() {
      try {
        const statusRes = await fetchPaymentStatusCodes();
        const typeRes = await fetchPaymentTypeCodes();

        setStatusCodes(statusRes.data);
        setTypeCodes(typeRes.data);
      } catch (err) {
        console.error("코드 불러오기 실패", err);
      }
    }

    loadCodes();
  }, []);

  const { startDate, endDate } = useMemo(function () {
    return getDateRangeFromPicker(dateRange);
  }, [dateRange]);

  const statusOptions = useMemo(function () {
    return mapStatusCodesToOptions(statusCodes);
  }, [statusCodes]);

  const typeOptions = useMemo(function () {
    return mapTypeCodesToOptions(typeCodes);
  }, [typeCodes]);

  const filtered = useMemo(
    function () {
      return applyFilters(payments, {
        status: selectedStatus,
        type: selectedType,
        startDate,
        endDate,
        searchTerm,
      });
    },
    [payments, selectedStatus, selectedType, startDate, endDate, searchTerm]
  );

  if (loading) return <div className={LOADING_CLASSES}>{LOADING_MESSAGE}</div>;
  if (error) return <div className={ERROR_CLASSES}>{error}</div>;

  return (
    <div className={PAGE_CLASSES}>
      <div className={HEADER_CLASSES}>
        <h1 className="text-lg font-semibold">거래 내역 리스트</h1>
        <Link href="/" className={BUTTON_CLASSES}>
          홈 화면
        </Link>
      </div>

      <div className={FILTER_CONTAINER_CLASSES}>
        <div className={FILTER_GROUP_CLASSES}>
          <FilterDropdown
            label="상태"
            placeholder="전체 상태"
            value={selectedStatus}
            options={statusOptions}
            onChange={setSelectedStatus}
          />
          <FilterDropdown
            label="결제 수단"
            placeholder="전체 결제수단"
            value={selectedType}
            options={typeOptions}
            onChange={setSelectedType}
          />
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            label="결제 기간"
          />
        </div>

        <div className="w-full">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={SEARCH_PLACEHOLDER}
          />
        </div>
      </div>

      <PaymentTable payments={filtered} />
    </div>
  );
}

