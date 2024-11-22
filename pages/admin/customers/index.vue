<template>
    <div>
        <NuxtLayout name="admin">
            <main>

                <Head>
                    <Title>Customers - {{ runtimeConfig.public.appName }}</Title>
                </Head>

                <!-- Search Bar -->
                <div class="sm:flex sm:items-center sm:justify-between">
                    <div class="relative flex flex-1 ml-8 mt-5">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M9 3a6 6 0 11-6 6 6 6 0 016-6zM2 9a7 7 0 1114 0A7 7 0 012 9zm11.293 4.293a1 1 0 00-1.415-1.414L10 12.586l-1.879-1.878a1 1 0 00-1.415 1.414L8.586 14l-1.879 1.879a1 1 0 001.415 1.415L10 15.414l1.879 1.879a1 1 0 001.415-1.415L11.414 14l1.879-1.879a1 1 0 000-1.415z"
                                clip-rule="evenodd" />
                        </svg>
                        <input type="text" placeholder="Search" v-model="searchQuery" 
                            class="block w-75 rounded-md border border-gray-400 text-sm pl-8 pr-3 py-1.5" />
                    </div>

                    <!-- Customer Button -->
                    <div class="mt-4 sm:ml-16 sm:mt-3 sm:flex-none mr-6">
                        <button type="button" @click="toggleForm"
                            class="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            ADD CUSTOMER
                        </button>
                    </div>
                </div>

                <!-- Customer Form -->
                <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <form @submit.prevent="saveCustomer">
                            <div class="text-center mb-6">
                            <h2 class="text-xl font-semibold text-gray-800">Customer Details</h2>
                        </div>
                            <Alert type="danger" :text="state?.error?.message" v-if="
                                state.error?.message &&
                                state.error.message.length > 0
                            " />
                            <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-1 mt-1">First Name</label>
                                <div class="flex items-center mb-1">
                                    <FormTextField id="firstname" name="firstname" v-model="customer.firstname"
                                        placeholder="First Name"  @input="firstnameFilter" required/>
                                    <FormError :error="v$?.firstname?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state?.error?.errors?.firstname?.[0]" />
                                </div>
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-1 mt-1">Last Name</label>
                                <div class="flex items-center mb-1">
                                    <FormTextField id="lastname" name="lastname" v-model="customer.lastname"
                                        placeholder="Last Name" @input="lastnameFilter" required/>
                                    <FormError :error="v$?.formCustomer?.lastname?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state?.error?.errors?.lastname?.[0]" />
                                </div>
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-1 mt-1">Email</label>
                                <div class="flex items-center mb-1">
                                    <FormTextField id="email" name="email" v-model="customer.email" type="email"
                                        placeholder="Email" required />
                                    <FormError :error="v$?.formCustomer?.email?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state?.error?.errors?.email?.[0]" />
                                </div>
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-1 mt-1">Phone Number</label>
                                    <FormTextField
                                        for="phone" name="phone" v-model="customer.phone" placeholder="Phone" 
                                        required :maxlength="11" :inputmode="'numeric'" @input="validatePhoneNumber" @keypress="limitPhoneLength" 
                                    />
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-1 mt-1">Billing Address</label>
                                <div class="flex items-center mb-1">
                                    <FormTextField id="billingaddress" name="billingaddress" v-model="customer.address"
                                        placeholder="Billing Address" required/>
                                    <FormError
                                        :error="v$?.formCustomer?.billingaddress?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state?.error?.errors?.billingaddress?.[0]" />
                                </div>
                                <div class="mb-1">
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-1 mt-1">Status</label>
                                    <FormSelectField v-model="selectedIsActive" :options="activeInactiveOptions" />
                                    <FormError :error="v$?.formCustomer?.is_active?.$errors[0]?.$message.toString()" />
                                    <FormError :error="state?.error?.errors?.is_active?.[0]" />
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
                <div v-if="customerToView"
                    class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div class="text-center mb-5">
                            <h2 class="text-xl font-semibold text-gray-800">Customer Details</h2>
                        </div>
                        <div class="grid grid-cols-1 gap-3 mt-2 mx-2">
                            <div class="flex items-center mb-1">
                                <label class="text-xs font-medium text-gray-700 w-32 mr-2 ml-5">First Name:</label>
                                <span>{{ customer?.firstname }}</span>
                            </div>
                            <div class="flex items-center mb-1">
                                <label class="text-xs font-medium text-gray-700 w-32 mr-2  ml-5">Last Name:</label>
                                <span>{{ customer?.lastname }}</span>
                            </div>
                            <div class="flex items-center mb-1">
                                <label class="text-xs font-medium text-gray-700 w-32 mr-2  ml-5">Email:</label>
                                <span>{{ customer?.email }}</span>
                            </div>
                            <div class="flex items-center mb-1">
                                <label class="text-xs font-medium text-gray-700 w-32 mr-2  ml-5">Phone:</label>
                                <span>{{ customer?.phone }}</span>
                            </div>
                            <div class="flex items-center mb-1">
                                <label class="text-xs font-medium text-gray-700 w-32 mr-2  ml-5">Billing Address:</label>
                                <span>{{ customer?.address }}</span>
                            </div>
                            <div class="flex items-center mb-1">
                                <label class="text-xs font-medium text-gray-700 w-32 mr-2  ml-5">Active:</label>
                                <span :class="customer?.is_active ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20' : 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'">
                                    {{ customer?.is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </div>
                            <div class="flex justify-end gap-2 mt-4">
                                <button @click="customerToView = null"
                                    class="rounded-md bg-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Customer Table -->
                <div>
                    <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                    <div class="table-responsive">
                        <Table :columnHeaders="state.columnHeaders" :data="{ data: filteredData }"
                               :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">
                                <template #body
                                    v-if="!(state.isTableLoading || (filteredData && filteredData.length === 0))">
                                    <tr v-for="(customer, index) in filteredData" :key="index">
                                    <td>
                                        <span class="truncate ml-3">{{ customer.firstname }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-3">{{ customer.lastname }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-3">{{ customer.email }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-3">{{ customer.phone }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-3">{{ customer.address }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2"
                                            :class="customer.is_active ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20' : 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'">
                                            {{ customer.is_active ? 'Active' : 'Inactive' }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-2 text-xxs text-gray-700">
                                        <div class="flex space-x-2">
                                            <button @click="viewCustomer(customer.id)"
                                                class="text-gray-600 hover:text-gray-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M12 4.5C8.798 4.5 6 7.057 6 10.5S8.798 16.5 12 16.5 18 13.943 18 10.5 15.202 4.5 12 4.5ZM12 15.5C10.343 15.5 9 14.156 9 12.5S10.343 9.5 12 9.5 15 10.844 15 12.5 13.657 15.5 12 15.5ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 12S7.03 4 12 4s9 4.03 9 9-4.03 9-9 9Z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            <button @click="editCustomer(customer.id)"
                                                class="text-gray-600 hover:text-gray-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    d="M17.414 2.586a2 2 0 00-2.828 0l-10 10V16a1 1 0 001 1h3.414l10-10a2 2 0 000-2.828l-1.586-1.586zM5 13l-1.5 1.5V13h1.5zm4.5-4.5L14 4l2 2-4.5 4.5H9.5V8.5z" />
                                            </svg>
                                            </button>
                                           <!-- <button @click="deleteCustomer(customer.id)"
                                                class="text-red-600 hover:text-red">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M6 2a2 2 0 00-2 2v1H2v2h1v9a2 2 0 002 2h8a2 2 0 002-2V7h1V5h-2V4a2 2 0 00-2-2H6zm4 12a1 1 0 102 0V8a1 1 0 10-2 0v6zm-3-1a1 1 0 002 0V8a1 1 0 10-2 0v5zm8-1a1 1 0 10-2 0V8a1 1 0 102 0v5z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button> -->
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </Table>
                    </div>
                    <Pagination :data="state.customers" @previous="previous" @next="next" />
                </div>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { customerService } from '~/components/api/admin/CustomerService';
import { helpers, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useAlert } from '@/composables/alert';
import { useI18n } from 'vue-i18n';
import type { Error } from '@/types/error';

interface SortData {
    sortField: string;
    sortOrder: "ascend" | "descend" | null;
}

interface Customers {
    data: any[];
    pagination: {
        currentPage: number;
        totalPages: number;
    };
}

const runtimeConfig = useRuntimeConfig();
let currentTablePage = 1;

const activeInactiveOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
];

const customer = ref({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    is_active: true,
});

const selectedIsActive = computed({
    get: () => customer.value.is_active,
    set: (newValue: boolean) => {
        customer.value.is_active = newValue;
    }
});
function validatePhoneNumber() {
  // Remove non-numeric characters
  customer.value.phone = customer.value.phone.replace(/\D/g, '');

  // Limit the phone number to 11 digits
  if (customer.value.phone.length > 11) {
    customer.value.phone = customer.value.phone.slice(0, 11); 
  }
}

function limitPhoneLength(event: KeyboardEvent) {

  if (customer.value.phone.length >= 11) {
    event.preventDefault();
  }

  // Allow only numeric keys, if the key is not a number, prevent input
  if (event.key && !/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
}

watch(() => customer.value.phone, validatePhoneNumber);

const state = reactive({
    columnHeaders: [
        { name: "First Name", sorter: true, key: "firstname" },
        { name: "Last Name", sorter: true, key: "lastname" },
        { name: "Email", sorter: true, key: "email" },
        { name: "Phone", sorter: true, key: "phonenumber" },
        { name: "Billing Address", sorter: false, key: "billingaddress" },
        { name: "Status", sorter: true, key: "isactive" },
        { name: "Actions", key: "actions" },
        
    ],
    error: null as Error | null,
    isTableLoading: false,
    sortData: { sortField: "", sortOrder: null } as SortData,
    customers: { data: [], pagination: { currentPage: 1, totalPages: 1 } } as Customers,
});

const rules = computed(() => ({
    customer: {
        firstname: {
            required: helpers.withMessage('This field is required.', required),
        },
        lastname: {
            required: helpers.withMessage('This field is required.', required),
        },
        email: {
            required: helpers.withMessage('This field is required.', required),
        },
        phonenumber: {
            required: helpers.withMessage('This field is required.', required),
        },
        billingaddress: {
            required: helpers.withMessage('This field is required.', required),
        },
        isactive: {
            required: helpers.withMessage('This field is required.', required),
        },
    },
}));


const v$ = useVuelidate(rules, { customer });

// Alert and i18n setup
const { successAlert } = useAlert();
const { errorAlert } = useAlert();
const { t } = useI18n()

onMounted(() => {
    fetchCustomers();
});

async function fetchCustomers() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const params = {
            page: currentTablePage,
            sortField: state.sortData.sortField,
            sortOrder: state.sortData.sortOrder,
        };
        const response = await customerService.getCustomers();
        state.customers = response;
    } catch (error: any) {
        errorAlert("error", "Something went wrong while fetching customers.");
    }
    state.isTableLoading = false;
}

function previous() {
    if (currentTablePage > 1) {
        currentTablePage--;
        fetchCustomers();
    }
}

function next() {
    if (currentTablePage < state.customers.pagination.totalPages) {
        currentTablePage++;
        fetchCustomers();
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
    fetchCustomers();
}

const customerToEdit = ref<number | null>(null);

async function saveCustomer() {
    try {
        const customerData = {
            firstname: customer.value.firstname,
            lastname: customer.value.lastname,
            email: customer.value.email,
            phone: customer.value.phone,
            address: customer.value.address,
            is_active: customer.value.is_active,
        };

        let response;

        if (customerToEdit.value) {
            // Update existing customer.
            response = await customerService.updateCustomer(customerToEdit.value, customerData);
            if (response) {
                successAlert(`${t('alert.Success')}!`, `${t('alert.customerSuccessfullyUpdated')}.`);
            } else {
                errorAlert(`${t('alert.Error')}!`, `${t('alert.customerUpdateFailed')}.`);
            }
        } else {
            // Create new customer.
            response = await customerService.createCustomer(customerData);
            if (response) {
                successAlert(`${t('alert.Success')}!`, `${t('alert.customerSuccessfullyCreated')}.`);
            } else {
                errorAlert(`ERROR!`, `${t('alert.customerCreationFailed')}.`);
            }
        }

        fetchCustomers(); // Refresh the customer list.
        toggleForm(); // Hide the form after save.
    } catch (error: any) {
        console.error('Error saving customer:', error.message);
        errorAlert(`ERRRORYAWA!`, `${t('alert.errorOccurredWhileSavingCustomer')}.`);
    }
}

//Filters
function firstnameFilter(event: Event) {
    const input = (event.target as HTMLInputElement).value;
   
    (event.target as HTMLInputElement).value = input.replace(/[^a-zA-Z\s]/g, '');

    customer.value.firstname = (event.target as HTMLInputElement).value;
}

function lastnameFilter(event: Event) {
    const input = (event.target as HTMLInputElement).value;
   
    (event.target as HTMLInputElement).value = input.replace(/[^a-zA-Z\s]/g, '');
    
    customer.value.lastname = (event.target as HTMLInputElement).value;
}

// View customer function
function viewCustomer(id: number) {
    const selectedCustomer = state.customers.data.find(c => c.id === id);
    if (selectedCustomer) {
        customer.value = { ...selectedCustomer }; 
        customerToView.value = id;
    } else {
        console.error(`Customer with ID ${id} not found.`);
        errorAlert(`${t('alert.Error')}!`, `${t('alert.errorOccuredWhileViewingCustomer')}.`);
    }
}

const customerToView = ref<number | null>(null);

//async function deleteCustomer(id: number) {
  //  try {
    //    const response = await customerService.deleteCustomer(id);
      //  successAlert(`${t('alert.Success')}!`, `${t('alert.customerHasBeenDeleted')}.`);
        //fetchCustomers();
   // } catch (error: any) {
     //   errorAlert(`${t('alert.Error')}!`, `${t('alert.customerDeletionFailed')}.`);
       // console.error(error.message);
   // }
//}

function editCustomer(id: number) {
    const selectedCustomer = state.customers.data.find(c => c.id === id);

    if (selectedCustomer) {
        customer.value = { ...selectedCustomer };
        customerToEdit.value = id;
        showForm.value = true;
    } else {
        errorAlert(`${t('alert.Error')}!`, `${t('alert.customerNotFound' + ' With ID:' + { id })}.`);
    }
}

const showForm = ref(false);

function toggleForm() {
    showForm.value = !showForm.value;
    if (!showForm.value) {
        customer.value = {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
            is_active: true, 
        };
        customerToEdit.value = null;
    }
}

const searchQuery = ref('');  

function sanitizeSearchQuery() {
    // Replace any character that's not a letter with an empty string
    searchQuery.value = searchQuery.value.replace(/[^a-zA-Z]/g, '');
}

const filteredData = computed(() => {
    if (!searchQuery.value) {
        return state.customers.data;  // Return all customers if no search query
    }

    const firstLetter = searchQuery.value.charAt(0).toLowerCase(); 
    const filtered = state.customers.data.filter(customer =>
        customer.firstname.toLowerCase().startsWith(firstLetter)
    );

    return filtered ;
});


</script>
