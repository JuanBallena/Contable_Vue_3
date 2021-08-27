export default class MoneyType {

    static SOLES: number = 1;
    static DOLLAR: number = 2;

    public idMoneyType: number = 0;
    public number: string = "";
    public description: string = "";
    public abbreviation: string = "";

    constructor() {}

    static toMoneyTypes(data: any[]): MoneyType[]
    {
        const moneyTypes: MoneyType[] = [];

        data.forEach((item: any) => {

            const moneyType = new MoneyType();

            moneyType.idMoneyType  = item['idMoneyType'];
            moneyType.number       = item['number'];
            moneyType.description  = item['description'];
            moneyType.abbreviation = item['abbreviation'];

            moneyTypes.push(moneyType);
        });

        return moneyTypes;
    }
}