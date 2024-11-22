<template>
    <NuxtLayout name="default">
        <main>

            <!-- Add Category Button -->
            <div class="mt-4 sm:ml-16 sm:mt-3 sm:flex-none mr-6">
                <button type="button" @click="toggleForm()"
                    class="block rounded-md bg-gray-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Add Category
                </button>
            </div>
            <div v-if="categoryToView" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                    <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                        <div class="flex items-center mb-1 ml-7">
                            <label class="text-xxs font-medium text-gray-700 w-20 mr-2">Category:</label>
                            <span>{{ state.categories.data.find(c => c.categoryID ===
                                categoryToView)?.productcategoryname }}</span>
                        </div>
                        <button @click="categoryToView = null"
                            class="rounded-md bg-gray-200 px-4 py-2 text-xxs font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
                            Close
                        </button>
                    </div>
                </div>
            </div>

            <!-- Category Form -->
            <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                    <form @submit.prevent="saveCategory">
                        <div class="grid grid-cols-1 gap-1 mt-3 mx-2">
                            <!-- Category Name Field -->
                            <div class="flex items-center mb-1 ml-7">
                                <label for="categoryName" class="text-xxs font-medium text-gray-700 w-20 mr-2">Product
                                    Category Name:</label>
                                <input id="categoryName" v-model="category.productcategoryname"
                                    class="block flex-1 rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-xxs px-3 py-2"
                                    required>
                            </div>
                            <!-- isActive Field -->
                            <div class="flex items-center mb-1 ml-7">
                                <label for="isActive"
                                    class="text-xxs font-medium text-gray-700 w-20 mr-2">Active</label>
                                <FormCheckbox id="isActive" v-model="category.isActive" checked="true" />
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex justify-end gap-2 mt-4">
                                <button type="submit"
                                    class="rounded-md bg-gray-900 px-4 py-2 text-xxs font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                                    Save
                                </button>
                                <button @click="toggleForm()" type="button"
                                    class="rounded-md bg-gray-200 px-4 py-2 text-xxs font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Product Table -->
            <div>
                <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                <div class="table-responsive">
                    <Table :columnHeaders="state.columnHeaders" :data="state.categories"
                        :isLoading="state.isTableLoading" :sortData="state.sortData" @sort="sort">
                        <template #body v-if="!state.isTableLoading && state.categories?.data.length">
                            <tr v-for="(category, index) in state.categories?.data" :key="index">
                                <td class="pl-3">
                                    {{ category.productcategoryname }}
                                </td>
                                <td>
                                    <span class="ml-2"
                                        :class="category.isactive
                                            ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
                                            : 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'">
                                        {{ category.isactive ? 'Active' : 'Inactive' }}
                                    </span>
                                </td>
                                <td class="px-4 py-2 text-xxs text-gray-700 pl-3">
                                    <div class="flex space-x-2">
                                        <button @click="viewCategory(category.categoryID)"
                                            class="text-gray-600 hover:text-gray-900">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"
                                                fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M12 4.5C8.798 4.5 6 7.057 6 10.5S8.798 16.5 12 16.5 18 13.943 18 10.5 15.202 4.5 12 4.5ZM12 15.5C10.343 15.5 9 14.156 9 12.5S10.343 9.5 12 9.5 15 10.844 15 12.5 13.657 15.5 12 15.5ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM12 20C7.03 20 3 15.97 3 12S7.03 4 12 4s9 4.03 9 9-4.03 9-9 9Z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>

                                        <button @click="editCategory(category.categoryID)"
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
                <Pagination :data="state.categories" @previous="previous" @next="next" />
            </div>
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { productCategoryService } from '~/components/api/admin/ProductCategoryService';

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
        { name: "Active", sorter: true, key: "isActive" },
        { name: "Actions", key: "actions" },
    ],
    error: null as Error | null,
    isTableLoading: false,
    sortData: { sortField: "", sortOrder: null } as SortData,
    categories: { data: [] } as Category,
});

const showForm = ref(false);

onMounted(() => {
    fetchProductCategory();
});

const category = ref({
    productcategoryname: '',

    isActive: true,
});

function toggleForm() {
    showForm.value = !showForm.value;
    category.value = { productcategoryname: category.value.productcategoryname, isActive: category.value.isActive }; // Reset form when toggling
}


async function fetchProductCategory() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const params = {
            page: currentTablePage,
            sortField: state.sortData.sortField,
            sortOrder: state.sortData.sortOrder,
        };
        const response = await productCategoryService.getProductCategories();
        state.categories = response;
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}
function previous() {
    if (currentTablePage > 1) {
        currentTablePage--;
        fetchProductCategory();
    }
}

function next() {
    currentTablePage++;
    fetchProductCategory();
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
    try {
        const categoryData = {
            productcategoryname: category.value.productcategoryname,
            isactive: category.value.isActive,
        };
        console.log("Product Category:" + categoryData.productcategoryname);
        console.log("is Active:" + categoryData.isactive);
        let response;

        if (categoryToEdit.value) {
            // Update category
            response = await productCategoryService.updateProductCategory(categoryToEdit.value, categoryData);
            alert(response ? 'Category has been updated!' : 'Category update failed!');
        } else {
            // Create new category
            response = await productCategoryService.createProductCategory(categoryData);
            alert(response ? 'Category has been added!' : 'Category creation failed!');
        }

        fetchProductCategory(); // Refresh the category list
        toggleForm(); // Close the form
    } catch (error: any) {
        console.error('Error saving category:', error.message);
        alert('An error occurred while saving the category.');
    }
}

const categoryToView = ref<number | null>(null);
function viewCategory(categoryID: number) {
    const selectedCategory = state.categories.data.find(c => c.productCategoryId === categoryID);

    if (selectedCategory) {
        categoryToView.value = categoryID;
    } else {
        console.error(`Category with ID ${categoryID} not found.`);
    }
}

// Update category function.
function editCategory(categoryID: number) {
    const selectedCategory = state.categories.data.find(c => c.categoryID === categoryID);

    if (selectedCategory) {
        category.value = { ...selectedCategory };
        categoryToEdit.value = categoryID;
        showForm.value = true;
    } else {
        console.error(`Category with ID ${categoryID} not found.`);
    }
}

// Delete category function.
async function deleteCategory(categoryID: number) {
    try {
        const response = await productCategoryService.deleteProductCategory(categoryID);
        alert(response ? 'Category has been deleted!' : 'Category deletion failed!');
        fetchProductCategory();
    } catch (error: any) {
        console.error(error.message);
    }
}

</script>