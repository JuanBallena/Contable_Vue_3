export default class Customer {

    public idCustomer : number = 0;
    public idDocumentType : number = 0;
    public documentType : string = "";
    public document : string = "";
    public name : string = "";

    constructor() {}

    static toCustomers(data: any[]): Customer[]
    {
        const customers : Customer[] = [];

        data.forEach((item: any) => {

            const customer = new Customer();
            customer.idCustomer     = item['idCustomer'];
            customer.idDocumentType = item['idDocumentType'];
            customer.documentType   = item['documentType'];
            customer.document       = item['document'];
            customer.name           = item['name'];

            customers.push(customer);
        });

        return customers;
    }
}