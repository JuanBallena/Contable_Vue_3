<template>
    <select
        :value="modelValue"
        @change="changeModelValue"
    >
        <option value="0" selected disabled>{{ placeholder }}</option>
        <option 
            v-for="(item, index) in items"
            :key="index"
            :value="getItemValue(item, itemValue)"
        >
            {{ getItemText(item, itemText) }}
        </option>
    </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DeepValueSearcher from '@/utils/DeepValueSearcher';

export default defineComponent({
    props: {
        items: {
            type: Array as () => Array<any>,
            default: []
        },
        itemText: {
            type: String,
            default: ''
        },
        itemValue: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: 'Seleccione'
        },
        modelValue: {
            type: [String, Boolean, Number, Object],
            default: null
        },
        returnObject: {
            type: Boolean,
            default: false
        }
    },

    emits: ['update:modelValue','change'],

    setup(props, {emit}) {
        
        const getItemText = (item: object, path: string): string => {

            return DeepValueSearcher.search(item, path)
        };

        const getItemValue = (item: object, path: string): string => {
            
            return props.returnObject 
                ? JSON.stringify(item) 
                : DeepValueSearcher.search(item, path);
        };

        const changeModelValue = (event: any): void => {

            const target: HTMLInputElement = event.target;
            emit('update:modelValue', JSON.parse(target.value));
            emit('change');
        };

        return {
            getItemText,
            getItemValue,
            changeModelValue
        }
    },

})
</script>
