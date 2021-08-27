<template>
    <div>
        <div class="a-text a-text--sm">Registrar Cliente</div>
        
        <CustomerForm 
            :customerFormData="customerFormData"
            :formErrors="formErrors"
            :buttonIsDisabled="customerFormIncomplete"
            @saveForm="save()"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from 'vue';
import CustomerFormData from '@/forms/CustomerFormData';
import ApiCustomerSave  from '@/uses/Customers/ApiCustomerSave';
import CustomerForm     from '@/views/Customers/CustomerForm/CustomerForm.vue';

export default defineComponent({

    components: {
        CustomerForm
    },

    setup() {

        const apiCustomerSave = new ApiCustomerSave();
        const customerFormData: Ref<CustomerFormData> = ref(new CustomerFormData());

        const customerFormIncomplete = computed((): boolean => {
            return customerFormData.value.formIncomplete();
        });
        
        const save = async (): Promise<void> => {

            await apiCustomerSave.toRegister(customerFormData.value);
        }

        return {
            customerFormData,
            formErrors: apiCustomerSave.errors,
            customerFormIncomplete,
            save
        }
    },
})
</script>
