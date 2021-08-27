<template>
    <div>
        <div class="o-layout">
            <div class="o-layout__menu">
                <Menu />
            </div>
            <div class="o-layout__content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu from './Menu.vue'

export default defineComponent({
    
    components: {
        Menu
    },

    setup() {
        
    },
})
</script>
