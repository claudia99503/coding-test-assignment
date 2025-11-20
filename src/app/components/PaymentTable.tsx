"use client";

import Link from "next/link";
import { PaymentItem } from "@/app/types/payments";
import { formatDate } from "@/app/utils/formateDate";
import BaseTable from "./Table/BaseTable";
import TableRow from "./Table/TableRow";
import TableCell from "./Table/TableCell";

const headers = ["결제코드", "금액", "상태", "가맹점 코드", "결제수단", "결제일시"];

export default function PaymentTable({ payments }: { payments: PaymentItem[] }) {
  return (
    <BaseTable headers={headers}>
      {payments.map((item) => (
        <TableRow key={item.paymentCode}>
          <TableCell>{item.paymentCode}</TableCell>
          <TableCell>{Number(item.amount).toLocaleString()} 원</TableCell>
          <TableCell>{item.status}</TableCell>
          <TableCell>
            <Link
              href={`/merchants/detail/${item.mchtCode}`}
              className="text-blue-600 hover:underline"
            >
              {item.mchtCode}
            </Link>
          </TableCell>
          <TableCell>{item.payType}</TableCell>
          <TableCell>{formatDate(item.paymentAt)}</TableCell>
        </TableRow>
      ))}
    </BaseTable>
  );
}

