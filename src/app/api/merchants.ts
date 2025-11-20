import axiosInstance from "@/app/libs/axios";
import { MerchantDetailItem } from "@/app/types/merchants";

// 전체 가맹점 상세 조회
export async function fetchMerchantsDetails(): Promise<{
  status: number;
  message: string;
  data: MerchantDetailItem[];
}> {
  const res = await axiosInstance.get("/merchants/details");
  return res.data;
}

// 가맹점 코드로 가맹점 상세 조회
export async function fetchMerchantDetailByCode(mchtCode: string) {
  const res = await axiosInstance.get(`/merchants/details/${mchtCode}`);
  return res.data;
}

