<template>
  <input type="file" @change="handleUpload" accept=".csv" />
  <p v-if="errorMessage" class="text">{{ errorMessage }}</p>
</template>

<script setup>
  import { useStore } from "vuex";
  import { computed, ref } from "vue";
  import Papa from "papaparse";

  const store = useStore();
  const experiments = computed(() => store.state.experiments);
  const errorMessage = ref("");

  function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "text/csv") {
      errorMessage.value = "Будь ласка, оберіть CSV файл";
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        store.commit("setExperiments", results.data);
        console.log(results.data);
        console.log("📦 Вміст Vuex-стейту:", experiments.value);
      },
    });
  }
</script>

<style lang="scss" scoped>
  .text {
    color: red;
  }
</style>
