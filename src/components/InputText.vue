<template>
    <div>
        <label class="a-label">{{ label }}</label>
        <input 
            type="text"
            @dblclick="counterClick += 1, doubleClick()"
            :class="disabled
                ? 'a-input-text a-input-text--disabled'
                : 'a-input-text'"
            :placeholder="disabled ? '' : placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keyup="onkeyup()"
            @keypress="onKeypress"
            :disabled="disabled"
            tabindex="1"
        />
        <div class="a-text__error">{{ error }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import NumberChecker     from '@/utils/NumberChecker';
import TextLengthChecker from '@/utils/TextLengthChecker';

export default defineComponent({

    props: {
        label: {
            type: String,
            default: 'label'
        },
        placeholder: {
            type: String,
            default: 'Escribe'
        },
        modelValue: {
            type: [String, Number],
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: ""
        },
        onlyNumbers: {
            type: Boolean,
            default: false
        },
        limitCharacters: {
            type: Number,
            default: 0
        }
    },

    emits: ['update:modelValue','keyup','dblclick', 'resetError'],

    setup(props, { emit }) {
        
        const counterClick: Ref<number> = ref(0);

        const doubleClick = (): void => {
            emit('update:modelValue', "");
            emit('dblclick');
        };

        const onkeyup = (): void => {
            emit('resetError');
            emit('keyup');
        }

        const onKeypress = (event: any) => {

            if (props.onlyNumbers) {
                NumberChecker.checker(event);
            }

            if (props.limitCharacters) {
                TextLengthChecker.checker(event, props.limitCharacters);
            }
        };

        return {
            counterClick,
            doubleClick,
            onkeyup,
            onKeypress
        }
    },
})
</script>
