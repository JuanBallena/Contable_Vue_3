import PurchaseAccountFormData from './PurchaseAccountFormData';
import AccountGroup            from '@/types/AccountGroup';
import Record                  from '@/types/Record';
import MoneyType               from '@/types/MoneyType';
import DocumentType            from '@/types/DocumentType';

export default class PurchaseRecordFormData {

    public idMonth : number = 1;
    public idCustomer : number = 0;
    public idDocumentType: number = 0;
    public idMoneyType: number = 0;
    public idVoucherType: number = 0;
    public idRecordType: number = Record.PURCHASE_TYPE;
    public exchangeType: number = 0;  
    public voucherDate: string = "";
    public voucherNumber: string = "";
    public voucherAmount: number = 0;
    public gloss: string = "";
    public accounts: PurchaseAccountFormData[] = [];

    public formIncomplete(): boolean 
    {    
        return this.idMonth == 0 || 
            this.idCustomer == 0 || 
            this.idMoneyType == 0 ||
            this.idVoucherType == 0 ||
            this.idRecordType == 0 ||
            this.voucherDate == "" ||
            this.voucherNumber == "" ||
            this.voucherAmount == 0 ||
            // this.accounts.length == 0 ||
            this.gloss == "";
    }

    public setValues(record: Record): void 
    {
        Object.entries(record).forEach(([key, value]: any) => Object(this)[key] = value);
    }

    public setAccounts(accountsGroup: AccountGroup[]): void
    {
        this.accounts = [];

        accountsGroup.forEach((accountGroup: AccountGroup) => {

            const purchaseAccountFormData = new PurchaseAccountFormData();
            purchaseAccountFormData.idAccount    = accountGroup.idAccount;
            purchaseAccountFormData.idAmountType = accountGroup.idAmountType;
            purchaseAccountFormData.amount       = accountGroup.amount;

            this.accounts.push(purchaseAccountFormData);
        });
    }

    public documentTypeIsDni(): boolean 
    {
        return this.idDocumentType == DocumentType.DNI;
    }

    public moneyTypeIsSolesOrNone(): boolean
    {
        return this.idMoneyType == MoneyType.SOLES || this.idMoneyType == 0;
    }

    public voucherAmountIsNone()
    {
        return this.voucherAmount == 0;
    }
}