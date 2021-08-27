import ApiGetResponse from '@/interfaces/ApiGetResponse';
import Axios          from '@/services/Axios';
import DocumentType   from '@/types/DocumentType';

export default class ApiDocumentTypeList {

    constructor() {}

    private axios = new Axios();

    public async toList(): Promise<ApiGetResponse> 
    {
        const { data, pages } = await this.axios.get(`/document-types`);

        return {
            data: DocumentType.toDocumentTypes(data) || [],
            pages: pages || 0
        }
    }
}