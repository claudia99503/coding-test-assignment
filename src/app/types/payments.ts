export interface PaymentItem {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: string;
  status: string;
  paymentAt: string;
}

export interface PaymentListResponse {
  status: number;
  message: string;
  data: PaymentItem[];
}

