import { computed } from 'vue';
import Customer     from '@/types/Customer';
import DocumentType from '@/types/DocumentType';

export default class CustomerFormData {

    public idDocumentType: number = 0;
    public document: string = "";
    public name: string = "";

    public formIncomplete(): boolean 
    {    
        return this.idDocumentType == 0 || 
            this.document == "" || 
            this.name == "";
    }

    public setValues(customer: Customer): void 
    {
        Object.entries(customer).forEach(([key, value]: any) => Object(this)[key] = value);
    }

    public documentTypeIsDni(): boolean 
    {
        return this.idDocumentType == DocumentType.DNI;
    }
}