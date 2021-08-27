<template>
    <li class="g-menu__item">
        <router-link
            :class="route.meta.module == metaModule 
                ? 'g-menu__link g-menu__link--active' 
                : 'g-menu__link'"
            :to="{ name: `${ routeName }` }"
        >
            {{ text }}
        </router-link>
    </li> 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute }        from 'vue-router';

export default defineComponent({
    props: {
        text: {
            type: String,
            default: "Item"
        },
        routeName: {
            type: String,
            default: "Home"
        },
        metaModule: {
            type: String,
            default: ""
        }
    },

    setup() {

        const route = useRoute();

        return {
            route
        }
    },
})
</script>
