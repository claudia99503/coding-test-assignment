interface TableRowProps {
  children: React.ReactNode;
}

const TR_CLASSES = "border-t";

export default function TableRow({ children }: TableRowProps) {
  return <tr className={TR_CLASSES}>{children}</tr>;
}

