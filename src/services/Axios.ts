import axios from 'axios';
import Api from './Api';
import ServiceResponse from './ServiceResponse';

export default class Service {

    constructor() {}

    private api: Api = new Api();
    private serviceResponse: ServiceResponse = new ServiceResponse();

    public async get(endPoint: string): Promise<ServiceResponse> 
    {
        const serviceResponse: ServiceResponse = new ServiceResponse();

        try {
            const { data, status } = await axios.get(this.api.getBaseUrl() + endPoint);
            
            serviceResponse.data = data['data'];
            serviceResponse.pages = data['pages'];
            serviceResponse.status = status;

            return serviceResponse;

        } catch (error: any) {
            
            if (error.request)
            {
                return this.serviceResponse;
            }

            if (error.response) 
            {
                return this.serviceResponse;
            }
        }

        return serviceResponse;
    }

    public async post(endPoint: string, dataPost: any): Promise<ServiceResponse> 
    {
        try {
            const { data, status } = await axios.post(this.api.getBaseUrl() + endPoint, dataPost);

            this.serviceResponse.data = data['data'];
            this.serviceResponse.message = data['message'];
            this.serviceResponse.status = status;

            return this.serviceResponse;

        } catch (error: any) {

            if (error.request)
            {   
                this.serviceResponse.errors = this.toErrors(error.request.response);
                this.serviceResponse.status = error.request.status;
                return this.serviceResponse;
            }

            if (error.response) 
            {
                return this.serviceResponse;
            }
        }

        return this.serviceResponse;
    }

    public async put(endPoint: string, dataPost: any): Promise<ServiceResponse> 
    {
        try {
            const { data, status } = await axios.put(this.api.getBaseUrl() + endPoint, dataPost);

            this.serviceResponse.data = data['data'];
            this.serviceResponse.status = status;

            return this.serviceResponse;

        } catch (error: any) {

            if (error.request)
            {
                this.serviceResponse.errors = this.toErrors(error.request.response);
                this.serviceResponse.status = error.request.status;
                return this.serviceResponse;
            }

            if (error.response) 
            {
                return this.serviceResponse;
            }
        }

        return this.serviceResponse;
    }

    public async delete(endPoint: string): Promise<ServiceResponse> 
    {
        try {
            const { data, status } = await axios.delete(this.api.getBaseUrl() + endPoint);
            this.serviceResponse.data = data['data'];
            this.serviceResponse.status = status;

            return this.serviceResponse;

        } catch (error: any) {
            
            if (error.request)
            {
                return this.serviceResponse;
            }

            if (error.response) 
            {
                return this.serviceResponse;
            }
        }

        return this.serviceResponse;
    }

    private toErrors(errorResponse: any): Object[]
    {
        const json: any = JSON.parse(errorResponse);
        return Object.entries(json['errors']);
    }
}