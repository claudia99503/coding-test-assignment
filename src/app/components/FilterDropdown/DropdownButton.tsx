import Image from "next/image";
import ChevronDownSvg from "@/app/assets/images/chevron-down.svg";
import ChevronUpSvg from "@/app/assets/images/chevron-up.svg";

interface DropdownButtonProps {
  label: string;
  selectedLabel: string;
  isOpen: boolean;
  onClick: () => void;
}

const BUTTON_CLASSES =
  "flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left shadow-sm transition hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

const LABEL_CLASSES =
  "block text-[11px] font-medium uppercase tracking-wide text-gray-500";

export default function DropdownButton({
  label,
  selectedLabel,
  isOpen,
  onClick,
}: DropdownButtonProps) {
  return (
    <button type="button" onClick={onClick} className={BUTTON_CLASSES}>
      <div>
        <span className={LABEL_CLASSES}>{label}</span>
        <span className="mt-0.5 block text-sm text-gray-900">{selectedLabel}</span>
      </div>
      <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-500">
        <Image
          src={isOpen ? ChevronUpSvg : ChevronDownSvg}
          alt={isOpen ? "chevron up" : "chevron down"}
          width={14}
          height={14}
        />
      </span>
    </button>
  );
}

