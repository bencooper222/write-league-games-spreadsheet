import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as trend from './trend.json';

const ctx = document.getElementById('myChart');

const myLineChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [
      {
        label: `Avol9${
          trend.avol9[trend.avol9.length - 1].won == undefined
            ? ''
            : ` | ${trend.avol9[trend.avol9.length - 1].y -
                trend.avol9[trend.avol9.length - 2].y} game(s) into ${
                trend.avol9[trend.avol9.length - 1].champ
              }`
        }`,
        data: trend.avol9,
        showLine: true,
        fill: false,
        backgroundColor: 'black',
        borderColor: 'red',
        pointBackgroundColor: 'red',
        // pointRadius: 2,
        lineTension: 0,
      },
      {
        label: `skyfall3665${
          trend.skyfall3665[trend.skyfall3665.length - 1].won == undefined
            ? ''
            : ` | ${trend.skyfall3665[trend.skyfall3665.length - 1].y -
                trend.skyfall3665[trend.skyfall3665.length - 2].y} game(s) into ${
                trend.skyfall3665[trend.skyfall3665.length - 1].champ
              }`
        }`,
        data: trend.skyfall3665,
        showLine: true,
        fill: false,
        backgroundColor: 'black',
        borderColor: 'purple',
        pointBackgroundColor: 'purple',
        pointRadius: 2,
        lineTension: 0,
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
          return `${champ} | ${tooltipItem.xLabel} in ${tooltipItem.yLabel}`;
        },
      },
    },

    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Games played',
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Champions completed',
          },
        },
      ],
    },
  },
  //   options: options,
});
