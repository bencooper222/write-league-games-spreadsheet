import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as trend from './trend.json';

const ctx = document.getElementById('myChart');

const myLineChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [
      {
        label: 'Avol9',
        data: trend.avol9,
        showLine: true,
        fill: false,
        backgroundColor: 'black',
        borderColor: 'red',
      },
      {
        label: 'Skyfall3665',
        data: trend.skyfall3665,
        showLine: true,
        fill: false,
        backgroundColor: 'black',
        borderColor: 'purple',
      },
    ],
  },
  options: {
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          console.log(tooltipItem);
          console.log(data);
          const champ = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].champ;
          return `${champ} | ${tooltipItem.yLabel} in ${tooltipItem.xLabel}`;
        },
      },
    },
  },
  //   options: options,
});
