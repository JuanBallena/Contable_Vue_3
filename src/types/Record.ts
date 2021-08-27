import RecordAccount from "./RecordAccount";

export default class Record {

    static PURCHASE_TYPE: number = 1;
    static SALE_TYPE: number = 2;

    public idRecord: number = 0;
    public idMonth: number = 0;
    public month: string = "";
    public idCustomer: number = 0;
    public customer: string = "";
    public idDocumentType: number = 0;
    public documentType: number = 0;
    public document: string = "";
    public idMoneyType: number = 0;
    public money: string = "";
    public idVoucherType: number = 0;
    public voucherType: string = "";
    public exchangeType: number = 0;
    public voucherDate: string = "";
    public voucherNumber: string = "";
    public voucherAmount: number = 0;
    public gloss: string = "";
    public accounts: RecordAccount[] = [];

    constructor() {}

    static toRecords(data: any[]): Record[] 
    {
        const records: Record[] = [];

        data.forEach((item: any) => {

            const record = new Record();
            record.idRecord       = item['idRecord'];
            record.idMonth        = item['idMonth'];
            record.month          = item['month'];
            record.idCustomer     = item['idCustomer'];
            record.customer       = item['customer'];
            record.idDocumentType = item['idDocumentType'];
            record.documentType   = item['documentType'];
            record.document       = item['document'];
            record.idMoneyType    = item['idMoneyType'];
            record.money          = item['money'];
            record.idVoucherType  = item['idVoucherType'];
            record.voucherType    = item['voucherType'];
            record.exchangeType   = item['exchangeType'];
            record.voucherDate    = item['voucherDate'];
            record.voucherNumber  = item['voucherNumber'];
            record.voucherAmount  = item['voucherAmount'];
            record.gloss          = item['gloss'];
            record.accounts       = RecordAccount.toRecordAccounts(item['accounts']);

            records.push(record);
        }) ;

        return records;
    }
}