interface BaseTableProps {
  headers: string[];
  children: React.ReactNode;
}

const TABLE_WRAPPER_CLASSES = "overflow-x-auto border rounded-lg";
const TABLE_CLASSES = "w-full text-sm";
const THEAD_CLASSES = "bg-gray-100";
const TH_CLASSES = "px-4 py-2 text-left";

export default function BaseTable({ headers, children }: BaseTableProps) {
  return (
    <div className={TABLE_WRAPPER_CLASSES}>
      <table className={TABLE_CLASSES}>
        <thead className={THEAD_CLASSES}>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={TH_CLASSES}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

