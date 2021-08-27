import ApiGetResponse from "@/interfaces/ApiGetResponse";
import Axios          from "@/services/Axios";
import Account        from '@/types/Account';

export default class ApiAccountList {

    constructor() {}

    private axios = new Axios();

    public async toList(): Promise<ApiGetResponse>
    {
        const { data, pages } = await this.axios.get(`/accounts`);

        return {
            data: Account.toAccounts(data),
            pages: pages
        }
    }
}