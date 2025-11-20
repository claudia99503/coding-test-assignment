export interface MerchantDetailItem {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}

export interface MerchantDetailResponse {
  status: number;
  message: string;
  data: MerchantDetailItem[];
}

