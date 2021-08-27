import ApiGetResponse       from '@/interfaces/ApiGetResponse';
import Axios                from "@/services/Axios";
import Record               from '@/types/Record';
import UrlParametersCreator from "@/utils/UrlParametersCreator";

interface QueryParametersForRecords {
    number?: number
    size?: number
    idRecord?: number
}

export default class ApiRecordList {

    constructor() {}

    private axios: Axios = new Axios();

    public async toList(parameters: QueryParametersForRecords = {}): Promise<ApiGetResponse>
    {
        const { data, pages } = 
            await this.axios.get(`/records?${UrlParametersCreator.create(parameters)}`);

        return {
            data: Record.toRecords(data) || [],
            pages: pages || 0
        }
    }
}