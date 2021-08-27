import { reactive } from 'vue';
import { useRouter } from "vue-router";
import PurchaseFormData  from "@/forms/PurchaseFormData";
import Axios             from "@/services/Axios";
import ServiceResponse   from "@/services/ServiceResponse";
import ShowErrorMessages from "@/utils/ShowErrorMessages";

export default class ApiRecordSave {

    constructor() {}

    private axios = new Axios();
    private router = useRouter();

    public errors: any = reactive({
        idDocumentType: "",
        documnet: "",
        idCustomer: "",
        idMoneyType: "",
        idVoucherType: "",
        voucherNumber: "",
        voucherDate: "",
        voucherAmount: "",
        exchangeType: "",
        gloss: ""
    });

    public async toSave(purchaseFormData: PurchaseFormData): Promise<void>
    {
        const serviceResponse: ServiceResponse = 
            await this.axios.post(`/records`, purchaseFormData);

        this.checkServiceResponse(serviceResponse);
    }

    public async toUpdate(purchaseFormData: PurchaseFormData, idRecord: number): Promise<void>
    {
        const serviceResponse: ServiceResponse = 
            await this.axios.put(`/records/${idRecord}`, purchaseFormData);

        this.checkServiceResponse(serviceResponse);
    }

    private checkServiceResponse(serviceResponse: ServiceResponse): void {

        if (serviceResponse.created())
        {
            this.router.push({ name: 'Purchases' });
        }

        if (serviceResponse.badRequest())
        {
            ShowErrorMessages.show(serviceResponse, this.errors);
        }
    }
}