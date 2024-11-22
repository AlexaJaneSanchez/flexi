<template>
    <div>
        <NuxtLayout name="admin">
            <main class="w-full mx-auto">

                <Head>
                    <Title>Bills Payment - {{ runtimeConfig.public.appName }}</Title>
                </Head>
                   <!-- Add Button and Description -->
            <div class="sm:flex sm:items-center sm:justify-between">
                    <!-- Search Bar -->
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
                        <button type="button" @click="navigateToCreate"
                            class="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                           ADD COLLECTION
                        </button>
                    </div>
                </div>

                <!-- Payments List Table -->
                <div class="mt-4">
                    <!-- Product Table -->
                    <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                    <div class="table-responsive">
                        <Table :columnHeaders="state.unpaidBillColumnHeader" :data="filteredData" 
                                :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">
                                <template #body
                                    v-if="!(state.isTableLoading || (filteredData && filteredData.length === 0))">
                                    <tr v-for="(payment, index) in filteredData" :key="index">
                                    <td class="pl-3">
                                        {{ payment.prepared_by_id }}
                                    </td>
                                    <td class="pl-3">
                                        {{ payment.customer_id }}
                                    </td>
                                    <td class="pl-3">
                                        {{ payment.approvedby }}
                                    </td>
                                    <td class="pl-3">
                                        {{ payment.cancelled_by_id }}
                                    </td>
                                    <td class="pl-3">
                                        {{ payment.or_number }}
                                    </td>
                                    <td class="pl-3">
                                        {{ payment.is_approved }}
                                    </td>
                                    <td class="pl-3">
                                        {{ payment.is_cancelled }}
                                    </td>
                                    <td class="pl-3">
                                        {{ payment.payment_date }}
                                    </td>
                                    <td class="pl-3">
                                        {{ payment.remarks }}
                                    </td>
                                    <td class="pl-3">
                                        <div class="flex space-x-2">
                                            <button @click="viewPayment (payment)" class="text-gray-600 hover:text-gray-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M12 4.5C8.798 4.5 6 7.057 6 10.5S8.798 16.5 12 16.5 18 13.943 18 10.5 15.202 4.5 12 4.5ZM12 15.5C10.343 15.5 9 14.156 9 12.5S10.343 9.5 12 9.5 15 10.844 15 12.5 13.657 15.5 12 15.5ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 12S7.03 4 12 4s9 4.03 9 9-4.03 9-9 9Z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            <button @click=""class="text-gray-600 hover:text-gray-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    d="M17.414 2.586a2 2 0 00-2.828 0l-10 10V16a1 1 0 001 1h3.414l10-10a2 2 0 000-2.828l-1.586-1.586zM5 13l-1.5 1.5V13h1.5zm4.5-4.5L14 4l2 2-4.5 4.5H9.5V8.5z" />
                                            </svg>
                                            </button>
                                            <button @click="" class="text-red-600 hover:text-red-900">
                                                Cancel
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </Table>
                    </div>
                    <!-- <Pagination :data="state.categories" @previous="previous" @next="next" /> -->
                </div>
                 <!-- View Details Modal -->
        <div v-if="paymentToView" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <div class="text-center mb-10">
              <h2 class="text-xl font-semibold text-gray-800">Payment Details</h2>
            </div>
            <div class="grid grid-cols-1 gap-4 mx-4">
              <div class="flex items-center mb-2 ml-12">
                <label class="text-xs font-medium text-gray-700 w-36 mr-2">Prepared By:</label>
                <span>{{ paymentToView.prepared_by_id }}</span>
              </div>
              <div class="flex items-center mb-2 ml-12">
                <label class="text-xs font-medium text-gray-700 w-36 mr-2">Customer ID:</label>
                <span>{{ paymentToView.customer_id }}</span>
              </div>
              <div class="flex items-center mb-2 ml-12">
                <label class="text-xs font-medium text-gray-700 w-36 mr-2">Approved By:</label>
                <span>{{ paymentToView.approvedby }}</span>
              </div>
              <div class="flex items-center mb-2 ml-12">
                <label class="text-xs font-medium text-gray-700 w-36 mr-2">Cancelled By:</label>
                <span>{{ paymentToView.cancelled_by_id }}</span>
              </div>
              <div class="flex items-center mb-2 ml-12">
                <label class="text-xs font-medium text-gray-700 w-36 mr-2">O.R Number:</label>
                <span>{{ paymentToView.or_number }}</span>
              </div>
              <div class="flex items-center mb-2 ml-12">
                <label class="text-xs font-medium text-gray-700 w-36 mr-2">Is Approved:</label>
                <span>{{ paymentToView.is_approved ? 'Yes' : 'No' }}</span>
              </div>
              <div class="flex items-center mb-2 ml-12">
                <label class="text-xs font-medium text-gray-700 w-36 mr-2">Is Cancelled:</label>
                <span>{{ paymentToView.is_cancelled ? 'Yes' : 'No' }}</span>
              </div>
              <div class="flex items-center mb-2 ml-12">
                <label class="text-xs font-medium text-gray-700 w-36 mr-2">Payment Date:</label>
                <span>{{ paymentToView.payment_date }}</span>
              </div>
              <div class="flex items-center mb-2 ml-12">
                <label class="text-xs font-medium text-gray-700 w-36 mr-2">Remarks:</label>
                <span>{{ paymentToView.remarks }}</span>
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
import { PlusIcon } from '@heroicons/vue/24/outline';
import { employeeService } from '~/components/api/admin/EmployeeService';
import { paymentService } from '~/components/api/admin/PaymentService';

const runtimeConfig = useRuntimeConfig();

interface Payment {
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

const state = reactive({
    unpaidBillColumnHeader: [
        { name: "Prepared_by", sorter: true, key: "preparedby" },
        { name: "Customer Name", sorter: true, key: "customer_id" },
        { name: "Approved_by", sorter: true, key: "approvedby" },
        { name: "Cancelled_by", sorter: true, key: "cancelled_by_id" },
        { name: "O.R Number", sorter: true, key: "or_number" },
        { name: "isApproved", sorter: true, key: "is_approved" },
        { name: "isCancelled", sorter: true, key: "is_cancelled" },
        { name: "Payment Date", sorter: true, key: "payment_date" },
        { name: "Remarks", sorter: true, key: "remarks" },
        { name: "Actions", sorter: true, key: "actions" },
    ],
    isTableLoading: false,
    error: null as Error | null,
    payments: { data: [] } as Payment,
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
async function fetchPayments() {
    state.error = null;
    state.isTableLoading = true;
    await fetchEmployees();
    try {
        const response = await paymentService.getPayments();
        state.payments = response;

        state.payments.data.forEach(payment => {
            const preparedBy = state.employees.find(emp => (emp as any).id === payment.prepared_by_id);
            const approvedBy = state.employees.find(emp => (emp as any).id === payment.approved_by_id);
            const cancelledBy = state.employees.find(emp => (emp as any).id === payment.cancelled_by_id);

            payment.prepared_by_id = preparedBy ? `${(preparedBy as any).firstname} ${(preparedBy as any).lastname}` : '';
            payment.approved_by_id = approvedBy ? `${(approvedBy as any).firstname} ${(approvedBy as any).lastname}` : '';
            payment.cancelled_by_id = cancelledBy ? `${(cancelledBy as any).firstname} ${(cancelledBy as any).lastname}` : '';
        });
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}

function navigateToCreate() {
    navigateTo("collections/create")
}

const searchQuery = ref('');  

function sanitizeSearchQuery() {
    searchQuery.value = searchQuery.value.replace(/[^a-zA-Z]/g, '');
}

const filteredData = computed(() => {
    if (!searchQuery.value) {
        return state.payments.data;
    }

    const query = searchQuery.value.toLowerCase();
    const filtered = state.payments.data.filter(payment =>
        payment.prepared_by_id?.toLowerCase().includes(query) // Assuming `prepared_by_id` contains the full name
    );

    console.log('Filtered Data:', filtered); // Debugging output
    return filtered;
});

const paymentToView = ref<any>(null); // Store the selected payment details for the modal

const viewPayment = (payment: any) => {
  console.log("Viewing payment:", payment); // Log the selected payment
  paymentToView.value = payment;  // Set the selected payment to show its details in the modal
};

onMounted(() => {
    fetchPayments();
});
</script>