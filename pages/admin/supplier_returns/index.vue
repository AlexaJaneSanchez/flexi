<template>
    <div>
        <NuxtLayout name="admin">
            <main>

                <Head>
                    <Title>Supplier Returns - {{ runtimeConfig.public.appName }}</Title>
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
                    <!-- Supplier Button -->
                    <div class="mt-4 sm:ml-16 sm:mt-3 sm:flex-none mr-6">
                        <button type="button" @click="toggleForm"
                            class="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Add Returns
                        </button>
                    </div>
                </div>
                <!-- Supplier Return Form -->
                <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl">
                        <form @submit.prevent="saveSupplierReturn()">
                            <FormLabel label="Supplier Return" class="text-xl" />
                            <Alert type="danger" :text="state?.error?.message" v-if="
                                state.error?.message &&
                                state.error.message.length > 0
                            " />
                            <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                                <div class="flex items-center mb-1 gap-5">
                                    <div class="w-1/2">
                                        <FormLabel label="Bill" />
                                        <FormSelect id="billid" v-model="masterSupplierReturn.bill_id"
                                            :options="state.bills.map(bill => ({ value: bill.id, label: `${bill.id}` }))"
                                            placeholder="Select a bill" required />
                                    </div>
                                    <div class="w-1/2">
                                        <FormLabel for="prepared_by_id" label="Prepared By" />
                                        <div class="flex items-center mb-1">
                                            <FormNumberField for="prepared_by_id" name="prepared_by_id"
                                                v-model="masterSupplierReturn.prepared_by_id"
                                                :placeholder="`${firstname} ${lastname}`"
                                                :value="`${firstname} ${lastname}`" readonly
                                                class="cursor-default bg-gray-200" />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center mb-1 gap-5">
                                    <div class="w-1/2">
                                        <FormLabel label="Approved By" />
                                        <FormSelect id="approved_by_id" v-model="masterSupplierReturn.approved_by_id"
                                            :options="state.employees.filter(employee => employee.is_active).map(employee => ({ value: employee.id, label: employee.firstname + ' ' + employee.lastname }))"
                                            placeholder="Select Employee" required />
                                        <FormError :error="v$?.returnNo?.$errors[0]?.$message.toString()" />
                                        <FormError :error="state?.error?.errors?.returnNo?.[0]" />
                                    </div>
                                    <div class="w-1/2">
                                        <FormLabel for="cancelled_by_id" label="Cancelled By" class="" />
                                        <FormSelect id="cancelled_by_id" v-model="masterSupplierReturn.cancelled_by_id"
                                            :options="state.employees.filter(employee => employee.is_active).map(employee => ({ value: employee.id, label: employee.firstname + ' ' + employee.lastname }))"
                                            placeholder="Select Employee" required />
                                        <FormError :error="v$?.returnNo?.$errors[0]?.$message.toString()" />
                                        <FormError :error="state?.error?.errors?.returnNo?.[0]" />
                                    </div>
                                </div>
                                <div class="flex items-center mb-1 gap-5">
                                    <div class="w-1/2">
                                        <FormLabel for="branch_no" label="Branch Number" class="mr-3" />
                                        <FormTextField id="branch_no" name="branch_no"
                                            v-model="masterSupplierReturn.branch_no" placeholder="Branch Number" />
                                        <FormError :error="v$?.returnNo?.$errors[0]?.$message.toString()" />
                                        <FormError :error="state?.error?.errors?.returnNo?.[0]" />
                                    </div>
                                    <div class="w-1/2">
                                        <FormLabel for="return_date" label="Return Date" class="mr-3" />
                                        <FormTextField type="date" id="return_date" name="return_date"
                                            v-model="masterSupplierReturn.return_date" placeholder="Return Date" />
                                        <FormError :error="v$?.returnNo?.$errors[0]?.$message.toString()" />
                                        <FormError :error="state?.error?.errors?.returnNo?.[0]" />
                                    </div>
                                </div>
                                <div class="flex items-center mb-1 gap-5">
                                    <div class="w-1/2">
                                        <FormLabel for="remarks" label="Remarks" class="" />
                                        <FormTextField id="remarks" name="remarks"
                                            v-model="masterSupplierReturn.remarks" placeholder="Remarks" />
                                        <FormError :error="v$?.returnNo?.$errors[0]?.$message.toString()" />
                                        <FormError :error="state?.error?.errors?.returnNo?.[0]" />
                                    </div>
                                    <div class="w-1/2">
                                        <FormLabel label="Is Cancelled" />
                                        <FormSelect v-model="masterSupplierReturn.is_cancelled" :options="[
                                            { value: false, label: 'No' },
                                            { value: true, label: 'Yes' },
                                        ]">
                                        </FormSelect>
                                    </div>
                                </div>
                                <FormLabel label="Supplier Return Details" class="text-xl" />
                                <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                                    <div class="flex items-center mb-1 gap-5">
                                        <div class="w-1/2">
                                            <FormLabel for="product_id" label="Product ID" class="" />
                                            <FormTextField id="product_id" name="product_id"
                                                v-model="supplierReturnDetail.product_id" placeholder="Product ID" />
                                            <FormError :error="v$?.returnNo?.$errors[0]?.$message.toString()" />
                                            <FormError :error="state?.error?.errors?.returnNo?.[0]" />
                                        </div>
                                        <div class="w-1/2">
                                            <FormLabel for="unit" label="Unit" class="mr-3" />
                                            <FormTextField id="unit" name="unit" v-model="supplierReturnDetail.unit"
                                                placeholder="Unit" />
                                            <FormError :error="v$?.returnNo?.$errors[0]?.$message.toString()" />
                                            <FormError :error="state?.error?.errors?.returnNo?.[0]" />
                                        </div>
                                    </div>
                                    <div class="flex items-center mb-1 gap-5">
                                        <div class="w-1/2">
                                            <FormLabel for="expiry_date" label="Expiry Date" class="" />
                                            <FormTextField type="date" id="expiry_date" name="expiry_date"
                                                v-model="supplierReturnDetail.expiry_date" placeholder="Expiry Date" />
                                            <FormError :error="v$?.returnNo?.$errors[0]?.$message.toString()" />
                                            <FormError :error="state?.error?.errors?.returnNo?.[0]" />
                                        </div>
                                        <div class="w-1/2">
                                            <FormLabel for="quantity" label="Quantity" class="mr-3" />
                                            <FormNumberField id="quantity" name="quantity"
                                                v-model="supplierReturnDetail.quantity" placeholder="Quantity" />
                                            <FormError :error="v$?.returnNo?.$errors[0]?.$message.toString()" />
                                            <FormError :error="state?.error?.errors?.returnNo?.[0]" />
                                        </div>
                                    </div>
                                    <div class="flex items-center mb-1 gap-5">
                                        <div class="w-1/2">
                                            <FormLabel for="price" label="Price" class="" />
                                            <FormNumberField id="price" name="price"
                                                v-model="supplierReturnDetail.price" placeholder="Price" />
                                            <FormError :error="v$?.returnNo?.$errors[0]?.$message.toString()" />
                                            <FormError :error="state?.error?.errors?.returnNo?.[0]" />
                                        </div>
                                        <div class="w-1/2">
                                            <FormLabel for="remarks" label="0" class="text-white" />
                                            <FormButton class="px-10" buttonStyle="xxx"
                                                @click.prevent="addSupplierReturnDetails">Add Detail</FormButton>
                                        </div>
                                    </div>
                                </div>
                                <div class="overflow-x-auto">
                                    <table class="min-w-full divide-y divide-gray-200 mt-6">
                                        <thead class="bg-gray-900 text-white">
                                            <tr>
                                                <th scope="col" class="px-4 py-2 text-left text-xxs font-light">Product
                                                    Name
                                                </th>
                                                <th scope="col" class="px-4 py-2 text-left text-xxs font-light">Unit
                                                </th>
                                                <th scope="col" class="px-4 py-2 text-left text-xxs font-light">Expiry
                                                    Date</th>
                                                <th scope="col" class="px-4 py-2 text-left text-xxs font-light">Quantity
                                                </th>
                                                <th scope="col" class="px-4 py-2 text-left text-xxs font-light">Price
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-gray-100">
                                            <tr v-for="(supplierDetail, index) in supplierReturnDetailList" :key="index"
                                                class="border-t bg-gray-50">
                                                <td class="px-4 py-2 text-xxs text-gray-700">{{
                                                    supplierDetail.product_id }}</td>
                                                <td class="px-4 py-2 text-xxs text-gray-700">{{
                                                    supplierDetail.unit }}
                                                </td>
                                                <td class="px-4 py-2 text-xxs text-gray-700">{{
                                                    supplierDetail.expiry_date }}</td>
                                                <td class="px-4 py-2 text-xxs text-gray-700">{{
                                                    supplierDetail.quantity }}
                                                </td>
                                                <td class="px-4 py-2 text-xxs text-gray-700">{{
                                                    supplierDetail.price }}
                                                </td>
                                            </tr>
                                            <tr v-if="supplierReturnDetailList.length === 0">
                                                <td colspan="8"
                                                    class="px-4 py-2 text-xxs text-gray-500 text-center bg-gray-100">No
                                                    bill
                                                    details
                                                    available.</td>
                                            </tr>
                                        </tbody>
                                    </table>
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
                <!-- <div v-if="returnToView"
                    class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                            <div class="flex items-center mb-1 ml-7">
                                <label class="text-xxs font-medium text-gray-700 w-20 mr-2">Supplier Return No:</label>
                                <span>{{ returns?.supplierReturnNo }}</span>
                            </div>
                            <div class="flex items-center mb-1 ml-7">
                                <label class="text-xxs font-medium text-gray-700 w-20 mr-2">Product No:</label>
                                <span>{{ returns?.productNo }}</span>
                            </div>
                            <div class="flex items-center mb-1 ml-7">
                                <label class="text-xxs font-medium text-gray-700 w-20 mr-2">Quantity:</label>
                                <span>{{ returns?.qty }}</span>
                            </div>
                            <div class="flex items-center mb-1 ml-7">
                                <label class="text-xxs font-medium text-gray-700 w-20 mr-2">Cost Per Quantity:</label>
                                <span>{{ returns?.costperqty }}</span>
                            </div>
                            <div class="flex justify-end gap-2 mt-4">
                                <button @click="returnToView = null"
                                    class="rounded-md bg-gray-200 px-4 py-2 text-xxs font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div> -->
                <!-- Payments List Table -->
                <div>
                    <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                    <div class="table-responsive">
                        <Table :columnHeaders="state.columnHeaders" :data="state.supplierReturns"
                            :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">
                            <template #body
                                v-if="!(state.isTableLoading || (state.supplierReturns?.data && state.supplierReturns?.data.length === 0))">
                                <tr v-for="(returns, index) in state.supplierReturns?.data" :key="index">
                                    <td>
                                        <span class="truncate pl-3">{{ returns.id }}</span>
                                    </td>
                                    <td>
                                        <span class="pl-3">{{ returns.bill_id }}</span>
                                    </td>
                                    <td>
                                        <span class="pl-3">{{ returns.prepared_by_id }}</span>
                                    </td>
                                    <td>
                                        <span class="pl-3">{{ returns.approved_by_id }}</span>
                                    </td>
                                    <td>
                                        <span class="pl-3">{{ returns.cancelled_by_id }}</span>
                                    </td>
                                    <td>
                                        <span class="pl-3">{{ returns.branch_no }}</span>
                                    </td>
                                    <td>
                                        <span class="pl-3">{{ returns.return_date }}</span>
                                    </td>
                                    <td>
                                        <span class="pl-3">{{ returns.remarks }}</span>
                                    </td>
                                    <td>
                                        <span class="pl-3"
                                            :class="returns.is_cancelled ? 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20' : 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'">
                                            {{ returns.is_cancelled ? 'Cancelled' : 'Active' }}
                                        </span>
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
                                <Pagination :data="state.supplierReturns" @previous="previous" @next="next" />
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
import useVuelidate from '@vuelidate/core';
import { useAlert } from '@/composables/alert';
import { useI18n } from 'vue-i18n';
import type { Error } from '@/types/error';
import { supplierReturnService } from '~/components/api/admin/SupplierReturnService';
import { billService } from '~/components/api/admin/BillService';
import { employeeService } from '~/components/api/admin/EmployeeService';
import { supplierReturnDetailService } from '~/components/api/admin/SupplierReturnDetailService';

const rules = computed(() => ({

}));

const user_id = computed(() => localStorage.getItem('user_id'));
const firstname = computed(() => localStorage.getItem('firstname'));
const lastname = computed(() => localStorage.getItem('lastname'));
const runtimeConfig = useRuntimeConfig();


const v$ = useVuelidate(rules, {});
// Alert and i18n setup
const { successAlert, errorAlert, warningAlert } = useAlert();
const { t } = useI18n();

let currentTablePage = 1;

function previous() {
    if (currentTablePage > 1) {
        currentTablePage--;
        fetchSupplierReturns();
    }
}

const activeInactiveOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
];

const selectedIsActive = computed({
    get: () => masterSupplierReturn.is_cancelled,
    set: (newValue: boolean) => {
        masterSupplierReturn.is_cancelled = newValue;
    }
});

const returnToEdit = ref<number | null>(null);


// function next() {
//     if (currentTablePage < state.supplierReturns.totalPages) {
//         currentTablePage++;
//         //fetchSupplierReturns();
//     }
// }

function next() {
    if (currentTablePage < state.supplierReturns.data.length) {
        currentTablePage++;
        fetchSupplierReturns();
    }
}

interface SortData {
    sortField: string;
    sortOrder: "ascend" | "descend" | null;
}

interface Bill {
    id: string;
    supplier_id: string;
    prepared_by_id: string;
    cancelled_by_id: string;
    purchase_order_no: string;
    bill_date: string;
    amount: string;
    payment_terms: string;
    is_cancelled: boolean;
}

interface Employee {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    position: string;
    is_active: boolean;
}

interface SupplierReturn {
    data: any[];
}

interface SupplierReturnDetail {
    product_id: string;
    unit: string;
    expiry_date: string;
    quantity: string;
    price: string;
}

const masterSupplierReturn = {
    bill_id: '',
    prepared_by_id: '',
    approved_by_id: '',
    cancelled_by_id: '',
    branch_no: '',
    return_date: '',
    remarks: '',
    is_cancelled: false,
}

const supplierReturnDetail = ref<{
    product_id: string,
    unit: string,
    expiry_date: string,
    quantity: string,
    price: string,
}>({
    product_id: '',
    unit: '',
    expiry_date: '',
    quantity: '',
    price: '',
});

const supplierReturnDetailList = ref<Array<typeof supplierReturnDetail.value>>([]);
const addSupplierReturnDetails = () => {
    if (supplierReturnDetail.value.price === '') {
        warningAlert(t('Error'), t('Please enter all fields.'));
        return;
    }

    // Add to supplierReturnDetailList
    supplierReturnDetailList.value.push({
        ...supplierReturnDetail.value
    });

    // Reset supplierReturnDetail
    resetSupplierReturnDetail();
};

const resetSupplierReturnDetail = () => {
    supplierReturnDetail.value = {
        product_id: '',
        unit: '',
        expiry_date: '',
        quantity: '',
        price: '',
    };
};

const state = reactive({
    columnHeaders: [
        { name: "id", sorter: true, key: "id" },
        { name: "bill_id", sorter: true, key: "bill_id" },
        { name: "prepared_by_id", sorter: true, key: "prepared_by_id" },
        { name: "approved_by_id", sorter: true, key: "approved_by_id" },
        { name: "cancelled_by_id", sorter: true, key: "cancelled_by_id" },
        { name: "branch_no", sorter: true, key: "branch_no" },
        { name: "return_date", sorter: true, key: "return_date" },
        { name: "remarks", sorter: true, key: "remarks" },
        { name: "is_cancelled", sorter: true, key: "is_cancelled" },
        { name: "Actions", key: "actions" },
    ],
    error: null as Error | null,
    isTableLoading: false,
    sortData: { sortField: "", sortOrder: null } as SortData,
    selectedBillId: null as string | null,
    bills: [] as Bill[],
    employees: [] as Employee[],
    supplierReturnDetails: [] as SupplierReturnDetail[],
    supplierReturns: { data: [] } as SupplierReturn,
});

async function fetchBills() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const response = await billService.getBills(); // Assuming this is your service to fetch bills
        state.bills = response.data; // Adjust if necessary based on API response structure
        console.log('Fetched bills:', response.data);
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}

async function fetchEmployees() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const response = await employeeService.getEmployees();
        state.employees = response.data.filter((employee: Employee) => employee.is_active); // Filter active customers
        console.log('Fetched employees:', state.employees); // Log fetched active customers
    } catch (error: any) {
        state.error = error;
    } finally {
        state.isTableLoading = false;
    }
}

async function fetchSupplierReturns() {
    try {
        const response = await supplierReturnService.getSupplierReturns();
        state.supplierReturns = response; // Assuming the response structure contains the employee data
        console.log(response);
    } catch (error) {
        console.error('Failed to fetch Supplier Return:', error);
    }
}

async function saveSupplierReturn() {
    try {
        if (supplierReturnDetailList.value.length > 0) {
            console.log('Bill before save:', supplierReturnDetail.value);

            const supplierReturnData = {
                bill_id: masterSupplierReturn.bill_id,
                prepared_by_id: user_id,
                approved_by_id: masterSupplierReturn.approved_by_id,
                cancelled_by_id: masterSupplierReturn.cancelled_by_id,
                branch_no: masterSupplierReturn.branch_no,
                return_date: masterSupplierReturn.return_date,
                remarks: masterSupplierReturn.remarks,
                is_cancelled: masterSupplierReturn.is_cancelled,
            };

            console.log('Supplier Return Data:', supplierReturnData);

            // Attempt to create the supplier return
            const response = await supplierReturnService.createSupplierReturn(supplierReturnData);
            console.log('Response from createSupplierReturn:', response);

            // Check if the response is valid and has the expected structure
            if (response && response.data) {
                console.log('Supplier Return created successfully:', response.data);

                // Save each bill detail
                for (const detail of supplierReturnDetailList.value) {
                    const supplierReturnDetailData = {
                        product_id: detail.product_id,
                        supplier_return_id: response.data.id,
                        unit: detail.unit,
                        expiry_date: detail.expiry_date,
                        quantity: detail.quantity,
                        price: detail.price,
                    };

                    console.log('Saving bill detail:', supplierReturnDetailData);

                    // Attempt to create the supplier return detail
                    const result = await supplierReturnDetailService.createSupplierReturnDetail(supplierReturnDetailData);
                    console.log('Response from createSupplierReturnDetail:', result);

                    // Check if the detail save was successful
                    if (result) {
                        console.log('Bill detail saved successfully:', result);
                    } else {
                        console.error('Failed to save bill detail:', supplierReturnDetailData);
                    }
                }

                // Show success alert
                successAlert(t('alert.bill_created'), t('alert.success'));
            } else {
                console.error('Failed to create supplier return:', response);
                errorAlert(t('Error'), t('Failed to create bill.'));
            }

            // Refresh the bill list
            fetchSupplierReturns();
        } else {
            errorAlert(t('Error'), t('Please add at least one bill detail.'));
        }
    } catch (error) {
        console.error('Error saving bill:', error);
        errorAlert(t('Error'), t('An error occurred while saving the bill.'));
    }
}

const returnToView = ref<number | null>(null);


function viewReturn(id: number) {
    const selectedReturns = state.supplierReturns.data.find(r => r.id === id);
    if (selectedReturns) {
        selectedReturns.value = { ...selectedReturns };
        returnToView.value = id;
    } else {
        console.error(`Return with ID ${id} not found.`);
        errorAlert(`${t('alert.Error')}!`, `${t('alert.errorOccuredWhileViewingSupplierReturn')}.`);
    }
}
const showForm = ref(false);

function toggleForm() {
    showForm.value = !showForm.value;
}


function editReturn(id: number) {
    const selectedReturn = state.supplierReturns.data.find(r => r.id === id);

    if (selectedReturn) {
        selectedReturn.value = { ...selectedReturn };
        returnToEdit.value = id;
        showForm.value = true;
    } else {
        errorAlert(`${t('alert.Error')}!`, `${t('alert.supplierNotFound' + ' With ID:' + { id })}.`);
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
}

onMounted(() => {
    fetchSupplierReturns();
    fetchBills();
    fetchEmployees();
});

</script>