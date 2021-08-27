<template>
    <div>
        <PurchaseForm
            :purchaseFormData="purchaseFormData"
            :formErrors="formErrors"
            :buttonIsDisabled="purchaseFormImcomplete"
            @saveForm="save()"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import PurchaseFormData from '@/forms/PurchaseFormData';
import ApiRecordSave    from '@/uses/Records/ApiRecordSave';
import PurchaseForm     from '@/views/Purchases/PurchaseForm/PurchaseForm.vue';
export default defineComponent({

    components: {
        PurchaseForm
    },

    setup() {

        const apiRecordSave = new ApiRecordSave();
        const purchaseFormData: Ref<PurchaseFormData> = ref(new PurchaseFormData());

        const purchaseFormImcomplete = computed((): boolean => {
            return purchaseFormData.value.formIncomplete()
        });

        const save = async (): Promise<void> => {
            
            await apiRecordSave.toSave(purchaseFormData.value);
        };
        
        return {
            purchaseFormData,
            purchaseFormImcomplete,
            formErrors: apiRecordSave.errors,
            save
        }
    },
})
</script>
