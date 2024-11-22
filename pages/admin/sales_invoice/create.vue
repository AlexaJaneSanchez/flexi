<template>
    <div>
        <NuxtLayout name="admin">
            <main class="w-full mx-auto">

                <Head>
                    <Title>Sales Invoice - {{ runtimeConfig.public.appName }}</Title>
                </Head>
                <!-- Sales Details Input -->
                <div>
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center mt-20" aria-hidden="true">
                            <div class="w-full border-t border-gray-300 " />
                        </div>
                        <div class="text-center">
                            <h2 class="bg-white text-lg font-bold mb-20 text-gray-900 ">SALES INVOICE</h2>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <!-- Row 1 sales invoice -->
                        <div class="flex items-center space-x-4">
                            <div class="w-1/2">
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-1">Invoice Number</label>
                                <FormTextField id="invoice number" name="invoice number"
                                v-model="salesInvoiceDetail.sales_invoice_id" placeholder="Invoice Number" required />
                            </div>
                            <div class="w-1/2">
                                <label class="block text-sm font-medium text-gray-700 ml-2 mb-1">Remarks</label>
                                <FormTextField id="remarks" name="remarks"
                                v-model="salesInvoice.remarks" placeholder="Remarks" required />
                            </div>
                        </div>
                        <!-- Row 2 -->
                        <div class="flex items-center space-x-4 mt-8">
                            <div class="w-1/2 ">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">Customer</label>
                                <FormSelect id="product_category_id" v-model="salesInvoice.customer_id"
                                    :options="state.customers.filter(customer => customer.is_active).map(customer => ({ value: customer.id, label: customer.firstname + ' ' + customer.lastname }))"
                                    placeholder="Select Customer" required  />
                            </div>
                            <div class="w-1/2">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">Sales Representative</label>
                                <FormSelect id="employee" v-model="salesInvoice.sales_representative"
                                    :options="state.employees.filter(employee => employee.is_active).map(employee => ({ value: employee.id, label: employee.firstname + ' ' + employee.lastname }))"
                                    placeholder="Select Sales Representative" required />
                            </div>
                        </div>
                        <!-- Row 3 -->
                        <div class="flex items-center space-x-4 mt-8">
                            <div class="w-1/2">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">Date</label>
                                <input id="date" type="date" v-model="salesInvoice.date"
                                    class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-sm px-3 py-2"
                                    required />
                            </div>
                            <div class="w-1/2">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">Due Date</label>
                                <input id="paymentDate" type="date" v-model="salesInvoice.due_date"
                                    class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-sm px-3 py-2"
                                    required />
                            </div>
                        </div>

                        <!-- Row 4 -->
                        <div class="flex items-center space-x-4 mt-10">
                            <div class="w-1/4">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">Prepared by:</label>
                                <FormNumberField for="prepared_by_id" name="prepared_by_id"
                                    v-model="salesInvoice.prepared_by_id" :placeholder="`${firstname} ${lastname}`"
                                    :value="`${firstname} ${lastname}`" readonly
                                    class="block cursor-default bg-gray-200" />
                            </div>
                            <div class="w-1/4">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">Payment Type</label>
                                <FormSelect v-model="salesInvoice.payment_type" :options="[
                                    { value: 'Cash', label: 'Cash' },
                                    { value: 'Cheque', label: 'Cheque' },
                                    { value: 'Bank Transfer', label: 'Bank Transfer' }
                                ]">
                                </FormSelect>
                            </div>
                            <div class="w-1/4">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">Terms (Days)</label>
                                <FormNumberField class="block" for="terms" name="terms" id="terms"
                                    v-model="salesInvoice.terms" placeholder="terms (days)"
                                    :disabled="salesInvoice.payment_type === 'Cash'" />
                            </div>
                            <div class="w-1/4">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">isCancelled</label>
                                <FormSelect v-model="salesInvoice.is_cancelled" :options="[
                                    { value: false, label: 'No' },
                                    { value: true, label: 'Yes' },
                                ]">
                                </FormSelect>
                            </div>
                        </div>
                        <div class="relative">
                        <div class="absolute inset-0 flex items-center mt-20" aria-hidden="true">
                            <div class="w-full border-t border-gray-300 " />
                        </div>
                        <div class="text-center">
                            <h2 class="bg-white text-lg font-bold mt-20 mb-12">SALES INVOICE DETAILS</h2>
                        </div>
                    </div>

                        <!-- SALES INVOICE DETAIL ROWS -->
                        <div class="flex items-center space-x-4 ">
                            <div class="w-1/2 mt-7 ">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">Product ID</label>
                                <div class="flex items-center mb-1">
                                    <FormSelect id="product_id" v-model="salesInvoiceDetail.product_id"
                                        :options="state.products.filter(products => products.is_active).map(products => ({ value: products.id, label: products.name }))"
                                        placeholder="Select Product" readonly/>
                                    <FormError :error="state?.error?.errors?.product_id?.[0]" />
                                </div>
                            </div>
                            <div class="w-1/2 mt-5">
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-2">Barcode</label>
                                <FormTextField id="barcode" name="barcode"
                                v-model="salesInvoiceDetail.barcode" placeholder="Barcode" required readonly/>
                        </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="w-1/2">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">Unit</label>
                                <FormTextField id="unit" name="unit"
                                v-model="salesInvoiceDetail.unit" placeholder="Unit" required readonly/>
                            </div>
                            <div class="w-1/2">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">Expiry Date</label>
                                <FormTextField id="expiry date" name="expiry date"
                                v-model="salesInvoiceDetail.expiry_date" placeholder="Expiry Date" required readonly/>
                        </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="w-1/2">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">Quantity 
                                    <span class="text-sm font-thin">stock available:</span> 
                                    <span class="text-red-400">{{ stock }}</span>
                                </label>
                                <input 
                                    v-model.number="salesInvoiceDetail.quantity"
                                    type="text" 
                                    placeholder="Quantity"
                                    @input="filteredQuantity"
                                    class="block w-full bg-white mt-3 border-2 border-gray-100 rounded-md text-sm p-3 focus:outline-none"
                                    required
                                />
                            </div>
                            <div class="w-1/2">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">Price</label>
                                <input 
                                    v-model.number="salesInvoiceDetail.price" 
                                    type="text" 
                                    placeholder="Enter Price" @input="filteredPrice"
                                    class="block w-full bg-white mt-3 border-gray-100 border-2 rounded-md text-sm p-3 focus:outline-none" required/>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div class="w-1/2">
                                <label class="block text-sm font-medium text-gray-700 mb-2 ml-1">Total</label>
                                <FormNumberField for="prepared_by_id" name="prepared_by_id" v-model="salesInvoice.total"
                                    placeholder="0" readonly class="block cursor-default bg-gray-200" />
                            </div>
                            <div class="w-1/2">
                                <label class="block text-xs font-medium text-gray-700"></label>
                                <button @click="addSales"
                                    class="block mt-7 rounded-md bg-gray-900 px-6 py-3 text-xs font-semibold text-white hover:bg-gray-800">ADD
                                    SALES</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sales List Table -->
                <div class="mt-8 overflow-x-auto responsive">
                    <table class="min-w-full bg-white rounded-lg shadow-md mt-5">
                        <thead>
                            <tr class="text-left">
                                <th class="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-tl-lg">Product ID</th>
                                <th class="px-4 py-2 text-sm font-semibold text-white bg-gray-900">Product Name</th>
                                <th class="px-4 py-2 text-sm font-semibold text-white bg-gray-900">Barcode</th>
                                <th class="px-4 py-2 text-sm font-semibold text-white bg-gray-900">Unit</th>
                                <th class="px-4 py-2 text-sm font-semibold text-white bg-gray-900">Expiry Date</th>
                                <th class="px-4 py-2 text-sm font-semibold text-white bg-gray-900">Quantity</th>
                                <th class="px-4 py-2 text-sm font-semibold text-white bg-gray-900">Price</th>
                                <th class="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-tr-lg">
                                    Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-gray-100">
                            <tr v-for="(sale, index) in sales" :key="sale.sales_invoice_id" class="border-t bg-gray-50">
                                <td class="px-4 py-2 text-xxs text-gray-700">{{ sale.product_id }}</td>
                                <td class="px-4 py-2 text-xxs text-gray-700 ">{{ sale.product_name }}</td>
                                <td class="px-4 py-2 text-xxs text-gray-700">{{ sale.barcode }}</td>
                                <td class="px-4 py-2 text-xxs text-gray-700">{{ sale.unit }}</td>
                                <td class="px-4 py-2 text-xxs text-gray-700">{{ sale.expiry_date }}</td>
                                <td class="px-4 py-2 text-xxs text-gray-700">{{ sale.quantity }}</td>
                                <td class="px-4 py-2 text-xxs text-gray-700">{{ sale.price }}</td>
                                <td class="px-4 py-2 text-xxs text-gray-700">
                                    <div class="flex ">
                                        <button @click="editSale(index)" class="text-gray-600 hover:text-gray-900 mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-0" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    d="M17.414 2.586a2 2 0 00-2.828 0l-10 10V16a1 1 0 001 1h3.414l10-10a2 2 0 000-2.828l-1.586-1.586zM5 13l-1.5 1.5V13h1.5zm4.5-4.5L14 4l2 2-4.5 4.5H9.5V8.5z" />
                                            </svg>
                                        </button>
                                        <button @click="deleteSale(index)" class="text-red-600 hover:text-red-900">
                                            Cancel
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="sales.length === 0">
                                <td colspan="8" class="px-4 py-2 text-xxs text-gray-500 text-center bg-gray-100">No
                                    sales available.</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Save and Cancel Buttons -->
                    <div class="mt-6 flex justify-end space-x-4">
                        <button @click="saveSalesInvoice"
                            class="rounded-md bg-gray-900 px-5 py-3 text-xs font-semibold text-white hover:bg-gray-800">Save</button>
                        <button @click="cancel"
                            class="rounded-md bg-gray-300 px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-400">Cancel</button>
                    </div>
                </div>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Error } from '@/types/error';
import { customerService } from '~/components/api/admin/CustomerService';
import { useAlert } from '@/composables/alert';
import { useI18n } from 'vue-i18n';
import { employeeService } from '~/components/api/admin/EmployeeService';
import { productService } from '~/components/api/admin/ProductService';
import { salesInvoiceService } from '~/components/api/admin/SalesInvoiceService';
import { salesInvoiceDetailService } from '~/components/api/admin/SalesInvoiceDetailService';

const user_id = computed(() => localStorage.getItem('user_id'));
const firstname = computed(() => localStorage.getItem('firstname'));
const lastname = computed(() => localStorage.getItem('lastname'));
let stock = '';

// Alert and i18n setup
const { successAlert } = useAlert();
const { errorAlert } = useAlert();
const { warningAlert } = useAlert();
const { t } = useI18n()

const runtimeConfig = useRuntimeConfig();

interface Customer {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    is_active: boolean;
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

interface Product {
    id: number;
    barcode: string;
    wholesale_unit: string;
    name: string;
    expiry_date: string;
    quantity_onhand: string;
    is_active: boolean;
}

const customer = ref({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    is_active: true,
});

const employee = ref({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    position: '',
    is_active: true,
});

interface SalesInvoice {
    id: string;
    branch_id: string;
    sales_order_id: string;
    customer_id: string;
    prepared_by_id: string;
    cancelled_by_id: string;
    approved_by_id: string;
    invoice_no: string;
    document_no: string;
    date: string;
    due_date: string;
    terms: number;
    is_cancelled: boolean;
    is_approved: boolean;
    remarks: string;
    total: number;
}

const salesInvoice = ref({
    id: '',
    branch_id: '',
    sales_order_id: '',
    customer_id: '',
    prepared_by_id: '',
    sales_representative: '',
    cancelled_by_id: '',
    approved_by_id: '',
    invoice_no: '',
    document_no: '',
    date: '',
    due_date: '',
    payment_type: 'Cash',
    terms: '0',
    is_cancelled: false,
    is_approved: false,
    remarks: '',
    total: '',
});

interface SalesInvoiceDetail {
    sales_invoice_id: string;
    product_id: number | null; // Allow null
    product_name: string;
    barcode: string;
    unit: string;
    expiry_date: string;
    quantity: number | null; // Allow null
    price: number | null; // Allow null
}

const salesInvoiceDetail = ref<SalesInvoiceDetail>({
    sales_invoice_id: '',
    product_id: null, // Set to null
    product_name: '',
    barcode: '',
    unit: '',
    expiry_date: '',
    quantity: null, // Set to null
    price: null, // Set to null
});

const sales = ref<Array<SalesInvoiceDetail>>([]);

const state = reactive({
    error: null as Error | null,
    isTableLoading: false,
    customers: [] as Customer[],
    employees: [] as Employee[],
    products: [] as Product[],
    salesInvoice: [] as SalesInvoice[],
    salesInvoiceDetail: [] as any,
    sales,
});

const totalAmount = computed(() => {
    return sales.value.reduce((total, item) => {
        // Use nullish coalescing to ensure values default to 0 if they are null
        const quantity = item.quantity ?? 0; // If item.quantity is null, use 0
        const price = item.price ?? 0; // If item.price is null, use 0
        return total + (quantity * price); // Calculate total for each sale
    }, 0); // Initialize total to 0
});

const formattedTotalAmount = computed(() => {
    return `${totalAmount.value.toFixed(2)}`;
});

function redirectToSalesInvoice() {
    navigateTo("/admin/sales_invoice");
}

function cancel() {
    redirectToSalesInvoice();
}

function editSale(index: number) {
    // Implement your edit logic here
}

function deleteSale(index: number) {
    sales.value.splice(index, 1);
}

function addSales() {
    sales.value.push({ ...salesInvoiceDetail.value });
    console.log(sales);
    salesInvoice.value.total = formattedTotalAmount.value; // Update total amount
    resetSalesDetails();
}

async function saveSalesInvoice() {
    try {
        if (sales.value.length > 0) {
            console.log('Bill before save:', salesInvoice.value);
            const salesInvoiceData = {
                branch_id: salesInvoice.value.branch_id,
                sales_order_id: salesInvoice.value.sales_order_id,
                customer_id: salesInvoice.value.customer_id,
                prepared_by_id: user_id.value,
                sales_representative: salesInvoice.value.sales_representative,
                cancelled_by_id: salesInvoice.value.cancelled_by_id,
                approved_by_id: null,
                invoice_no: salesInvoice.value.invoice_no,
                date: salesInvoice.value.date,
                due_date: salesInvoice.value.due_date,
                payment_type: salesInvoice.value.payment_type,
                terms: salesInvoice.value.terms,
                is_cancelled: salesInvoice.value.is_cancelled || false,
                is_approved: salesInvoice.value.is_approved || false,
                remarks: salesInvoice.value.remarks,
                amount: salesInvoice.value.total,
            };

            // Update the amount in salesInvoiceData with the calculated total amount
            salesInvoiceData.amount = formattedTotalAmount.value;

            // Create new bill.
            const response = await salesInvoiceService.createSalesInvoice(salesInvoiceData);
            if (response && response.data.id) {
                successAlert('Success', 'Sales Invoice has been added! The value of the ID is: ' + response.data.id);
               // successAlert('Success', 'Sales Invoice has been added! The value of the Document Reference Number is: ' + response.data.document_no);
                console.log(response);
                // Save bill details
                for (const detail of sales.value) {
                    const salesInvoiceDetailList = {
                        sales_invoice_id: response.data.id,
                        sales_invoice_ref_doc_no: response.data.document_no,
                        product_id: detail.product_id, 
                        product_name: detail.product_name,
                        barcode: detail.barcode,
                        unit: detail.unit,
                        expiry_date: detail.expiry_date,
                        quantity: detail.quantity, 
                        price: detail.price, 
                        bill_id: response.data.id, 
                    };

                    console.log('Saving bill detail:', salesInvoiceDetailList);
                    const result = await salesInvoiceDetailService.createSalesInvoiceDetail(salesInvoiceDetailList);

                    if (result) {
                        console.log('Bill detail saved successfully:', result);
                        resetAllFields();
                        redirectToSalesInvoice();
                    } else {
                        console.error('Failed to save bill detail:', salesInvoiceDetailList);
                    }
                }
                successAlert(t('alert.bill_created'), t('alert.success'));
            } else {
                errorAlert(t('Error'), t('Failed to create bill.'));
            }

            // fetchBills(); // Refresh the bill list.
            // toggleBillForm(); // Hide the form after save.
        } else {
            errorAlert(t('Error'), t('Please add at least one bill detail.'));
        }
    } catch (error: any) {
        console.error('Error saving bill:', error.message);
        errorAlert(t('Error'), t('An error occurred while saving the bill.'));
    }
}

function resetAllFields() {
    // Reset all fields here
    salesInvoice.value = {
        id: '',
        branch_id: '',
        sales_order_id: '',
        customer_id: '',
        prepared_by_id: '',
        sales_representative: '',
        cancelled_by_id: '',
        approved_by_id: '',
        invoice_no: '',
        document_no: '',
        date: '',
        due_date: '',
        payment_type: 'Cash',
        terms: '0',
        is_cancelled: false,
        is_approved: false,
        remarks: '',
        total: '',
    };

    salesInvoiceDetail.value = {
        sales_invoice_id: '',
        product_id: 0,
        product_name: '',
        barcode: '',
        unit: '',
        expiry_date: '',
        quantity: 0,
        price: 0,
    };
}

function resetSalesDetails() {
    salesInvoiceDetail.value = {
        sales_invoice_id: '',
        product_id: 0,
        product_name: '',
        barcode: '',
        unit: '',
        expiry_date: '',
        quantity: 0,
        price: 0,
    };
}

async function fetchCustomers() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const response = await customerService.getCustomers();
        state.customers = response.data.filter((customer: Customer) => customer.is_active); 
        console.log('Fetched customers:', state.customers); 
    } catch (error: any) {
        state.error = error;
    } finally {
        state.isTableLoading = false;
    }
}

async function fetchEmployees() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const response = await employeeService.getEmployees();
        state.employees = response.data.filter((employee: Employee) => employee.is_active); 
        console.log('Fetched employees:', state.employees); 
    } catch (error: any) {
        state.error = error;
    } finally {
        state.isTableLoading = false;
    }
}

async function fetchProducts() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const response = await productService.getProducts();
        state.products = response.data.filter((product: Product) => product.is_active); 
        console.log('Fetched employees:', state.products); 
    } catch (error: any) {
        state.error = error;
    } finally {
        state.isTableLoading = false;
    }
}

watch(
    () => salesInvoiceDetail.value.product_id,
    (newProductId) => {
        // Find the selected product based on the selected product_id
        const selectedProduct = state.products.find(product => product.id === newProductId);

        // Update the name in billDetail if the selected product exists
        if (selectedProduct) {
            salesInvoiceDetail.value.product_name = selectedProduct.name;
            salesInvoiceDetail.value.barcode = selectedProduct.barcode;
            salesInvoiceDetail.value.unit = selectedProduct.wholesale_unit;
            salesInvoiceDetail.value.expiry_date = selectedProduct.expiry_date; // Update expiry_date if the selected product exists
            stock = selectedProduct.quantity_onhand;
        } else {
            salesInvoiceDetail.value.product_name = ''; // Reset name if no product is selected
            salesInvoiceDetail.value.barcode = ''; // Reset barcode if no product is selected
            salesInvoiceDetail.value.unit = ''; // Reset unit if no product is selected
            salesInvoiceDetail.value.expiry_date = ''; // Reset expiry_date if no product is selected
        }
    }
);

function filteredQuantity(event: Event) {
    const input = event.target as HTMLInputElement;
    // Remove non-numeric characters using regular expression
    const sanitizedValue = input.value.replace(/[^0-9]/g, '');
    // Update the model with the sanitized numeric value
    salesInvoiceDetail.value.quantity = sanitizedValue ? Number(sanitizedValue) : null;
}

function filteredPrice(event: Event) {
    const input = event.target as HTMLInputElement;
    // Remove non-numeric characters using regular expression
    const sanitizedValue = input.value.replace(/[^0-9]/g, '');
    // Update the model with the sanitized numeric value
    salesInvoiceDetail.value.price = sanitizedValue ? Number(sanitizedValue) : null;
}
onMounted(() => {
    fetchCustomers();
    fetchEmployees();
    fetchProducts();
});

</script>