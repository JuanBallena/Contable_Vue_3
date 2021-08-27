export default class VoucherType {

    public idVoucherType: number = 0;
    public number: string = "";
    public description: string = "";
    public abbreviation: string = "";

    constructor() {}

    static toVoucherTypes(data: any[]): VoucherType[]
    {
        const voucherTypes: VoucherType[] = [];

        data.forEach((item: any) => {

            const voucherType = new VoucherType();

            voucherType.idVoucherType = item['idVoucherType'];
            voucherType.number        = item['number'];
            voucherType.description   = item['description'];
            voucherType.abbreviation  = item['abbreviation'];

            voucherTypes.push(voucherType);
        });

        return voucherTypes;
    }
}