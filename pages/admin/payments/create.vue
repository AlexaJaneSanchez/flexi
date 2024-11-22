<template>
    <div>
        <NuxtLayout name="admin">
            <main class="w-full mx-auto">

                <Head>
                    <Title>Bills Payment - {{ runtimeConfig.public.appName }}</Title>
                </Head>
                <div>
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center mt-20" aria-hidden="true">
                            <div class="w-full border-t border-gray-300 " />
                        </div>
                        <div class="text-center">
                            <h2 class="bg-white text-lg font-bold mb-20 text-gray-900 ">BILLS PAYMENT</h2>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="flex items-center space-x-4 mt-8">
                            <div class="w-1/2 mt-5">
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-3">Supplier</label>
                                <FormSelect id="supplier_id" v-model="state.selectedSupplierId"
                                    :options="state.suppliers.map(s => ({ value: s.id, label: s.name }))"
                                    placeholder="Select Supplier" required />
                            </div>
                            <div class="w-1/2">
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-4 mt-4">isCancelled</label>
                                <FormSelect v-model="payment.is_cancelled" :options="[
                                    { value: false, label: 'No' },
                                    { value: true, label: 'Yes' },
                                ]">
                                </FormSelect>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4 mt-8">
                            <div class="w-1/4">
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-3">Payment Type</label>
                                <FormSelect v-model="payment.payment_type" :options="[
                                    { value: 'cash', label: 'Cash' },
                                    { value: 'cheque', label: 'Cheque' },
                                ]">
                                </FormSelect>
                            </div>
                            <div class="w-1/4">
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-3">Cash Voucher Number</label>
                                <FormTextField id="cashvoucher" name="cashvoucher" v-model="makepayment.cash_voucher_no"
                                    placeholder="Voucher Number" />
                            </div>
                            <div class="w-1/4">
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-3">Date</label>
                                <input id="date" type="date" v-model="makepayment.date"
                                    class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-sm px-3 py-2"
                                    required />
                            </div>
                            <div class="w-1/4">
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-3">Prepared by</label>
                                <FormNumberField for="prepared_by_id" name="prepared_by_id"
                                    :placeholder="`${firstname} ${lastname}`" :value="`${firstname} ${lastname}`"
                                    readonly class="block cursor-default bg-gray-200" />
                            </div>
                        </div>
                        <div v-if="state.selectedSupplierId" class="relative">
                            <div class="absolute inset-0 flex items-center mt-20" aria-hidden="true">
                            <div class="w-full border-t border-gray-300 " />
                        </div>
                        <div class="text-center">
                            <h2 class="bg-white text-lg font-bold mt-20 mb-12">BILLS DETAILS</h2>
                        </div>
                        </div>
                        <div v-if="state.selectedSupplierId" class="flex mt-8">
                            <div class="w-full">
                                <div class="relative">
                                    <div class="relative flex">
                                        <h2 class="bg-white text-lg font-semibold mt-10 ml-8 ">Unpaid Bills</h2>
                                    </div>
                                </div>
                                <!-- Payment Table -->
                                <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                                <div class="table-responsive">
                                    <Table :columnHeaders="state.unpaidBillColumnHeader" :data="state.unpaidBills"
                                        :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">
                                        <template #body v-if="!state.isTableLoading && state.unpaidBills?.data.length">
                                            <tr v-for="(bill, index) in state.unpaidBills?.data" :key="index">
                                                <td class="pl-3">
                                                    {{ bill.id }}
                                                </td>
                                                <td class="pl-3">
                                                    {{ bill.purchase_order_no }}
                                                </td>
                                                <td class="pl-3">
                                                    {{ bill.bill_date }}
                                                </td>
                                                <td class="pl-3">
                                                    {{ bill.amount }}
                                                </td>
                                                <td class="pl-3">
                                                    <FormButton button-style="warning" @click="selectBill(bill)">Select
                                                    </FormButton>
                                                </td>
                                            </tr>
                                        </template>
                                    </Table>
                                </div>
                                <!-- <Pagination :data="state.categories" @previous="previous" @next="next" /> -->
                            </div>
                        </div>
                        <div v-if="state.selectedSupplierId" class="flex space-x-4 mt-8">
                            <div class="w-1/2 mt-10 ml-2">
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-3">Bill ID</label>
                                <FormNumberField id="billid" name="Bill ID" v-model="selectedbillinput.bill_id"placeholder="Bill ID" @input="filteredBill"/>
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Purchase Order Number</label>
                                <FormTextField id="ponumber" name="ponumber"
                                    v-model="selectedbillinput.purchase_order_no" placeholder="Purchase Order Number" readonly/>
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Date</label>
                                <FormTextField id="date" name="date" v-model="selectedbillinput.bill_date"
                                    placeholder="Date" readonly/>
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Amount</label>
                                <FormTextField id="amount" name="amount" v-model="selectedbillinput.amount"
                                    placeholder="Amount" readonly/>
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Payment Amount</label>
                                <FormTextField id="paymentamount" name="paymentamount" v-model="selectedbillinput.amount_to_pay" placeholder="Payment Amount"  @input="filteredPaymentAmount" @keypress="restrictPaymentNumbers" />
                                    <FormButton class="mt-5 w-full" button-style="success" @click="addBillsPaymentDetail">
                                    Add Bills Payment Detail
                                </FormButton>
                            </div>
                            <div class="w-1/2 mt-11 ">
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-2"
                                 v-if="payment.payment_type === 'cheque'">Cheque Amount</label>
                                <FormNumberField class="mb-5" v-if="payment.payment_type === 'cheque'"
                                    v-model="formattedChequeAmount" name="chequeamount" placeholder="Cheque Amount"
                                    readonly />
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-2"
                                 v-if="payment.payment_type === 'gcash'">Gcash Amount</label>
                                <FormNumberField class="mb-5" v-if="payment.payment_type === 'gcash'"
                                    v-model="payment.gcash" name="gcashamount" placeholder="Gcash Amount"
                                     />
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-3"
                                     v-if="payment.payment_type === 'gcash'">Gcash Reference Number </label>
                                <FormNumberField class="mb-5" v-if="payment.payment_type === 'gcash'"
                                    v-model="payment.gcashreference" name="gcashreference" placeholder="Gcash Reference Number"
                                     />
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-2" >Cash Amount</label>
                                <FormNumberField v-model="payment.cash" type="text" name="cashamount" placeholder="Cash Amount" @input="sanitizeCashInput" @keypress="restrictToNumbers" />
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Total Amount</label>
                                <FormNumberField v-model="formattedPaymentAmount" name="totalamount"
                                    placeholder="Total Amount" readonly />
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Amount to Pay</label>
                                <FormNumberField v-model="formattedTotalAmountToPay" name="totalamount"
                                    placeholder="Amount to Pay" readonly />
                                <FormButton v-if="payment.payment_type === 'cheque'" button-style="xxx" class="mt-8 bg-gray-900 text-white"
                                    @click="toggleForm">Add Cheque
                                </FormButton>
                            </div>
                        </div>
                        <div class="flex space-x-4 mt-8">
                            <div v-if="state.selectedSupplierId" class="w-full">
                                <div v-if="state.selectedSupplierId" class="relative">
                            <div class="absolute inset-0 flex items-center mt-10" aria-hidden="true">
                            <div class="w-full border-t border-gray-300 " />
                        </div>
                        <div class="text-center">
                            <h2 class="bg-white text-lg font-bold mt-10 mb-10">CHEQUE DETAILS</h2>
                        </div>
                        </div>
                                <!-- Product table -->
                                <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                                <div class="table-responsive">
                                    <Table :columnHeaders="state.chequeDetailColumnHeader" :data="state.cheques"
                                        :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">
                                        <template #body v-if="!state.isTableLoading && state.cheques?.data.length">
                                            <tr v-for="(cheque, index) in state.cheques?.data" :key="index">
                                                <td class="pl-3">
                                                    {{ cheque.voucher_number }}
                                                </td>
                                                <td class="pl-3">
                                                    {{ cheque.payee }}
                                                </td>
                                                <td class="pl-3">
                                                    {{ cheque.bank }}
                                                </td>
                                                <td class="pl-3">
                                                    {{ cheque.cheque_number }}
                                                </td>
                                                <td class="pl-3">
                                                    {{ cheque.cheque_date }}
                                                </td>
                                                <td class="pl-3">
                                                    {{ cheque.amount }}
                                                </td>
                                            </tr>
                                        </template>
                                    </Table>
                                </div>
                                <!-- <Pagination :data="state.categories" @previous="previous" @next="next" /> -->
                            </div>
                            <div class="w-full">
                                <div class="relative">
                                    <div class="absolute inset-0 flex items-center mt-10" aria-hidden="true">
                                        <div class="w-full border-t border-gray-300 "/>
                                        </div>
                                        <div class="text-center">
                            <h2 class="bg-white text-lg font-bold mt-10 mb-10">SELECTED BILLS</h2>
                        </div>
                                </div>
                                <!-- Product table -->
                                <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                                <div class="table-responsive">
                                    <Table :columnHeaders="state.selectedBillColumnHeader" :data="state.selectedBills"
                                        :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">
                                        <template #body
                                            v-if="!state.isTableLoading && state.selectedBills?.data.length">
                                            <tr v-for="(bill, index) in state.selectedBills?.data" :key="index">
                                                <td class="pl-3">
                                                    {{ bill.id }}
                                                </td>
                                                <td class="pl-3">
                                                    {{ bill.purchase_order_no }}
                                                </td>
                                                <td class="pl-3">
                                                    {{ bill.bill_date }}
                                                </td>
                                                <td class="pl-3">
                                                    {{ bill.amount }}
                                                </td>
                                                <td class="pl-3">
                                                    {{ bill.paymentamount }}
                                                </td>
                                            </tr>
                                        </template>
                                    </Table>
                                </div>
                                <!-- <Pagination :data="state.categories" @previous="previous" @next="next" /> -->
                            </div>
                        </div>
                        <div v-if="state.selectedSupplierId" class="flex space-x-4 mt-8">

                        </div>
                        <div v-if="isPaymentAmountValid" class="flex space-x-4 mt-8">
                            <div class="w-full">
                                <FormButton class="w-full" button-style="success" @click="makePayment">Make Payment
                                </FormButton>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Category Form -->
                <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <form @submit.prevent="addCheque()">
                            <div class="text-center mb-5">
                                <h2 class="text-xl font-semibold text-gray-800">Cheque Details</h2>
                            </div>
                            <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                                <!-- Category Name Field -->
                                <div class="mb-2">
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-2" >Voucher Number</label>
                                    <FormTextField id="vouchernum" name="vouchernum"
                                        v-model="chequeDetail.voucher_number" placeholder="Voucher Number" required />
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-2 mt-2" >Payee</label>
                                    <FormTextField id="payee" name="payee" v-model=chequeDetail.payee
                                        placeholder="Payee" @input="filteredPayee" />
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-2 mt-2" >Bank</label>
                                    <FormTextField id="bank" name="bank" v-model="chequeDetail.bank" placeholder="Bank"
                                        required @input="filteredBank"/>
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-2 mt-2" >Cheque Number</label>
                                    <FormTextField id="chequenumber" name="chequenumber"
                                        v-model="chequeDetail.cheque_number"  @input="sanitizeChequeNumber"  placeholder="Cheque Number" required />
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-2 mt-2" >Cheque Date</label>
                                    <FormTextField type="date" id="chequedate" name="chequedate"
                                        v-model="chequeDetail.cheque_date" placeholder="Cheque Date" required />
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-2 mt-2" >Amount</label>
                                    <FormTextField class="mt-2" id="amount" name="amount" v-model="chequeDetail.amount"
                                        placeholder="Amount" required />
                                </div>
                                <!-- Action Buttons -->
                                <div class="flex justify-end gap-2 mt-4">
                                    <FormButton type="submit" buttonStyle="success" class="w-full">
                                        Save
                                    </FormButton>
                                    <FormButton @click="toggleForm()" buttonStyle="xxx" class="w-full">
                                        Cancel
                                    </FormButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import type { Error } from '@/types/error';
import { supplierService } from '~/components/api/admin/SupplierService';
import { billService } from '~/components/api/admin/BillService';
import { billPaymentService } from '~/components/api/admin/BillPaymentService';
import { billPaymentDetailService } from '~/components/api/admin/BillPaymentDetailService';
import { billPaymentChequeService } from '~/components/api/admin/BillPaymentChequeService';
import { useI18n } from 'vue-i18n';

// Alert and i18n setup
const { successAlert } = useAlert();
const { errorAlert } = useAlert();
const { warningAlert } = useAlert();
const { t } = useI18n()

const user_id = computed(() => localStorage.getItem('user_id'));
const firstname = computed(() => localStorage.getItem('firstname'));
const lastname = computed(() => localStorage.getItem('lastname'));
const runtimeConfig = useRuntimeConfig();

let currentTablePage = 1;

interface UnpaidBill {
    data: any[];
}

interface SelectedBill {
    data: any[];
}

interface Cheques {
    data: any[];
}

interface SortData {
    sortField: string;
    sortOrder: "ascend" | "descend" | null;
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
    fetchBills();
}

// Computed property to check if payment amount is valid
const isPaymentAmountValid = computed(() => {
    return paymentAmountNumber.value > 0;
});

const totalChequeAmount = computed(() => {
    return state.cheques?.data.reduce((total, cheque) => total + Number(cheque.amount), 0);
});

const formattedChequeAmount = computed(() => {
    return totalChequeAmount.value.toFixed(2);
});

const totalAmountToPay = computed(() => {
    return state.selectedBills?.data.reduce((total, bill) => total + Number(bill.paymentamount), 0);
});

const formattedTotalAmountToPay = computed(() => {
    return totalAmountToPay.value.toFixed(2);
});

const formattedPaymentAmount = computed({
    get() {
        return paymentAmountNumber.value.toString();
    },
    set(value) {
        paymentAmountNumber.value = Number(value);
    }
});

const paymentAmountNumber = computed({
    get() {
        return Number(payment.gcash) + Number(totalChequeAmount.value) + Number(payment.cash);
    },
    set(value) {
        payment.amount = value.toString();
    },
});

async function fetchBills() {
    state.error = null;
    state.isTableLoading = true;

    try {
        // Fetch all bills
        const response = await billService.getBills();
        console.log("Fetched bills:", response.data);  // Debug: Log all fetched bills

        // Filter bills by selected supplier ID if it exists
        if (state.selectedSupplierId) {
            const filteredBills = response.data.filter((bill: any) => {
                console.log("Checking bill supplier:", bill.supplier_id, "against", state.selectedSupplierId);
                return String(bill.supplier_id) === String(state.selectedSupplierId);
            });

            state.unpaidBills = { data: filteredBills };
        } else {
            // If no supplier is selected, show all bills
            state.unpaidBills = response;
        }

    } catch (error: any) {
        state.error = error;
    }

    state.isTableLoading = false;
}

interface Supplier {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    is_active: boolean;
}

interface amountToPay {
    amount: string;
}

const supplier = reactive({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    is_active: true,
});

interface Payment {
    supplier_id: string;
    payment_type: string;
    voucher_number: string;
    date: string;
    amount: string;
    is_cancelled: boolean;
}

const payment = reactive({
    supplier_id: '',
    payment_type: 'cash',
    voucher_number: '',
    date: '',
    gcash: '',
    gcashreference: '',
    cheque: '',
    cash: '',
    amount: '',
    is_cancelled: false
});

interface MakePayment {
    supplier_id: number;
    prepared_by_id: number;
    approved_by_id: number;
    cancelled_by_id: number;
    payment_type: string;
    cash_voucher_no: string;
    date: string;
    is_cancelled: boolean;
}

interface PaySelectedBillDetail {
    bills_payment_id: number;
    purchase_order_number: string;
    date: string;
    amount: string;
    amount_to_pay: string;
}

const paySelectedBills = reactive<PaySelectedBillDetail[]>([]);

const makepayment = reactive({
    supplier_id: user_id.value,
    prepared_by_id: user_id.value,
    approved_by_id: '',
    cancelled_by_id: '',
    payment_type: payment.payment_type,
    cash_voucher_no: payment.voucher_number,
    date: payment.date,
    is_cancelled: payment.is_cancelled,
});

interface selectedBillInput {
    bill_id: string;
    purchase_order_no: string;
    bill_date: string;
    amount: string;
    amount_to_pay: string;
}

const selectedbillinput = reactive({
    bill_id: '',
    purchase_order_no: '',
    bill_date: '',
    amount: '',
    amount_to_pay: '',
});

const state = reactive({
    unpaidBillColumnHeader: [
        { name: "ID", sorter: true, key: "id" },
        { name: "P.O. Number", sorter: true, key: "poNumber" },
        { name: "Date", sorter: true, key: "date" },
        { name: "Balance", sorter: true, key: "amount" },
        { name: "Actions", sorter: true, key: "actions" },
    ],
    selectedBillColumnHeader: [
        { name: "ID", sorter: true, key: "id" },
        { name: "P.O. Number", sorter: true, key: "poNumber" },
        { name: "Date", sorter: true, key: "date" },
        { name: "Amount", sorter: true, key: "amount" },
        { name: "Payment Amount", sorter: true, key: "paymentamount" },
    ],
    chequeDetailColumnHeader: [
        { name: "Voucher Number", sorter: true, key: "voucher_number" },
        { name: "Payee", sorter: true, key: "payee" },
        { name: "Bank", sorter: true, key: "bank" },
        { name: "Cheque Number", sorter: true, key: "cheque_number" },
        { name: "Cheque Date", sorter: true, key: "cheque_date" },
        { name: "Amount", sorter: true, key: "amount" },
    ],
    isTableLoading: false,
    error: null as Error | null,
    sortData: { sortField: 'id', sortOrder: 'ascend' } as SortData,
    unpaidBills: { data: [] } as UnpaidBill,
    selectedBills: { data: [] } as SelectedBill,
    cheques: { data: [] } as Cheques,
    suppliers: [] as Supplier[],
    payments: [] as Payment[],
    makepaymentsData: [] as MakePayment[],
    selectedSupplierId: null as number | null,
    paySelectedBills: [] as PaySelectedBillDetail[],
});

async function fetchSuppliers() {
    try {
        const response = await supplierService.getSuppliers();
        console.log(response);  // Log to see if the data structure matches expectations
        state.suppliers = response.data.filter((supplier: Supplier) => supplier.is_active);
    } catch (error) {
        console.error(error);
    }
}

function selectBill(bill: any) {
    const selectedBill = state.unpaidBills.data.find((b) => b.id === bill.id);
    if (selectedBill) {
        // Populate selectedbillinput with the selected bill's data
        selectedbillinput.bill_id = selectedBill.id;
        selectedbillinput.purchase_order_no = selectedBill.purchase_order_no;
        selectedbillinput.bill_date = selectedBill.bill_date;
        selectedbillinput.amount = selectedBill.amount;
    }
}

const chequeDetail = reactive({
    voucher_number: '',
    payee: '',
    bank: '',
    cheque_number: '',
    cheque_date: '',
    amount: '',
});

function addCheque() {
    const newCheque = {
        voucher_number: chequeDetail.voucher_number,
        payee: chequeDetail.payee,
        bank: chequeDetail.bank,
        cheque_number: chequeDetail.cheque_number,
        cheque_date: chequeDetail.cheque_date,
        amount: chequeDetail.amount,
    };

    state.cheques.data.push(newCheque);
    showForm.value = false;

    // Optionally clear the form
    chequeDetail.voucher_number = '';
    chequeDetail.payee = '';
    chequeDetail.bank = '';
    chequeDetail.cheque_number = '';
    chequeDetail.cheque_date = '';
    chequeDetail.amount = '';
}

function addBillsPaymentDetail() {
    console.log("selected bill amount to pay input: ", selectedbillinput.amount_to_pay);
    console.log("selected bill amount input: ", selectedbillinput.amount);
    if (Number(selectedbillinput.amount_to_pay) > Number(selectedbillinput.amount)) {
        errorAlert('Error', 'Payment amount cannot be greater than the bill amount');
        return; // Early return to prevent adding the bill
    }

    const newBill = {
        id: selectedbillinput.bill_id,
        purchase_order_no: selectedbillinput.purchase_order_no,
        bill_date: selectedbillinput.bill_date,
        amount: selectedbillinput.amount,
        paymentamount: selectedbillinput.amount_to_pay,
    };

    state.selectedBills.data.push(newBill);

    // Optionally clear the form
    selectedbillinput.bill_id = '';
    selectedbillinput.purchase_order_no = '';
    selectedbillinput.bill_date = '';
    selectedbillinput.amount = '';
    selectedbillinput.amount_to_pay = '';
}

async function makePayment() {
    try {
        const paymentData = {
            prepared_by_id: user_id.value,
            approved_by_id: makepayment.approved_by_id,
            cancelled_by_id: makepayment.cancelled_by_id,
            payment_date: makepayment.date,
            payment_type: payment.payment_type,
            cash_voucher_no: makepayment.cash_voucher_no,
            is_cancelled: payment.is_cancelled,
        };

        console.log('Payment Data', paymentData);
        console.log('Selected Bills Data:', state.selectedBills.data);
        state.selectedBills.data.forEach(bill => {
            console.log('BILL ID FROM SELECTED BILLS:', bill.id);
        });
        console.log('Payment Amount:', formattedPaymentAmount.value);

        //Create new bill.
        const response = await billPaymentService.createBillPayment(paymentData);

        if (response && response.data.id) {
            console.log(response);

            // Save bill payment details
            for (const detail of state.selectedBills.data) {
                const billPaymentDetail = {
                    bill_id: detail.id,
                    bills_payment_id: response.data.id,
                    amount: detail.paymentamount,
                };

                console.log('Saving bill payment detail:', billPaymentDetail); // Log the detail being saved
                const result = await billPaymentDetailService.createBillPaymentDetail(billPaymentDetail);
                navigateTo('/admin/payments');

                if (result) {
                    console.log('Bill Payment detail saved successfully:', result);
                } else {
                    console.error('Failed to save bill payment detail:', billPaymentDetail);
                }
            }
            successAlert(t('alert.bill_created'), t('alert.success'));
        } else {
            errorAlert(t('Error'), t('Failed to create bill.'));
        }
        console.log(payment.payment_type);

        if (payment.payment_type === 'cheque') {
            console.log('inserting cheque details to db');
            for (const cheque of state.cheques.data) {
                const chequeData = {
                    bills_payment_id: response.data.id,
                    check_voucher_no: cheque.voucher_number,
                    payee: cheque.payee,
                    bank_id: cheque.bank,
                    cheque_number: cheque.cheque_number,
                    cheque_date: cheque.cheque_date,
                    amount: cheque.amount,
                };
                console.log('Cheque Data:', chequeData);
                const chequeResult = await billPaymentChequeService.createBillPaymentCheque(chequeData);
                if (chequeResult) {
                    console.log('Cheque saved successfully:', chequeResult);
                } else {
                    console.error('Failed to save cheque:', chequeData);
                }
            }
        } else {
            console.log('cash payment no need to save cheque details.');
        }
        navigateTo('/admin/payments');
    }
    catch (error: any) {
        console.error('Error saving bill:', error.message);
        errorAlert(t('Error'), t('An error occurred while saving the bill.'));
    }
}

watch(() => payment.amount, (newAmount) => {
    console.log('Payment amount changed:', newAmount);
});

watch(
    () => state.selectedSupplierId,
    (newValue, oldValue) => {
        console.log("Supplier changed from", oldValue, "to", newValue);  // Debug: Log supplier change
        fetchBills();
        state.selectedBills.data = [];
    }
);

watch(
    () => supplier.id,
    (newSupplierID) => {
        // Find the selected product based on the selected product_id
        const selectedSupplier = state.suppliers.find(supplier => supplier.id === newSupplierID);

        // Update the name in billDetail if the selected product exists
        if (selectedSupplier) {
            supplier.id = selectedSupplier.id;
            supplier.name = selectedSupplier.name;
            supplier.email = selectedSupplier.email;
            supplier.phone = selectedSupplier.phone;
            supplier.address = selectedSupplier.address;
        } else {
            supplier.name = '';
            payment.payment_type = 'Cash';
            supplier.email = '';
            supplier.phone = '';
            supplier.address = '';
        }
    }
);

const showForm = ref(false);


function toggleForm() {
    showForm.value = !showForm.value;
}

function filteredPayee(event: Event) {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase(); 
  chequeDetail.payee = input.value; 
}

function filteredBank(event: Event) {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase(); 
  chequeDetail.bank = input.value; 
}

function sanitizeChequeNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, ''); 
    chequeDetail.cheque_number = input.value; 
}

function sanitizeCashInput(event: Event) {
    const input = event.target as HTMLInputElement;
   
    payment.cash = input.value.replace(/[^0-9]/g, '');
}

function filteredBill(event: Event) {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, ''); 
  selectedbillinput.bill_id = input.value; 
}

function restrictToNumbers(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    const isNumberKey = event.key >= '0' && event.key <= '9';

    if (!isNumberKey && !allowedKeys.includes(event.key)) {
        event.preventDefault(); 
    }
}

function filteredPaymentAmount(event: Event) {
    const input = event.target as HTMLInputElement;
    selectedbillinput.amount_to_pay = input.value.replace(/[^0-9]/g, '');
}

function restrictPaymentNumbers(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    const isNumberKey = event.key >= '0' && event.key <= '9';

    if (!isNumberKey && !allowedKeys.includes(event.key)) {
        event.preventDefault(); 
    }
}

onMounted(() => {
    fetchSuppliers();
    fetchBills();
});
</script>