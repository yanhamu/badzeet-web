export interface Payment {
    id: number,
    accountId: number,
    date: Date,
    description: string,
    amount: number,
    categoryId: number,
    userId: string,
    type: PaymentTypeEnum
}

export enum PaymentTypeEnum {
    Normal = 1,
    Scheduled = 2,
    Pending = 3
}