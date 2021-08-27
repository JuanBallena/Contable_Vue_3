import ApiGetResponse from '@/interfaces/ApiGetResponse';
import Axios          from '@/services/Axios';
import VoucherType    from '@/types/VoucherType';

export default class ApiVoucherTypeList {

    constructor() {}

    private axios: Axios = new Axios();

    public async toList(): Promise<ApiGetResponse> 
    {
        const { data, pages } = await this.axios.get(`/voucher-types`);

        return {
            data: VoucherType.toVoucherTypes(data) || [],
            pages: pages || 0
        }
    }
}