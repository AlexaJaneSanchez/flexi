<template>
    <NuxtLayout name="admin">
        <main class="w-full mx-auto">
            <Head>
                    <Title>Product Details - {{ runtimeConfig.public.appName }}</Title>
                </Head>
            <div>
                <!-- Product Form -->
                <div class="text-center">
                            <h2 class="bg-white text-lg font-bold mb-10">PRODUCT DETAILS</h2>
                        </div>
                            <hr class="border-t-2 border-gray-300 mb-6" />
                            <Alert type="danger" :text="state?.error?.message" v-if="state.error?.message && state.error.message.length > 0" />
                            <div class="grid grid-cols-2 gap-4 mt-3 mx-2">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Category ID</label>
                                    <div class="flex items-center mb-1">
                                        <FormSelect id="product_category_id" v-model="product.product_category_id"
                                            :options="state.categories.filter(category => category.is_active).map(category => ({ value: category.id, label: category.name }))"
                                            placeholder="Select a category" required />
                                        <FormError :error="state?.error?.errors?.product_category_id?.[0]" />
                                    </div>

                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Barcode</label>
                                    <div class="flex items-center mb-1">
                                        <FormTextField id="barcode" name="barcode" v-model="product.barcode" placeholder="Barcode" required />
                                        <FormError :error="state?.error?.errors?.barcode?.[0]" />
                                    </div>

                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Product Name</label>
                                    <div class="flex items-center mb-1">
                                        <FormTextField id="productname" name="productname" v-model="product.name" placeholder="Product Name" required @input="filterProductName" />
                                        <FormError :error="state?.error?.errors?.name?.[0]" />
                                    </div>

                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Brand Name</label>
                                    <div class="flex items-center mb-1">
                                        <FormTextField id="brandname" name="brandname" v-model="product.brand" placeholder="Brand Name" required  @input="filterBrandName"/>
                                        <FormError :error="state?.error?.errors?.brand?.[0]" />
                                    </div>

                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Wholesale Unit</label>
                                    <div class="flex items-center mb-1">
                                        <FormSelect id="wholesaleunit" name="wholesaleunit" v-model="product.wholesale_unit"
                                            :options="wholesaleUnitOptions" placeholder="Wholesale Unit" />
                                        <FormError :error="state?.error?.errors?.wholesale_unit?.[0]" />
                                    </div>

                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Retail Unit</label>
                                    <div class="flex items-center mb-1">
                                        <FormNumberField id="retailunit" name="retailunit" v-model="product.retail_unit" placeholder="Retail Unit" required/>
                                        <FormError :error="state?.error?.errors?.retail_unit?.[0]" />
                                    </div>
                                    </div>

                                    <div>
                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Retail Quantity</label>
                                    <div class="flex items-center mb-1">
                                        <FormNumberField id="wholesale_quantity" name="wholesale_quantity" v-model="product.wholesale_quantity" min="0" placeholder="Retail Qty" required/>
                                        <FormError :error="state?.error?.errors?.wholesale_quantity?.[0]" />
                                    </div>

                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Reorder Point</label>
                                    <div class="flex items-center mb-1">
                                        <FormNumberField id="reorder_point" name="reorder_point" v-model="product.reorder_point" min="0" placeholder="Reorder Point" required />
                                        <FormError :error="state?.error?.errors?.reorder_point?.[0]" />
                                    </div>

                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Markup</label>
                                    <div class="flex items-center mb-1">
                                        <FormNumberField id="markup" name="markup" v-model="product.markup" min="0" max="100" placeholder="Markup" required/>
                                        <span></span>
                                        <FormError :error="state?.error?.errors?.markup?.[0]" />
                                    </div>

                                    <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Quantity Onhand</label>
                                    <div class="flex items-center mb-1">
                                        <FormNumberField id="quantity_onhand" name="quantity_onhand" v-model="product.quantity_onhand" placeholder="0" value="0" readonly class="cursor-default bg-gray-200" />
                                    </div>

                                    <div class="mb-1">
                                        <label class="block text-sm font-medium text-gray-700 ml-1 mb-3 mt-4">Status</label>
                                        <FormSelectField v-model="selectedIsActive" :options="activeInactiveOptions" />
                                        <FormError :error="state?.error?.errors?.is_active?.[0]" />
                                    </div>
                                </div>

                            </div>
                            <div class="flex justify-end gap-2 mt-9">
                                <FormButton @click="saveProduct" buttonStyle="success" class="w-32 py-2 px-4 text-sm">
                                    Save
                                </FormButton>
                                <FormButton @click="cancelProduct" buttonStyle="xxx" class="w-32 py-2 px-4 text-sm mr-5">
                                    Cancel
                                </FormButton>
                            </div>
                    </div>
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { productService } from '~/components/api/admin/ProductService.js';
import { productCategoryService } from '@/components/api/admin/ProductCategoryService.js';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import type { Error } from '@/types/error';
import { useI18n } from 'vue-i18n';


const runtimeConfig = useRuntimeConfig();
let currentTablePage = 1;


const { errorAlert } = useAlert();
const { successAlert } = useAlert();
const { t } = useI18n()

const activeInactiveOptions = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
];

const selectedIsActive = computed({
    get: () => product.value.is_active,
    set: (newValue: boolean) => {
        product.value.is_active = newValue;
    }
});

interface SortData {
    sortField: string;
    sortOrder: "ascend" | "descend" | null;
}

interface Products {
    data: any[];
}

interface ProductCategory {
    id: number;
    name: string;
    is_active: boolean;
}

const wholesaleUnitOptions = [
    { value: 'PC', label: 'PC' },
    { value: 'BOX', label: 'BOX' },
    { value: 'BOTTLE', label: 'BOTTLE' }
];

const state = reactive({
    columnHeaders: [
        { name: "Barcode", sorter: true, key: "barcode" },
        { name: "Product Name", sorter: true, key: "productname" },
        { name: "Category", sorter: true, key: "productcategory" },
        { name: "Brand", sorter: true, key: "brandname" },
        { name: "Quantity on Hand", sorter: true, key: "quantity_onhand" },
        { name: "Wholesale", sorter: true, key: "wholesaleunit" },
        { name: "Retail", sorter: true, key: "retailunit" },
        { name: "Retail Quantity", sorter: true, key: "retailqtyperwholesaleunit" },
        { name: "Current Price", sorter: true, key: "current_price" },
        { name: "Reorder Point", sorter: true, key: "reorderpoint" },
        { name: "Markup", sorter: true, key: "markup" },
        { name: "Status", sorter: true, key: "is_active" },
        { name: "Actions", key: "actions" },
    ],
    error: null as Error | null,
    isTableLoading: false,
    sortData: { sortField: "", sortOrder: null } as SortData,
    products: { data: [] } as Products,
    categories: [] as ProductCategory[],
});

onMounted(() => {
    fetchProducts();
    fetchProductCategory();
});

async function fetchProductCategory() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const response = await productCategoryService.getProductCategories();
        state.categories = response.data; // Adjust if necessary based on API response structure
        console.log('Fetched categories:', response.data); // Log fetched categories
        state.products.data.forEach(product => {
            const selectedCategory = state.categories.find(category => category.id === product.product_category_id);
            product.categoryname = selectedCategory ? selectedCategory.name : 'Unknown'; // Fallback if category not found
        });
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}

async function fetchProducts() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const params = {
            page: currentTablePage,
            sortField: state.sortData.sortField,
            sortOrder: state.sortData.sortOrder,
        };
        const response = await productService.getProducts();
        fetchProductCategory();
        state.products = response;
        console.log(response);
    } catch (error: any) {
        state.error = error;
    }
    state.isTableLoading = false;
}

const rules = computed(() => ({
    product: {
        product_category_id: {
            required: helpers.withMessage('This field is required.', required),
        },
        categoryname: {
            required: helpers.withMessage('This field is required.', required),
        },
        barcode: {
            required: helpers.withMessage('This field is required.', required),
        },
        name: {
            required: helpers.withMessage('This field is required.', required),
        },
        brand: {
            required: helpers.withMessage('This field is required.', required),
        },
        quantity_onhand: {
            required: helpers.withMessage('This field is required.', required),
        },
        wholesale_unit: {
            required: helpers.withMessage('This field is required.', required),
        },
        retail_unit: {
            required: helpers.withMessage('This field is required.', required),
        },
        wholesale_quantity: {
            required: helpers.withMessage('This field is required.', required),
        },
        reorder_point: {
            required: helpers.withMessage('This field is required.', required),
        },
        markup: {
            required: helpers.withMessage('This field is required.', required),
        },
        is_active: {
            required: helpers.withMessage('This field is required.', required),
        },
    },
}));

const product = ref({
    product_category_id: null,
    categoryname: '',
    barcode: '',
    name: '',
    brand: '',
    wholesale_unit: '',
    retail_unit: '',
    wholesale_quantity: '',
    reorder_point: '',
    markup: '',
    is_active: true,
    quantity_onhand: '0',
});

const v$ = useVuelidate(rules, { product });

const productToEdit = ref<number | null>(null);

// Watch for changes to the selected product category ID
watch(() => product.value.product_category_id, (id) => {
    const selectedCategory = state.categories.find(category => category.id === id);
    product.value.categoryname = selectedCategory ? selectedCategory.name : '';
});

async function saveProduct() {
    try {
        console.log('Product before save:', product.value);
        const products = {
            product_category_id: product.value.product_category_id,
            barcode: product.value.barcode,
            name: product.value.name,
            brand: product.value.brand,
            quantity_onhand: 0,
            wholesale_unit: product.value.wholesale_unit,
            retail_unit: product.value.retail_unit,
            wholesale_quantity: product.value.wholesale_quantity,
            current_price: 0,
            reorder_point: product.value.reorder_point,
            markup: product.value.markup,
            is_active: product.value.is_active,
        };

        let response;

        if (productToEdit.value) {
            // Update existing product.
            response = await productService.updateProduct(productToEdit.value, products);
            successAlert(`${t('alert.Success')}!`, `Product updated successfully!`);
        } else {
            // Create new product.
            response = await productService.createProduct(products);
            successAlert(`${t('alert.Success')}!`, `Product created successfully!`);
        }

        fetchProducts(); // Refresh the product list.
        fetchProductCategory(); // Fetch categories
        cancelProduct(); // Hide the form after save
        navigateTo('/admin/products'); // Navigate to the products page after save

    } catch (error: any) {
        console.error('Error saving product:', error.message);
        errorAlert(`${t('alert.Error')}!`, `${t('alert.errorOccurredWhileSavingProduct')}.`);
    }
}

const showForm = ref(false);

function cancelProduct() {
    showForm.value = !showForm.value;
    if (!showForm.value) {
        product.value = {
            product_category_id: null,
            categoryname: '',
            barcode: '',
            name: '',
            brand: '',
            wholesale_unit: '',
            retail_unit: '',
            wholesale_quantity: '',
            reorder_point: '',
            markup: '',
            is_active: true,
            quantity_onhand: '0',
        };
        
        productToEdit.value = null;
        navigateTo('/admin/products');

    }
}

function filterProductName(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const filteredInput = input.replace(/[^a-zA-Z\s]/g, '');
    (event.target as HTMLInputElement).value = filteredInput; 
    product.value.name = filteredInput; 
}

function filterBrandName(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const filteredInput = input.replace(/[^a-zA-Z\s]/g, ''); 
    (event.target as HTMLInputElement).value = filteredInput; 
    product.value.brand = filteredInput; 
}

</script>

