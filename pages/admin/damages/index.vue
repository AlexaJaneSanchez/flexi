<template>
    <NuxtLayout name="admin">
        <main>

            <Head>
                <Title></Title>
            </Head>
            <!-- Alert Messages -->
            <div v-if="state.success" class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                {{ state.success }}
            </div>
            <div v-if="state.error" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                {{ state.error }}
            </div>

            <!-- Search and Add Collection Button Container -->
            <div class="relative flex items-center space-x-4 mt-3">
                <div class="relative flex flex-1">
                    <!-- Search Bar -->
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M9 3a6 6 0 11-6 6 6 6 0 016-6zM2 9a7 7 0 1114 0A7 7 0 012 9zm11.293 4.293a1 1 0 00-1.415-1.414L10 12.586l-1.879-1.878a1 1 0 00-1.415 1.414L8.586 14l-1.879 1.879a1 1 0 001.415 1.415L10 15.414l1.879 1.879a1 1 0 001.415-1.415L11.414 14l1.879-1.879a1 1 0 000-1.415z"
                            clip-rule="evenodd" />
                    </svg>
                    <input type="text" v-model="searchQuery" placeholder="Search"
                        class="block w-70 rounded-md border border-gray-400 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-xs pl-8 pr-2 py-1.5" />
                </div>

                <!-- Add New Spoilage Button -->
                <div class="mt-4 sm:ml-16 sm:mt-3 sm:flex-none mr-6">
                    <button type="button" @click="toggleSpoilageForm"
                        class="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Add New Spoilage
                    </button>
                </div>
            </div>

            <!-- Spoilage Form -->
            <div v-if="showSpoilageForm"
                class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl h-96 overflow-y-auto">
                    <form @submit.prevent="saveSpoilage">
                        <FormLabel label="Spoilage Details" class="text-xl" />
                        <Alert type="danger" :text="state.error?.message" v-if="state.error?.message" />
                        <div>

                            <FormLabel for="product_id" label="Product" />
                            <FormSelect id="product_id" v-model="spoilage.product_id" :options="productOptions"
                                placeholder="Select a product" required />
                            <FormError :error="state.error?.errors?.product_id?.[0]" />

                            <div class="flex space-x-4 mt-3 mx-2">
                                <div class="flex-1">
                                    <FormLabel label="Damaged Date (Today)" />
                                    <input type="text" v-model="spoilage.damaged_date" readonly
                                        class="block w-full rounded-md border text-sm px-3 py-2 bg-gray-100" />
                                </div>
                            </div>

                            <div class="flex space-x-4 mt-3 mx-2">
                                <div class="flex-1">
                                    <FormLabel label="Expiry Date" />
                                    <input type="date" v-model="spoilage.expiry_date"
                                        class="block w-full rounded-md border text-sm px-3 py-2" required />
                                </div>
                                <div class="flex-1">
                                    <FormLabel label="Remarks" />
                                    <FormSelect v-model="spoilage.remarks" :options="remarksOptions" />
                                </div>
                            </div>

                            <div class="flex space-x-4 mt-3 mx-2">
                                <div class="flex-1">
                                    <FormLabel for="quantity" label="Quantity" />
                                    <FormNumberField v-model="spoilage.quantity" min="0" placeholder="Quantity"
                                        required />
                                    <FormError :error="state.error?.errors?.quantity?.[0]" />
                                </div>
                                <div class="flex-1">
                                    <FormLabel label="Unit" />
                                    <FormSelect v-model="spoilage.unit" :options="[
                                        { value: 'Pcs', label: 'PC' },
                                        { value: 'Bottle', label: 'BOTTLE' },
                                        { value: 'Box', label: 'BOX' },
                                        { value: 'Kilo', label: 'KILO' }
                                    ]">
                                    </FormSelect>
                                </div>
                                <div class="flex-1">
                                    <FormLabel for="cost" label="Cost per Quantity" />
                                    <FormNumberField v-model="spoilage.cost" min="0" placeholder="Cost per Quantity"
                                        required />
                                    <FormError :error="state.error?.errors?.cost?.[0]" />
                                </div>
                            </div>

                            <div class="w-1/4">
                                <FormLabel label="Prepared By" />
                                <input type="text" :value="fullName" readonly
                                    class="block cursor-default bg-gray-200 rounded-md px-3 py-2" />
                            </div>
                            <div class="w-1/2">
                                <FormLabel label="Is Cancelled" />
                                <FormSelect v-model="spoilage.is_cancelled" :options="[
                                    { value: false, label: 'No' },
                                    { value: true, label: 'Yes' },
                                ]">
                                </FormSelect>
                            </div>

                            <div v-if="!spoilage.is_cancelled" class="w-1/2">
                                <FormLabel for="approved_by_id" label="Approved By" />
                                <FormSelect v-model="spoilage.approved_by_id" :options="employeeOptions"
                                    placeholder="Select employee" required />
                            </div>

                            <div v-if="spoilage.is_cancelled" class="w-1/2">
                                <FormLabel for="cancelled_by" label="Cancelled By" />
                                <FormSelect v-model="spoilage.cancelled_by" :options="employeeOptions"
                                    placeholder="Select employee" />
                            </div>

                            <!-- Save and Cancel Buttons -->
                            <div class="flex justify-end gap-2 mt-4">
                                <FormButton type="submit" buttonStyle="success">Save</FormButton>
                                <FormButton @click="toggleSpoilageForm" buttonStyle="default">Cancel</FormButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Spoilage Table -->
            <table class="min-w-full divide-y divide-gray-200 mt-6 border border-gray-300 rounded-lg">
                <thead class="bg-gray-900 text-white">
                    <tr>
                        <th class="px-4 py-2">Branch No</th>
                        <th class="px-4 py-2">Damaged Date</th>
                        <th class="px-4 py-2">Remarks</th>
                        <th class="px-4 py-2">Prepared By</th>
                        <th class="px-4 py-2">Approved By</th>
                        <th class="px-4 py-2">Is Cancelled</th>
                        <th class="px-4 py-2"> Cancelled By</th>
                        <th class="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-gray-100 justify-center">
                    <tr v-if="spoilages.length === 0">
                        <td colspan="6" class="text-center px-4 py-4 border border-gray-300 text-gray-500">
                            No data available
                        </td>
                    </tr>
                    <tr v-for="(spoilage, index) in paginatedSpoilages" :key="spoilage.spoilage_id">
                        <td class="px-4 py-2">{{ spoilage.branch_id }}</td>
                        <td class="px-4 py-2">{{ spoilage.damaged_date }}</td>
                        <td class="px-4 py-2">{{ spoilage.remarks }}</td>
                        <td class="px-4 py-2">{{ spoilage.prepared_by_id }}</td>
                        <td class="px-4 py-2">{{ spoilage.approved_by_id }}</td>
                        <td class="px-4 py-2">{{ spoilage.is_cancelled ? 'Yes' : 'No' }}</td>
                        <td class="px-4 py-2">{{ spoilage.cancelled_by }}</td>
                        <td class="px-4 py-2 space-x-2 flex items-center">
                            <div v-if="showDetailsModal"
                                class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl h-auto overflow-y-auto">
                                    <h2 class="text-xl font-semibold mb-4">Spoilage Details</h2>
                                    <p class="mb-2"><strong>Spoilage ID:</strong> <span class="ml-2">{{
                                        selectedSpoilage.spoilage_id }}</span></p>
                                    <p class="mb-2"><strong>Product ID:</strong> <span class="ml-2">{{
                                        selectedSpoilage.product_id }}</span></p>
                                    <p class="mb-2"><strong>Unit:</strong> <span class="ml-2">{{ selectedSpoilage.unit
                                            }}</span></p>
                                    <p class="mb-2"><strong>Expiry Date:</strong> <span class="ml-2">{{
                                        selectedSpoilage.expiry_date }}</span></p>
                                    <p class="mb-2"><strong>Quantity:</strong> <span class="ml-2">{{
                                        selectedSpoilage.quantity }}</span></p>
                                    <p class="mb-2"><strong>Cost Per Qty:</strong> <span class="ml-2">{{
                                        selectedSpoilage.cost }}</span></p>

                                    <button @click="showDetailsModal = false"
                                        class="mt-4 px-3 py-2 bg-gray-900 text-white rounded-md">
                                        Close
                                    </button>
                                </div>
                            </div>

                            <button @click="viewSpoilageDetails(index)" class="text-green-500 hover:text-green-700">
                                <svg width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" stroke="#000000"
                                    stroke-width="0.00024000000000000003">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
                                        stroke="#fcfcfc" stroke-width="1.104">
                                        <path
                                            d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8Z"
                                            fill="#000000"></path>
                                        <path
                                            d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z"
                                            fill="#000000"></path>
                                        <path
                                            d="M3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H3Z"
                                            fill="#000000"></path>
                                    </g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8Z"
                                            fill="#000000"></path>
                                        <path
                                            d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z"
                                            fill="#000000"></path>
                                        <path
                                            d="M3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H3Z"
                                            fill="#000000"></path>
                                    </g>
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
        <div v-if="!showDetailsModal && !showSpoilageForm" class="flex justify-center mt-4 space-x-2">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50">Previous</button>
            <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                :class="['px-3 py-1', { 'bg-gray-900 text-white': currentPage === page, 'bg-gray-300 text-gray-700': currentPage !== page }]"
                class="rounded-md hover:bg-gray-400">{{ page }}</button>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50">Next</button>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { productService } from '~/components/api/admin/ProductService.js';
import { employeeService } from '~/components/api/admin/EmployeeService.js';

const user_id = computed(() => localStorage.getItem('user_id'));
const firstname = computed(() => localStorage.getItem('firstname'));
const lastname = computed(() => localStorage.getItem('lastname'));
const fullName = computed(() => `${firstname.value} ${lastname.value}`);

const searchQuery = ref('');

const spoilage = ref({
    spoilage_id: '',
    product_id: '',
    damaged_date: '',
    spoilage_category_id: '',
    quantity: 0,
    cost: 0,
    prepared_by_id: user_id.value,
    approved_by_id: null,
    cancelled_by: null,
    is_cancelled: false,
});

interface spoilage {
    spoilage_id: number;
    product_id: number;
    unit: string;
    expiry_date: string;
    quantity: number;
    cost: number;
    branch_id: number;
    damaged_date: string;
    remarks: string;
    prepared_by_id: number;
    approved_by_id: number;
    is_cancelled: boolean;
    cancelled_by: string;
}
const state = ref({
    categories: [],
    products: [],
    employees: [],
    error: null,
});

const filteredSpoilages = computed(() => {
    return spoilages.value.filter(spoilage =>
        spoilage.spoilage_id.toString().includes(searchQuery.value) ||
        spoilage.damaged_date.includes(searchQuery.value)
    );
});
const showSpoilageForm = ref(false);
const spoilages = ref([]);

const toggleSpoilageForm = () => {
    showSpoilageForm.value = !showSpoilageForm.value;
};

const totalLoss = computed(() => spoilage.value.quantity * spoilage.value.cost);

const remarksOptions = [
    { value: 'Expired', label: 'Expired' },
    { value: 'Damaged in Transit', label: 'Damaged in Transit' },
    { value: 'Other', label: 'Other' }
];

const productOptions = computed(() =>
    state.value.products.map(product => ({ value: product.id, label: product.name }))
);

const employeeOptions = computed(() =>
    state.value.employees.map(emp => ({
        value: emp.id,
        label: `${emp.firstname} ${emp.lastname}`
    }))
);


async function fetchProducts() {
    try {
        const response = await productService.getProducts();
        if (response && response.data) {
            state.value.products = response.data.filter(product => product.is_active);
        } else {
            throw new Error("Invalid product data structure");
        }
    } catch (error) {
        state.value.error = "Failed to fetch products";
        console.error("Error in fetchProducts:", error);
    }
}

async function fetchEmployees() {
    try {
        const response = await employeeService.getEmployees();
        if (response && response.data) {
            state.value.employees = response.data;
        } else {
            throw new Error("Invalid employee data structure");
        }
    } catch (error) {
        state.value.error = "Failed to load employees";
        console.error("Error in fetchEmployees:", error);
    }
}

// Helper to get employee name by ID
const getEmployeeNameById = (employeeId) => {
    const employee = state.value.employees.find(emp => emp.id === employeeId);
    return employee ? `${employee.firstname} ${employee.lastname}` : 'N/A';
};

const setTodayDate = () => {
    const today = new Date();
    spoilage.value.damaged_date = today.toISOString().split('T')[0];
};

onMounted(() => {
    fetchProducts();
    fetchEmployees();
    setTodayDate();
});

const saveSpoilage = async () => {
    state.value.success = null;
    state.value.error = null;

    if (spoilage.value.approved_by_id) {
        spoilage.value.cancelled_by = null;
    } else if (spoilage.value.cancelled_by) {
        spoilage.value.approved_by_id = null;
    }
    try {
        const newSpoilage = {
            ...spoilage.value,
            prepared_by_id: fullName.value,
            approved_by_id: spoilage.value.approved_by_id ? getEmployeeNameById(spoilage.value.approved_by_id) : null,
            cancelled_by: spoilage.value.cancelled_by ? getEmployeeNameById(spoilage.value.cancelled_by) : null,
        };

        spoilages.value.push(newSpoilage); // Save new spoilage record to list
        resetForm(); // Reset the form fields
        toggleSpoilageForm(); // Close the form modal
    } catch (error) {
        state.value.error = "An error occurred while saving spoilage data";
        console.error("Error in saveSpoilage:", error);
    }
};

function resetForm() {
    spoilage.value = {
        spoilage_id: Number,
        product_id: '',
        spoilage_category_id: '',
        damaged_date: '',
        quantity: 0,
        cost: 0,
        remarks: '',
        prepared_by_id: user_id.value,
        approved_by_id: null,
        cancelled_by: null,
    };
}
const showDetailsModal = ref(false);
const selectedSpoilage = ref(null);

const viewSpoilageDetails = (index: any) => {
    selectedSpoilage.value = spoilages.value[index];
    showDetailsModal.value = true;
};
const paginatedSpoilages = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return spoilages.value.slice(start, end);
});

const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = computed(() => Math.ceil(spoilages.value.length / itemsPerPage.value));

function goToPage(page: any) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}
</script>