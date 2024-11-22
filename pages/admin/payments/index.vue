<template>
    <div>
      <NuxtLayout name="admin">
        <main class="w-full mx-auto">
          <Head>
            <Title>Bills Payment - {{ runtimeConfig.public.appName }}</Title>
          </Head>
  
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
                        <input type="text" placeholder="Search" v-model="searchQuery"  @input="sanitizeSearchQuery"
                            class="block w-75 rounded-md border border-gray-400 text-sm pl-8 pr-3 py-1.5" />
                    </div>
  
            <!-- Add Customer Button -->
            <div class="mt-4 sm:ml-16 sm:mt-3 sm:flex-none mr-7">
              <button
                type="button"
                @click="navigateToCreate"
                class="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ADD PAYMENT
              </button>
            </div>
          </div>
  
          <!-- Payments List Table -->
          <div class="mt-4">
            <Alert v-if="state.error" type="danger" :text="state.error?.message" />
            <div class="table-responsive">
              <Table
                :columnHeaders="state.unpaidBillColumnHeader"
                :data="state.billPayment"
                :isLoading="state.isTableLoading"
                :sortData="state.sortData"
                @sort="sort"
              >
                <template #body v-if="!state.isTableLoading && filteredData.length">
                  <tr v-for="(billpayment, index) in filteredData" :key="index">
                    <td class="pl-3">{{ billpayment.prepared_by_id }}</td>
                    <td class="pl-3">{{ billpayment.approved_by_id }}</td>
                    <td class="pl-3">{{ billpayment.cancelled_by_id }}</td>
                    <td class="pl-3">{{ billpayment.payment_date }}</td>
                    <td class="pl-3">{{ billpayment.payment_type }}</td>
                    <td class="pl-3">{{ billpayment.cash_voucher_no }}</td>
                    <td class="pl-3">{{ billpayment.is_cancelled }}</td>
                    <td class="pl-3">
                      <div class="flex space-x-2">
                        <button @click="viewPayment(billpayment.id)" 
                                        class="text-gray-600 hover:text-gray-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M12 4.5C8.798 4.5 6 7.057 6 10.5S8.798 16.5 12 16.5 18 13.943 18 10.5 15.202 4.5 12 4.5ZM12 15.5C10.343 15.5 9 14.156 9 12.5S10.343 9.5 12 9.5 15 10.844 15 12.5 13.657 15.5 12 15.5ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 12S7.03 4 12 4s9 4.03 9 9-4.03 9-9 9Z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                        </button>
                                                <button @click="editPayment(billpayment.id)"
                                                class="text-gray-600 hover:text-gray-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    d="M17.414 2.586a2 2 0 00-2.828 0l-10 10V16a1 1 0 001 1h3.414l10-10a2 2 0 000-2.828l-1.586-1.586zM5 13l-1.5 1.5V13h1.5zm4.5-4.5L14 4l2 2-4.5 4.5H9.5V8.5z" />
                                            </svg>
                                        </button>
                        <button @click="" class="text-red-600 hover:text-red-900">Cancel</button>
                      </div>
                    </td>
                  </tr>
                </template>
              </Table>
            </div>
          </div>
              <!-- View Details Modal -->
          <div v-if="paymentToView"
               class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                <div class="text-center mb-10">
                    <h2 class="text-xl font-semibold text-gray-800">Payment Details</h2>
                </div>
                <div class="grid grid-cols-1 gap-4 mx-4">
                    <div class="flex items-center mb-2 ml-12">
                        <label class="text-xs font-medium text-gray-700 w-36 mr-2">Prepared By:</label>
                        <span class="font-semibold">{{ paymentToView.prepared_by_id }}</span>
                    </div>
                    <div class="flex items-center mb-2 ml-12">
                        <label class="text-xs font-medium text-gray-700 w-36 mr-2">Approved By:</label>
                        <span class="font-semibold">{{ paymentToView.approved_by_id }}</span>
                    </div>
                    <div class="flex items-center mb-2 ml-12">
                        <label class="text-xs font-medium text-gray-700 w-36 mr-2">Cancelled By:</label>
                        <span class="font-semibold">{{ paymentToView.cancelled_by_id }}</span>
                    </div>
                    <div class="flex items-center mb-2 ml-12">
                        <label class="text-xs font-medium text-gray-700 w-36 mr-2">Payment Date:</label>
                        <span class="font-semibold">{{ paymentToView.payment_date }}</span>
                    </div>
                    <div class="flex items-center mb-2 ml-12">
                        <label class="text-xs font-medium text-gray-700 w-36 mr-2">Payment Type:</label>
                        <span class="font-semibold">{{ paymentToView.payment_type }}</span>
                    </div>
                    <div class="flex items-center mb-2 ml-12">
                        <label class="text-xs font-medium text-gray-700 w-36 mr-2">Cash Voucher No:</label>
                        <span class="font-semibold">{{ paymentToView.cash_voucher_no }}</span>
                    </div>
                    <div class="flex items-center mb-2 ml-12">
                        <label class="text-xs font-medium text-gray-700 w-36 mr-2">Is Cancelled:</label>
                        <span :class="paymentToView.is_cancelled ? 
                                     'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20' : 
                                     'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'">
                            {{ paymentToView.is_cancelled ? 'Yes' : 'No' }}
                        </span>
                    </div>
                </div>
                <div class="flex justify-end gap-2 mt-4">
                    <button @click="paymentToView = null"
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
import { billPaymentService } from '~/components/api/admin/BillPaymentService';
import { employeeService } from '~/components/api/admin/EmployeeService';

const runtimeConfig = useRuntimeConfig();

interface BillPayment {
    data: any[];
}

const currentTablePage = 1;

interface SortData {
    sortField: string;
    sortOrder: "ascend" | "descend" | null;
}

function sort(sortingData: { column: string; sort: string }) {
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
const searchQuery = ref('');

function sanitizeSearchQuery() {
    searchQuery.value = searchQuery.value.replace(/[^a-zA-Z0-9\s]/g, ''); 
}

const filteredData = computed(() => {
    const query = searchQuery.value.trim().toLowerCase(); // Trim and convert to lowercase

    if (!query) {
        return state.billPayment.data; // If no search query, return all data
    }

    return state.billPayment.data.filter(bill =>
        bill.prepared_by_id?.toLowerCase().startsWith(query) ||
        bill.approved_by_id?.toLowerCase().startsWith(query) ||
        bill.cancelled_by_id?.toLowerCase().startsWith(query) ||
        bill.payment_type?.toLowerCase().startsWith(query)
    );
});


const state = reactive({
    unpaidBillColumnHeader: [
        { name: "Prepared_by", sorter: true, key: "preparedby" },
        { name: "Approved_by", sorter: true, key: "approvedby" },
        { name: "Cancelled_by", sorter: true, key: "cancelledby" },
        { name: "Payment Date", sorter: true, key: "paymentdate" },
        { name: "Payment Type", sorter: true, key: "paymentype" },
        { name: "Cash Voucher No", sorter: true, key: "cvn" },
        { name: "isCancelled", sorter: true, key: "is_cancelled" },
        { name: "Actions", sorter: true, key: "actions" },
    ],
    isTableLoading: false,
    error: null as Error | null,
    billPayment: { data: [] } as BillPayment,
    sortData: { sortField: 'id', sortOrder: 'ascend' } as SortData,
    employees: [],
});

// Function to fetch employees
async function fetchEmployees() {
    try {
        const response = await employeeService.getEmployees();
        state.employees = response.data; // Assuming the response structure contains the employee data
    } catch (error) {
        console.error('Failed to fetch employees:', error);
    }
}

// Update fetchBillsPayment to replace IDs with employee names
async function fetchBillsPayment() {
    state.error = null;
    state.isTableLoading = true;
    await fetchEmployees();
    try {
        const response = await billPaymentService.getBillPayments();
        state.billPayment = response;

        state.billPayment.data.forEach(billpayment => {
            const preparedBy = state.employees.find(emp => (emp as any).id === billpayment.prepared_by_id);
            const approvedBy = state.employees.find(emp => (emp as any).id === billpayment.approved_by_id);
            const cancelledBy = state.employees.find(emp => (emp as any).id === billpayment.cancelled_by_id);

            billpayment.prepared_by_id = preparedBy ? `${(preparedBy as any).firstname} ${(preparedBy as any).lastname}` : '';
            billpayment.approved_by_id = approvedBy ? `${(approvedBy as any).firstname} ${(approvedBy as any).lastname}` : '';
            billpayment.cancelled_by_id = cancelledBy ? `${(cancelledBy as any).firstname} ${(cancelledBy as any).lastname}` : '';
        });
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}
// function previousPage() {
//     if (currentPage.value > 1) {
//         currentPage.value--;
//     }
// }

// function nextPage() {
//     if (currentPage.value < totalPages.value) {
//         currentPage.value++;
//     }
// }

const paymentToView = ref<any>(null);  // Store the selected payment details for the modal


const viewPayment = async (id: number) => {
    try {
        // Fetch detailed payment info (modify according to your API)
        const response = await billPaymentService.getBillPaymentById(id); // assuming this method exists
        paymentToView.value = response.data; // Store the fetched payment details
    } catch (error) {
        console.error('Failed to fetch payment details:', error);
    }
};

const editPayment = async (id: number) => {

}

function navigateToCreate() {
    navigateTo("payments/create")
}

onMounted(() => {
    fetchBillsPayment();
});
</script>