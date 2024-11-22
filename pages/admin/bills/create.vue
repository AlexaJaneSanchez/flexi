<template>
    <NuxtLayout name="admin">
        <main>
            <Head>
                <Title>Bills Details - {{ runtimeConfig.public.appName }}</Title>
            </Head>
                    <div>
                        <div class="text-center mb-7">
                            <h2 class="text-xl font-semibold text-gray-800">BILLS DETAILS</h2>
                        </div>
                        <hr class="border-t-2 border-gray-300 mb-7" />
                        <Alert type="danger" :text="state?.error?.message"
                            v-if="state.error?.message && state.error.message.length > 0" />
                        <div class="grid grid-cols-2 gap-6"> <!-- 2-column grid with gap between columns -->
                            <!-- Left Column (3 Fields) -->
                            <div class="space-y-6"> <!-- Added spacing between each form field -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-2">Supplier ID</label>
                                    <div class="flex items-center mb-4">
                                        <FormSelect id="supplier_id" v-model="bill.supplier_id"
                                            :options="state.suppliers.filter(suppliers => suppliers.is_active).map(suppliers => ({ value: suppliers.id, label: suppliers.name }))"
                                            placeholder="Select supplier" required />
                                        <FormError :error="state?.error?.errors?.supplier_id?.[0]" />
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-2">Prepared by</label>
                                    <div class="flex items-center mb-4">
                                        <FormNumberField for="prepared_by_id" name="prepared_by_id"
                                            v-model="bill.prepared_by_id" :placeholder="`${firstname} ${lastname}`"
                                            :value="`${firstname} ${lastname}`" readonly
                                            class="cursor-default bg-gray-200" />
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-2">Purchase Oder No</label>
                                    <div class="flex items-center mb-4">
                                        <FormTextField for="purchase_order_no" name="purchase_order_no"
                                            v-model="bill.purchase_order_no" placeholder="Purchase Order No" required />
                                    </div>
                                </div>
                            </div>

                            <!-- Right Column (3 Fields) -->
                            <div class="space-y-6"> <!-- Added spacing between each form field -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-2">Bill Date</label>
                                    <div class="flex items-center mb-4">
                                        <flat-pickr v-model="bill.bill_date" :config="dateConfig"
                                            class="w-full py-2 pl-3 ring-1 ring-slate-200 rounded-md focus:outline-none focus:ring-primary-700 focus:border-primary-700 focus:z-10"
                                            placeholder="Bill Date" required />
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-2">Payment Terms</label>
                                    <div class="flex items-center mb-3">
                                        <FormTextField for="payment_terms" name="payment_terms"
                                            v-model="bill.payment_terms" placeholder="Payment Terms" required />
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-1">Product ID</label>
                                    <div class="flex items-center mb-3">
                                        <FormSelect id="product_id" v-model="billDetail.product_id"
                                            :options="state.products.filter(products => products.is_active).map(products => ({ value: products.id, label: products.name }))"
                                            placeholder="Select product" />
                                        <FormError :error="state?.error?.errors?.product_id?.[0]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-6">
                    <!-- Left Column (3 Fields) -->
                    <div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 ml-1 mb-2">Barcode</label>
                            <div class="flex items-center mb-4">
                                <input 
                                    id="barcode" 
                                    v-model="billDetail.barcode" 
                                    type="text"
                                    class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-base px-3 py-2"
                                    placeholder="Enter Barcode" 
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 ml-1 mb-2">Unit</label>
                            <div class="flex items-center mb-4">
                                <input id="unit" v-model="billDetail.unit" type="text"
                                    class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-base px-3 py-2"
                                    placeholder="Enter Unit" required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 ml-1 mb-2">Expiry Date</label>
                            <div class="flex items-center mb-4">
                                <input id="expiry_date" v-model="billDetail.expiry_date" type="date"
                                    class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-base px-3 py-2"
                                    required />
                            </div>
                        </div>
                    </div>

                    <!-- Right Column (2 Fields + Button) -->
                    <div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 ml-1 mb-2">Quantity</label>
                            <div class="flex items-center mb-4">
                                <input id="quantity" v-model="billDetail.quantity" type="text"  @input="filterQuantity"
                                    class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-base px-3 py-2"
                                    placeholder="Enter Quantity" required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 ml-1 mb-2">Price</label>
                            <div class="flex items-center mb-4">
                                <input id="price" v-model="billDetail.price" type="text" @input="filterPrice"
                                    class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-base px-3 py-2"
                                    placeholder="Enter Price" required />
                            </div>
                        </div>

                        <div class="flex justify-start mt-12">
                            <button @click="addBillDetails" type="button"
                                class="rounded-md bg-gray-900 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                                ADD BILL DETAILS
                            </button>
                        </div>
                    </div>
                </div>
                </div>


                      <!-- Second Table (inside the form) -->
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200 mt-10 rounded">
                                <thead class="bg-gray-900 text-white">
                                    <tr>
                                        <th scope="col" class="px-4 py-2 text-sm font-medium text-left text-white rounded-l-md">Product Name</th>
                                        <th scope="col" class="px-4 py-2 text-sm font-medium text-left text-white">Barcode</th>
                                        <th scope="col" class="px-4 py-2 text-sm font-medium text-left text-white">Unit</th>
                                        <th scope="col" class="px-4 py-2 text-sm font-medium text-left text-white">Expiry Date</th>
                                        <th scope="col" class="px-4 py-2 text-sm font-medium text-left text-white">Quantity</th>
                                        <th scope="col" class="px-4 py-2 text-sm font-medium text-left text-white rounded-r-md">Price</th>
                                    </tr>
                                </thead>

                                <tbody class="bg-gray-100">
                                    <tr v-for="(billDetail, index) in billDetailsList" :key="index"
                                        class="border-t bg-gray-50">
                                        <td class="px-4 py-2 text-sm text-gray-700">{{ billDetail.name }}</td>
                                        <td class="px-4 py-2 text-sm text-gray-700">{{ billDetail.barcode }}</td>
                                        <td class="px-4 py-2 text-sm text-gray-700">{{ billDetail.unit }}</td>
                                        <td class="px-4 py-2 text-sm text-gray-700">{{ billDetail.expiry_date }}</td>
                                        <td class="px-4 py-2 text-sm text-gray-700">{{ billDetail.quantity }}</td>
                                        <td class="px-4 py-2 text-sm text-gray-700">{{ billDetail.price }}</td>
                                    </tr>
                                    <tr v-if="billDetailsList.length === 0">
                                        <td colspan="8"
                                            class="px-4 py-2 text-sm text-gray-500 text-center bg-gray-100">No bill details available.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="flex justify-end gap-2 mt-5">
                            <button @click="saveBill" type="submit"
                                class="rounded-md bg-gray-900 px-4 py-2 text-xxs font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                                Save
                            </button>
                            <button @click="toggleBillForm" type="button"
                                class="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
                                Cancel
                            </button>
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
import { billDetailService } from '~/components/api/admin/BillDetailService.js';
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/themes/dark.css';
import { employeeService } from '~/components/api/admin/EmployeeService';

const user_id = computed(() => localStorage.getItem('user_id'));
const firstname = computed(() => localStorage.getItem('firstname'));
const lastname = computed(() => localStorage.getItem('lastname'));
const dateConfig = ref<{ dateFormat: string }>({ dateFormat: "m/d/Y" });

const currentTablePage = ref(1);

import { useI18n } from 'vue-i18n';
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

interface BillDetail {
    product_id: string;
    name: string;
    barcode: string;
    unit: string;
    expiry_date: string;
    quantity: string;
    price: string;
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

const showBillForm = ref(false);

onMounted(() => {
    fetchBills();
});

const rules = computed(() => ({
    bill: {
        date: { required: helpers.withMessage('This field is required.', required) },
        supplier: { required: helpers.withMessage('This field is required.', required) },
    },
}));

const bill = ref({
    supplier_id: '',
    prepared_by_id: '',
    cancelled_by_id: '',
    purchase_order_no: '',
    bill_date: '',
    amount: 0,
    payment_terms: '',
    is_cancelled: false
});

const billDetail = ref<{
    product_id: number | string; 
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
function filterQuantity(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    // Remove any non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    // Update the model with the sanitized value
    billDetail.value.quantity = numericValue;
}

function filterPrice(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    // Remove any non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    // Update the model with the sanitized value
    billDetail.value.price = numericValue;
}
const billDetailsList = ref<BillDetail[]>([]);

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

const toggleBillForm = () => {
    // Toggle visibility of the bill form
    showBillForm.value = !showBillForm.value;
    
    // Reset the bill details list
    billDetailsList.value = [];
    
    // Reset the current bill detail object
    billDetail.value = {
        product_id: '',
        name: '',
        barcode: '',
        unit: '',
        expiry_date: '',
        amount: 0,
        quantity: '',
        price: ''
    };

    // Navigate to the bills page
    navigateTo('/admin/bills');
};


async function saveBill() {
    try {
        // Prepare the bill data
        const billData = {
            supplier_id: bill.value.supplier_id,
            prepared_by_id: user_id.value,
            cancelled_by_id: bill.value.cancelled_by_id,
            bill_date: bill.value.bill_date,
            purchase_order_no: bill.value.purchase_order_no,
            amount: bill.value.amount, // You might want to calculate this based on bill details
            payment_terms: bill.value.payment_terms,
            is_cancelled: bill.value.is_cancelled || false,
        };

        // Calculate total amount from bill details
        const totalAmount = billDetailsList.value.reduce((total, detail) => {
            return total + (Number(detail.quantity) * Number(detail.price));
        }, 0);

        // Update the amount in billData with the calculated total amount
        billData.amount = totalAmount;

        // Create new bill
        const response = await billService.createBills(billData);
        
        // Check if the response contains the expected data ID
        if (response && response.data && response.data.id) {
            console.log(response);

            // Save bill details
            const saveDetailsPromises = billDetailsList.value.map(async (detail) => {
                const billDetailData = {
                    bill_id: response.data.id, // Use the correct response ID
                    product_id: detail.product_id,
                    barcode: detail.barcode,
                    unit: detail.unit,
                    expiry_date: detail.expiry_date,
                    quantity: detail.quantity,
                    price: detail.price,
                };

                console.log('Saving bill detail:', billDetailData); // Log the detail being saved
                const result = await billDetailService.createBillDetails(billDetailData);
                return result;
            });

            // Wait for all bill details to be saved
            const results = await Promise.all(saveDetailsPromises);
            results.forEach((result, index) => {
                if (result) {
                    console.log(`Bill detail ${index + 1} saved successfully:`, result);
                } else {
                    console.error(`Failed to save bill detail ${index + 1}:`, billDetailsList.value[index]);
                }
            });

            // Success alert for creating the bill
            successAlert(t('alert.bill_created'), t('alert.success'));

            // Refresh the bill list and hide the form after saving
            await fetchBills(); // Ensure bills are fetched before navigation
            toggleBillForm(); // Hide the form
            navigateTo('/admin/bills');
        } else {
            console.error('Failed to create bill, no valid ID in response:', response);
            errorAlert(t('Error'), t('Failed to create bill.'));
        }

    } catch (error: any) {
        console.error('Error saving bill:', error.message);
        errorAlert(t('Error'), t('An error occurred while saving the bill.'));
    }
}


const addBillDetails = () => {
    if (billDetail.value.price === '') {
        warningAlert(t('Error'), t('Please enter all fields.'));
        return;
    }

    // Add to billDetailsList
    billDetailsList.value.push({
        ...billDetail.value,
        product_id: String(billDetail.value.product_id), // Ensure this is a string
    });

    // Reset billDetail
    billDetail.value = {
        product_id: '',
        name: '',
        barcode: '',
        unit: '',
        expiry_date: '',
        amount: 0,
        quantity: '',
        price: ''
    };
};




</script>