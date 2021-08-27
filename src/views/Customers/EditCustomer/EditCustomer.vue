<template>
    <div>
        <div class="a-text a-text--sm">Editar Cliente</div>
        
        <CustomerForm 
            :customerFormData="customerFormData"
            :formErrors="formErrors"
            :buttonIsDisabled="customerFormIncomplete"
            :loadItemEdit="loadCustomer"
            @saveForm="save()"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from 'vue';
import { useRoute }     from 'vue-router';
import CustomerFormData from '@/forms/CustomerFormData';
import Customer         from '@/types/Customer';
import ApiCustomerSave  from '@/uses/Customers/ApiCustomerSave';
import ApiCustomerList  from '@/uses/Customers/ApiCustomerList';
import CustomerForm     from '@/views/Customers/CustomerForm/CustomerForm.vue';

export default defineComponent({

    components: {
        CustomerForm
    },

    setup() {

        const route = useRoute();
        const apiCustomerList = new ApiCustomerList();
        const apiCustomerSave = new ApiCustomerSave();
        const customer: Ref<Customer> = ref(new Customer());
        const customerFormData: Ref<CustomerFormData> = ref(new CustomerFormData());

        const customerFormIncomplete = computed((): boolean => {
            return customerFormData.value.formIncomplete();
        });

        const loadCustomer = async (): Promise<void> => {

            customer.value = (await apiCustomerList.toList({ 
                idCustomer: parseInt(String(route.params.id)) 
            })).data[0];

            customerFormData.value.setValues(customer.value);
        };
        
        const save = async (): Promise<void> => {

            apiCustomerSave.toUpdate(customerFormData.value, customer.value.idCustomer);
        };

        return {
            customerFormData,
            customerFormIncomplete,
            formErrors: apiCustomerSave.errors,
            loadCustomer,
            save
        }
    },
})
</script>
