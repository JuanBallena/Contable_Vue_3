<template>
    <div>
        <textarea 
            type="text"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
            tabindex="1"
        ></textarea>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

    props: {
        placeholder: {
            type: String,
            default: 'Escribe'
        },
        modelValue: {
            type: [String, Number],
            default: null
        },
    },

    emits: ['update:modelValue'],

    setup() {
        //
    },
})
</script>