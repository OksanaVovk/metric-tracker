<template>
  <div class="flex-table-column">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Experiment ID</th>
            <th>Metric name</th>
            <th>Step</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(experiment, index) in currentExperiments"
            :key="`${experiment.experiment_id}-${experiment.metric_name}-${experiment.step}`"
          >
            <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
            <td>{{ experiment.experiment_id }}</td>
            <td>{{ experiment.metric_name }}</td>
            <td>{{ experiment.step }}</td>
            <td>{{ experiment.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex-table-row">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        Prev
      </button>

      <input
        :value="currentPage"
        type="number"
        min="1"
        :max="totalPages"
        @change="handleChange"
      />
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

  const props = defineProps({
    experiments: {
      type: Array,
      required: true,
    },
  });

  const currentPage = ref(1);
  const perPage = 50;

  const totalPages = computed(() => {
    return Math.ceil(props.experiments.length / perPage);
  });

  const currentExperiments = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return props.experiments.slice(start, start + perPage);
  });

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const handleChange = (event) => {
    const page = parseInt(event.target.value);
    if (!isNaN(page)) {
      goToPage(page);
    }
  };
</script>

<style lang="scss" scoped>
  .table-wrapper {
    border: 1px solid #ccc;
    margin-bottom: 20px;
    font-size: 14px;
    @media (min-width: 640px) {
      font-size: 16px;
    }
  }

  .table-wrapper table {
    width: 100%;
    border-collapse: collapse;
  }

  .table-wrapper table th,
  .table-wrapper table td {
    padding: 8px;
    border: 1px solid #ddd;
  }

  .table-wrapper table thead th {
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
  }
  .flex-table-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .flex-table-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
</style>
