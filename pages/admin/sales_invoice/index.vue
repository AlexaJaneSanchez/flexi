<template>
    <div>
        <NuxtLayout name="admin">

            <Head>
                <Title>Sales Invoice - {{ runtimeConfig.public.appName }}</Title>
            </Head>
            <main>
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
                    <div class="mt-4 sm:ml-16 sm:mt-3 sm:flex-none mr-8">
                        <button type="button" @click="goToSalesInvoice"
                            class="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            ADD SALES
                        </button>
                    </div>
                </div>
                <!-- <PlusIcon class="h-3 w-3" aria-hidden="true" /> -->
                     
                <!--Product Table-->
                <div>
                    <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                    <div class="table-responsive">
                        <Table :columnHeaders="state.columnHeaders" :data="state.salesInvoices"
                            :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">
                            <template #body v-if="!(
                                state.isTableLoading ||
                                (state.salesInvoices?.data &&
                                    state.salesInvoices?.data.length === 0)
                            )">
                                <tr v-for="(invoices, index) in state.salesInvoices?.data" :key="index">
                                    <td>
                                        <span class="pl-3 pr-3">{{ invoices.invoice_no }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ invoices.document_no }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ invoices.prepared_by_id }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ invoices.customer_id }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ invoices.sales_representative }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ invoices.date }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ invoices.due_date }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-3">{{ invoices.terms }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ invoices.amount }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ invoices.cancelled_by_id }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ invoices.approved_by_id }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ invoices.is_cancelled }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ invoices.is_approved }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ invoices.remarks }}</span>
                                    </td>
                                    <td class="pl-1 py-2 text-xxs text-gray-700">
                                    <div class="flex">
                                        <button @click="viewSalesInvoice" class="text-gray-600 hover:text-gray-900 mr-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M12 4.5C8.798 4.5 6 7.057 6 10.5S8.798 16.5 12 16.5 18 13.943 18 10.5 15.202 4.5 12 4.5ZM12 15.5C10.343 15.5 9 14.156 9 12.5S10.343 9.5 12 9.5 15 10.844 15 12.5 13.657 15.5 12 15.5ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 12S7.03 4 12 4s9 4.03 9 9-4.03 9-9 9Z" clip-rule="evenodd" />
                                            </svg>
                                        </button>

                                        <button @click="" class="text-gray-600 hover:text-gray-900 mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M17.414 2.586a2 2 0 00-2.828 0l-10 10V16a1 1 0 001 1h3.414l10-10a2 2 0 000-2.828l-1.586-1.586zM5 13l-1.5 1.5V13h1.5zm4.5-4.5L14 4l2 2-4.5 4.5H9.5V8.5z" />
                                            </svg>
                                        </button>

                                        <button @click="" class="text-red-600 hover:text-red-900 mr-1">
                                            Cancel
                                        </button>
                                    </div>
                                </td>
                                </tr>
                            </template>
                        </Table>
                    </div>
                    <Pagination :data="state.salesInvoices" @previous="previous" @next="next" />
                </div>
                <!-- View Details Modal -->
            <div v-if="salesInvoiceToView" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                    <div class="text-center mb-10">
                        <h2 class="text-xl font-semibold text-gray-800">Sales Invoice Details</h2>
                    </div>
                    <div class="grid grid-cols-1 gap-4 mx-4">
                        <div class="flex items-center mb-2 ml-12">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">Invoice No:</label>
                            <span class="font-semibold">{{ salesInvoiceToView.invoice_no }}</span>
                        </div>
                        <div class="flex items-center mb-2 ml-12">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">Document No:</label>
                            <span class="font-semibold">{{ salesInvoiceToView.document_no }}</span>
                        </div>
                        <div class="flex items-center mb-2 ml-12">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">Prepared By:</label>
                            <span class="font-semibold">{{ salesInvoiceToView.prepared_by_id }}</span>
                        </div>
                        <div class="flex items-center mb-2 ml-12">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">Customer ID:</label>
                            <span class="font-semibold">{{ salesInvoiceToView.customer_id }}</span>
                        </div>
                        <div class="flex items-center mb-2 ml-12">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">Sales Representative:</label>
                            <span class="font-semibold">{{ salesInvoiceToView.sales_representative }}</span>
                        </div>
                        <div class="flex items-center mb-2 ml-12">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">Amount:</label>
                            <span class="font-semibold">{{ salesInvoiceToView.amount }}</span>
                        </div>
                        <div class="flex items-center mb-2 ml-12">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">Is Cancelled:</label>
                            <span :class="salesInvoiceToView.is_cancelled ? 
                                     'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20' : 
                                     'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'">
                                {{ salesInvoiceToView.is_cancelled ? 'Yes' : 'No' }}
                            </span>
                        </div>
                    </div>
                    <div class="flex justify-end gap-2 mt-4">
                        <button @click="salesInvoiceToView = null"
                            class="rounded-md bg-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
                            Close
                        </button>
                    </div>
                </div>
            </div>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">

import { ref, computed } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { salesInvoiceService } from '~/components/api/admin/SalesInvoiceService';
import { employeeService } from '~/components/api/admin/EmployeeService';
import { customerService } from '~/components/api/admin/CustomerService';

const runtimeConfig = useRuntimeConfig();
let currentTablePage = 1;

interface SortData {
    sortField: string;
    sortOrder: "ascend" | "descend" | null;
}

interface SalesInvoice {
    data: any[];
}

interface Employee {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    role: string;
    is_active: boolean;
}

interface Customer {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    is_active: boolean; 
}

const state = reactive({
    columnHeaders: [
        { name: "Invoice_no", sorter: true, key: "invoice_no" },
        { name: "Document_no", sorter: true, key: "document_no" },
        { name: "Prepared_by", sorter: true, key: "prepared_by_id" },
        { name: "Customer", sorter: true, key: "customer_id" },
        { name: "Sales Representative", sorter: true, key: "sales_representative" },
        { name: "Date", sorter: true, key: "date" },
        { name: "Due Date", sorter: true, key: "due_date" },
        { name: "Terms", sorter: true, key: "terms" },
        { name: "Amount", sorter: true, key: "amount" },
        { name: "Cancelled_by", sorter: true, key: "cancelled_by_id" },
        { name: "Approved_by", sorter: true, key: "approved_by_id" },
        { name: "Cancelled", sorter: true, key: "is_cancelled" },
        { name: "Approved", sorter: true, key: "is_approved" },
        { name: "Remarks", sorter: true, key: "remarks" },
        { name: "Actions", key: "actions" },
    ],
    error: null as Error | null,
    isTableLoading: false,
    sortData: { sortField: "", sortOrder: null } as SortData,
    salesInvoices: { data: [] } as SalesInvoice,
    employees: [] as Employee[],
    customers: [] as Customer[],
});


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
    fetchSalesInvoice();
}

async function fetchEmployees() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const response = await employeeService.getEmployees();
        state.employees = response.data; 
        state.salesInvoices.data.forEach(invoices => {
            const selectedEmployee = state.employees.find(employee => employee.id === invoices.prepared_by_id);
            invoices.prepared_by_id = selectedEmployee ? `${selectedEmployee.firstname} ${selectedEmployee.lastname}` : 'Unknown'; // Fallback if employee not found
        });

        state.salesInvoices.data.forEach(invoices => {
            const selectedSalesRepresentative = state.employees.find(employee => employee.id === invoices.sales_representative);
            invoices.sales_representative = selectedSalesRepresentative ? `${selectedSalesRepresentative.firstname} ${selectedSalesRepresentative.lastname}` : 'Unknown'; // Fallback if employee not found
        })
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}

async function fetchCustomers() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const response = await customerService.getCustomers();
        state.customers = response.data;
        state.salesInvoices.data.forEach(invoices => {
            const selectedCustomer = state.customers.find(customer => customer.id === invoices.customer_id);
            invoices.customer_id = selectedCustomer ? `${selectedCustomer.firstname} ${selectedCustomer.lastname}` : 'Unknown'; // Fallback if employee not found
        });
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}

async function fetchSalesInvoice() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const params = {
            page: currentTablePage,
            sortField: state.sortData.sortField,
            sortOrder: state.sortData.sortOrder,
        };
        const response = await salesInvoiceService.getSalesInvoices();
        fetchEmployees();
        fetchCustomers();
        state.salesInvoices = response;
        console.log(response);
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}

function goToSalesInvoice() {
    navigateTo('sales_invoice/create');
}
const salesInvoiceToView = ref<any>(null); // Store the selected invoice details

const viewSalesInvoice = async (id: number) => {
    try {
        // Fetch detailed invoice info (modify according to your API)
        const response = await salesInvoiceService.getSalesInvoiceById(id); // assuming this method exists
        salesInvoiceToView.value = response.data; // Store the fetched invoice details
    } catch (error) {
        console.error('Failed to fetch invoice details:', error);
    }
};

function editSale(index: number) {

}

function deleteSale(index: number) {

}

function previous() {
    currentTablePage--;
}

function next() {
    currentTablePage++;
}

onMounted(() => {
    fetchSalesInvoice();
});

</script>