"use client";

import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import DateRangeButton from "./DateRangeButton";
import { useDateRangeSelection } from "./hooks/useDateRangeSelection";
import { dayPickerStyles } from "./constants/dayPickerStyles";

interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  label?: string;
}

const CALENDAR_DROPDOWN_CLASSES =
  "absolute left-0 top-full mt-2 z-50 bg-white rounded-lg border border-gray-200 shadow-lg p-4";

const dayPickerProps = {
  mode: "range" as const,
  numberOfMonths: 1,
  className: "text-sm",
  styles: dayPickerStyles,
};

export default function DateRangePicker({
  value,
  onChange,
  label = "날짜 범위",
}: DateRangePickerProps) {
  const { isCalendarOpen, calendarRef, handleSelect, handleToggleCalendar } =
    useDateRangeSelection({ onChange });

  return (
    <div ref={calendarRef} className="relative w-full sm:w-64">
      <DateRangeButton
        value={value}
        onClick={handleToggleCalendar}
        label={label}
        isOpen={isCalendarOpen}
      />
      {isCalendarOpen && (
        <div className={CALENDAR_DROPDOWN_CLASSES}>
          <DayPicker {...dayPickerProps} selected={value} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
}

