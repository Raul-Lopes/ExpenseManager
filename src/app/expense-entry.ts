export interface IExpenseEntry {
    id: number;
    item: string;
    amount: number;
    category: string;
    location: string;
    spendOn: Date;
    createdOn: Date;
}

export class ExpenseEntry implements IExpenseEntry {
    id: number = 0;
    item: string = '';
    amount: number = 0;
    category: string = '';
    location: string = '';
    spendOn: Date = new Date();
    createdOn: Date = new Date();

    constructor(data?: Partial<IExpenseEntry>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
