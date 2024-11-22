<template>
    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-900/80" />
                </TransitionChild>

                <div class="fixed inset-0 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div
                                class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                                <div class="flex h-16 shrink-0 items-center">
                                    <img class="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company" />
                                </div>
                                <nav class="flex flex-1 flex-col">
                                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" class="-mx-2 space-y-1">
                                                <li v-for="item in navigation" :key="item.name">
                                                    <a :class="[
                                                        item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                    ]" @click.prevent="handleNavigation(item)">
                                                        <component :is="item.icon" class="h-6 w-6 shrink-0"
                                                            aria-hidden="true" />
                                                        {{ item.name }}
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="mt-auto">
                                            <a href="#"
                                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
                                                <Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
                                                Settings
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                <div class="flex h-16 shrink-0 items-center">
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company" />
                </div>
                <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" class="-mx-2 space-y-1">
                                <li v-for="item in navigation" :key="item.name">
                                    <a :class="[
                                        item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                    ]" @click.prevent="handleNavigation(item)">
                                        <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                                        {{ item.name }}
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="mt-auto">
                            <a href="#"
                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
                                <Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
                                Settings
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="lg:pl-72">
            <div
                class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
                    <span class="sr-only">Open sidebar</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>

                <!-- Separator -->
                <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                    <label class="relative flex flex-1" action="#" method="GET">
                        <label for="search-field" class="sr-only">Search</label>
                        <label id="search-field"
                            class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                            placeholder="Search..." type="search" name="search" />
                    </label>
                    <div class="flex items-center gap-x-4 lg:gap-x-6">

                        <!-- Separator -->
                        <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                        <!-- Profile dropdown -->
                        <Menu as="div" class="relative">
                            <MenuButton class="-m-1.5 flex items-center p-1.5">
                                <span class="sr-only">Open user menu</span>
                                <img class="h-8 w-8 rounded-full bg-gray-50"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="" />
                                <span class="hidden lg:flex lg:items-center">
                                    <span class="ml-4 text-sm font-semibold leading-6 text-gray-900"
                                        aria-hidden="true">{{ firstname }} {{ lastname }}</span>
                                    <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </MenuButton>
                            <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                                    <template v-if="item.name === 'Sign out'">
                                        <button @click="logout" :class="[
                                            active ? 'bg-gray-50' : '',
                                            'block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900',
                                        ]">
                                            {{ item.name }}
                                        </button>
                                    </template>
                                    <template v-else>
                                        <a :href="item.href" :class="[
                                            active ? 'bg-gray-50' : '',
                                            'block px-3 py-1 text-sm leading-6 text-gray-900',
                                        ]">
                                            {{ item.name }}
                                        </a>
                                    </template>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>

            <main class="py-10">
                <div class="px-4 sm:px-6 lg:px-8">
                    <slot />
                    <!-- Your content -->
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import {
    Bars3Icon,
    ChartBarSquareIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    CurrencyDollarIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeModernIcon,
    TruckIcon,
    UsersIcon,
    XMarkIcon,
    LockClosedIcon,
    AdjustmentsHorizontalIcon,
    CreditCardIcon,
    DocumentTextIcon,
    ArrowLongLeftIcon,

} from "@heroicons/vue/24/outline";
import {
    ChevronDownIcon,
    ShoppingBagIcon,
} from "@heroicons/vue/24/outline";
import { UserIcon, UserCircleIcon } from "@heroicons/vue/24/outline";

const sidebarOpen = ref(false);
const openPeopleDropdown = ref(false);

const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: ChartPieIcon, current: false },
    {
        name: "Product", icon: ShoppingBagIcon, current: false,
        children: [
            { name: "Product Categories", href: "/admin/product_category", icon: FolderIcon, current: false },
            { name: "Products", href: "/admin/products", icon: ShoppingBagIcon, current: false },
        ],
    },
    { name: "Adjustments", href: "/adjustments", icon: AdjustmentsHorizontalIcon, current: false },
    {
        name: "Peoples",
        icon: UsersIcon,
        current: false,
        children: [
            { name: "Suppliers", href: "/admin/suppliers", icon: TruckIcon, current: false },
            { name: "Customers", href: "/admin/customers", icon: UserIcon, current: false },
            { name: "Employees", href: "/admin/employees", icon: UserCircleIcon, current: false },
        ],
    },
    {
        name: "Transactions",
        icon: UsersIcon,
        current: false,
        children: [
            { name: "Bills", href: "/admin/bills", icon: CurrencyDollarIcon, current: false },
            { name: "Payments", href: "/admin/payments", icon: CreditCardIcon, current: false },
            { name: "Sales Invoice", href: "/admin/salesinvoice", icon: DocumentTextIcon, current: false },
            { name: "Collections", href: "/admin/collections", icon: DocumentDuplicateIcon, current: false },
            { name: "Credit Memo", href: "/admin/creditmemo", icon: UserCircleIcon, current: false },
            { name: "Damages / Spoilage", href: "/admin/payments", icon: CreditCardIcon, current: false },
            { name: "Replacement", href: "/admin/replacement", icon: UserCircleIcon, current: false },
        ],
    },
    { name: "Roles / Permissions", href: "/roles", icon: LockClosedIcon, current: false },
    {
        name: "Returns", href: "/roles", icon: LockClosedIcon, current: false,
        children: [
            { name: "Customer Returns", href: "/bills", icon: ArrowLongLeftIcon, current: false },
            { name: "Supplier Returns", href: "/payments", icon: ArrowLongLeftIcon, current: false },
        ],
    },
    { name: "Warehouse", href: "/roles", icon: HomeModernIcon, current: false },
    { name: "Reports", href: "/roles", icon: ChartBarSquareIcon, current: false },
];

const userNavigation = [
    { name: "Your profile", href: "/profile" },
    { name: "Sign out", href: "/" },
];

function togglePeopleDropdown() {
    openPeopleDropdown.value = !openPeopleDropdown.value;
}

function closePeopleDropdown() {
    openPeopleDropdown.value = false;
}

function navigateTo(href) {
    window.location.href = href;
    closePeopleDropdown();
}
</script>