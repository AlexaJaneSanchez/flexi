<template>

    <Head>
        <Title>POS - {{ runtimeConfig.public.appName }}</Title>
    </Head>
    <div class="min-h-screen flex flex-col bg-gray-200">
        <header class="bg-gray-900 text-white p-4 flex justify-between items-center">
            <img class="h-8 pl-6 w-auto" src="/public/images/Logo.png" alt="" />
            <button @click="logout"
                class="bg-gray-900 hover:bg-gray-600 mt-2 text-white py-1 px-3 rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                </svg>
            </button>
        </header>

        <main class="flex-1 p-6 flex">

            <div class="flex-grow flex flex-col space-y-4">
                <div class="flex items-center space-x-4">

                    <div class="flex h-16 items-center rounded-l-md overflow-hidden">
                        <img class="h-8 w-auto" src="public/images/Barcode.png" alt="" />
                    </div>

                    <button @click="toggleDescCode"
                        class="bg-gray-900 hover:bg-gray-600 text-white py-1 px-3 rounded w-20 font-bold">
                        {{ displayText }}
                    </button>

                    <input type="text" ref="barcodeInputRef" v-model="barcodeInput" @keyup.enter="addItem"
                        class="border bg-white border-gray-400 rounded py-1 pl-3 pr-0 text-gray-700 focus:outline-none focus:border-blue-500 flex-grow"
                        :placeholder="placeholderText" />

                    <select
                        class="border bg-white border-gray-400 rounded py-1 px-20 text-gray-700 focus:outline-none focus:border-blue-500 w-48">
                    </select>
                </div>
                <div class="mt-6 flex-grow">
                    <table class="w-full bg-white border border-gray-300 rounded-md shadow-md">
                        <thead>
                            <tr class="bg-white text-black">
                                <th class="py-2 px-4 border-b text-left">Barcode</th>
                                <th class="py-2 px-4 border-b text-left">Description</th>
                                <th class="py-2 px-4 border-b text-right">Price</th>
                                <th class="py-2 px-4 border-b text-right">Quantity</th>
                                <th class="py-2 px-4 border-b text-right">Discount</th>
                                <th class="py-2 px-4 border-b text-right">Total</th>
                                <th class="py-2 px-4 border-b text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in paginatedItems" :key="item.barcode" class="bg-gray-200">
                                <td class="py-2 px-4 border-b text-left">{{ item.barcode }}</td>
                                <td class="py-2 px-4 border-b text-left">{{ item.description }}</td>
                                <td class="py-2 px-4 border-b text-right">{{ item.price }}</td>
                                <td class="py-2 px-4 border-b text-right">{{ item.quantity }}</td>
                                <td class="py-2 px-4 border-b text-right">{{ item.discount }}</td>
                                <td class="py-2 px-4 border-b text-right">{{ Number(item.price *
                                    item.quantity).toFixed(2) }}</td>
                                <td class="py-2 px-4 border-b text-right">
                                    <button @click="openQuantityForm(item.barcode, item.quantity)">Modify
                                        Quantity</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex justify-end mt-4">
                        <button @click="prevPage"
                            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                            Prev
                        </button>
                        <button @click="nextPage"
                            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <!-- Amount Details -->
            <div class="w-1/4 bg-gray-900 text-white p-4 ml-4">
                <div class="text-center py-2 rounded-t-sm">
                    <div class="bg-white text-gray-900 text-2xl font-bold text-center rounded py-6 px-4 w-full">
                        <!-- Replace with the dynamic amount of products scanned -->
                        <!-- PUT PRICE HERE -->
                        {{ formattedTotalAmount }}
                    </div>
                </div>
                <div v-if="mostRecentItem" class="mt-4">
                    <h2 class="text-lg font-bold text-center">{{ mostRecentItem.description }}</h2>
                    <ul class="list-disc">
                        <li class="mb-1 flex justify-between">
                            <span>Price:</span>
                            <span>{{ mostRecentItem.price }}</span>
                        </li>
                        <li class="mb-1 flex justify-between">
                            <span>Quantity:</span>
                            <span>{{ mostRecentItem.quantity }}</span>
                        </li>
                        <li class="mb-1 flex justify-between">
                            <span>Discount:</span>
                            <span>{{ mostRecentItem.discount }}</span>
                        </li>
                        <li class="mb-1 flex justify-between font-bold">
                            <span>Total:</span>
                            <span>{{ Number(mostRecentItem.price * mostRecentItem.quantity).toFixed(2) }}</span>
                        </li>
                    </ul>
                </div>

                <div class="mt-3">
                    <h2 class="text-lg font-bold text-center ">SALES SUB TOTALS</h2>
                    <ul class="list-disc">
                        <li class="mb-1 flex justify-between">
                            <span>Total Item/s:</span>
                            <span>{{ totalItems }}</span>
                        </li>
                        <li class="mb-1 flex justify-between">
                            <span>NET:</span>
                            <span>0.00</span>
                        </li>
                        <li class="mb-1 flex justify-between">
                            <span>Total Discount:</span>
                            <span>0.00</span>
                        </li>
                        <li class="mb-1 flex justify-between">
                            <span>VAT:</span>
                            <span>{{ formattedVat }}</span>
                        </li>
                        <li class="mb-1 flex justify-between">
                            <span>VATABLE:</span>
                            <span>{{ formattedVatable }}</span>
                        </li>
                        <li class="mb-1 flex justify-between">
                            <span>VAT EXEMPT:</span>
                            <span>0.00</span>
                        </li>
                        <li class="mb-1 flex justify-between font-bold">
                            <span>Total Amount Due:</span>
                            <span> {{ formattedTotalAmount }}</span>
                        </li>
                        <li class="mb-1 mt-10 flex justify-between">
                            <span>Cash Tendered:</span>
                            <span> {{ formattedCashTendered }}</span>
                        </li>
                        <li class="mb-1 flex justify-between font-bold">
                            <span>Change:</span>
                            <span> {{ calculateChange.toFixed(2) }}</span>
                        </li>
                        <li class="mb-1 mt-52 flex justify-between">
                            <span>CASHIER: </span>
                            <span> {{ firstname }} {{ lastname }} </span>
                        </li>
                        <li class="mb-1 flex justify-between">
                            <span>DATE: </span>
                            <span> {{ currentDateTime }}</span>
                        </li>
                        <li class="mb-1 flex justify-between">
                            <span>TIME: </span>
                            <span> {{ currentTime }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </main>

        <!-- Buttons -->
        <div class="flex flex-wrap gap-2 p-4">
            <button
                class="bg-white text-black ml-5 mr-4 font-bold py-3 px-4 w-24 h-24 rounded flex flex-col items-center">
                <span class="text-xxs">F1</span>
                <p>(help)</p>
            </button>

            <button class="bg-white font-bold mr-4 text-black py-3 px-4 w-24 h-24 rounded flex flex-col items-center">
                <span class="text-xxs">F2</span>
                <p>(discount)</p>
            </button>

            <button class="bg-white text-black mr-4 font-bold py-3 px-4 w-24 h-24 rounded flex flex-col items-center">
                <span class="text-xxs">F3</span>
            </button>

            <button @click="toggleCashForm"
                class="bg-white text-black font-bold mr-4 py-3 px-4 w-24 h-24 rounded flex flex-col items-center">
                <span class="text-xxs">CTRL<br>+<br>ENTER</span>
            </button>

            <button @click="toggleVoidForm"
                class="bg-white text-black font-bold mr-4 py-3 px-4 w-24 h-24 rounded flex flex-col items-center">
                <span class="text-xxs">CTRL<br>+SHIFT+<br>V</span>
            </button>

            <button @click=""
                class="bg-white text-black font-bold mr-4 py-3 px-4 w-24 h-24 rounded flex flex-col items-center">
                <span class="text-xxs">F6</span>
            </button>

            <button class="bg-white text-black font-bold mr-4 py-3 px-4 w-24 h-24 rounded flex flex-col items-center">
                <span class="text-xxs">F7</span>
            </button>

            <button class="bg-white text-black font-bold mr-4 py-3 px-4 w-24 h-24 rounded flex flex-col items-center">
                <span class="text-xxs">F8</span>
            </button>

            <button class="bg-white text-black font-bold mr-4 py-3 px-4 w-24 h-24 rounded flex flex-col items-center">
                <span class="text-xxs">F9</span>
            </button>

            <button class="bg-white text-black font-bold mr-4 py-3 px-4 w-24 h-24 rounded flex flex-col items-center">
                <span class="text-xxs">F10</span>
            </button>

            <button class="bg-white text-black font-bold mr-4 py-3 px-4 w-24 h-24 rounded flex flex-col items-center">
                <span class="text-xxs">F11</span>
            </button>
        </div>

        <!-- Popup Forms -->
        <!-- Cash Form -->
        <div v-if="showCashForm" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <form @submit.prevent="savePayment()">
                    <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                        <!-- Fields -->
                        <div class="mb-1">
                            <FormLabel for="cashtendered" label="Cash Tendered" class="mr-3" />
                            <FormNumberField id="cashtendered" name="cashtendered" v-model="payment.cash_tendered"
                                placeholder="Cash Tendered" required />
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex justify-end gap-2 mt-4">
                            <FormButton type="submit" buttonStyle="success" class="w-full">
                                Save
                            </FormButton>
                            <FormButton @click="toggleCashForm" buttonStyle="xxx" class="w-full">
                                Cancel
                            </FormButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- Void Item Form -->
        <div v-if="showVoidForm" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <form @submit.prevent="removeItem(voidItem.barcode)">
                    <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                        <!-- Fields -->
                        <div class="mb-1">
                            <FormLabel for="voiditem" label="Enter barcode" class="mr-3" />
                            <FormTextField id="voiditem" name="voiditem" v-model="voidItem.barcode"
                                placeholder="Enter item barcode" required />
                        </div>
                        <div class="mb-1">
                            <FormLabel for="supervisorcode" label="Security" class="mr-3" />
                            <FormTextField id="supervisorcode" name="supervisorcode" v-model="voidItem.supervisor_code"
                                placeholder="Enter void code" required />
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex justify-end gap-2 mt-4">
                            <FormButton type="submit" buttonStyle="success" class="w-full">
                                Save
                            </FormButton>
                            <FormButton @click="toggleVoidForm" buttonStyle="xxx" class="w-full">
                                Cancel
                            </FormButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- Modify Quantity Form -->
        <div v-if="showQuantityForm" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <form @submit.prevent="setQuantity(barcodeInput, Number(setQuantityTo.quantity))">
                    <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                        <!-- Fields -->
                        <div class="mb-1">
                            <FormLabel for="addqty" label="Enter Quantity" class="mr-3" />
                            <FormTextField id="addqty" name="addqty" v-model="setQuantityTo.quantity"
                                placeholder="Enter item quantity" required />
                        </div>
                        <!-- Action Buttons -->
                        <div class="flex justify-end gap-2 mt-4">
                            <FormButton type="submit" buttonStyle="success" class="w-full">SET</FormButton>
                            <button type="button" @click="closeQuantityForm"
                                class="w-full bg-red-500 text-white">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- Add Discount Form -->
        <div v-if="showDiscountForm" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <form @submit.prevent="">
                    <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                        <!-- Fields -->
                        <div class="mb-1">
                            <FormLabel for="discount" label="Senior ID Number:" class="mr-3" />
                            <FormTextField id="discount" name="discount" v-model="setQuantityTo.quantity"
                                placeholder="Senior ID Number" required />
                        </div>
                        <!-- Action Buttons -->
                        <div class="flex justify-end gap-2 mt-4">
                            <FormButton type="submit" buttonStyle="success" class="w-full">SET</FormButton>
                            <button type="button" @click="closeDiscountForm"
                                class="w-full bg-red-500 text-white">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
//import area
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { productService } from '~/components/api/admin/ProductService.js';
import { paymentService } from '~/components/api/admin/PaymentService.js';
import { paymentDetailService } from '~/components/api/admin/PaymentDetailService.js';
import { salesInvoiceService } from '~/components/api/admin/SalesInvoiceService';
import { salesInvoiceDetailService } from '~/components/api/admin/SalesInvoiceDetailService';


// Alert and i18n setup
const { successAlert } = useAlert();
const { errorAlert } = useAlert();
const { t } = useI18n()

// interface area
interface Item {
    id: number;
    barcode: string;
    description: string;
    price: number;
    quantity: number;
    discount: number;
    total: number;
    expiry_date: string;
    wholesale_unit: string;
}

interface Product {
    id: number;
    barcode: string;
    name: string;
    discount: number;
    markup: number;
    current_price: number;
    expiry_date: string;
    wholesale_unit: string;
}

// const area
const runtimeConfig = useRuntimeConfig();
const user_id = computed(() => localStorage.getItem('user_id'));
const firstname = computed(() => localStorage.getItem('firstname'));
const lastname = computed(() => localStorage.getItem('lastname'));
const displayText = ref('CODE');
const placeholderText = ref('Enter Barcode');
const currentTime = ref('');
const currentDateTime = ref('');
const barcodeInput = ref('');
const vatRate = 0.12; // Example VAT rate
const barcodeInputRef = ref<HTMLInputElement | null>(null);
const itemsPerPage = 16;
const setQuantityTo = ref({ quantity: '' });
const currentPage = ref(1);
const items = ref<Item[]>([]);
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.value.slice(start, end);
});

const state = reactive({
    error: null as Error | null,
    isTableLoading: false,
    products: [] as Product[],
});

// computed property to calculate total amount
const totalAmount = computed(() => {
    return items.value.reduce((total, item) => total + item.total, 0);
});

const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + Number(item.quantity), 0);
});

const calculateVat = computed(() => {
    const amountExcludingVat = totalAmount.value / (1 + vatRate);
    const vatAmount = amountExcludingVat * vatRate;
    return vatAmount; // Return as a number
});

const calculateVatable = computed(() => {
    return totalAmount.value - calculateVat.value;
});

const calculateNet = computed(() => {
    return (totalAmount.value / (1 + vatRate));
});

const calculateTotalDiscount = computed(() => {
    // let discountPercentage = 0.20; // 20% discount
    // let totalAmount = formattedTotalAmount.value;
    // let discountAmount = Number(totalAmount) * discountPercentage; // Calculate discount amount
    // return Number(totalAmount) - discountAmount; // Subtract discount amount from total
    return 0;
});

const getCashTendered = computed(() => {
    return payment.value.cash_tendered;
});

const calculateChange = computed(() => {
    return Number(formattedCashTendered.value) - Number(formattedTotalAmount.value);
});

const calculateTotalItems = computed(() => {
    return totalItems.value;
});

const formattedVat = computed(() => {
    return calculateVat.value.toFixed(2);
});

const formattedVatable = computed(() => {
    return calculateVatable.value.toFixed(2);
});

const formattedTotalDiscount = computed(() => {
    return calculateTotalDiscount.value.toFixed(2);
});

const formattedTotalAmount = computed(() => {
    return totalAmount.value.toFixed(2);
});

const formattedCashTendered = computed(() => {
    return Number(getCashTendered.value).toFixed(2);
});

// async functions area
async function fetchProducts() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const response = await productService.getProducts();
        state.products = response.data; // Adjust if necessary based on API response structure
        console.log('Fetched products:', response.data); // Log fetched products
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}

// form functions area
const showCashForm = ref(false);
const showVoidForm = ref(false);
const showQuantityForm = ref(false);
const showDiscountForm = ref(false);

function toggleCashForm() {
    showCashForm.value = !showCashForm.value;
    // Reset fields form when toggling
}

function toggleVoidForm() {
    showVoidForm.value = !showVoidForm.value;
    // Reset fields form when toggling
}

function toggleDiscountForm() {
    showDiscountForm.value = !showDiscountForm.value;
    // Reset fields form when toggling
}

function closeDiscountForm() {
    showDiscountForm.value = false;
}

function openQuantityForm(barcode: any, quantity: any) {
    showQuantityForm.value = true;
    barcodeInput.value = barcode; // Set the barcode for the form
    setQuantityTo.value.quantity = quantity; // Optional: pre-fill the quantity if desired
}

function closeQuantityForm() {
    showQuantityForm.value = false;
    setQuantityTo.value.quantity = ''; // Reset quantity field
}

function setQuantity(barcode: string, quantity: number) {
    const item = items.value.find(item => item.barcode === barcode);

    if (item) {
        item.quantity = quantity;
        item.total = item.price * item.quantity; // Ensure the total is recalculated
        closeQuantityForm(); // Close the form after setting the quantity
    } else {
        errorAlert(`${t('alert.Error')}!`, `Item with barcode ${barcode} not found.`);
    }
}

const payment = ref({
    customer_id: 1,
    cash_tendered: '',
    cancelled_by_id: null, // Changed to null for clarity
    is_approved: true,
    is_cancelled: false,
    remarks: 'POS payment',
});

const voidItem = ref({
    barcode: '',
    supervisor_code: '',
});

// functions area

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

function nextPage() {
    if (currentPage.value * itemsPerPage < items.value.length) {
        currentPage.value++;
    }
}

// computed property for the most recent item
const mostRecentItem = computed(() => {
    // Return the last item in the items array if it exists
    return items.value.length > 0 ? items.value[items.value.length - 1] : null;
});

function addItem() {
    // Check if the barcode input is valid
    if (barcodeInput.value.trim() !== '') {
        // Find the product with the matching barcode
        let quantity = 1; // Default quantity
        let discount = 0; // Default discount
        const product = state.products.find(product => product.barcode === barcodeInput.value);
        console.log(product?.barcode); // Log the product's barcode

        // Check if product is found before proceeding
        if (product) {
            let currentprice = product.current_price; // Get the current price
            let markup = product.markup; // Assuming markup is a percentage
            let markupamount = Number(currentprice) * (Number(markup) / 100); // Calculate the markup amount
            let thisprice = Number(currentprice) + Number(markupamount); // Calculate the total price including markup
            let expiry = product.expiry_date;
            let productunit = product.wholesale_unit;

            console.log("Markup: " + markup);
            console.log("Current Price: " + currentprice);
            console.log("Markup Amount: " + markupamount);
            console.log("Price fetched: " + thisprice);
            console.log("Expiry Date: " + expiry);
            console.log("Unit: " + productunit);

            // Check if the item already exists in the items array
            const existingItemIndex = items.value.findIndex(item => item.barcode === product.barcode);
            if (existingItemIndex !== -1) {
                // If it exists, update the quantity and total
                const existingItem = items.value[existingItemIndex];
                existingItem.description = product.name; // Update the description
                existingItem.discount; // Keep existing discount
                existingItem.quantity++; // Increment the quantity

                // Update total based on the updated quantity
                existingItem.total = thisprice * existingItem.quantity; // Update total correctly using thisprice
                // Move the updated item to the end of the array to reflect it as the most recent item
                items.value.splice(existingItemIndex, 1);
                items.value.push(existingItem);
            } else {
                // Push a new item with the correct total
                items.value.push({
                    id: product.id,
                    barcode: product.barcode,
                    description: product.name,
                    price: thisprice, // Use the price calculated with markup
                    quantity: quantity,
                    discount: discount,
                    total: thisprice * quantity, // Calculate total using thisprice
                    expiry_date: expiry,
                    wholesale_unit: productunit,
                });
            }
        } else {
            // Alert if the product does not exist
            alert(`Product with barcode ${barcodeInput.value} does not exist.`);
        }

        // Clear the barcode input for the next scan
        barcodeInput.value = '';
    }
}


let OfficialReceiptNumber = '';

async function savePayment() {
    if (Number(payment.value.cash_tendered) >= totalAmount.value) {
        try {
            const formatDateTime = (date: Date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            };

            const salesInvoiceData = {
                branch_id: '',
                sales_order_id: '',
                customer_id: payment.value.customer_id,
                prepared_by_id: user_id.value,
                sales_representative: user_id.value,
                cancelled_by_id: '',
                approved_by_id: payment.value.is_approved || false,
                invoice_no: '',
                date: formatDateTime(new Date()),
                due_date: formatDateTime(new Date()),
                payment_type: 'cash',
                terms: 0,
                is_cancelled: payment.value.is_cancelled || false,
                is_approved: payment.value.is_approved || false,
                remarks: payment.value.remarks,
                amount: formattedTotalAmount.value
            }
            // Update the amount in salesInvoiceData with the calculated total amount
            salesInvoiceData.amount = formattedTotalAmount.value;
            // Create new bill.
            const response = await salesInvoiceService.createSalesInvoice(salesInvoiceData);
            console.log("Hello", response);
            salesInvoiceData.invoice_no = response.data.invoice_no;
            console.log("The Data of Sales Invoice Number is: ", salesInvoiceData.invoice_no);
            if (response && response.data.id) {
                successAlert('Success', 'Sales Invoice has been added! The value of the ID is: ' + response.data.id);
                successAlert('Success', 'Sales Invoice has been added! The value of the Document Reference Number is: ' + response.data.document_no);
                // Save bill details
                for (const detail of items.value) {
                    const salesInvoiceDetailList = {
                        bill_id: response.data.id, // Use the correct response ID
                        sales_invoice_id: response.data.id,
                        sales_invoice_ref_doc_no: response.data.document_no,
                        product_id: detail.id, // Allow null
                        barcode: detail.barcode,
                        unit: detail.wholesale_unit,
                        expiry_date: detail.expiry_date,
                        quantity: detail.quantity, // Allow null
                        price: detail.price, // Allow null
                    };

                    console.log('Saving bill detail:', salesInvoiceDetailList); // Log the detail being saved
                    const result = await salesInvoiceDetailService.createSalesInvoiceDetail(salesInvoiceDetailList);

                    if (result) {
                        console.log('Bill detail saved successfully:', result);
                    } else {
                        console.error('Failed to save bill detail:', salesInvoiceDetailList);
                    }
                }
                successAlert(t('alert.bill_created'), t('alert.success'));
            } else {
                errorAlert(t('Error'), t('Failed to create bill.'));
            }

            if (items.value.length > 0) {
                console.log('Payment before save:', items.value);
                const itemData = {
                    prepared_by_id: user_id.value,
                    customer_id: payment.value.customer_id,
                    approvedby: user_id.value,
                    cancelled_by_id: payment.value.cancelled_by_id,
                    is_approved: payment.value.is_approved || false,
                    is_cancelled: payment.value.is_cancelled || false,
                    payment_date: formatDateTime(new Date()),
                    remarks: payment.value.remarks,
                };

                // Create new payment.
                const responsetwo = await paymentService.createPayment(itemData);
                if (responsetwo && responsetwo.data.id) {
                    alert('Payment has been added! The value of the ID is: ' + response.data.id);
                    console.log(responsetwo);
                    console.log(responsetwo.data.or_number);
                    // Save payment details
                    const paymentDetail = {
                        payment_id: responsetwo.data.id,
                        sales_invoice_id: responsetwo.data.id,
                        sales_invoice_no: salesInvoiceData.invoice_no,
                        amount: formattedTotalAmount.value, // Assuming each item has a total

                    };
                    OfficialReceiptNumber = responsetwo.data.or_number;

                    console.log('Saving payment detail:', paymentDetail); // Log the detail being saved
                    const result = await paymentDetailService.createPaymentDetail(paymentDetail);

                    if (result) {
                        console.log('Payment detail saved successfully:', result);
                    } else {
                        console.error('Failed to save payment detail:', paymentDetail);
                    }
                    printItems();
                    successAlert(t('alert.payment_created'), t('alert.success'));
                    // Reset the payment and item arrays
                    payment.value = {
                        customer_id: 1,
                        cash_tendered: '',
                        cancelled_by_id: null,
                        is_approved: true,
                        is_cancelled: false,
                        remarks: 'POS payment',
                    };
                    items.value = [];
                    barcodeInput.value = '';
                    currentPage.value = 1;
                    showCashForm.value = false;
                } else {
                    errorAlert(t('Error'), t('Failed to create payment.'));
                }
            } else {
                errorAlert(t('Error'), t('Please add at least one payment detail.'));
            }
        } catch (error: any) {
            console.error('Error saving payment:', error.message);
            errorAlert(t('Error'), t('An error occurred while saving the payment.'));
        }
    } else {
        alert('Payment amount should be equal to or greater than total amount.');
        console.log(payment.value.cash_tendered);
    }
}


function printItems() {
    updateDateTime();
    const printWindow = window.open('', 'Print Receipt', 'width=800,height=600');
    if (printWindow) {
        let html = '';
        html += '<!DOCTYPE html><html><head><title>Receipt</title></head><body>';
        html += '<style>';
        html += 'body { font-family: Arial, sans-serif; font-size: small; }';
        html += '.receipt-header { text-align: left; margin-bottom: 20px; }';
        html += '.receipt-title { text-align: center; font-size: xs; margin-top: 15px; padding-top: 15px;}';
        html += '.receipt-address { text-align: center; font-size: small; margin-top: 0; padding-top: 0;}';
        html += '.receipt-vatregTIN { text-align: center; font-size: small; margin-top: 0; padding-top: 0;}';
        html += '.receipt-item { padding: 5px 0; border-bottom: 1px dashed #000; }';
        html += '.receipt-total { font-weight: bold; border-top: 1px dashed #000; border-bottom: 1px dashed #000; }';
        html += '.receipt-table { width: 100%; margin: 10px 0; }';
        html += '.receipt-table th, .receipt-table td { padding: 5px; }';
        html += '.receipt-table th { border-top: 1px dashed #000; text-align: left; }';
        html += '.receipt-table td.right-align { text-align: right; }';
        html += '.receipt-footer { text-align: center; margin-top: 50px; border: none; }';
        html += '.no-margin { margin: 0; }';
        html += '.margin-left { margin-left: 10px; }';
        html += '.cashier-margin { margin-top: 40px; }';
        html += '.buyer-details { margin-top: 30px; }';
        html += '</style>';

        html += '<div class="receipt-header">';
        html += '<h2 class="receipt-title">FlexiPOS</h2>';
        html += '<h1 class="receipt-address">JP LAUREL AVENUE BAJADA 13-B POBLACION</h1>';
        html += '<h1 class="receipt-vatregTIN">TIN: 234-634-259-00161</h1>';
        html += '<h4 class="margin-left cashier-margin">CASHIER: ' + lastname.value + '</h4>';
        html += '<div style="display: flex; justify-content: space-between; align-items: center;">';
        html += '<h4 class="no-margin margin-left">Date: ' + currentDateTime.value + '</h4>';
        html += '<h4 style="text-align: center; flex-grow: 1; margin: 0;">Time: ' + currentTime.value + '</h4>';
        html += '</div>';
        html += '<h4 class="margin-left or-number">OR Number: </br>' + OfficialReceiptNumber + '</h4>';
        html += '</div>';

        html += '<div class="receipt-body">';

        // Add the table header
        html += '<table class="receipt-table">';
        html += '<tr>';
        html += '<th>Qty</th>';
        html += '<th>Description</th>';
        html += '<th>Price</th>';
        html += '<th>Amount</th>';
        html += '</tr>';

        // Add each item in the list
        items.value.forEach((item) => {
            html += '<tr class="receipt-item">';
            html += `<td colspan="4">${item.barcode}</td>`;
            html += '</tr>';
            html += '<tr>';
            html += `<td>${item.quantity}</td>`;
            html += `<td>${item.description}</td>`;
            html += `<td class="right-align">${item.price}</td>`; // Right-align the price
            html += `<td class="right-align">${(item.quantity * item.price)}</td>`; // Right-align the amount
            html += '</tr>';
        });

        html += '</table>'; // Close the table

        const subtotal = items.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // Add the subtotal and total
        html += '<div class="receipt-total">';
        html += `<h4>DISCOUNT  <span style="float:right;">${formattedTotalDiscount.value}</span></h4>`;
        html += `<h4>VAT  <span style="float:right;">${formattedVat.value}</span></h4>`;
        html += `<h4>VATABLE  <span style="float:right;">${formattedVatable.value}</span></h4>`;
        html += `<h4>SUB-TOTAL  <span style="float:right;">${subtotal.toFixed(2)}</span></h4>`; // Right-align subtotal
        html += `<h4>CASH<span style="float:right;">${formattedCashTendered.value}</span></h4>`; // Right-align cash
        html += '</div>'; // Close receipt-total

        html += '<div style="text-align: center;">'; // Centering the Change text
        html += `<h4>Change: ${calculateChange.value.toFixed(2)}</h4>`;
        html += '</div>'; // Close the centered div

        // Add total number of items
        html += '<div style="margin-top: 15px; text-align: left; display: block;">';
        html += '<h4 class="no-margin margin-left">TOTAL NO OF ITEMS: ' + { calculateTotalItems }
            + '</h4>';
        html += '</div>';

        // Add Buyer details
        html += '<div class="buyer-details">';
        html += '<h4 class="no-margin margin-left">BUYER NAME: ' + '</h4>';
        html += '<h4 class="no-margin margin-left">BUYER ADDRESS: ' + '</h4>';
        html += '<h4 class="no-margin margin-left">BUYER TIN: ' + '</h4>';
        html += '<h4 class="no-margin margin-left">BUSINESS STYLE: ' + '</h4>';
        html += '</div>';

        // Receipt footer
        html += '<div class="receipt-footer">';
        html += '<h4>Thank you for shopping with us!</h4>';
        html += '</div>';

        html += '</body></html>'; // Close all tags

        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
}


// Function to remove item based on barcode
function removeItem(barcode: string) {
    const supervisorCode = "123";
    const index = items.value.findIndex(item => item.barcode === barcode);

    // Explicitly check for -1 to determine if the item was found
    if (index !== -1 && voidItem.value.supervisor_code === supervisorCode) {
        items.value.splice(index, 1);
        successAlert(`${t('alert.Success')}!`, `item with barcode ${barcode} removed successfully!`);
    } else {
        if (index === -1) {
            errorAlert(`${t('alert.Error')}!`, `Item with barcode ${barcode} not found.`);
        } else {
            errorAlert(`${t('alert.Error')}!`, `Item with barcode ${barcode} cannot be removed. Please check your supervisor code.`);
        }
    }
}

function handleCashPaymentEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault(); // Prevent the default refresh action
        toggleCashForm();
    }
}

function handlePrintEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault(); // Prevent the default refresh action
        printItems();
    }
}

function handleDiscountEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === '2') {
        event.preventDefault(); // Prevent the default refresh action
        toggleDiscountForm();
    }
}

// for multiple event keys for instance: CTRL + E + Q
// USE THIS FOR MUTIPLE EVENT KEYS FOR INSTANCE: CTRL + E + Q
let keysPressed: { [key: string]: boolean } = {};

// Function to handle void item event
function handleVoidItemEvent(event: KeyboardEvent) {
    keysPressed[event.key] = true;
    console.log('Key pressed:', event.key, keysPressed);
    if (keysPressed['Control'] && keysPressed['Shift'] && keysPressed['V']) {
        event.preventDefault(); // Prevent default action
        toggleVoidForm(); // Call the function to toggle the void form
    }
}

// Event listener for keyup events to reset keysPressed object
function handleKeyUp(event: KeyboardEvent) {
    delete keysPressed[event.key];
    console.log('Key released:', event.key, keysPressed);
}


function toggleDescCode() {
    if (displayText.value === 'CODE') {
        displayText.value = 'DESC';
        placeholderText.value = 'Enter Item';
    } else {
        displayText.value = 'CODE';
        placeholderText.value = 'Enter Barcode';
    }
}

function handleCtrlS(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        toggleDescCode();
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleCtrlS);
    window.addEventListener('keydown', handlePrintEvent);
    window.addEventListener('keydown', handleCashPaymentEvent);
    window.addEventListener('keydown', handleVoidItemEvent);
    window.addEventListener('keydown', handleDiscountEvent);
    window.addEventListener('keyup', handleKeyUp);
    setInterval(updateDateTime, 1000);
    setInterval(updateTimeOnly, 1000);
    barcodeInputRef.value?.focus();
    fetchProducts();
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleCtrlS);
    window.removeEventListener('keydown', handlePrintEvent);
    window.removeEventListener('keydown', handleCashPaymentEvent);
    window.removeEventListener('keydown', handleVoidItemEvent);
    window.removeEventListener('keydown', handleDiscountEvent);
    window.removeEventListener('keyup', handleKeyUp);
});

function logout() {
    console.log('User logged out');
    const router = useRouter();
    router.push('/admin/dashboard');
}

function updateDateTime() {
    const currentTimeValue = new Date();
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentTimeValue.getDay()];
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][currentTimeValue.getMonth()];
    const day = currentTimeValue.getDate();
    const year = currentTimeValue.getFullYear();
    let hours = currentTimeValue.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = currentTimeValue.getMinutes().toString().padStart(2, '0');
    const seconds = currentTimeValue.getSeconds().toString().padStart(2, '0');
    const dateTimeString = `${dayOfWeek}, ${month} ${day}, ${year}`;
    currentDateTime.value = dateTimeString;
}

function updateTimeOnly() {
    const currentTimeValue = new Date();
    let hours = currentTimeValue.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = currentTimeValue.getMinutes().toString().padStart(2, '0');
    const seconds = currentTimeValue.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    currentTime.value = timeString;
}
</script>