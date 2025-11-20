interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

const TD_CLASSES = "px-4 py-2";

export default function TableCell({ children, className = "" }: TableCellProps) {
  return <td className={`${TD_CLASSES} ${className}`.trim()}>{children}</td>;
}

