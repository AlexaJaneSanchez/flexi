<template>
    <main class="relative isolate h-screen">
        <img src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
            alt="" class="absolute inset-0 -z-10 h-full w-full object-cover object-top" />
        <div class="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
            <p class="text-base font-semibold leading-8 text-white">404</p>
            <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">Page not found
            </h1>
            <p class="mt-6 text-pretty text-lg font-medium text-white/70 sm:text-xl/8">Sorry, we couldn’t find the page
                you’re looking for.</p>
            <div class="mt-10 flex justify-center">
                <FormButton @click="backtoHome"
                    class="text-sm font-semibold leading-7 text-white transition duration-300 ease-in-out hover:text-gray-500 hover:bg-slate-100">
                    back to home
                </FormButton>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">

function backtoHome() {
    navigateTo('/');
}
</script>

<style scoped>
.hover\:text-gray-500 {
    transition: color 0.3s ease-in-out;
    /* Custom transition for hover effect */
}

.hover\:bg-slate-100 {
    transition: color 0.3s ease-in-out;
    /* Custom transition for hover effect */
}
</style>