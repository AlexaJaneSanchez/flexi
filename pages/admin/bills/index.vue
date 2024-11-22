<template>
    <NuxtLayout name="admin">
        <main>

            <Head>
                <Title>Bills - {{ runtimeConfig.public.appName }}</Title>
            </Head>

            <!-- Add Button and Description -->
            <div class="sm:flex sm:items-center sm:justify-between">
                <!--Search Bar-->
                <div class="relative flex flex-1 ml-8 mt-5">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M9 3a6 6 0 11-6 6 6 6 0 016-6zM2 9a7 7 0 1114 0A7 7 0 012 9zm11.293 4.293a1 1 0 00-1.415-1.414L10 12.586l-1.879-1.878a1 1 0 00-1.415 1.414L8.586 14l-1.879 1.879a1 1 0 001.415 1.415L10 15.414l1.879 1.879a1 1 0 001.415-1.415L11.414 14l1.879-1.879a1 1 0 000-1.415z"
                            clip-rule="evenodd" />
                    </svg>
                    <input type="text" placeholder="Search" v-model="searchQuery" @input="sanitizeSearchQuery"
                        class="block w-75 rounded-md border border-gray-400 text-sm pl-8 pr-3 py-1.5" />
                </div>
                <!-- Add Customer Button -->
                <div class="mt-4 sm:ml-16 sm:mt-3 sm:flex-none mr-8">
                    <button type="button" @click="navigateToCreate"
                        class="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        ADD BILL
                    </button>
                </div>
            </div>
            <div>
                <!--Table1-->
                <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                <div class="table-responsive">
                    <Table :columnHeaders="state.columnHeaders" :data="{ data: filteredData }"
                        :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">

                        <template #body>
                            <!-- Check if the table is loading or has no data -->
                            <tr v-if="!state.isTableLoading && filteredData.length === 0">
                                <td class="text-center py-4" colspan="9">
                                    No bill is available
                                </td>
                            </tr>
                            <!-- Display rows if data exists -->
                            <tr v-for="(bill, index) in filteredData" :key="index">
                                <td class="pl-3">
                                    {{ bill.supplier_id }}
                                </td>
                                <td class="pl-3">
                                    {{ bill.prepared_by_id }}
                                </td>
                                <td class="pl-3">
                                    {{ bill.cancelled_by_id }}
                                </td>
                                <td class="pl-3">
                                    {{ bill.purchase_order_no }}
                                </td>
                                <td class="pl-3">
                                    {{ bill.bill_date }}
                                </td>
                                <td class="pl-3">
                                    ₱ {{ Number(bill.amount).toFixed(2) }}
                                </td>
                                <td class="pl-3">
                                    {{ bill.payment_terms }}
                                </td>
                                <td class="pl-3">
                                    <span
                                        :class="{ 'text-red-600': bill.is_cancelled, 'text-green-600': !bill.is_cancelled }">
                                        {{ bill.is_cancelled ? 'Cancelled' : 'Not Cancelled' }}
                                    </span>
                                </td>
                                <td class="pl-3">
                                    <div class="flex space-x-2">
                                        <button @click="viewBill(bill.id)" class="text-gray-600 hover:text-gray-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"
                                                fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M12 4.5C8.798 4.5 6 7.057 6 10.5S8.798 16.5 12 16.5 18 13.943 18 10.5 15.202 4.5 12 4.5ZM12 15.5C10.343 15.5 9 14.156 9 12.5S10.343 9.5 12 9.5 15 10.844 15 12.5 13.657 15.5 12 15.5ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 12S7.03 4 12 4s9 4.03 9 9-4.03 9-9 9Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                        <button @click="editBill(bill.id)" class="text-gray-600 hover:text-gray-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    d="M17.414 2.586a2 2 0 00-2.828 0l-10 10V16a1 1 0 001 1h3.414l10-10a2 2 0 000-2.828l-1.586-1.586zM5 13l-1.5 1.5V13h1.5zm4.5-4.5L14 4l2 2-4.5 4.5H9.5V8.5z" />
                                            </svg>
                                        </button>
                                        <button @click="deleteBill(bill.id)" class="text-red-600 hover:text-red-900">
                                            Cancel
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </Table>
                </div>
                <!-- <Pagination :data="state.bills" @previous="previos" @next="next" /> -->
            </div>
            <!-- View Bill Modal -->
            <div v-if="billToView" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
                    <div class="text-center mb-10">
                        <h2 class="text-xl font-semibold text-gray-800">Bill Details</h2>
                    </div>
                    <!-- Updated Grid Layout to show two items per row -->
                    <div class="grid grid-cols-2 gap-4 mx-4">
                        <!-- First Row -->
                        <div class="flex items-center mb-2">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">Supplier:</label>
                            <span class="font-semibold">{{ billToView.supplier_id }}</span>
                        </div>
                        <div class="flex items-center mb-2">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">Prepared By:</label>
                            <span class="font-semibold">{{ billToView.prepared_by_id }}</span>
                        </div>

                        <!-- Second Row -->
                        <div class="flex items-center mb-2">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">Cancelled By:</label>
                            <span class="font-semibold">{{ billToView.cancelled_by_id }}</span>
                        </div>
                        <div class="flex items-center mb-2">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">P.O. Number:</label>
                            <span class="font-semibold">{{ billToView.purchase_order_no }}</span>
                        </div>

                        <!-- Third Row -->
                        <div class="flex items-center mb-2">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">Bill Date:</label>
                            <span class="font-semibold">{{ billToView.bill_date }}</span>
                        </div>
                        <div class="flex items-center mb-2">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">Amount:</label>
                            <span class="font-semibold">₱ {{ Number(billToView.amount).toFixed(2) }}</span>
                        </div>

                        <!-- Fourth Row -->
                        <div class="flex items-center mb-10">
                            <label class="text-xs font-medium text-gray-700 w-36 mr-2">Terms:</label>
                            <span class="font-semibold">{{ billToView.payment_terms }}</span>
                        </div>
                    </div>
                    <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th
                                    class="border px-4 py-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Bill ID
                                </th>
                                <th
                                    class="border px-4 py-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Product ID
                                </th>
                                <th
                                    class="border px-4 py-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Unit
                                </th>
                                <th
                                    class="border px-4 py-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Expiry Date
                                </th>
                                <th
                                    class="border px-4 py-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th
                                    class="border px-4 py-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="detail in billDetailsToView" :key="detail.id">
                                <td class="border px-4 py-2">{{ detail.bill_id }}</td>
                                <td class="border px-4 py-2">{{ detail.product_id }}</td>
                                <td class="border px-4 py-2">{{ detail.unit }}</td>
                                <td class="border px-4 py-2">{{ detail.expiry_date }}</td>
                                <td class="border px-4 py-2">{{ detail.quantity }}</td>
                                <td class="border px-4 py-2">{{ detail.price }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="flex justify-end gap-2 mt-4">
                        <button @click="billToView = null"
                            class="rounded-md bg-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
                            Close
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators';
import { ref, reactive, onMounted, computed } from 'vue';
import { billService } from '~/components/api/admin/BillService.js';
import { useAlert } from '@/composables/alert';
import type { Error } from '@/types/error';
import { supplierService } from '~/components/api/admin/SupplierService.js';
import { productService } from '~/components/api/admin/ProductService.js';
import 'flatpickr/dist/themes/dark.css';
import { employeeService } from '~/components/api/admin/EmployeeService';

const currentTablePage = ref(1);

import { useI18n } from 'vue-i18n';
import { billDetailService } from '~/components/api/admin/BillDetailService';
// Alert and i18n setup
const { successAlert, errorAlert, warningAlert } = useAlert();
const { t } = useI18n();

const runtimeConfig = useRuntimeConfig();

interface SortData {
    sortField: string;
    sortOrder: "ascend" | "descend" | null;
}

interface Bill {
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



interface Suppliers {
    id: number;
    name: string;
    is_active: boolean;
}

interface Products {
    id: number;
    barcode: string;
    wholesale_unit: string;
    name: string;
    is_active: boolean;
}

const state = reactive({
    columnHeaders: [
        { name: "Supplier", sorter: true, key: "supplier_id" },
        { name: "Prepared_by", sorter: true, key: "prepared_by_id" },
        { name: "Cancelled_by", sorter: true, key: "cancelled_by_id" },
        { name: "P.O. Number", sorter: true, key: "purchase_order_no" },
        { name: "Bill Date", sorter: true, key: "bill_date" },
        { name: "Amount", sorter: true, key: "amount" },
        { name: "Terms", sorter: true, key: "payment_terms" },
        { name: "Status", sorter: true, key: "is_cancelled" },
        { name: "Actions", key: "actions" },
    ],
    error: null as Error | null,
    isTableLoading: false,
    sortData: { sortField: "", sortOrder: null } as SortData,
    employees: [] as Employee[],
    bills: { data: [] } as Bill,
    suppliers: [] as Suppliers[],
    products: [] as Products[],
});


onMounted(() => {
    fetchBills();
});

const rules = computed(() => ({
    bill: {
        date: { required: helpers.withMessage('This field is required.', required) },
        supplier: { required: helpers.withMessage('This field is required.', required) },
    },
}));

const billDetail = ref<{
    product_id: number | string; // Allow for both number and string
    name: string;
    barcode: string;
    unit: string;
    expiry_date: string;
    amount: number;
    quantity: string;
    price: string;
}>({
    product_id: '',
    name: '',
    barcode: '',
    unit: '',
    expiry_date: '',
    amount: 0,
    quantity: '',
    price: ''
});

watch(
    () => billDetail.value.product_id,
    (newProductId) => {
        // Find the selected product based on the selected product_id
        const selectedProduct = state.products.find(product => product.id === newProductId);

        // Update the name in billDetail if the selected product exists
        if (selectedProduct) {
            billDetail.value.name = selectedProduct.name;
            billDetail.value.barcode = selectedProduct.barcode;
            billDetail.value.unit = selectedProduct.wholesale_unit;

        } else {
            billDetail.value.name = ''; // Reset name if no product is selected
        }
    }
);

async function fetchEmployees() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const response = await employeeService.getEmployees();
        state.employees = response.data; // Adjust if necessary based on API response structure
        state.bills.data.forEach(bill => {
            const selectedEmployee = state.employees.find(employee => employee.id === bill.prepared_by_id);
            bill.prepared_by_id = selectedEmployee ? `${selectedEmployee.firstname} ${selectedEmployee.lastname}` : 'Unknown'; // Fallback if employee not found
        });
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}

async function fetchSuppliers() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const response = await supplierService.getSuppliers();
        state.suppliers = response.data; // Adjust if necessary based on API response structure
        console.log('Fetched categories:', response.data); // Log fetched categories
        state.bills.data.forEach(bills => {
            const selectedSupplier = state.suppliers.find(suppliers => suppliers.id === bills.supplier_id);
            bills.supplier_id = selectedSupplier ? selectedSupplier.name : 'Unknown'; // Fallback if category not found
        });
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}

async function fetchProducts() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const response = await productService.getProducts();
        state.products = response.data; // Adjust if necessary based on API response structure
        console.log('Fetched products:', response.data); // Log fetched products
        state.bills.data.forEach(bills => {
            const selectedProduct = state.products.find(products => products.id === bills.product_id);
            bills.product_id = selectedProduct ? selectedProduct.name : 'Unknown'; // Fallback if product not found
        });
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}

async function fetchBills() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const params = {
            page: currentTablePage.value,
            sortField: state.sortData.sortField,
            sortOrder: state.sortData.sortOrder,
        };
        const response = await billService.getBills();
        fetchSuppliers();
        fetchProducts();
        fetchEmployees();
        console.log("Fetched bills:", response.data); // Log fetched bills
        state.bills = response;
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}

const billToView = ref<any>(null);
const billDetailsToView = ref<any>([]);

const viewBill = async (id: number) => {
    try {
        const bill = await billService.getBillById(id);
        const allBillDetails = await billDetailService.getBillDetails();

        billToView.value = bill.data;
        billDetailsToView.value = allBillDetails.data.filter((detail: { bill_id: number }) => detail.bill_id === id);

    } catch (error) {
        console.error('Failed to fetch bill details:', error);
    }
};

const editBill = async (id: number) => {

};
const deleteBill = async (id: number) => {

}

const sort = async (sortData: SortData) => {
    state.sortData = sortData;
    await fetchBills();
};

const searchQuery = ref('');

function sanitizeSearchQuery() {
    searchQuery.value = searchQuery.value.replace(/[^a-zA-Z]/g, '');
}

const filteredData = computed(() => {
    if (!searchQuery.value) {
        return state.bills.data;
    }

    const query = searchQuery.value.toLowerCase();

    const filtered = state.bills.data.filter(bill =>
        bill.supplier_id.toLowerCase().includes(query)
    );

    console.log('Filtered Data:', filtered); t
    return filtered;
});

function navigateToCreate() {
    navigateTo("bills/create")
}
</script>