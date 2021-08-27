export default class Account {

    public idAccount: number = 0;
    public idAccountType: number = 0;
    public accountType: string = "";
    public number: string = "";
    public description: string = "";

    constructor() {}

    static toAccounts(data: any[])
    {
        const accounts: Account[] = [];

        data.forEach((item: any) => {

            const account = new Account();

            account.idAccount     = item['idAccount'];
            account.idAccountType = item['idAccountType'];
            account.accountType   = item['accountType'];
            account.number        = item['number'];
            account.description   = item['description'];

            accounts.push(account);
        });
        
        return accounts;
    }
}
