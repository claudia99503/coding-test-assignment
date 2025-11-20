"use client";

import Image from "next/image";
import SearchSvg from "@/app/assets/images/search.svg";

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const INPUT_CLASSES =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

const ICON_WRAPPER_CLASSES = "pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400";

export default function SearchInput({
  value,
  placeholder = "검색어를 입력하세요",
  onChange,
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={INPUT_CLASSES}
      />
      <span className={ICON_WRAPPER_CLASSES}>
        <Image src={SearchSvg} alt="search" width={16} height={16} />
      </span>
    </div>
  );
}

