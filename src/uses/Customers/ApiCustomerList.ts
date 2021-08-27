import ApiGetResponse       from '@/interfaces/ApiGetResponse';
import Axios                from '@/services/Axios';
import Customer             from '@/types/Customer';
import UrlParametersCreator from '@/utils/UrlParametersCreator';

interface QueryParametersForCustomers {
    number?: number
    size?: number
    idCustomer?: number
}

export default class ApiCustomerList {

    constructor() {}

    private axios: Axios = new Axios();

    public async toList(parameters: QueryParametersForCustomers = {}): Promise<ApiGetResponse> 
    {
        const { data, pages } = 
            await this.axios.get(`/customers?${UrlParametersCreator.create(parameters)}`);

        return {
            data: Customer.toCustomers(data) || [],
            pages: pages || 0
        }
    }
}