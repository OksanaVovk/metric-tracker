<script setup>
  import InputDownload from "./components/InputUpload.vue";
  import ExperimentsList from "./components/ExperimentsList.vue";
  import SingleSelectRadio from "./components/SingleSelectRadio.vue";
  import MultiSelectCheckbox from "./components/MultiSelectCheckbox.vue";
  import { prepareFirstChartData } from "./utils/prepareFirstChartData";
  import { prepareSecondChartData } from "./utils/prepareSecondChartData";
  import MetricChart from "./components/MetricChart.vue";
  import Header from "./components/Header.vue";
  import Container from "./components/Container.vue";
  import { computed, ref } from "vue";
  import { useStore } from "vuex";

  const store = useStore();
  const selectOneExperiment = ref("");
  const selectMetricName = ref("");
  const selectExperiments = ref([]);
  const experiments = computed(() => store.state.experiments);
  const experimentsIdArray = computed(() => [
    ...new Set(
      experiments.value
        .map((exp) => exp.experiment_id)
        .filter((id) => id != null)
    ),
  ]);
  const metricsNamedArray = computed(() => [
    ...new Set(
      experiments.value
        .map((exp) => exp.metric_name)
        .filter((metric_name) => metric_name != null)
    ),
  ]);
  const firstChartData = computed(() => {
    if (!selectOneExperiment.value) return null;
    return prepareFirstChartData(experiments.value, selectOneExperiment.value);
  });
  const secondChartData = computed(() => {
    if (!selectMetricName.value || selectExperiments.value.length === 0)
      return null;
    return prepareSecondChartData(
      experiments.value,
      selectExperiments.value,
      selectMetricName.value
    );
  });
</script>

<template>
  <Container>
    <Header />
    <div class="content">
      <div class="flex-row">
        <div class="left-content">
          <ExperimentsList :experiments="experiments" />
        </div>
        <div class="flex-column">
          <InputDownload />

          <SingleSelectRadio
            v-model="selectOneExperiment"
            :options="experimentsIdArray"
            name="experiments"
          />
          <MetricChart v-if="firstChartData" :data="firstChartData" />
          <SingleSelectRadio
            v-model="selectMetricName"
            :options="metricsNamedArray"
            name="metrics"
          />
          <MultiSelectCheckbox
            v-model="selectExperiments"
            :options="experimentsIdArray"
          />
          <MetricChart v-if="secondChartData" :data="secondChartData" />
        </div>
      </div>
    </div>
  </Container>
</template>

<style scoped>
  .content {
    display: flex;
    flex-grow: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    padding: 0 80px;
    width: 100%;
    max-width: 1400px;
    align-items: center;
    justify-content: flex-start;
    gap: 40px;
  }
  .left-content {
    min-height: 100vh;
    padding-top: 40px;
    padding-right: 40px;
    border-right: solid 2px #ff8000;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 40px;
    height: 100vh;
  }
</style>
