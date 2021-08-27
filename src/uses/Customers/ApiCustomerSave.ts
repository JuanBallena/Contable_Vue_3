import { useRouter }    from "vue-router";
import { reactive }     from "vue";
import CustomerFormData from '@/forms/CustomerFormData';
import Axios            from "@/services/Axios";
import ServiceResponse  from "@/services/ServiceResponse";
import ShowErrorMessages from '../../utils/ShowErrorMessages';

export default class ApiCustomerSave {

    constructor() {}

    private axios = new Axios();
    private router = useRouter();

    public errors: any = reactive({
        idDocumentType: "",
        document: "",
        name: ""
    });

    public async toRegister(customerFormData: CustomerFormData): Promise<void> 
    {
        const serviceResponse: ServiceResponse = 
            await this.axios.post(`/customers`, customerFormData);

        this.checkServiceResponse(serviceResponse);
    }

    public async toUpdate(customerFormData: CustomerFormData, idCustomer: number): Promise<void>
    {
        const serviceResponse: ServiceResponse = 
            await this.axios.put(`/customers/${idCustomer}`, customerFormData);

        this.checkServiceResponse(serviceResponse);
    }

    private checkServiceResponse(serviceResponse: ServiceResponse): void {

        if (serviceResponse.created()) 
        {
            this.router.push({ name: 'Customers' });
        }

        if (serviceResponse.badRequest())
        {
            ShowErrorMessages.show(serviceResponse, this.errors);
        }
    }
}