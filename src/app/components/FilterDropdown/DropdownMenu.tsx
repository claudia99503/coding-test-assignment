import { FilterOption } from "@/app/components/FilterDropdown";

interface DropdownMenuProps {
  placeholder: string;
  value: string;
  options: FilterOption[];
  onSelect: (value: string) => void;
}

const DROPDOWN_CLASSES =
  "absolute left-0 top-full mt-[5px] w-full rounded-lg border border-gray-200 bg-white shadow-lg z-10";

const OPTION_BUTTON_CLASSES = "block w-full px-4 py-2 text-left text-sm transition hover:bg-gray-50";

const getOptionClasses = (isSelected: boolean) =>
  `${OPTION_BUTTON_CLASSES} ${isSelected ? "text-blue-600 font-semibold" : "text-gray-700"}`;

export default function DropdownMenu({
  placeholder,
  value,
  options,
  onSelect,
}: DropdownMenuProps) {
  return (
    <div className={DROPDOWN_CLASSES}>
      <button type="button" onClick={() => onSelect("")} className={getOptionClasses(value === "")}>
        {placeholder}
      </button>
      <div className="max-h-60 overflow-y-auto">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={getOptionClasses(option.value === value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

