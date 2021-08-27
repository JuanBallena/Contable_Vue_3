export default class RecordAccount {

    public idRecordAccount: number = 0;
    public idAccount: number = 0;
    public accountNumber: string = "";
    public account: string = "";
    public idAmountType: number = 0;
    public amountType: string = "";
    public amount: number = 0;

    constructor() {}

    static toRecordAccounts(data: any[]): RecordAccount[] 
    {
        const recordAccounts: RecordAccount[] = [];

        data.forEach((item: any) => {

            const recordAccount = new RecordAccount();
            recordAccount.idRecordAccount = item['idRecordAccount'];
            recordAccount.idAccount       = item['idAccount'];
            recordAccount.accountNumber   = item['accountNumber'];
            recordAccount.account         = item['account'];
            recordAccount.idAmountType    = item['idAmountType'];
            recordAccount.amountType      = item['amountType'];
            recordAccount.amount          = item['amount'];

            recordAccounts.push(recordAccount);
        });

        return recordAccounts;
    }
}