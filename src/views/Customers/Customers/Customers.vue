<template>
    <div>
        <ButtonLink 
            text="Registrar"
            className="a-btn a-btn--secondary"
            routeName="RegisterCustomer"
        />

        <div class="a-text a-text--sm">Clientes</div>
        
        <table class="m-table m-table--hover">
            <thead class="m-table__header">
                <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Tipo de documento</th>
                    <th>Número de documento</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(customer, index) in customers"
                    :key="index"
                >
                    <td>{{ index + 1 }}</td>
                    <td>{{ customer.name }}</td>
                    <td>{{ customer.documentType }}</td>
                    <td>{{ customer.document }}</td>
                    <td>
                        <router-link
                            :to="{ name: 'EditCustomer', params: { id: customer.idCustomer} }"
                        >
                            <i class="fas fa-pen m-table__icon"></i>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import ButtonLink      from '@/components/ButtonLink.vue';
import ApiGetResponse  from '@/interfaces/ApiGetResponse';
import Customer        from '@/types/Customer';
import ApiCustomerList from '@/uses/Customers/ApiCustomerList';

export default defineComponent({

    components: {
        ButtonLink
    },

    setup() {
        
        const SIZE_PAGE: number = 15;
        const NUMBER_PAGE: number = 1;

        const apiCustomersList = new ApiCustomerList();

        const customers: Ref<Customer[]> = ref([]);
        const pages: Ref<number> = ref(0);

        onMounted(async (): Promise<void> => {

            const response = await apiCustomersList.toList({ 
                number: NUMBER_PAGE, 
                size: SIZE_PAGE 
            });

            loadData(response);
        });

        const loadData = (response: ApiGetResponse): void => {

            customers.value = response.data;
            pages.value = response.pages;
        };

        return {
            customers,
            pages
        }
    },
})
</script>
