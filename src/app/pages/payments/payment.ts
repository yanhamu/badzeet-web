export interface Payment {
    id: number,
    accountId: number,
    date: Date,
    description: string,
    amount: number,
    categoryId: number,
    userId: string
}