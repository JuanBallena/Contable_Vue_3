<template>
    <div class="g-home">
        <router-link 
            class="a-btn a-btn--primary"
            :to="{ name: 'Purchases' }"
        >
            Acceder al asistema
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        //
    },
})
</script>
