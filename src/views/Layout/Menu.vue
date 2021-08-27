<template>
    <div class="a-text a-text--xs a-text--center">
        Sistema contable
    </div>
    <ul class="g-menu">
        
        <ItemMenu
            v-for="(itemMenu, index) in itemsMenu"
            :key="index"
            :text="itemMenu.text" 
            :routeName="itemMenu.routeName" 
            :metaModule="itemMenu.metaModule" 
        />
            
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ItemMenu from './ItemMenu.vue';

export default defineComponent({

    components: {
        ItemMenu
    },

    setup() {
        const itemsMenu: object[] = [
            {
                text: 'Clientes',
                metaModule: 'customers',
                routeName: 'Customers'
            },
            {
                text: 'Compras',
                metaModule: 'purchases',
                routeName: 'Purchases'
            }
        ];

        return {
            itemsMenu
        }
    },
})
</script>
