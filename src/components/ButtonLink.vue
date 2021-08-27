<template>
     <button
        :class="className"
        type="button"
        @click="changeView()"
    >
        Registrar
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';

export default defineComponent({

    props: {
        text: {
            type: String,
            default: 'button'
        },
        className: {
            type: String,
            default: ''
        },
        routeName: {
            type: String,
            default: '',
            required: true
        }
    },

    setup(props) {

        const router = useRouter();

        const changeView = (): void => {
            router.push({ name: props.routeName });
        };

        return {
            changeView
        }
    },
})
</script>
