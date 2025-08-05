export const prepareSecondChartData = (
  experiments,
  selectedExperimentsArray,
  selectedMetricName
) => {
  const filtered = experiments.filter(
    (exp) =>
      selectedExperimentsArray.includes(exp.experiment_id) &&
      exp.metric_name === selectedMetricName
  );

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

  const groupedByExperiment = filtered.reduce((acc, item) => {
    if (!acc[item.experiment_id]) acc[item.experiment_id] = [];
    acc[item.experiment_id].push(item);
    return acc;
  }, {});

  const datasets = Object.entries(groupedByExperiment).map(
    ([experimentId, data]) => {
      const sortedData = data.sort((a, b) => a.step - b.step);

      return {
        label: `Experiment: ${experimentId}`,
        data: sortedData.map((d) => d.value),
        borderColor: getNextColor(),
        borderWidth: 1,
        tension: 0.4,
      };
    }
  );

  return {
    labels: steps,
    datasets,
  };
};
