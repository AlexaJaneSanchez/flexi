<template>
    <NuxtLayout name="admin">
        <Title>Dashboard - {{ runtimeConfig.public.appName }}</Title>
        <main>
            <ul role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                <li v-for="client in clients" :key="client.id"
                    class="overflow-hidden rounded-xl border border-gray-200">
                    <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <img :src="client.imageUrl" :alt="client.name"
                            class="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
                        <div class="text-sm/6 font-medium text-gray-900">{{ client.name }}</div>
                    </div>
                    <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6">
                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-gray-500">Last invoice</dt>
                            <dd class="text-gray-700">
                                <time :datetime="client.lastInvoice.dateTime">{{ client.lastInvoice.date }}</time>
                            </dd>
                        </div>
                        <div class="flex justify-between gap-x-4 py-3">
                            <dt class="text-gray-500">Amount</dt>
                            <dd class="flex items-start gap-x-2">
                                <div class="font-medium text-gray-900">{{ client.lastInvoice.amount }}</div>
                                <div
                                    :class="[statuses[client.lastInvoice.status], 'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset']">
                                    {{ client.lastInvoice.status }}</div>
                            </dd>
                        </div>
                    </dl>
                </li>
            </ul>
            <ul role="list" class="grid grid-cols-3 gap-x-6 gap-y-8 mt-10">
                <div class="rounded-lg bg-gray-50 border-gray-200">
                    <div class="px-4 py-5 sm:px-6">
                        <!-- Content goes here -->
                        <!-- We use less vertical padding on card headers on desktop than on body sections -->
                        <FormLabel label="Test Title" />
                    </div>
                    <div class="bg-white px-4 py-5 sm:p-6">
                        <!-- Content goes here -->
                        <FormLineChart type="line" :options="lineChartOptions" :series="lineChartSeries" />
                    </div>
                </div>
                <div class="rounded-lg bg-gray-50 border-gray-200">
                    <div class="px-4 py-5 sm:px-6">
                        <!-- Content goes here -->
                        <!-- We use less vertical padding on card headers on desktop than on body sections -->
                        <FormLabel label="Test Title" />
                    </div>
                    <div class="bg-white px-4 py-5 sm:p-6">
                        <!-- Content goes here -->
                        <FormLineChart type="bar" :options="lineChartOptions" :series="lineChartSeries" />
                    </div>
                </div>
                <div class="rounded-lg bg-gray-50 border-gray-200">
                    <div class="px-4 py-5 sm:px-6">
                        <!-- Content goes here -->
                        <!-- We use less vertical padding on card headers on desktop than on body sections -->
                        <FormLabel label="Test Title" />
                    </div>
                    <div class="bg-white px-4 py-5 sm:p-6">
                        <!-- Content goes here -->
                        <FormLineChart type="area" :options="lineChartOptions" :series="lineChartSeries" />
                    </div>
                </div>
            </ul>
            <!-- Be sure to use this with a layout container that is full-width on mobile -->
            <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <!-- Content goes here -->
                    <FormLineChart type="bar" :options="barChartHorizontal" :series="lineChartSeries" />
                </div>
            </div>
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">

const runtimeConfig = useRuntimeConfig();

const lineChartOptions = {
    chart: {
        id: 'vuechart-example'
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997]
    }
};

const barChartHorizontal = {
    chart: {
        id: 'vuechart-example'
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: true,
        }
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997]
    }
};

const lineChartSeries = [
    {
        name: "series-1",
        data: [30, 40, 35, 50, 49, 60, 70]
    }
];

const statuses: Record<string, string> = {
    Paid: 'text-green-700 bg-green-50 ring-green-600/20',
    Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
};

const clients = [
    {
        id: 1,
        name: 'Tuple',
        imageUrl: 'https://tailwindui.com/plus/img/logos/48x48/tuple.svg',
        lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$2,000.00', status: 'Overdue' },
    },
    {
        id: 2,
        name: 'SavvyCal',
        imageUrl: 'https://tailwindui.com/plus/img/logos/48x48/savvycal.svg',
        lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid' },
    },
    {
        id: 3,
        name: 'Reform',
        imageUrl: 'https://tailwindui.com/plus/img/logos/48x48/reform.svg',
        lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
    },
];
</script>
