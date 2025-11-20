"use client";

import { useState } from "react";
import { useClickOutside } from "./hooks/useClickOutside";
import DropdownButton from "./FilterDropdown/DropdownButton";
import DropdownMenu from "./FilterDropdown/DropdownMenu";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}

export default function FilterDropdown({
  label,
  placeholder,
  value,
  options,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useClickOutside<HTMLDivElement>(() => setOpen(false));

  const selectedLabel = options.find((option) => option.value === value)?.label || placeholder;

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full sm:w-48">
      <DropdownButton
        label={label}
        selectedLabel={selectedLabel}
        isOpen={open}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <DropdownMenu placeholder={placeholder} value={value} options={options} onSelect={handleSelect} />
      )}
    </div>
  );
}

