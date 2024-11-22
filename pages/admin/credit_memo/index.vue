<template>
    <NuxtLayout name="admin">
        <main>
            <Head>
                <Title>Bills - {{ runtimeConfig.public.appName }}</Title>
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
                    <input type="text" v-model="searchQuery" placeholder="Search"
                        class="block w-75 rounded-md border border-gray-400 text-sm pl-8 pr-3 py-1.5" />
                </div>
                <!-- Add Credit Memo Button -->
                <div class="mt-4 sm:ml-16 sm:mt-3 sm:flex-none mr-8">
                    <button type="button" @click="toggleForm"
                        class="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        ADD CREDIT MEMO
                    </button>
                </div>
            </div>

            <!-- Credit Memo Form -->
            <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mt-20">
                    <form @submit.prevent="saveCreditMemo">
                        <div class="text-center mb-6">
                            <h2 class="text-xl font-semibold text-gray-800">Credit Memo Details</h2>
                        </div>
                        <Alert type="danger" :text="state?.error?.message" v-if="state.error?.message && state.error.message.length > 0" />
                        
                        <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                            <!-- Customer ID -->
                            <label class="block text-sm font-medium text-gray-700 ml-1 mb-1 mt-1">Customer ID</label>
                            <div class="flex items-center mb-1">
                                <FormTextField id="customerid" name="customerid" v-model="creditmemo.customer_id" placeholder="Customer ID" required />
                                <FormError :error="state?.error?.errors?.customer_id?.[0]" />
                            </div>

                            <!-- Sales Representative -->
                            <label class="block text-sm font-medium text-gray-700 ml-1 mb-1 mt-1">Sales Representative</label>
                            <div class="flex items-center mb-1">
                                <FormTextField id="salesrepresentative" name="salesrepresentative" v-model="creditmemo.sales_representative"
                                    placeholder="Sales Representative" required />
                                <FormError :error="state?.error?.errors?.sales_representative?.[0]" />
                            </div>

                            <!-- Invoice Number -->
                            <label class="block text-sm font-medium text-gray-700 ml-1 mb-1 mt-1">Invoice No</label>
                            <div class="flex items-center mb-1">
                                <FormTextField id="invoiceno" name="invoiceno" v-model="creditmemo.invoice_no" placeholder="Invoice No" required />
                                <FormError :error="state?.error?.errors?.invoice_no?.[0]" />
                            </div>

                            <div class="space-y-6"> 
                          <div>
                            <label class="block text-sm font-medium text-gray-700 ml-1 mb-2">Bill Date</label>
                            <div class="flex items-center mb-4">
                                <flat-pickr v-model="creditmemo.date" :config="dateConfig"
                                    class="w-full py-2 pl-3 ring-1 ring-slate-200 rounded-md focus:outline-none focus:ring-primary-700 focus:border-primary-700 focus:z-10"
                                    placeholder="Bill Date" required />
                            </div>
                            </div>
                            <div>
                                
                            <label class="block text-sm font-medium text-gray-700 ml-1 mb-2">Remarks</label>
                            <div class="flex items-center mb-3">
                                <FormTextField for="remarks" name="remarks" v-model="creditmemo.remarks"
                                    placeholder="Remarks" required />
                                <FormError :error="state?.error?.errors?.amount?.[0]" />
                            </div>
                         </div>

                         <label class="block text-sm font-medium text-gray-700 ml-1 ">Amount</label>
                            <div class="flex items-center">
                                <FormTextField for="amount" name="amount" v-model="creditmemo.amount"
                                    placeholder="Amount" required />
                                <FormError :error="state?.error?.errors?.amount?.[0]" />
                            </div>
                      
                            <!-- Form Actions -->
                            <div class="flex justify-end gap-2 mt-4">
                                <FormButton type="submit" buttonStyle="success" class="w-full">
                                    Save
                                </FormButton>
                                <FormButton @click="toggleForm" buttonStyle="xxx" class="w-full">
                                    Cancel
                                </FormButton>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Table -->
            <Alert type="danger" :text="state.error?.message" v-if="state.error" />
            <div class="table-responsive">
                <Table :columnHeaders="state.columnHeaders" :data="{ data: filteredData }"
                :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">

                    <template #body>
                        <!-- Display rows if data exists -->
                        <tr v-for="(creditmemo, index) in filteredData" :key="index">
                            <td class="pl-3">{{ creditmemo.type }}</td>
                            <td class="pl-3">{{ creditmemo.customer_id }}</td>
                            <td class="pl-3">{{ creditmemo.sales_representative }}</td>
                            <td class="pl-3">{{ creditmemo.invoice_no }}</td>
                            <td class="pl-3">{{ creditmemo.remarks }}</td>
                            <td class="pl-3">{{ creditmemo.date }}</td>
                            <td class="pl-3">₱ {{ Number(creditmemo.amount).toFixed(2) }}</td>
                            <td class="pl-3">
                                <span :class="{ 'text-red-600': creditmemo.is_cancelled, 'text-green-600': !creditmemo.is_cancelled }">
                                    {{ creditmemo.is_cancelled ? 'Cancelled' : 'Not Cancelled' }}
                                </span>
                            </td>
                            <td class="pl-3">
                                <div class="flex space-x-2">
                                    <button @click="viewBill(creditmemo.id)" class="text-gray-600 hover:text-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"
                                            fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M12 4.5C8.798 4.5 6 7.057 6 10.5S8.798 16.5 12 16.5 18 13.943 18 10.5 15.202 4.5 12 4.5ZM12 15.5C10.343 15.5 9 14.156 9 12.5S10.343 9.5 12 9.5 15 10.844 15 12.5 13.657 15.5 12 15.5ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 12S7.03 4 12 4s9 4.03 9 9-4.03 9-9 9Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                    <button @click="editBill(creditmemo.id)" class="text-gray-600 hover:text-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                d="M17.414 2.586a2 2 0 00-2.828 0l-10 10V16a1 1 0 001 1h3.414l10-10a2 2 0 000-2.828l-1.586-1.586zM5 13l-1.5 1.5V13h1.5zm4.5-4.5L14 4l2 2-4.5 4.5H9.5V8.5z" />
                                        </svg>
                                    </button>
                                    <button @click="deleteBill(creditmemo.id)" class="text-red-600 hover:text-red-900">
                                        Cancel
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </template>
                </Table>
            </div>
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/themes/dark.css';
import { ref, reactive, computed } from 'vue';
import type { Error } from '@/types/error';
const dateConfig = ref<{ dateFormat: string }>({ dateFormat: "m/d/Y" });

const searchQuery = ref('');  // Search query reactive value

const runtimeConfig = useRuntimeConfig();

interface SortData {
    sortField: string;
    sortOrder: "ascend" | "descend" | null;
}

const state = reactive({
    columnHeaders: [
        { name: "Type", sorter: true, key: "type" },
        { name: "Customer ID", sorter: true, key: "customer_id" },
        { name: "Sales Representative", sorter: true, key: "sales_representative" },
        { name: "Invoice_no", sorter: true, key: "invoice_no" },
        { name: "Date", sorter: true, key: "date" },
        { name: "Remarks", sorter: true, key: "remarks" },
        { name: "Amount", sorter: true, key: "amount" },
        { name: "Status", sorter: true, key: "is_cancelled" },
        { name: "Actions", key: "actions" },
    ],
    error: null as Error | null,
    isTableLoading: false,
    sortData: { sortField: "", sortOrder: null } as SortData,
    bills: [] as any[],  // Assuming you have a list of bills here
});

const filteredData = computed(() => {
    if (!searchQuery.value) {
        return state.bills;
    }

    const query = searchQuery.value.toLowerCase();

    return state.bills.filter(bill =>
        bill.customer_id.toString().toLowerCase().includes(query)
    );
});

const creditmemo = ref({
    type: '',
    customer_id: '',
    sales_representative: '',
    invoice_no: '',
    date: '',
    remarks: '',
    amount: '',
    is_active: true,
});

const showForm = ref(false);

function toggleForm() {
    showForm.value = !showForm.value;
    if (!showForm.value) {
        creditmemo.value = {
            type: '',
            customer_id: '',
            sales_representative: '',
            invoice_no: '',
            date: '',
            remarks: '',
            amount: '',
            is_active: true,
        };
    }
}

function saveCreditMemo() {
    console.log('Saving invoice data:', creditmemo);
}
function sort(sortData: SortData) {
    state.sortData = sortData;
}

function viewBill(billId: string) {
}

function editBill(billId: string) {
}

function deleteBill(billId: string) {

}
</script>
