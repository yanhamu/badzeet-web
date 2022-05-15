export interface PendingPaymentDto {
    id: number,
    amount: number,
    category: string,
    description: string,
    owner: string,
    date: Date
}