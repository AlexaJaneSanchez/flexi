<template>
    <div>
        <NuxtLayout name="admin">
            <main>
                <Head>
                    <Title>Adjustments - {{ runtimeConfig.public.appName }}</Title>
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
                    <!-- Adjustment Button -->
                    <div class="mt-4 sm:ml-16 sm:mt-3 sm:flex-none mr-6">
                        <button type="button" @click="toggleForm"
                            class="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Add Adjustment
                        </button>
                    </div>
                </div>
                <!-- Adjustment Form -->
                <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <form @submit.prevent="saveAdjustment">
                            <FormLabel label="Adjustment Details" class="text-xl" />
                            <Alert type="danger" :text="state?.error?.message" v-if="
                                state.error?.message &&
                                state.error.message.length > 0
                            " />
                            <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                                <FormLabel for="invadjustmentno" label="Inv Adjustment No" class="mr-3" />
                                <div class="flex items-center mb-1">
                                    <FormTextField id="invadjustmentno" name="invadjustmentno" v-model="adjustments.invadjustmentno"
                                        placeholder="Inv Adjustment No" />
                                    <FormError :error="v$?.invadjustmentno?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state?.error?.errors?.invadjustmentno?.[0]" />
                                </div>
                                <FormLabel for="productno" label="Product No" class="mr-3" />
                                <div class="flex items-center mb-1">
                                    <FormTextField id="productno" name="productno" v-model="adjustments.productNo"
                                        placeholder="Product No" />
                                    <FormError :error="v$?.productNo?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state?.error?.errors?.productNo?.[0]" />
                                </div>
                                <FormLabel for="qty" label="Qty" class="mr-3" />
                                <div class="flex items-center mb-1">
                                    <FormNumberField id="qty" name="qty" v-model="adjustments.qty"
                                        placeholder="Quantity" />
                                    <FormError :error="v$?.qty?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state?.error?.errors?.qty?.[0]" />
                                </div>
                                <FormLabel for="costperqty" label="Cost per Quantity" class="mr-3" />
                                <div class="flex items-center mb-1">
                                    <FormNumberField id="costperqty" name="costperqty" v-model="adjustments.costperqty"
                                        placeholder="Cost per Quantity" />
                                    <FormError :error="v$?.unitPrice?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state?.error?.errors?.unitPrice?.[0]" />
                                </div>
                                <div class="flex flex-col">
                                    <FormLabel for="remarks" label="Remarks" class="mr-3" />
                                    <div class="flex items-center mb-1 ">
                                        <FormTextField id="remarks" name="remarks" v-model="adjustments.remarks" placeholder="Remarks" />
                                        <FormError :error="v$?.remarks?.$errors[0]?.$message.toString()" />
                                        <FormError :error="state?.error?.errors?.remarks?.[0]" />
                                    </div>
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
                <div v-if="adjustmentToView"
                    class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                            <div class="flex items-center mb-1 ml-7">
                                <label class="text-xxs font-medium text-gray-700 w-20 mr-2">Inv Adjustment No:</label>
                                <span>{{ adjustments?.invadjustmentno }}</span>
                            </div>
                            <div class="flex items-center mb-1 ml-7">
                                <label class="text-xxs font-medium text-gray-700 w-20 mr-2">Product No:</label>
                                <span>{{ adjustments?.productNo }}</span>
                            </div>
                            <div class="flex items-center mb-1 ml-7">
                                <label class="text-xxs font-medium text-gray-700 w-20 mr-2">Quantity:</label>
                                <span>{{ adjustments?.qty}}</span>
                            </div>
                            <div class="flex items-center mb-1 ml-7">
                                <label class="text-xxs font-medium text-gray-700 w-20 mr-2">Cost Per Quantity:</label>
                                <span>{{ adjustments?.costperqty}}</span>
                            </div>
                            <div class="flex justify-end gap-2 mt-4">
                                <button @click="adjustmentToView = null"
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
                            <Table :columnHeaders="state.columnHeaders" :data="state.adjustments"
                                :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">
                                <template #body
                                    v-if="!(state.isTableLoading || (state.adjustments?.data && state.adjustments?.data.length === 0))">
                                    <tr v-for="(adjustments, index) in state.adjustments?.data" :key="index">
                                        <td>
                                            <span class="truncate pl-3">{{ adjustments.id }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ adjustments.branchno }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ adjustments.adjustmentdate }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ adjustments.remarks }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ adjustments.preparedby }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ adjustments.approvedby }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3"
                                                :class="adjustments.iscancelled ? 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20' : 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'">
                                                {{ adjustments.iscancelled ? 'Cancelled' : 'Active' }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ adjustments.cancelledby }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{ adjustments.created_at }}</span>
                                        </td>
                                        <td>
                                            <span class="pl-3">{{adjustments.updated_at }}</span>
                                        </td>
                                        <td class="px-4 py-2 text-xxs text-gray-700">
                                            <div class="flex space-x-2">
                                                <button @click="viewAdjustment(adjustments.id)"
                                                    class="text-gray-600 hover:text-gray-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                        viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd"
                                                            d="M12 4.5C8.798 4.5 6 7.057 6 10.5S8.798 16.5 12 16.5 18 13.943 18 10.5 15.202 4.5 12 4.5ZM12 15.5C10.343 15.5 9 14.156 9 12.5S10.343 9.5 12 9.5 15 10.844 15 12.5 13.657 15.5 12 15.5ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 12S7.03 4 12 4s9 4.03 9 9-4.03 9-9 9Z"
                                                            clip-rule="evenodd" />
                                                    </svg>
                                                </button>
                                                <button @click="editAdjustment(adjustments.id)"
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
                                    <Pagination :data="state.adjustments" @previous="previous" @next="next" />
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
//import { adjustmentService } from '~/components/api/admin/Adjustments';
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
       // fetchAdjustments();
    }
}

const adjustmentToEdit = ref<number | null>(null);


function next() {
    if (currentTablePage < state.adjustments.pagination.totalPages) {
        currentTablePage++;
        //fetchAdjustments();
    }
}

interface Adjustments {
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
        { name: "branchNo", sorter: true, key: "branchno" },
        { name: "adjustment date", sorter: true, key: "adjustmentdate" },
        { name: "remarks", sorter: false, key: "remarks" },
        { name: "preparedBy", sorter: true, key: "preparedby" },
        { name: "approvedBy", sorter: true, key: "approvedby" },
        { name: "isCancelled", sorter: true, key: "iscancelled" },
        { name: "cancelledBy", sorter: true, key: "cancelledby" },
        { name: "created_at", sorter: true, key: "created_at" },
        { name: "updated_at", sorter: true, key: "updated_at" },
        { name: "Actions", key: "actions" },
    ],
    error: null as Error | null,
    isTableLoading: false,
    sortData: { sortField: "", sortOrder: null } as SortData,
    adjustments: { data: [], pagination: { currentPage: 1, totalPages: 1 } } as Adjustments, 
});

const adjustments = ref<{
    id: number | null;
    branchno: string;
    adjustmentdate: string;
    remarks: string;
    preparedby: string;
    approvedby: string;
    iscancelled: boolean;
    cancelledby: string;
    created_at: string;
    updated_at: string;
    invadjustmentno: string;
    productNo: string;
    qty: string;
    costperqty: string;
    is_active: true,
}>
({
    id: null,
    branchno: '',
    adjustmentdate: '',
    remarks: '',
    preparedby: '',
    approvedby: '',
    iscancelled: false,
    cancelledby: '',
    created_at: '',
    updated_at: '',
    invadjustmentno: '',
    productNo: '',
    qty: '',
    costperqty: '',
    is_active: true,
});

const adjustmentToView = ref<number | null>(null);

async function saveAdjustment() {
    try {
        const adjustmentData = {
            invAdjustmentNo: adjustments.value.invadjustmentno,
            productNo: adjustments.value.productNo,
            qty: adjustments.value.qty,
            costperqty: adjustments.value.costperqty,
            remarks: adjustments.value.remarks,
        };

        let response;

        if (adjustmentToEdit.value) {
           // response = await supplierService.updateAjustment(adjustmentToEdit.value, adjustmentData);
            if (response) {
                successAlert(`${t('alert.Success')}!`, `${t('alert.adjustmentSuccessfullyUpdated')}.`);
            } else {
                errorAlert(`${t('alert.Error')}!`, `${t('alert.adjustmentUpdateFailed')}.`);
            }
        } else {
           // response = await supplierService.createAdjustment(adjustmentData);
            if (response) {
                successAlert(`${t('alert.Success')}!`, `${t('alert.adjustmentSuccessfullyCreated')}.`);
            } else {
                errorAlert(`ERROR!`, `${t('alert.adjustmentCreationFailed')}.`);
            }
        }

        //fetchAdjustments();
        toggleForm();
    } catch (error) {
       // console.error('Error saving adjustment:', error.message);
        errorAlert(`ERROR!`, `${t('alert.errorOccurredWhileSavingAdjustment')}.`);
    }
}

function viewAdjustment(id: number) {
    const selectedAdjustments = state.adjustments.data.find(a=> a.id === id);
    if (selectedAdjustments) {
        adjustments.value = { ...selectedAdjustments}; 
        adjustmentToView.value = id; 
    } else {
        console.error(`Adjustment with ID ${id} not found.`);
        errorAlert(`${t('alert.Error')}!`, `${t('alert.errorOccuredWhileViewingAdjustment')}.`);
    }
}
const showForm = ref(false);

function toggleForm() {
    showForm.value = !showForm.value;
    if (!showForm.value) {
        adjustments.value = {
            id: null,
            branchno: '',
            adjustmentdate: '',
            remarks: '',
            preparedby: '',
            approvedby: '',
            iscancelled: false,
            cancelledby: '',
            created_at: '',
            updated_at: '',
            invadjustmentno: '',
            productNo: '',
            qty: '',
            costperqty: '',
            is_active: true,
        };
        adjustmentToEdit.value = null;
    }
}


function editAdjustment(id: number) {
    const selectedAdjustments = state.adjustments.data.find(a=> a.id === id);

    if (selectedAdjustments) {
        adjustments.value = { ...selectedAdjustments};
        adjustmentToEdit.value = id;
        showForm.value = true;
    } else {
        errorAlert(`${t('alert.Error')}!`, `${t('alert.adjustmentNotFound' + ' With ID:' + { id })}.`);
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
    //fetchAdjustments();
}

</script>