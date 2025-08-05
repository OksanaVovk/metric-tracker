export const prepareFirstChartData = (experiments, selectedExperimentId) => {
  const filtered = experiments.filter(
    (ex) => ex.experiment_id === selectedExperimentId
  );
  const metricNames = [...new Set(filtered.map((d) => d.metric_name))];

  const steps = [...new Set(filtered.map((d) => d.step))].sort((a, b) => a - b);

  const colors = [
    "#e6194b",
    "#3cb44b",
    "#ffe119",
    "#4363d8",
    "#f58231",
    "#911eb4",
    "#46f0f0",
    "#f032e6",
    "#bcf60c",
    "#fabebe",
    "#008080",
    "#e6beff",
    "#9a6324",
    "#fffac8",
    "#800000",
    "#aaffc3",
    "#808000",
    "#ffd8b1",
    "#000075",
    "#808080",
  ];

  let colorIndex = 0;

  function getNextColor() {
    const color = colors[colorIndex % colors.length];
    colorIndex++;
    return color;
  }

  const datasets = metricNames.map((metric) => {
    const metricData = filtered
      .filter((d) => d.metric_name === metric)
      .sort((a, b) => a.step - b.step);

    const data = metricData.map((d) => d.value);

    return {
      label: metric,
      data,
      borderColor: getNextColor(),
      borderWidth: 1,
      tension: 0.4,
    };
  });

  return {
    labels: steps,
    datasets,
  };
};
