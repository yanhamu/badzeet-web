import { Payment } from "src/app/pages/payments/payment";

export interface PendingPaymentDto extends Payment {
    category: string,
    owner: string,
}