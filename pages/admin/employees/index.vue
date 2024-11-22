<template>
    <div>
        <NuxtLayout name="admin">
            <main>

                <Head>
                    <Title>Employees - {{ runtimeConfig.public.appName }}</Title>
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

                    <!-- Add Product Button -->
                    <div class="mt-4 sm:ml-16 sm:mt-3 sm:flex-none mr-6">
                        <button type="button" @click="toggleForm"
                            class="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            ADD EMPLOYEE
                        </button>
                    </div>
                </div>

                <!-- Employee Form -->
                <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <form @submit.prevent="saveEmployee">
                            <div class="text-center mb-7">
                            <h2 class="text-xl font-semibold text-gray-800">Employee Details</h2>
                        </div>
                            <Alert type="danger" :text="state?.error?.message"
                                v-if="state.error?.message && state.error.message.length > 0" />
                            <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                                <label class="block text-sm font-medium text-gray-700 ml-1 mt-1">First Name</label>
                                <div class="flex items-center">
                                    <FormTextField for="firstname" name="firstname" v-model="employee.firstname"
                                        placeholder="First Name" required  @input="firstnameFilter"/>
                                </div>
                                <label class="block text-sm font-medium text-gray-700 ml-1">Last Name</label>
                                <div class="flex items-center mb-1">
                                    <FormTextField for="lastname" name="lastname" v-model="employee.lastname"
                                        placeholder="Last Name" required @input="lastnameFilter"/>
                                </div>
                                <label class="block text-sm font-medium text-gray-700 ml-1">Email</label>
                                <div class="flex items-center mb-1">
                                    <FormTextField for="email" name="email" v-model="employee.email" placeholder="Email"
                                        required />
                                </div>
                                <label class="block text-sm font-medium text-gray-700 ml-1">Phone Number</label>
                                <FormTextField
                                    for="phone" name="phone" v-model="employee.phone" placeholder="Phone Number"
                                    required :maxlength="11" :inputmode="'numeric'" @input="validatePhoneNumber" @keypress="limitPhoneLength"
                                />
                                <label class="block text-sm font-medium text-gray-700 ml-1">Designation</label>
                                <div class="flex items-center mb-1">
                                <FormTextField for="designation" name="designation" v-model="employee.designation"
                                        placeholder="Designation" @input="designationFilter"/>
                                </div>
                                <label class="block text-sm font-medium text-gray-700 ml-1 mt-1">Status</label>
                                <div class="mb-1">
                                    <FormSelectField v-model="selectedIsActive" :options="activeInactiveOptions" />
                                    <FormError :error="state?.error?.errors?.is_active?.[0]" />
                                </div>
                                <div class="flex justify-end gap-2 mt-9">
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
                <div v-if="employeeToView"
                    class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div class="text-center mb-7">
                            <h2 class="text-xl font-semibold text-gray-800">Employee Details</h2>
                        </div>
                        <div class="grid grid-cols-1 gap-2 mt-3 mx-2 ml-10">
                            <div class="flex items-center mb-1">
                                <label class="text-xxs font-medium text-gray-700 w-32 mr-2">Firstname:</label>
                                <span>{{ state.employees.data.find(e => e.id === employeeToView)?.firstname }}</span>
                            </div>
                            <div class="flex items-center mb-1">
                                <label class="text-xxs font-medium text-gray-700 w-32 mr-2">Lastname:</label>
                                <span>{{ state.employees.data.find(e => e.id === employeeToView)?.lastname }}</span>
                            </div>
                            <div class="flex items-center mb-1">
                                <label class="text-xxs font-medium text-gray-700 w-32 mr-2">Email:</label>
                                <span>{{ state.employees.data.find(e => e.id === employeeToView)?.email }}</span>
                            </div>
                            <div class="flex items-center mb-1">
                                <label class="text-xxs font-medium text-gray-700 w-32 mr-2">Phone Number:</label>
                                <span>{{ state.employees.data.find(e => e.id === employeeToView)?.phone }}</span>
                            </div>
                            <div class="flex items-center mb-1">
                                <label class="text-xxs font-medium text-gray-700 w-32 mr-2">Designation:</label>
                                <span>{{ state.employees.data.find(e => e.id === employeeToView)?.designation }}</span>
                            </div>
                            <div class="flex items-center mb-1">
                                <label class="text-xxs font-medium text-gray-700 w-32 mr-2">Status:</label>
                                <span class="ml-1"
                                    :class="employee.is_active
                                        ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
                                        : 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'">
                                    {{ employee.is_active ? 'Active' : 'Inactive' }}
                                </span>
                            </div>
                            <div class="flex justify-end gap-2 mt-4">
                                <button @click="employeeToView = null"
                                    class="rounded-md bg-gray-200 px-4 py-2 text-xxs font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!--Employee Table-->
                <div>
                    <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                    <div class="table-responsive ">
                        <Table :columnHeaders="state.columnHeaders" :data="filteredData" 
                                :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">
                                <template #body
                                    v-if="!(state.isTableLoading || (filteredData && filteredData.length === 0))">
                                    <tr v-for="(employee, index) in filteredData" :key="index">
                                    <td>
                                        <span class="truncate ml-3">{{ employee.firstname }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-3">{{ employee.lastname }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ employee.email }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2">{{ employee.phone }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-3">{{ employee.designation }}</span>
                                    </td>
                                    <td>
                                        <span class="ml-2"
                                            :class="employee.is_active
                                                ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
                                                : 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'">
                                            {{ employee.is_active ? 'Active' : 'Inactive' }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-2 text-xxs text-gray-700 ">
                                        <div class="flex space-x-2">
                                            <button @click="viewEmployee(employee.id)"
                                                class="text-gray-600 hover:text-gray-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M12 4.5C8.798 4.5 6 7.057 6 10.5S8.798 16.5 12 16.5 18 13.943 18 10.5 15.202 4.5 12 4.5ZM12 15.5C10.343 15.5 9 14.156 9 12.5S10.343 9.5 12 9.5 15 10.844 15 12.5 13.657 15.5 12 15.5ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 12S7.03 4 12 4s9 4.03 9 9-4.03 9-9 9Z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>

                                            <button @click="editEmployee(employee.id)"
                                                class="text-gray-600 hover:text-gray-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        d="M17.414 2.586a2 2 0 00-2.828 0l-10 10V16a1 1 0 001 1h3.414l10-10a2 2 0 000-2.828l-1.586-1.586zM5 13l-1.5 1.5V13h1.5zm4.5-4.5L14 4l2 2-4.5 4.5H9.5V8.5z" />
                                                </svg>
                                            </button>
                                           <!--<button @click="deleteEmployee(employee.id)"
                                                class="text-red-600 hover:text-red-900">
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
                    <Pagination :data="state.employees" @previous="previous" @next="next" />
                </div>
            </main>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { employeeService } from '~/components/api/admin/EmployeeService';
import type { Error } from '@/types/error';
import { useI18n } from 'vue-i18n';
import { helpers, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const activeInactiveOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
];

const selectedIsActive = computed({
    get: () => employee.value.is_active,
    set: (newValue: boolean) => {
        employee.value.is_active = newValue;
    }
});

const runtimeConfig = useRuntimeConfig();
let currentTablePage = 1;

interface SortData {
    sortField: string;
    sortOrder: "ascend" | "descend" | null;
}

interface Employees {
    data: any[];
}

const employee = ref({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    designation: '',
    is_active: true,
});

const state = reactive({
    columnHeaders: [
        { name: "First Name", sorter: true, key: "firstname" },
        { name: "Last Name", sorter: true, key: "lastname" },
        { name: "Email", sorter: true, key: "email" },
        { name: "Phone Number", sorter: true, key: "phone" },
        { name: "Designation", sorter: true, key: "designation" },
        { name: "Status", sorter: true, key: "is_active" },
        { name: "Actions", key: "actions" },
    ],
    error: null as Error | null,
    isTableLoading: false,
    sortData: { sortField: "", sortOrder: null } as SortData,
    employees: { data: [] } as Employees,
});

const rules = computed(() => ({
    employee: {
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
        designation: {
            required: helpers.withMessage('This field is required.', required),
        },
        isactive: {
            required: helpers.withMessage('This field is required.', required),
        },
    },
}));

const v$ = useVuelidate(rules, { employee });

// Alert and i18n setup
const { successAlert } = useAlert();
const { errorAlert } = useAlert();
const { t } = useI18n()

onMounted(() => {
    fetchEmployees();
});

async function fetchEmployees() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const params = {
            page: currentTablePage,
            sortField: state.sortData.sortField,
            sortOrder: state.sortData.sortOrder,
        };
        const response = await employeeService.getEmployees();
        state.employees = response;
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}

function validatePhoneNumber() {
  // Remove non-numeric characters
  employee.value.phone = employee.value.phone.replace(/\D/g, '');

  // Limit the phone number to 11 digits
  if (employee.value.phone.length > 11) {
    employee.value.phone = employee.value.phone.slice(0, 11); 
  }
}

function limitPhoneLength(event: KeyboardEvent) {
  // Prevent entering more than 11 digits
  if (employee.value.phone.length >= 11) {
    event.preventDefault();
  }

  // Allow only numeric keys, if the key is not a number, prevent input
  if (event.key && !/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
}

function previous() {
    if (currentTablePage > 1) {
        currentTablePage--;
        fetchEmployees();
    }
}

function next() {
    currentTablePage++;
    fetchEmployees();
}

function firstnameFilter(event: Event) {
    const input = (event.target as HTMLInputElement).value;
   
    (event.target as HTMLInputElement).value = input.replace(/[^a-zA-Z\s]/g, '');

    employee.value.firstname = (event.target as HTMLInputElement).value;
}

function lastnameFilter(event: Event) {
    const input = (event.target as HTMLInputElement).value;
   
    (event.target as HTMLInputElement).value = input.replace(/[^a-zA-Z\s]/g, '');
    
    employee.value.lastname = (event.target as HTMLInputElement).value;
}

function designationFilter(event: Event) {
    const input = (event.target as HTMLInputElement).value;
   
    (event.target as HTMLInputElement).value = input.replace(/[^a-zA-Z\s]/g, '');
    
    employee.value.designation = (event.target as HTMLInputElement).value;
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
    fetchEmployees();
}

const employeeToEdit = ref<number | null>(null);

async function saveEmployee() {
    try {
        const products = {
            firstname: employee.value.firstname,
            lastname: employee.value.lastname,
            email: employee.value.email,
            phone: employee.value.phone,
            designation: employee.value.designation,
            is_active: employee.value.is_active,
        };

        let response;

        if (employeeToEdit.value) {
            // Update existing employee
            response = await employeeService.updateEmployee(employeeToEdit.value, products);
            successAlert(`${t('alert.Success')}!`, `Employee updated successfully!`);
        } else {
            // Create new employee
            response = await employeeService.createEmployee(products);
            successAlert(`${t('alert.Success')}!`, `Employee created successfully!`);
        }

        fetchEmployees(); // Refresh the employee list.
        toggleForm(); // Hide the form after save.
    } catch (error: any) {
        console.error('Error saving employee:', error.message);
        errorAlert(`${t('alert.Error')}!`, `${t('alert.errorOccurredWhileSavingEmployee')}.`);
    }
}


const employeeToView = ref<number | null>(null);

function viewEmployee(id: number) {
    const selectedEmployee = state.employees.data.find(e => e.id === id);

    if (selectedEmployee) {
        employeeToView.value = id;
    } else {
        console.error(`Employee with ID ${id} not found.`);
    }
}

// Delete employee function.
//async function deleteEmployee(id: number) {
  //  try {
    //    const response = await employeeService.deleteEmployee(id);
      //  alert(response ? 'Employee has been deleted!' : 'Employee deletion failed!');
        //fetchEmployees();
   // } catch (error: any) {
    //    console.error(error.message);
    //}
//}

// Update employee function.
function editEmployee(id: number) {
    const selectedEmployee = state.employees.data.find(e => e.id === id);

    if (selectedEmployee) {
        employee.value = { ...selectedEmployee };
        employeeToEdit.value = id;
        showForm.value = true;
    } else {
        console.error(`Employee with ID ${id} not found.`);
    }
}

const showForm = ref(false);

function toggleForm() {
    showForm.value = !showForm.value;
    if (!showForm.value) {
        employee.value = {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            designation: '',
            is_active: true,
        };
        employeeToEdit.value = null;
    }
}

const searchQuery = ref('');  

function sanitizeSearchQuery() {
    searchQuery.value = searchQuery.value.replace(/[^a-zA-Z]/g, '');
}

const filteredData = computed(() => {
    if (!searchQuery.value) {
        return state.employees.data;
    }

    const firstLetter = searchQuery.value.charAt(0).toLowerCase();
    const filtered = state.employees.data.filter(employee =>
        employee.firstname.toLowerCase().startsWith(firstLetter) // Use firstname
    );

    console.log('Filtered Data:', filtered); // Debugging output
    return filtered;
});

</script>
