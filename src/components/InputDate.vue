<template>
    <div>
        <label class="a-label">{{ label }}</label>
        <input 
            type="date"
            class="a-input-text"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @change="onChange()"
            tabindex="1"
        />
        <div class="a-text__error">{{ error }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

    props: {
        label: {
            type: String,
            default: 'label'
        },
        modelValue: {
            type: [String, Number],
            default: null
        },
        error: {
            type: String,
            default: ""
        },
    },

    emits: ['update:modelValue','change','resetError'],

    setup(props, { emit }) {
        
        const onChange = (): void => {
            emit('change');
            emit('resetError');
        }

        return {
            onChange
        }
    },
})
</script>
