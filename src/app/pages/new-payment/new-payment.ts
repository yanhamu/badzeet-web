export interface NewPaymentDto {
    date: Date,
    description: string,
    amount: number,
    categoryId: number,
    userId: string,
    type: number
  }