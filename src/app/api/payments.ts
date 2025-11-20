import api from "@/app/libs/axios";
import { PaymentListResponse } from "@/app/types/payments";

// 전체 거래 내역 조회
export async function fetchPaymentsList(): Promise<PaymentListResponse> {
  const res = await api.get("/payments/list");
  return res.data;
}

