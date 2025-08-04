<script setup>
  import InputDownload from "./components/InputUpload.vue";
  import ExperimentsList from "./components/ExperimentsList.vue";
  import { computed } from "vue";
  import { useStore } from "vuex";

  const store = useStore();
  const experiments = computed(() => store.state.experiments);
  console.log(experiments.value);
</script>

<template>
  <InputDownload />
  <ExperimentsList :experiments="experiments" />
</template>

<style scoped>
  /* .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  } */
</style>
