<template>

    <Head>
        <Title>Pricing - {{ runtimeConfig.public.appName }}</Title>
    </Head>
    <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-4xl text-center">
                <h2 class="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
                <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Pricing plans for teams of
                    all sizes</p>
            </div>
            <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
                Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non
                voluptas in. Explicabo id ut laborum.
            </p>
            <div class="mt-16 flex justify-center">
                <fieldset aria-label="Payment frequency">
                    <RadioGroup v-model="frequency"
                        class="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200">
                        <RadioGroupOption v-for="option in frequencies" :key="option.value" :value="option">
                            <template #default="{ checked }">
                                <div
                                    :class="[checked ? 'bg-indigo-600 text-white' : 'text-gray-500', 'cursor-pointer rounded-full px-2.5 py-1']">
                                    {{ option.label }}
                                </div>
                            </template>
                        </RadioGroupOption>
                    </RadioGroup>
                </fieldset>
            </div>
            <div class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <div v-for="tier in tiers" :key="tier.id"
                    :class="[tier.featured ? 'bg-gray-900 ring-gray-900' : 'ring-gray-200', 'rounded-3xl p-8 ring-1 xl:p-10']">
                    <h3 :id="tier.id"
                        :class="[tier.featured ? 'text-white' : 'text-gray-900', 'text-lg font-semibold leading-8']">
                        {{ tier.name }}</h3>
                    <p :class="[tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-4 text-sm leading-6']">{{
                        tier.description }}
                    </p>
                    <p class="mt-6 flex items-baseline gap-x-1">
                        <span
                            :class="[tier.featured ? 'text-white' : 'text-gray-900', 'text-4xl font-bold tracking-tight']">
                            {{ typeof tier.price === 'string' ? tier.price : tier.price[frequency.value] }}
                        </span>
                        <span v-if="typeof tier.price !== 'string'"
                            :class="[tier.featured ? 'text-gray-300' : 'text-gray-600', 'text-sm font-semibold leading-6']">
                            {{ frequency.priceSuffix }}
                        </span>
                    </p>
                    <button @click="buyPlan(tier)"
                        :class="[tier.featured ? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white' : 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600', 'mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2']">
                        {{ tier.cta }}
                    </button>
                    <ul role="list"
                        :class="[tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-8 space-y-3 text-sm leading-6 xl:mt-10']">
                        <li v-for="feature in tier.features" :key="feature" class="flex gap-x-3">
                            <CheckIcon :class="[tier.featured ? 'text-white' : 'text-indigo-600', 'h-6 w-5 flex-none']"
                                aria-hidden="true" />
                            {{ feature }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'; // Ensure correct import
import { processPlanService } from '~/components/api/ProcessPlanService';
const route = useRoute(); // Get the current route
const runtimeConfig = useRuntimeConfig();
const id = ref(route.query.user_id);

const frequencies = [
    { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
    { value: 'annually', label: 'Annually', priceSuffix: '/year' },
];

const frequency = ref(frequencies[0]);
const tiers = ref([]); // Reactive reference for tiers

// Fetch plan data from the API
onMounted(async () => {
    try {
        const response = await processPlanService.getPlans();
        tiers.value = response; // Directly use the response if it is already an array
        console.log(response);
        console.log("newly_registered_user_id= " + id.value)
    } catch (error) {
        console.error('Failed to fetch plans:', error);
    }
});

const buyPlan = async (tier) => {
    try {
        const response = await processPlanService.processPlan(tier.id, frequency.value.value, id.value); // Pass id to your service
        if (response.url) {
            window.location.href = response.url; // Redirect to Stripe checkout
        } else {
            console.error('No URL returned from server');
        }
    } catch (error) {
        console.error('Error processing plan:', error);
    }
};
</script>
