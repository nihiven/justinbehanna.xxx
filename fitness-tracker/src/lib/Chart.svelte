<script>
  import { onMount, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import 'chartjs-adapter-date-fns';

  export let data = [];
  export let label = 'Value';
  export let color = 'rgb(75, 192, 192)';

  let canvas;
  let chart;

  Chart.register(...registerables);

  onMount(() => {
    createChart();
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });

  $: if (chart && data) {
    updateChart();
  }

  function createChart() {
    const ctx = canvas.getContext('2d');
    
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label,
          data: data,
          borderColor: color,
          backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: color,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MMM dd'
              }
            },
            grid: {
              display: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          },
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(0,0,0,0.1)'
            },
            ticks: {
              callback: function(value) {
                return value.toFixed(1);
              }
            }
          }
        },
        elements: {
          point: {
            hoverBackgroundColor: color
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
  }

  function updateChart() {
    if (!chart) return;
    
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].label = label;
    chart.data.datasets[0].borderColor = color;
    chart.data.datasets[0].backgroundColor = color.replace('rgb', 'rgba').replace(')', ', 0.1)');
    chart.data.datasets[0].pointBackgroundColor = color;
    
    chart.update('none');
  }
</script>

<div class="chart-wrapper">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .chart-wrapper {
    position: relative;
    height: 300px;
    width: 100%;
  }
</style>