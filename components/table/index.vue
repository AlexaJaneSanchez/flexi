<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th v-for="(item, index) in columnHeaders" :key="index" :width="width" scope="col"
                                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <div class="flex items-center gap-x-2" :class="[
                                            item.textAlign === 'left' && 'text-left',
                                            item.textAlign === 'right' && 'text-right',
                                            item.textAlign === 'center' && 'text-center']">
                                            <p class="grow truncate">{{ item.name }}</p>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <slot name="body"></slot>
                                <tr v-if="isLoading || (data?.data && data?.data.length === 0)">
                                    <td :colspan="columnHeaders.length" class="text-center h-36">
                                        <div class="flex items-center justify-center flex-col gap-2" v-if="isLoading">
                                            <div class="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin">
                                            </div>
                                            Loading...
                                        </div>
                                        <div v-else>
                                            No data found.
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ArrowLongDownIcon,
    ArrowLongUpIcon,
    ArrowsUpDownIcon,
} from '@heroicons/vue/24/outline'

// Define the interface for column headers
interface ColumnHeader {
    name: string;
    key: string;
    textAlign?: 'left' | 'right' | 'center';
    sorter?: boolean;
}

const props = defineProps<{
    columnHeaders: ColumnHeader[];
    data: { data: any[] };
    isLoading: boolean;
    sortData?: {
        sortField: string;
        sortOrder: 'ascend' | 'descend' | null;
    };
    textAlign?: string;
    width?: number;
}>();

// Default props values
const defaultProps = {
    textAlign: 'left',
    width: 100,
};

const actualProps = { ...defaultProps, ...props };
</script>
