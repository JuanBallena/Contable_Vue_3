import ApiGetResponse from "@/interfaces/ApiGetResponse";
import Axios          from "@/services/Axios";
import AccountGroup   from '@/types/AccountGroup';

export default class ApiAccountGroupCalculate {

    constructor() {}

    private axios = new Axios();

    public async toCalculate(idAccount: number, amount: number): Promise<ApiGetResponse>
    {
        const { data, pages } = 
            await this.axios.post(`/account-group-calculate`, {
                idAccount: idAccount,
                amount: amount
            });

        return {
            data: AccountGroup.toAccountsGroup(data),
            pages: pages
        }
    }
}