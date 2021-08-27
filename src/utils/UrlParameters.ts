export default class UrlParameters {

    constructor() {}

    static values: object = {
        number: 'page[number]', 
        size: 'page[size]', 
        idCustomer: 'filter[idCustomer]',
        idParameterType: 'filter[idParameterType]',
        idRecord: 'filter[idRecord]'
    };
}