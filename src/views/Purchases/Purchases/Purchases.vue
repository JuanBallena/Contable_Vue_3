<template>
    <div>
        <ButtonLink 
            text="Registrar"
            className="a-btn a-btn--secondary"
            routeName="RegisterPurchase"
        />

        <div class="a-text a-text--sm">Compras</div>

        <div>
            <table class="m-table m-table--hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Documento</th>
                        <th>Glosa</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(record, index) in records"
                        :key="index"
                    >
                        <td>{{ index + 1 }}</td>
                        <td>{{ record.customer }}</td>
                        <td>{{ record.document }}</td>
                        <td>{{ record.gloss }}</td>
                        <td>
                            <router-link
                                :to="{ name: 'EditPurchase', params: { id: record.idRecord } }"
                            >
                                <i class="fas fa-pen m-table__icon"></i>
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- <div>
            Páginas: {{ pages}}
        </div> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import ButtonLink     from '@/components/ButtonLink.vue';
import ApiGetResponse from '@/interfaces/ApiGetResponse';
import Record         from '@/types/Record';
import ApiRecordList  from '@/uses/Records/ApiRecordList';

export default defineComponent({

    components: {
        ButtonLink
    }, 

    setup() {
        
        const NUMBER_PAGE: number = 1;
        const SIZE_PAGE: number = 15;

        const apiRecordList = new ApiRecordList();

        const records: Ref<Record[]> = ref([]);
        const pages: Ref<number> = ref(0);

        onMounted(async (): Promise<void> => {

            const response = await apiRecordList.toList(/*{ 
                number: NUMBER_PAGE,
                size: SIZE_PAGE 
            }*/);

            loadData(response);
        });

        const loadData = (response: ApiGetResponse): void => {

            records.value = response.data;
            pages.value = response.pages;
        }

        return {
            records,
            pages
        }
    },
})
</script>
