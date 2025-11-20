import { DateRange } from "react-day-picker";
import { PaymentItem } from "@/app/types/payments";
import { formatLocalDateString } from "./formateDate";

export const PAGE_CLASSES = "p-6 space-y-6";
export const HEADER_CLASSES = "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between";
export const LOADING_CLASSES = "p-6 text-gray-600";
export const ERROR_CLASSES = "p-6 text-red-500";
export const BUTTON_CLASSES =
  "inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100";
export const FILTER_GROUP_CLASSES = "flex flex-col gap-4 sm:flex-row";
export const FILTER_CONTAINER_CLASSES = "flex flex-col gap-4";

export const ERROR_MESSAGE = "데이터를 불러오는 데 실패했습니다.";
export const LOADING_MESSAGE = "로딩 중...";
export const SEARCH_PLACEHOLDER = "결제코드 · 가맹점 코드 검색";

export function sortPaymentsByDate(payments: PaymentItem[]): PaymentItem[] {
  return [...payments].sort(function (a, b) {
    return new Date(b.paymentAt).getTime() - new Date(a.paymentAt).getTime();
  });
}

export function mapStatusCodesToOptions(
  statusCodes: { code: string; description: string }[]
) {
  return statusCodes.map(function (code) {
    return { value: code.code, label: code.description };
  });
}

export function mapTypeCodesToOptions(
  typeCodes: { type: string; description: string }[]
) {
  return typeCodes.map(function (code) {
    return { value: code.type, label: code.description };
  });
}

export function getDateRangeFromPicker(dateRange: DateRange | undefined) {
  if (dateRange?.from && dateRange?.to) {
    return {
      startDate: formatLocalDateString(dateRange.from),
      endDate: formatLocalDateString(dateRange.to),
    };
  }
  return { startDate: "", endDate: "" };
}

export function applyFilters(
  payments: PaymentItem[],
  filters: {
    status?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
    searchTerm?: string;
  }
): PaymentItem[] {
  let result = [...payments];

  if (filters.status) {
    result = result.filter(function (p) {
      return p.status === filters.status;
    });
  }

  if (filters.type) {
    result = result.filter(function (p) {
      return p.payType === filters.type;
    });
  }

  if (filters.startDate && filters.endDate) {
    const { startDate, endDate } = filters;
    result = result.filter(function (p) {
      const paymentDateString = formatLocalDateString(new Date(p.paymentAt));
      const isAfterStart = paymentDateString >= startDate;
      const isBeforeEnd = paymentDateString <= endDate;
      return isAfterStart && isBeforeEnd;
    });
  }

  if (filters.searchTerm?.trim()) {
    const keyword = filters.searchTerm.trim().toLowerCase();
    result = result.filter(function (p) {
      return (
        p.paymentCode.toLowerCase().includes(keyword) ||
        p.mchtCode.toLowerCase().includes(keyword)
      );
    });
  }

  return result;
}

