export interface BudgetDto {
    AccountId: number,
    BudgetId: number,
    From: Date,
    To: Date,
    BudgetCategories: BudgetCategoryDto[]
}

export interface BudgetCategoryDto {
    CategoryId: number,
    Amount: number
}