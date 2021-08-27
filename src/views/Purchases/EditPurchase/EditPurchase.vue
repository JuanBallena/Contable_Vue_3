<template>
    <div>
        <PurchaseForm
            :purchaseFormData="purchaseFormData"
            :formErrors="formErrors"
            :loadItemEdit="loadRecord"
            :buttonIsDisabled="purchaseFormImcomplete"
            @saveForm="save()"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import { useRoute }     from 'vue-router';
import PurchaseFormData from '@/forms/PurchaseFormData';
import Record           from '@/types/Record';
import PurchaseForm     from '@/views/Purchases/PurchaseForm/PurchaseForm.vue';
import ApiRecordList    from '@/uses/Records/ApiRecordList';
import ApiRecordSave    from '@/uses/Records/ApiRecordSave';
export default defineComponent({

    components: {
        PurchaseForm
    },

    setup() {

        const route = useRoute();
        const apiRecordList = new ApiRecordList();
        const apiRecordSave = new ApiRecordSave();

        const record: Ref<Record> = ref(new Record());
        const purchaseFormData: Ref<PurchaseFormData> = ref(new PurchaseFormData());

        const purchaseFormImcomplete = computed(() => purchaseFormData.value.formIncomplete());

        const loadRecord = async (): Promise<void> => {

            record.value = (await apiRecordList.toList({ 
                idRecord: parseInt(String(route.params.id)) 
            })).data[0];

            purchaseFormData.value.setValues(record.value);
        };

        const save = async (): Promise<void> => {
            
            await apiRecordSave.toUpdate(purchaseFormData.value, record.value.idRecord);
        };
        
        return {
            purchaseFormData,
            purchaseFormImcomplete,
            formErrors: apiRecordSave.errors,
            save,
            loadRecord
        }
    },
})
</script>
