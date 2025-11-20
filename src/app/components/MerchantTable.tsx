"use client";

import Link from "next/link";
import { MerchantDetailItem } from "@/app/types/merchants";
import BaseTable from "./Table/BaseTable";
import TableRow from "./Table/TableRow";
import TableCell from "./Table/TableCell";

const headers = ["가맹점 코드", "가맹점명", "상태", "업종", "등록일"];

export default function MerchantTable({ merchants }: { merchants: MerchantDetailItem[] }) {
  return (
    <BaseTable headers={headers}>
      {merchants.map((m) => (
        <TableRow key={m.mchtCode}>
          <TableCell className="text-left">
            <Link
              href={`/merchants/detail/${m.mchtCode}`}
              className="text-blue-600 hover:underline"
            >
              {m.mchtCode}
            </Link>
          </TableCell>
          <TableCell className="text-left">{m.mchtName}</TableCell>
          <TableCell className="text-left">{m.status}</TableCell>
          <TableCell className="text-left">{m.bizType}</TableCell>
          <TableCell className="text-left">
            {new Date(m.registeredAt).toLocaleDateString()}
          </TableCell>
        </TableRow>
      ))}
    </BaseTable>
  );
}

