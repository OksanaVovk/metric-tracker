<template>
  <input type="file" @change="handleUpload" accept=".csv" />
</template>

<script setup>
  import { useStore } from "vuex";
  import { computed } from "vue";
  import Papa from "papaparse";

  const store = useStore();
  const experiments = computed(() => store.state.experiments);

  function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "text/csv") {
      alert("Будь ласка, оберіть CSV файл");
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

<style lang="scss" scoped></style>
