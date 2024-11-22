<template>
    <div>
        <NuxtLayout name="admin">
            <main>
                <Head>
                    <Title>Customer Returns - {{ runtimeConfig.public.appName }}</Title>
                </Head>
                <!-- Add Button and Description -->
                <div class="sm:flex sm:items-center sm:justify-between">
                    <!-- Search Bar -->
                    <div class="relative flex flex-1 ml-8 mt-5">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M9 3a6 6 0 11-6 6 6 6 0 016-6zM2 9a7 7 0 1114 0A7 7 0 012 9zm11.293 4.293a1 1 0 00-1.415-1.414L10 12.586l-1.879-1.878a1 1 0 00-1.415 1.414L8.586 14l-1.879 1.879a1 1 0 001.415 1.415L10 15.414l1.879 1.879a1 1 0 001.415-1.415L11.414 14l1.879-1.879a1 1 0 000-1.415z"
                                clip-rule="evenodd" />
                        </svg>
                        <input type="text" placeholder="Search"
                            class="block w-70 rounded-md border border-gray-400 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-xs pl-8 pr-2 py-1.5" />
                    </div>
                    <!-- Add Customer Button -->
                    <div class="mt-4 sm:ml-16 sm:mt-3 sm:flex-none mr-6">
                        <button type="button" @click="toggleForm"
                            class="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Add Returns
                        </button>
                    </div>
                </div>
                <!-- Customer Return Form -->
                <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <form @submit.prevent="saveReturn">
                            <FormLabel label="Return Details" class="text-xl" />
                            <Alert type="danger" :text="state?.error?.message" v-if="
                                state.error?.message &&
                                state.error.message.length > 0
                            " />
                            <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                                <FormLabel for="customerreturnno" label="Customer Return No" class="mr-3" />
                                <div class="flex items-center mb-1">
                                    <FormTextField id="customerreturnno" name="customerreturnno" v-model="returns.customerReturnNo"
                                        placeholder="Customer Return No" />
                                    <FormError :error="v$?.returnNo?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state?.error?.errors?.returnNo?.[0]" />
                                </div>
                                <FormLabel for="productno" label="Product No" class="mr-3" />
                                <div class="flex items-center mb-1">
                                    <FormTextField id="productno" name="productno" v-model="returns.productNo"
                                        placeholder="Product No" />
                                    <FormError :error="v$?.productNo?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state?.error?.errors?.productNo?.[0]" />
                                </div>
                                <FormLabel for="qty" label="Qty" class="mr-3" />
                                <div class="flex items-center mb-1">
                                    <FormNumberField id="qty" name="qty" v-model="returns.qty"
                                        placeholder="Quantity" />
                                    <FormError :error="v$?.qty?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state?.error?.errors?.qty?.[0]" />
                                </div>
                                <FormLabel for="unitprice" label="Unit Price" class="mr-3" />
                                <div class="flex items-center mb-1">
                                    <FormNumberField id="unitprice" name="unitprice" v-model="returns.unitPrice"
                                        placeholder="Unit Price" />
                                    <FormError :error="v$?.unitPrice?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state?.error?.errors?.unitPrice?.[0]" />
                                </div>
                                <div class="flex justify-end gap-2 mt-4">
                                    <FormButton type="submit" buttonStyle="success" class="w-full">
                                        Save
                                    </FormButton>
                                    <FormButton @click="toggleForm" buttonStyle="xxx" class="w-full">
                                        Cancel
                                    </FormButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- View Details -->
                <div v-if="returnToView"
                    class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                            <div class="flex items-center mb-1 ml-7">
                                <label class="text-xxs font-medium text-gray-700 w-20 mr-2">Return No:</label>
                                <span>{{ returns?.customerReturnNo }}</span>
                            </div>
                            <div class="flex items-center mb-1 ml-7">
                                <label class="text-xxs font-medium text-gray-700 w-20 mr-2">Product No:</label>
                                <span>{{ returns?.productNo }}</span>
                            </div>
                            <div class="flex items-center mb-1 ml-7">
                                <label class="text-xxs font-medium text-gray-700 w-20 mr-2">Quantity:</label>
                                <span>{{ returns?.qty}}</span>
                            </div>
                            <div class="flex items-center mb-1 ml-7">
                                <label class="text-xxs font-medium text-gray-700 w-20 mr-2">Unit Price:</label>
                                <span>{{ returns?.unitPrice}}</span>
                            </div>
                            <div class="flex justify-end gap-2 mt-4">
                                <button @click="returnToView = null"
                                    class="rounded-md bg-gray-200 px-4 py-2 text-xxs font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                        <div class="table-responsive">
                            <Table :columnHeaders="state.columnHeaders" :data="state.returns"
                                :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">
                                <template #body
                                    v-if="!(state.isTableLoading || (state.returns?.data && state.returns?.data.length === 0))">
                                    <tr v-for="(returns, index) in state.returns?.data" :key="index">
                                        <td>
                                            <span class="truncate pl-3">{{ returns.id }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ returns.salesinvoiceno }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ returns.returndate }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ returns.remarks }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ returns.preparedby }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ returns.approvedby }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3"
                                                :class="returns.iscancelled ? 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20' : 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'">
                                                {{ returns.iscancelled ? 'Cancelled' : 'Active' }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ returns.cancelledby }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ returns.created_at }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ returns.updated_at }}</span>
                                        </td>
                                        <td class="px-4 py-2 text-xxs text-gray-700">
                                            <div class="flex space-x-2">
                                                <button @click="viewReturn(returns.id)"
                                                    class="text-gray-600 hover:text-gray-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                        viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd"
                                                            d="M12 4.5C8.798 4.5 6 7.057 6 10.5S8.798 16.5 12 16.5 18 13.943 18 10.5 15.202 4.5 12 4.5ZM12 15.5C10.343 15.5 9 14.156 9 12.5S10.343 9.5 12 9.5 15 10.844 15 12.5 13.657 15.5 12 15.5ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 12S7.03 4 12 4s9 4.03 9 9-4.03 9-9 9Z"
                                                            clip-rule="evenodd" />
                                                    </svg>
                                                </button>
                                                <button @click="editReturn(returns.id)"
                                                    class="text-gray-600 hover:text-gray-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                        viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                        <path
                                                            d="M4.293 18.293a1 1 0 0 1-.293-.707V16a1 1 0 0 1 .293-.707l8-8a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-.707.293H5a1 1 0 0 1-.707-.293ZM5 16v1a1 1 0 0 0 .293.707L15 9l-1.414-1.414L5.293 16ZM3 12a9 9 0 0 1 15.027-6.088l1.97 1.97A9.005 9.005 0 0 1 21 12a8.96 8.96 0 0 1-1.672 5.163l-1.457-1.457A6.961 6.961 0 0 0 19 12a6.973 6.973 0 0 0-1.25-4.027l-1.457 1.457A8.978 8.978 0 0 1 12 21a9 9 0 0 1-9-9ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM12 20c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                                <div>
                                    <Pagination :data="state.returns" @previous="previous" @next="next" />
                                </div>
                             </Table>
                            </div>
                        </div>
                    </main>
                </NuxtLayout>
                </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
//import { customerService } from '~/components/api/admin/CustomerReturns';
import { helpers, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useAlert } from '@/composables/alert';
import { useI18n } from 'vue-i18n';
import type { Error } from '@/types/error';

const rules = computed(() => ({   
   
}));

const runtimeConfig = useRuntimeConfig();


const v$ = useVuelidate(rules, {  });

// Alert and i18n setup
const { successAlert } = useAlert();
const { errorAlert } = useAlert();
const { t } = useI18n()

let currentTablePage = 1;


function previous() {
    if (currentTablePage > 1) {
        currentTablePage--;
       // fetchCustomerReturns();
    }
}

const returnToEdit = ref<number | null>(null);


function next() {
    if (currentTablePage < state.returns.pagination.totalPages) {
        currentTablePage++;
        //fetchCustomerReturns();
    }
}

interface Returns {
    data: any[];
    pagination: {
        currentPage: number;
        totalPages: number;
    };
}

interface SortData {
    sortField: string;
    sortOrder: "ascend" | "descend" | null;
}
const state = reactive({
    columnHeaders: [
        { name: "id", sorter: true, key: "id" },
        { name: "salesinvoiceno", sorter: true, key: "salesinvoiceno" },
        { name: "return date", sorter: true, key: "returndate" },
        { name: "remarks", sorter: false, key: "remarks" },
        { name: "preparedBy", sorter: true, key: "preparedby" },
        { name: "approvedBy", sorter: true, key: "approvedby" },
        { name: "asCancelled", sorter: true, key: "iscancelled" },
        { name: "cancelledBy", sorter: true, key: "cancelledby" },
        { name: "created_at", sorter: true, key: "created_at" },
        { name: "updated_at", sorter: true, key: "updated_at" },
        { name: "Actions", key: "actions" },
    ],
    error: null as Error | null,
    isTableLoading: false,
    sortData: { sortField: "", sortOrder: null } as SortData,
    returns: { data: [], pagination: { currentPage: 1, totalPages: 1 } } as Returns, 
});

const returns = ref<{
    id: number | null;
    salesinvoiceno: string;
    returndate: string;
    remarks: string;
    preparedby: string;
    approvedby: string;
    iscancelled: boolean;
    cancelledby: string;
    created_at: string;
    updated_at: string;
    customerReturnNo: string;
    productNo: string;
    qty: string;
    unitPrice: string;
    is_active: true,
}>
({
    id: null,
    salesinvoiceno: '',
    returndate: '',
    remarks: '',
    preparedby: '',
    approvedby: '',
    iscancelled: false,
    cancelledby: '',
    created_at: '',
    updated_at: '',
    customerReturnNo: '',
    productNo: '',
    qty: '',
    unitPrice: '',
    is_active: true,
});

const returnToView = ref<number | null>(null);

async function saveReturn() {
    try {
        const returnData = {
            customerReturnNo: returns.value.customerReturnNo,
            productNo: returns.value.productNo,
            qty: returns.value.qty,
            unitPrice: returns.value.unitPrice,
        };

        let response;

        if (returnToEdit.value) {
           // response = await customerService.updateReturn(returnToEdit.value, returnData);
            if (response) {
                successAlert(`${t('alert.Success')}!`, `${t('alert.returnSuccessfullyUpdated')}.`);
            } else {
                errorAlert(`${t('alert.Error')}!`, `${t('alert.returnUpdateFailed')}.`);
            }
        } else {
           // response = await customerService.createReturn(returnData);
            if (response) {
                successAlert(`${t('alert.Success')}!`, `${t('alert.returnSuccessfullyCreated')}.`);
            } else {
                errorAlert(`ERROR!`, `${t('alert.returnCreationFailed')}.`);
            }
        }

        //fetchCustomerReturns(); 
        toggleForm(); 
    } catch (error) {
       // console.error('Error saving return:', error.message);
        errorAlert(`ERROR!`, `${t('alert.errorOccurredWhileSavingReturn')}.`);
    }
}

function viewReturn(id: number) {
    const selectedReturns = state.returns.data.find(r=> r.id === id);
    if (selectedReturns) {
         returns.value = { ...selectedReturns }; 
        returnToView.value = id; 
    } else {
        console.error(`Return with ID ${id} not found.`);
        errorAlert(`${t('alert.Error')}!`, `${t('alert.errorOccuredWhileViewingCustomer')}.`);
    }
}
const showForm = ref(false);

function toggleForm() {
    showForm.value = !showForm.value;
    if (!showForm.value) {
        returns.value = {
            id: null,
            salesinvoiceno: '',
            returndate: '',
            remarks: '',
            preparedby: '',
            approvedby: '',
            iscancelled: false,
            cancelledby: '',
            created_at: '',
            updated_at: '',
            customerReturnNo: '',
            productNo: '',
            qty: '',
            unitPrice: '',
            is_active: true,
        };
        returnToEdit.value = null;
    }
}


function editReturn(id: number) {
    const selectedReturn = state.returns.data.find(r=> r.id === id);

    if (selectedReturn) {
        returns.value = { ...selectedReturn };
        returnToEdit.value = id;
        showForm.value = true;
    } else {
        errorAlert(`${t('alert.Error')}!`, `${t('alert.customerNotFound' + ' With ID:' + { id })}.`);
    }
}

function sort(sortingData: { column: string; sort: string }) {
    currentTablePage = 1;
    if (sortingData.sort === 'ascend' || sortingData.sort === 'descend') {
        state.sortData = {
            sortField: sortingData.column,
            sortOrder: sortingData.sort,
        };
    } else {
        console.error('Invalid sort order:', sortingData.sort);
        state.sortData = {
            sortField: sortingData.column,
            sortOrder: 'ascend',
        };
    }
    //fetchCustomerReturns();
}

</script>