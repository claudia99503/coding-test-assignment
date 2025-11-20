import { CSSProperties } from "react";

const SELECTED_DAY_COLOR = "#3b82f6";
const SELECTED_DAY_TEXT_COLOR = "white";

const selectedDayStyle: CSSProperties = {
  backgroundColor: SELECTED_DAY_COLOR,
  color: SELECTED_DAY_TEXT_COLOR,
};

export const dayPickerStyles: { [key: string]: CSSProperties } = {
  months: { display: "flex", gap: "1rem" },
  month: { margin: 0 },
  caption: { padding: "0.5rem 0", marginBottom: "0.5rem" },
  head_cell: { padding: "0.5rem", fontWeight: 500 },
  cell: { padding: "0.25rem" },
  day: {
    padding: "0.5rem",
    borderRadius: "0.25rem",
    transition: "all 0.2s",
  },
  day_selected: selectedDayStyle,
  day_range_start: selectedDayStyle,
  day_range_end: selectedDayStyle,
};

