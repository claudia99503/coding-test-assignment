const LOCALE = "ko-KR";

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const DATETIME_OPTIONS: Intl.DateTimeFormatOptions = {
  ...DATE_OPTIONS,
  hour: "2-digit",
  minute: "2-digit",
};

export function formatLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateOnly(date: Date): string {
  return date.toLocaleDateString(LOCALE, DATE_OPTIONS);
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString(LOCALE, DATETIME_OPTIONS);
}

