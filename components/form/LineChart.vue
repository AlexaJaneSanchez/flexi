<template>
    <div id="chart">
        <apexchart :type="type" height="350" :options="props.options" :series="props.series"></apexchart>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'line',
    },
    options: {
        type: Object,
        required: true,
    },
    series: {
        type: Array,
        required: true,
    },
});
</script>

<style scoped>
#chart {
    max-width: 650px;
    margin: 35px auto;
}
</style>