<template>
  <Line :data="data" :options="options" />
</template>

<script setup>
  import { Line } from "vue-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
  );

  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Experiment Metrics" },
        },
      }),
    },
  });
</script>

<style lang="scss" scoped></style>
