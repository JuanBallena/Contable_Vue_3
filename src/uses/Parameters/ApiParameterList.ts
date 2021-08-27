import ApiGetResponse       from '@/interfaces/ApiGetResponse';
import Axios                from '@/services/Axios';
import Parameter            from '@/types/Parameter';
import UrlParametersCreator from '@/utils/UrlParametersCreator';

interface QueryParametersForParameters {
    idParameterType?: number
}

export default class ApiParameterList {

    constructor() {}

    private axios: Axios = new Axios();

    public async toList(parameters: QueryParametersForParameters = {}): Promise<ApiGetResponse> 
    {
        const { data, pages } = 
            await this.axios.get(`/parameters?${UrlParametersCreator.create(parameters)}`);

        return {
            data: Parameter.toParameters(data) || [],
            pages: pages || 0
        }
    }
}