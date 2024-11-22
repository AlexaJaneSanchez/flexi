<template>
    <Listbox v-model="selected">
        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</ListboxLabel>
        <div class="relative mt-2">
            <ListboxButton
                class="appearance-none block w-full px-4 h-11 border border-primary placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-700 focus:border-primary-700 focus:z-10 sm:text-sm">
                <span class="block truncate">{{ selected ? activeLabel : inactiveLabel }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption v-for="option in options" :key="String(option.value)" :value="option.value">
                        <li
                            :class="[option.value === selected ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                            <span
                                :class="[option.value === selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                {{ option.label }}
                            </span>
                            <span v-if="option.value === selected"
                                :class="[option.value === selected ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    options: {
        type: Array as () => { value: boolean; label: string }[],
        required: true,
    },
    label: {
        type: String,
        required: false,
    },
});

const emit = defineEmits(['update:modelValue']);
const selected = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    selected.value = newValue;
});

watch(selected, (newValue) => {
    emit('update:modelValue', newValue);
});

// Define labels for active/inactive
const activeLabel = 'Active';
const inactiveLabel = 'Inactive';
</script>
