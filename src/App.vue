<script setup>
  import InputDownload from "./components/InputUpload.vue";
  import ExperimentsList from "./components/ExperimentsList.vue";
  import SingleSelectRadio from "./components/SingleSelectRadio.vue";
  import MultiSelectCheckbox from "./components/MultiSelectCheckbox.vue";
  import { prepareFirstChartData } from "./utils/prepareFirstChartData";
  import { prepareSecondChartData } from "./utils/prepareSecondChartData";
  import MetricChart from "./components/MetricChart.vue";
  import BuildChartButton from "./components/BuildChartButton.vue";
  import Header from "./components/Header.vue";
  import Container from "./components/Container.vue";
  import { computed, ref } from "vue";
  import { useStore } from "vuex";

  const store = useStore();
  const selectOneExperiment = ref("");
  const selectMetricName = ref("");
  const selectExperiments = ref([]);
  const firstChartData = ref(null);
  const secondChartData = ref(null);
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

  const onBuildChart1 = () => {
    firstChartData.value = prepareFirstChartData(
      experiments.value,
      selectOneExperiment.value
    );
  };
  const onBuildChart2 = () => {
    secondChartData.value = prepareSecondChartData(
      experiments.value,
      selectExperiments.value,
      selectMetricName.value
    );
  };
</script>

<template>
  <Container>
    <Header />
    <div class="content">
      <div class="flex-row">
        <div class="left-content">
          <ExperimentsList
            v-if="experiments.length !== 0"
            :experiments="experiments"
          />
          <p v-else class="no-data-text">
            There are no uploaded experiments at the moment
          </p>
        </div>
        <div class="flex-column">
          <div class="input-content">
            <p class="text">
              Upload a CSV file to generate metrics and visualize experiment
              results.
            </p>
            <InputDownload />
          </div>
          <div v-if="experiments.length !== 0" class="chart-content">
            <section class="chart-section">
              <h2 class="chart-title">Single Experiment Metrics</h2>
              <SingleSelectRadio
                v-model="selectOneExperiment"
                :options="experimentsIdArray"
                name="experiments"
                class="checkbox-section"
              />
              <BuildChartButton
                :disabled="!selectOneExperiment"
                @build="onBuildChart1"
              />
              <MetricChart v-if="firstChartData" :data="firstChartData" />
            </section>

            <section class="chart-section">
              <h2 class="chart-title">
                Comparison of Metrics Across Experiments
              </h2>
              <MultiSelectCheckbox
                v-model="selectExperiments"
                :options="experimentsIdArray"
                class="checkbox-section"
              />
              <SingleSelectRadio
                v-model="selectMetricName"
                :options="metricsNamedArray"
                name="metrics"
                class="checkbox-section"
              />
              <BuildChartButton
                :disabled="!selectMetricName || !selectExperiments.length === 0"
                @build="onBuildChart2"
              />
              <MetricChart v-if="secondChartData" :data="secondChartData" />
            </section>
          </div>
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
  }
  .no-data-text {
    text-align: center;
    color: #777;
    font-size: 1rem;
    font-style: italic;
  }
  .left-content {
    min-height: 100vh;
    padding-top: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
    border-right: solid 2px #ff8000;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
  .input-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 200px;
    padding: 40px 0 40px 40px;
  }
  .text {
    color: #444;
    font-size: 1.1rem;
    margin-bottom: 20px;
    text-align: center;
    font-style: normal;
  }
  .chart-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 40px 0 40px 40px;
    gap: 40px;
  }
  .chart-section {
    background: #fff8f0;
    border: 2px solid #ff8000;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 3px 8px rgba(255, 128, 0, 0.2);
    width: 100%;
  }

  .chart-title {
    margin-bottom: 16px;
    color: #ff8000;
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
  }
  .checkbox-section {
    margin-bottom: 20px;
  }
</style>
