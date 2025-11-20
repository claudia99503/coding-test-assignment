"use client";

import Image from "next/image";
import { DateRange } from "react-day-picker";
import { formatDateOnly } from "@/app/utils/formateDate";
import ChevronDownSvg from "@/app/assets/images/chevron-down.svg";
import ChevronUpSvg from "@/app/assets/images/chevron-up.svg";

interface DateRangeButtonProps {
  value: DateRange | undefined;
  onClick: () => void;
  label?: string;
  isOpen?: boolean;
}

const getButtonText = (range: DateRange | undefined): string => {
  if (!range?.from) return "날짜 범위 선택";

  const fromDate = formatDateOnly(range.from);
  if (range.to) return `${fromDate} ~ ${formatDateOnly(range.to)}`;

  return `${fromDate} ~ 날짜 선택`;
};

const BUTTON_CLASSES =
  "flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left shadow-sm transition hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 min-h-[44px]";

const LABEL_CLASSES =
  "block text-[11px] font-medium uppercase tracking-wide text-gray-500";

export default function DateRangeButton({
  value,
  onClick,
  label = "날짜 범위",
  isOpen = false,
}: DateRangeButtonProps) {
  return (
    <button type="button" onClick={onClick} className={BUTTON_CLASSES}>
      <div>
        <span className={LABEL_CLASSES}>{label}</span>
        <span className="mt-0.5 block text-sm text-gray-900">
          {getButtonText(value)}
        </span>
      </div>
      <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-500">
        <Image
          src={isOpen ? ChevronUpSvg : ChevronDownSvg}
          alt={isOpen ? "chevron up" : "chevron down"}
          width={14}
          height={14}
          className="text-gray-500"
        />
      </span>
    </button>
  );
}

