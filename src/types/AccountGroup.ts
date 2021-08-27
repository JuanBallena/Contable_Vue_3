import Parameter from './Parameter';
export default class AccountGroup {

    public idAccount: number = 0;
    public number: string = "";
    public description: string = "";
    public idAmountType: number = 0;
    public amountType: string = "";
    public amount: number = 0;

    constructor() {}

    static toAccountsGroup(data: any[])
    {
        const accountsGroup: AccountGroup[] = [];

        data.forEach((item: any) => {

            const accountGroup = new AccountGroup();

            accountGroup.idAccount     = item['idAccount'];
            accountGroup.number        = item['number'];
            accountGroup.description   = item['description'];
            accountGroup.idAmountType  = item['idAmountType'];
            accountGroup.amountType    = item['amountType'];
            accountGroup.amount        = item['amount'];

            accountsGroup.push(accountGroup);
        });
        
        return accountsGroup;
    }

    public hasTypeAmountShould(): boolean 
    {
        return this.idAmountType == Parameter.AMOUNT_TYPE_SHOULD;
    }

    public hasTypeAmountHaving(): boolean 
    {
        return this.idAmountType == Parameter.AMOUNT_TYPE_HAVING;
    }
}