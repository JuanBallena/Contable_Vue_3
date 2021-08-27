<template>
    <div class="a-autocomplete">
        <label class="a-label">{{ label }}</label>
        <input
            type="text"
             :class="disabled
                ? 'a-input-text a-input-text--disabled'
                : 'a-input-text'"
            :placeholder="disabled ? '' : placeholder"
            v-model="autocompleteText"
            @click="autocompleteItemsIsVisible = true"
            @dblclick="counterClick += 1, doubleClick()"
            @focus="autocompleteItemsIsVisible = true"
            @blur="autocompleteItemsIsVisible = false"
            @keyup="onKeyup()"
            @keyup.enter="onKeyupEnter()"
            @keypress="onKeypress"
            @keydown="onKeydown"
            tabindex="1"
            :disabled="disabled"
        />
        <div 
            v-if="autocompleteItemsIsVisible"
            class="a-autocomplete__box"
            @mousedown="$event.preventDefault()"
        >
            <ul 
                :class="itemsFiltered.length > 0
                    ? 'a-autocomplete__items a-autocomplete--border'
                    : 'a-autocomplete__items'"
            >
                <li
                    v-for="(item, index) in itemsFiltered"
                    :key="index"
                    class="a-autocomplete__item"
                    @click="selectedItem(item)"
                >
                    <div class="a-autocomplete__prev-item-text">
                        {{ getPrevItemText(item) }}
                    </div>
                    <div class="a-autocomplete__item-text">
                        {{ getItemText(item) }}
                    </div>
                </li>
            </ul>
        </div>
        <div class="a-text__error">{{ error }}</div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref, watch } from 'vue';
import DeepValueSearcher from '@/utils/DeepValueSearcher';
import NumberChecker     from '@/utils/NumberChecker';
import TextLengthChecker from '@/utils/TextLengthChecker';

export default defineComponent({

    props: {
        items: {
            type: Array as () => Array<any>,
            default: [],
            required: true
        },
        label: {
            type: String,
            default: 'label'
        },
        itemText: {
            type: String,
            default: '',
            required: true
        },
        prevItemText: {
            type: String,
            default: ''
        },
        itemValue: {
            type: String,
            default: '',
            required: true
        },
        itemFilter: {
            type: String,
            default: '',
            required: true
        },
        placeholder: {
            type: String,
            default: 'Buscar'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        returnObject: {
            type: Boolean,
            default: false
        },
        defaultValue: {
            type: Number,
            default: 0
        },
        error: {
            type: String,
            default: ''
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

    emits: ['selectedValue','keyup','dblclick','resetError','enter'],

    setup(props, {emit}) {

        const counterClick: Ref<number> = ref(0);
        const errorMessage: Ref<string> = ref("");
        const autocompleteText: Ref<string> = ref("");
        const autocompleteItemsIsVisible: Ref<boolean> = ref(false);

        watch(() => props.defaultValue , () => {

            if (props.defaultValue)
            {
                const items: any[] = props.items.filter((item: any) => {
                    return item[props.itemValue] == props.defaultValue;
                });

                autocompleteText.value = getPrevItemText(items[0]);
            }
        });

        const itemsFiltered = computed((): any[] => {
            return autocompleteText.value == "" ? props.items : filterItems();
        });

        const filterItems = (): any[] => {

            return props.items.filter((item: any) => {
                return item[props.itemFilter].includes(autocompleteText.value);
            });
        };

        const getPrevItemText = (item: object): string => {
            return DeepValueSearcher.search(item, props.prevItemText);
        };

        const getItemText = (item: object): string => {
            return DeepValueSearcher.search(item, props.itemText)
        };

        const getItemValue = (item: object): string => {
            return props.returnObject 
                ? JSON.stringify(item) 
                : DeepValueSearcher.search(item, props.itemValue);
        };

        const resetAutocomplete = (): void => {
            autocompleteText.value = "";
            emit('selectedValue', 0);
            emit('resetError');
        };

        const doubleClick = (): void => {

            resetAutocomplete();
            emit('dblclick');
        };

        const selectedItem = (item: any): void => {
            
            loadAutocompleteText(item);
            emit('resetError');
        };

        const onKeyup = (): void => {
            
            emit('selectedValue', 0);

            const items: any[] = props.items.filter((item: any) => {
                return item[props.itemFilter] == autocompleteText.value;
            });

            if (items.length) {
                loadAutocompleteText(items[0]);
            }

            emit('keyup');
            emit('resetError');
        };

        const onKeydown = (e: any): void => {

            const keyCodeArrowTop: number = 38;
            const keyCodeArrowBottom: number = 40;

            switch (e.keyCode) 
            {
                case keyCodeArrowTop:
                    break;

                case keyCodeArrowBottom:
                    resetAutocomplete();
                    autocompleteItemsIsVisible.value = true;
                    break;

                default:
                    break;
            }
        };

        const onKeypress = (event: any) => {

            if (props.onlyNumbers) {
                NumberChecker.checker(event);
            }

            if (props.limitCharacters) {
                TextLengthChecker.checker(event, props.limitCharacters);
            }
        };

        const onKeyupEnter = (): void => {
            
            if (itemsFiltered.value.length == 1) {
                loadAutocompleteText(itemsFiltered.value[0]);
            }

            emit('enter');
        };

        const loadAutocompleteText = (item: any): void => {

            autocompleteText.value = getPrevItemText(item);
            autocompleteItemsIsVisible.value = false;
            emit('selectedValue', JSON.parse(getItemValue(item)));
            emit('resetError');
        }

        return {
            itemsFiltered,
            autocompleteText,
            autocompleteItemsIsVisible,
            counterClick,
            errorMessage,
            doubleClick,
            selectedItem,
            getPrevItemText,
            getItemText,
            onKeyup,
            onKeydown,
            onKeypress,
            onKeyupEnter
        }
    },
})
</script>