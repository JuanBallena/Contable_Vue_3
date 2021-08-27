import ServiceResponse from "@/services/ServiceResponse";

export default class ShowErrorMessages {

    constructor() {}

    static show(serviceResponse: ServiceResponse, errors: any): void 
    {
        Object.entries(errors).forEach(([key, value]: any) => errors[key] = "");
        serviceResponse.errors.forEach(([key, value]: any) => errors[key] = value[0]);

        console.log(errors);
    }
}