export interface Payment {
    Id: number,
    AccountId: number,
    Date: Date,
    Description: string,
    Amount: number,
    CategoryId: number,
    UserId: string
}