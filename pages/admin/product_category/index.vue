<template>
    <NuxtLayout name="admin">
        <main>

            <Head>
                <Title>Category - {{ runtimeConfig.public.appName }}</Title>
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
                    <!-- Adjustment Button -->
                    <div class="mt-4 sm:ml-16 sm:mt-3 sm:flex-none mr-7">
                        <button type="button" @click="toggleForm"
                            class="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Add Category
                        </button>
                    </div>
                </div>
                
                <!--View Details-->
                <div v-if="categoryToView" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div class="bg-white rounded-lg shadow-lg p-5 w-full max-w-sm">
                    <div class="text-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-800">Product Category Details</h2>
                    </div>

                    <!-- Category Details -->
                    <div class="text-center mt-10 mr-13">
                        <label class="text-m font-semibold font-medium text-gray-700">Category: </label>
                        <span class="text-m  text-gray-900">
                            {{ state.categories.data.find(c => c.id === categoryToView)?.name }}
                        </span>
                    </div>

                    <!-- Close Button aligned to the right -->
                    <div class="flex justify-end mt-6">
                        <button @click="categoryToView = null"
                            class="rounded-md bg-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
                            Close
                        </button>
                    </div>
                </div>
            </div>

            <!-- Category Form -->
            <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                    <form @submit.prevent="saveCategory">
                        <div class="text-center mb-7">
                            <h2 class="text-xl font-semibold text-gray-800">Category Details</h2>
                        </div>
                        <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                            <!-- Category Name Field -->
                            <div class="mb-1">
                                <label class="block text-sm font-medium text-gray-700 ml-1 mb-1">Catgory Name</label>
                                <FormTextField id="categoryname" name="categoryname" v-model="category.name"
                                    placeholder="Category Name" required @input="filterOnlyLetters" />
                                <FormError :error="v$?.category.isactive?.isactive?.$errors[0]?.$message.toString()" />
                                <FormError :error="state?.error?.errors?.name?.[0]" />
                            </div>

                            <div class="mb-1">
                                <label class="block text-sm font-medium text-gray-700 ml-1">Status</label>
                                <FormSelectField v-model="category.isActive" :options="activeInactiveOptions" />
                                <FormError :error="v$.category.isActive.$errors[0]?.$message.toString()" />
                                <FormError :error="state?.error?.errors?.isactive?.[0]" />
                            </div>

                            <!-- Action Buttons -->
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

            <!-- Product Table -->
            <div>
                <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                <div class="table-responsive">
                    <Table :columnHeaders="state.columnHeaders" :data="filteredData" 
                                :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">
                                <template #body
                                    v-if="!(state.isTableLoading || (filteredData && filteredData.length === 0))">
                                    <tr v-for="(category, index) in filteredData" :key="index">
                                <td class="pl-3">
                                    {{ category.name }}
                                </td>
                                <td>
                                    <span class="ml-2"
                                        :class="category.is_active ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20' : 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'">
                                        {{ category.is_active ? 'Active' : 'Inactive' }}
                                    </span>
                                </td>
                                <td class="px-4 py-2 text-xxs text-gray-700 pl-3">
                                    <div class="flex space-x-2">
                                        <button @click="viewCategory(category.id)"
                                            class="text-gray-600 hover:text-gray-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"
                                                fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M12 4.5C8.798 4.5 6 7.057 6 10.5S8.798 16.5 12 16.5 18 13.943 18 10.5 15.202 4.5 12 4.5ZM12 15.5C10.343 15.5 9 14.156 9 12.5S10.343 9.5 12 9.5 15 10.844 15 12.5 13.657 15.5 12 15.5ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 12S7.03 4 12 4s9 4.03 9 9-4.03 9-9 9Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>

                                        <button @click="editCategory(category.id)"
                                            class="text-gray-600 hover:text-gray-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    d="M17.414 2.586a2 2 0 00-2.828 0l-10 10V16a1 1 0 001 1h3.414l10-10a2 2 0 000-2.828l-1.586-1.586zM5 13l-1.5 1.5V13h1.5zm4.5-4.5L14 4l2 2-4.5 4.5H9.5V8.5z" />
                                            </svg>
                                        </button>
                                        <button @click="deleteCategory(category.id)"
                                            class="text-red-600 hover:text-red-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path fill-rule="evenodd"
                                                    d="M6 2a2 2 0 00-2 2v1H2v2h1v9a2 2 0 002 2h8a2 2 0 002-2V7h1V5h-2V4a2 2 0 00-2-2H6zm4 12a1 1 0 102 0V8a1 1 0 10-2 0v6zm-3-1a1 1 0 002 0V8a1 1 0 10-2 0v5zm8-1a1 1 0 10-2 0V8a1 1 0 102 0v5z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </Table>
                </div>
                <Pagination :data="state.categories" @previous="previous"  @next="next" />
            </div>
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { ref, reactive, onMounted } from 'vue';
import type { Error } from '@/types/error';
import { productCategoryService } from '~/components/api/admin/ProductCategoryService';
import { useAlert } from '@/composables/alert';
import { useI18n } from 'vue-i18n';

// Alert and i18n setup
const { successAlert } = useAlert();
const { errorAlert } = useAlert();
const { warningAlert } = useAlert();
const { t } = useI18n()

const runtimeConfig = useRuntimeConfig();
let currentTablePage = 1;

interface SortData {
    sortField: string;
    sortOrder: "ascend" | "descend" | null;
}

interface Category {
    data: any[];
}

const state = reactive({
    columnHeaders: [
        { name: "Product Category Name", sorter: true, key: "categoryName" },
        { name: "Status", sorter: true, key: "isActive" },
        { name: "Actions", key: "actions" },
    ],
    error: null as Error | null,
    isTableLoading: false,
    sortData: { sortField: 'id', sortOrder: 'ascend' } as SortData,
    categories: { data: [] } as Category,
});

const showForm = ref(false);

onMounted(() => {
    fetchProductCategory();
   // warningAlert('Warning', 'This feature is not yet implemented.');
});

const activeInactiveOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
];

const rules = computed(() => ({
    category: {
        name: {
            required: helpers.withMessage('This field is required.', required),
        },
        isActive: {
            required: helpers.withMessage('This field is required.', required),
        },
    },
}));

const category = ref({
    name: '',
    isActive: true,
});


// Pass only the form data to useVuelidate
const v$ = useVuelidate(rules, { category });

function toggleForm() {
    showForm.value = !showForm.value;
    category.value = { name: category.value.name, isActive: category.value.isActive }; // Reset form when toggling
}


async function fetchProductCategory() {
    state.error = null;
    state.isTableLoading = true;
    try {
        const params = {
            page: currentTablePage,
            sortField: state.sortData.sortField,
            sortOrder: state.sortData.sortOrder,
        };
        const response = await productCategoryService.getProductCategories();
        state.categories = response;
        console.log(response);
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
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
    fetchProductCategory();
}

const categoryToEdit = ref<number | null>(null);

async function saveCategory() {
    v$.value.$touch();
    if (v$.value.$invalid) {
        console.log('Form validation failed. Please check the input fields.');
        return;
    }
    try {
        const categoryData = {
            name: category.value.name,
            is_active: category.value.isActive,
        };
        console.log("Product Category:" + categoryData.name);
        console.log("is Active: " + categoryData.is_active);
        let response;

        if (categoryToEdit.value) {
            // Update category
            response = await productCategoryService.updateProductCategory(categoryToEdit.value, categoryData);
            successAlert(`${t('alert.Success')}!`, `Product Category updated successfully!`);
        } else {
            // Create new category
            response = await productCategoryService.createProductCategory(categoryData);
            successAlert(`${t('alert.Success')}!`, `Product Category created successfully!`);
        }

        fetchProductCategory(); // Refresh the category list
        toggleForm(); // Close the form
    } catch (error: any) {
        console.error('Error saving category:', error.message);
        alert('An error occurred while saving the category.');
    }
}

const categoryToView = ref<number | null>(null);
function viewCategory(id: number) {
    const selectedCategory = state.categories.data.find(c => c.id === id);

    if (selectedCategory) {
        categoryToView.value = id;
    } else {
        console.error(`Category with ID ${id} not found.`);
    }
}

function filterOnlyLetters(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    // Replace all non-letter characters with an empty string
    (event.target as HTMLInputElement).value = input.replace(/[^a-zA-Z\s]/g, '');
    // Update the category name model
    category.value.name = (event.target as HTMLInputElement).value;
}


// Update category function.
function editCategory(id: number) {
    const selectedCategory = state.categories.data.find(c => c.id === id);

    if (selectedCategory) {
        category.value = { ...selectedCategory };
        categoryToEdit.value = id;
        showForm.value = true;
        category.value.isActive = true;
    } else {
        console.error(`Category with ID ${id} not found.`);
    }
}

// Delete category function.
async function deleteCategory(id: number) {
    try {
        const response = await productCategoryService.deleteProductCategory(id);
        if (response == true) {
            successAlert(`${t('alert.Success')}!`, `Product Category deleted sucessfully!`);
        }
        else {
            errorAlert(`${t('alert.Error')}!`, `'Product Category deletion failed.'`);
        }
        fetchProductCategory();
    } catch (error: any) {
        console.error(error.message);
    }
}

function previous() {
    currentTablePage--;
    fetchProductCategory();

}

function next() {
    currentTablePage++;
    fetchProductCategory();

}

const searchQuery = ref('');  

function sanitizeSearchQuery() {
    searchQuery.value = searchQuery.value.replace(/[^a-zA-Z]/g, '');
}

const filteredData = computed(() => {
    if (!searchQuery.value) {
        return state.categories.data; // Return all categories if no search query
    }

    const firstLetter = searchQuery.value.charAt(0).toLowerCase();
    const filtered = state.categories.data.filter(category =>
        category.name.toLowerCase().startsWith(firstLetter) // Use the correct property, e.g., 'name'
    );

    console.log('Filtered Data:', filtered); // Debugging output
    return filtered;
});


</script>