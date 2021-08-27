<template>
    <div>
        <div class="o-grid o-grid__3">
            <div class="o-input-container">
                <Autocomplete
                    label="Tipo de documento"
                    @selectedValue="customerFormData.idDocumentType = $event"
                    :items="documentTypes"
                    prevItemText="number"
                    itemText="abbreviation"
                    itemValue="idDocumentType"
                    itemFilter="number"
                    :defaultValue="customerFormData.idDocumentType"
                    :error="formErrors.idDocumentType"
                    @keyup="onKeyupDocumentType()"
                    onlyNumbers
                    :limitCharacters="1"
                    @dblclick="customerFormData.document = ''"
                />
            </div>
        </div>
        
        <div class="o-grid o-grid__3">
            <div class="o-input-container">
                <InputText 
                    label="Documento"
                    v-model="customerFormData.document"
                    :limitCharacters="limitCharactersDocument"
                    :error="formErrors.document"
                    @keyup="formErrors.document = ''"
                    :disabled="customerFormData.idDocumentType == 0"
                    onlyNumbers
                />
            </div>
        </div>

        <div class="o-grid o-grid__3">
            <div class="o-input-container">
                <InputText 
                    label="Nombres y/o Razón social"
                    v-model="customerFormData.name"
                    :error="formErrors.name"
                    @keyup="formErrors.name = ''"
                />
            </div>
        </div>

        <button 
            type="button" 
            :class="buttonIsDisabled ? 'a-btn a-btn--muted' : 'a-btn a-btn--secondary'"
            :disabled="buttonIsDisabled"
            @click="$emit('saveForm')"
        >
            Guardar
        </button>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';
import Autocomplete        from '@/components/Autocomplete.vue';
import InputText           from '@/components/InputText.vue';
import CustomerFormData    from '@/forms/CustomerFormData';
import DocumentType        from '@/types/DocumentType';
import ApiDocumentTypeList from '@/uses/DocumentTypes/ApiDocumentTypeList';

export default defineComponent({

    components: {
        Autocomplete,
        InputText
    },

    props: {
        customerFormData: {
            type: CustomerFormData,
            default: new CustomerFormData()
        },
        formErrors: {
            type: Object,
            default: {}
        },
        buttonIsDisabled: {
            type: Boolean,
            default: true
        },
        loadItemEdit: {
            type: Function,
            default: () => {}
        }
    },

    emits: ['saveForm'],

    setup(props) {

        const apiDocumentTypeList = new ApiDocumentTypeList();
        const documentTypes: Ref<DocumentType[]> = ref([]);
        
        onMounted(async (): Promise<void> => {

            documentTypes.value = (await apiDocumentTypeList.toList()).data;

            props.loadItemEdit();
        });

        const limitCharactersDocument = computed((): number => {
            return props.customerFormData.documentTypeIsDni() ? 8 : 11;
        });

        const onKeyupDocumentType = (): void => {
            
            props.formErrors.idDocumentType = "";
            props.formErrors.document = "";
            props.customerFormData.document = "";
        };

        return {
            documentTypes,
            limitCharactersDocument,
            onKeyupDocumentType
        }
    },
})
</script>
