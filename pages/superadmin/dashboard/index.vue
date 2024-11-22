<template>
    <NuxtLayout name="superadmin">
        <Title>Dashboard - {{ runtimeConfig.public.appName }}</Title>
        <h1>Super Admin Dashboard</h1>
    </NuxtLayout>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
</script>