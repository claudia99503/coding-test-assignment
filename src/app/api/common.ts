import axios from "@/app/libs/axios";

// 결제 상태 코드 조회
export async function fetchPaymentStatusCodes() {
  const res = await axios.get("/common/payment-status/all");
  return res.data;
}

// 결제 수단 코드 조회
export async function fetchPaymentTypeCodes() {
  const res = await axios.get("/common/paymemt-type/all");
  return res.data;
}

