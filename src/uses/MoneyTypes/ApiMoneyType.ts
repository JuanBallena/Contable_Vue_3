import ApiGetResponse from '@/interfaces/ApiGetResponse';
import Axios          from '@/services/Axios';
import MoneyType      from '@/types/MoneyType';

export default class ApiMoneyTypeList {

    constructor() {}

    private axios: Axios = new Axios();

    public async toList(): Promise<ApiGetResponse> 
    {
        const { data, pages } = await this.axios.get(`/money-types`);

        return {
            data: MoneyType.toMoneyTypes(data) || [],
            pages: pages || 0
        }
    }
}