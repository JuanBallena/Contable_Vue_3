<template>
    <div>
        <div class="a-text a-text--sm">Registrar Compra</div>
        <div class="a-text a-text--xs">Datos de Cliente</div>

        <div class="o-grid o-grid__3">
            <div class="o-input-container">
                <Autocomplete
                    label="Tipo de documento"
                    @selectedValue="purchaseFormData.idDocumentType = $event"
                    :items="documentTypes"
                    prevItemText="number"
                    itemText="abbreviation"
                    itemValue="idDocumentType"
                    itemFilter="number"
                    :defaultValue="purchaseFormData.idDocumentType"
                    :error="formErrors.idDocumentType"
                    :resetError="formErrors.idDocumentType = ''"
                    @keyup="props.purchaseFormData.idCustomer = 0"
                    onlyNumbers
                    :limitCharacters="1"
                    @dblclick="purchaseFormData.idCustomer = -1"
                />
            </div>
            <div class="o-input-container">
                <Autocomplete 
                    label="Número de documento"
                    @selectedValue="purchaseFormData.idCustomer = $event"
                    :items="customers"
                    prevItemText="document"
                    itemText="name"
                    itemValue="idCustomer"
                    itemFilter="document"
                    :defaultValue="purchaseFormData.idCustomer"
                    :error="formErrors.idCustomer"
                    @resetError="formErrors.idCustomer = ''"
                    onlyNumbers
                    :limitCharacters="limitCharactersDocument"
                    :disabled="purchaseFormData.idDocumentType == 0"
                />
            </div>
        </div>     
       
        <div class="a-text a-text--xs">Datos de Comprobante</div>

        <div class="o-grid o-grid__3">
            <div class="o-input-container">
                <Autocomplete 
                    label="Tipo de comprobante"
                    @selectedValue="purchaseFormData.idVoucherType = $event"
                    :items="voucherTypes"
                    prevItemText="number"
                    itemText="abbreviation"
                    itemValue="idVoucherType"
                    itemFilter="number"
                    :defaultValue="purchaseFormData.idVoucherType"
                    :error="formErrors.idVoucherType"
                    @resetError="formErrors.idVoucherType = ''"
                    onlyNumbers
                    :limitCharacters="2"
                />
            </div>
            <div class="o-input-container">
                <InputText 
                    label="Número de comprobante"
                    v-model="purchaseFormData.voucherNumber"
                    :error="formErrors.voucherNumber"
                    @resetError="formErrors.voucherNumber = ''"
                />
            </div>
            <div class="o-input-container">
                <InputDate 
                    label="Fecha de comprobante"
                    v-model="purchaseFormData.voucherDate"
                    :error="formErrors.voucherDate"
                    @resetError="formErrors.voucherDate = ''"
                />
            </div>
        </div>

        <div class="o-grid o-grid__3">
            <div class="o-input-container">
                <Autocomplete 
                    label="Tipo de moneda"
                    @selectedValue="purchaseFormData.idMoneyType = $event"
                    :items="moneyTypes"
                    prevItemText="number"
                    itemText="abbreviation"
                    itemValue="idMoneyType"
                    itemFilter="number"
                    :defaultValue="purchaseFormData.idMoneyType"
                    :error="formErrors.idMoneyType"
                    @resetError="formErrors.idMoneyType = ''"
                    @keyup="purchaseFormData.exchangeType = 0"
                    @dblclick="purchaseFormData.exchangeType = 0"
                    onlyNumbers
                    :limitCharacters="1"
                />
            </div>
            <div class="o-input-container">
                <InputText 
                    label="Tipo de cambio"
                    v-model.number="purchaseFormData.exchangeType"
                    :error="formErrors.exchangeType"
                    :disabled="moneyTypeIsSolesOrNone"
                    @resetError="formErrors.exchangeType = ''"
                />
            </div>
            <div class="o-input-container">
                <InputText 
                    label="Monto de comprobante"
                    v-model.number="purchaseFormData.voucherAmount"
                    :error="formErrors.voucherAmount"
                    @resetError="formErrors.voucherAmount = ''"
                    @keyup="resetAccountsGroup()"
                />
            </div>
        </div>

        <div class="o-grid o-grid__2-1">
            <div class="o-grid__area-1">
                <div class="o-input-container">
                    <InputText 
                        label="Glosa"
                        v-model.number="purchaseFormData.gloss"
                        :error="formErrors.gloss"
                        @resetError="formErrors.gloss = ''"
                    />
                </div>
            </div>
        </div>

        <div class="a-text a-text--xs">Cálculos</div>
        
        <div class="o-grid o-grid__3">
            <div class="o-input-container">
                <Autocomplete 
                    label="Cuentas"
                    @selectedValue="idAccount = $event"
                    :items="accounts"
                    prevItemText="number"
                    itemText="description"
                    itemValue="idAccount"
                    itemFilter="number"
                    onlyNumbers
                    :limitCharacters="4"
                    @enter="calculate()"
                />
                <button
                    type="button"
                    :class="calculateButtonDisabled
                        ? 'a-btn a-btn--muted'
                        : 'a-btn a-btn--complementary-1'"
                    :disabled="calculateButtonDisabled"
                    @click="calculate()"
                >
                    Calcular
                </button>
            </div>
        </div>

        <div class="a-text a-text--xs">Tabla de cuentas</div>

        <div v-if="accountsHasCustomValue">
            <div class="o-grid o-grid__3">
                <div class="o-input-container"> 
                    <InputText 
                        label="Porcentaje de Gastos de Ventas (%)"
                        v-model.number="percentage"
                        @keyup="onKeyupPercentage()"
                        :limitCharacters="3"
                        onlyNumbers
                    />
                </div>
            </div>
        </div>
            
        <div style="min-height: 420px; height: auto;">
            <table class="m-table">
                <thead>
                    <tr>
                        <th>Cuenta</th>
                        <th>Descripción</th>
                        <th>Debe (S/.)</th>
                        <th>Haber (S/.)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(accountGroup, index) in accountsGroup"
                        :key="index"
                    >
                        <td>{{ accountGroup.number }}</td>
                        <td>{{ accountGroup.description }}</td>

                        <td v-if="accountGroup.hasTypeAmountShould()">
                            {{ accountGroup.amount }}
                        </td>
                        <td v-else></td>

                        <td v-if="accountGroup.hasTypeAmountHaving()">
                            {{ accountGroup.amount }}
                        </td>
                        <td v-else></td>
                    </tr>
                </tbody>
            </table>
            
            <button
                type="button"
                
                @click="$emit('saveForm')"
            >
                Guardar
            </button>
            <!-- :class="buttonIsDisabled ? 'a-btn a-btn--muted' : 'a-btn a-btn--secondary'"
                :disabled="buttonIsDisabled" -->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, computed, watch } from 'vue';
import Autocomplete             from '@/components/Autocomplete.vue';
import InputText                from '@/components/InputText.vue';
import InputDate                from '@/components/InputDate.vue';
import PurchaseFormData         from '@/forms/PurchaseFormData';
import DocumentType             from '@/types/DocumentType';
import VoucherType              from '@/types/VoucherType';
import MoneyType                from '@/types/MoneyType';
import Customer                 from '@/types/Customer';
import Account                  from '@/types/Account';
import AccountGroup             from '@/types/AccountGroup';
import ApiDocumentTypeList      from '@/uses/DocumentTypes/ApiDocumentTypeList';
import ApiMoneyTypeList         from '@/uses/MoneyTypes/ApiMoneyType';
import ApiVoucherTypeList       from '@/uses/VoucherTypes/ApiVoucherTypeList';
import ApiCustomerList          from '@/uses/Customers/ApiCustomerList';
import ApiMainAccountList       from '@/uses/MainAccounts/ApiMainAccountList';
import ApiAccountGroupCalculate from '@/uses/AccountGroups/ApiAccountGroupCalculate';
import CalculatePercentage      from '@/utils/CalculatePercentage';

export default defineComponent({

    components: {
        Autocomplete,
        InputText,
        InputDate
    },

    props: {
        purchaseFormData: {
            type: PurchaseFormData,
            default: new PurchaseFormData()
        },
        formErrors: {
            type: Object,
            default: {}
        },
        buttonIsDisabled: {
            type: Boolean,
            default: false
        },
        loadItemEdit: {
            type: Function,
            default: () => {}
        }
    },

    emits: ['saveForm'],

    setup(props) {

        const apiDocumentTypeList = new ApiDocumentTypeList();
        const apiVoucherTypeList = new ApiVoucherTypeList();
        const apiMoneyTypeList = new ApiMoneyTypeList();
        const apiCustomerList = new ApiCustomerList();
        const apiMainAccountList = new ApiMainAccountList();
        const apiAccountGroupCalculate = new ApiAccountGroupCalculate();

        const documentTypes: Ref<DocumentType[]> = ref([]);
        const voucherTypes: Ref<VoucherType[]> = ref([]); 
        const moneyTypes: Ref<MoneyType[]> = ref([]);
        const customers: Ref<Customer[]> = ref([]);
        const accounts: Ref<Account[]> = ref([]);
        const accountsGroup: Ref<AccountGroup[]> = ref([]);
        const idAccount: Ref<number> = ref(0);
        const percentage: Ref<number> = ref(0);
        const prevAmountCustom: Ref<number> = ref(0);

        onMounted(async (): Promise<void> => {

            customers.value = (await apiCustomerList.toList()).data;
            documentTypes.value = (await apiDocumentTypeList.toList()).data;
            voucherTypes.value = (await apiVoucherTypeList.toList()).data;
            moneyTypes.value = (await apiMoneyTypeList.toList()).data;
            accounts.value = (await apiMainAccountList.toList()).data;

            props.loadItemEdit();
        });

        watch(() => idAccount.value, (): void => {
            if (idAccount.value == 0) resetAccountsGroup();
        });

        const customersFilter = computed((): Customer[] => {
            return customers.value.filter((customer: Customer) => {
                return customer.idDocumentType == props.purchaseFormData.idDocumentType;
            });
        });

        const moneyTypeIsSolesOrNone = computed((): boolean => {
            return props.purchaseFormData.moneyTypeIsSolesOrNone();
        });

        const calculateButtonDisabled = computed((): boolean => {
            return idAccount.value == 0 || props.purchaseFormData.voucherAmountIsNone();
        });

        const accountsHasCustomValue = computed((): boolean => {
            return accountsGroup.value.length > 7;
        });

        const limitCharactersDocument = computed((): number => {
            return props.purchaseFormData.documentTypeIsDni() ? 8 : 11;
        });

        const calculate = async(): Promise<void> => {
            
            if (idAccount.value == 0) return;
            
            accountsGroup.value = (await apiAccountGroupCalculate.toCalculate(
                idAccount.value, props.purchaseFormData.voucherAmount
            )).data;

            prevAmountCustom.value = accountsGroup.value[3].amount;
            props.purchaseFormData.setAccounts(accountsGroup.value);
        };

        const resetAccountsGroup = (): void => {
            accountsGroup.value = [];
            percentage.value = 0;
        };

        const onKeyupPercentage = (): void => {

            if (percentage.value > 100) {
                percentage.value = 0;
                accountsGroup.value[3].amount = prevAmountCustom.value;
                accountsGroup.value[4].amount = 0;
                return;
            }

            if (percentage.value == 100) {
                accountsGroup.value[3].amount = 0;
                accountsGroup.value[4].amount = prevAmountCustom.value;
                return;
            }

            if (percentage.value > 0) {

                const percentageCustomValue: number = percentage.value/100;
                const percentajeDefferenceValue: number = 1 - percentageCustomValue;

                accountsGroup.value[3].amount = CalculatePercentage.calculate(
                    prevAmountCustom.value, percentageCustomValue
                );

                accountsGroup.value[4].amount = CalculatePercentage.calculate(
                    prevAmountCustom.value, percentajeDefferenceValue
                );

            } else {
                accountsGroup.value[3].amount = prevAmountCustom.value;
                accountsGroup.value[4].amount = 0;
            }
        };

        return {
            documentTypes,
            voucherTypes,
            moneyTypes,
            customers: customersFilter,
            accounts,
            idAccount,
            accountsGroup,
            percentage,
            moneyTypeIsSolesOrNone,
            calculateButtonDisabled,
            accountsHasCustomValue,
            limitCharactersDocument,
            calculate,
            onKeyupPercentage,
            resetAccountsGroup
        }
    },
})
</script>
