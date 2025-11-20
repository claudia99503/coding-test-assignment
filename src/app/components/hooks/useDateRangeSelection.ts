import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useClickOutside } from "./useClickOutside";

interface UseDateRangeSelectionProps {
  onChange: (range: DateRange | undefined) => void;
}

const isSameDate = (date1: Date, date2: Date) =>
  date1.getTime() === date2.getTime();

export function useDateRangeSelection({
  onChange,
}: UseDateRangeSelectionProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [lastSelectedDate, setLastSelectedDate] = useState<Date | null>(null);

  const calendarRef = useClickOutside<HTMLDivElement>(() =>
    setIsCalendarOpen(false)
  );

  const handleSelect = (range: DateRange | undefined) => {
    if (!range?.from) {
      onChange(undefined);
      setLastSelectedDate(null);
      return;
    }

    if (!range.to) {
      onChange(range);
      setLastSelectedDate(range.from);
      return;
    }

    const date = range.from;
    if (isSameDate(date, range.to)) {
      const isDoubleClick = lastSelectedDate && isSameDate(lastSelectedDate, date);
      onChange(isDoubleClick ? { from: date, to: date } : { from: date, to: undefined });
      if (isDoubleClick) {
        setIsCalendarOpen(false);
        setLastSelectedDate(null);
      } else {
        setLastSelectedDate(date);
      }
      return;
    }

    onChange(range);
    setIsCalendarOpen(false);
    setLastSelectedDate(null);
  };

  const handleToggleCalendar = () => {
    setIsCalendarOpen((prev) => {
      if (!prev) setLastSelectedDate(null);
      return !prev;
    });
  };

  return {
    isCalendarOpen,
    calendarRef,
    handleSelect,
    handleToggleCalendar,
  };
}

