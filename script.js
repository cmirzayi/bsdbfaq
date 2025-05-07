const ctx = document.getElementById('myChart').getContext('2d');

const data = {
  labels: ['Group A', 'Group B', 'Group C', 'Group D'],
  datasets: [
    {
      label: 'Firmicutes',
      data: [10, 12, 25, 23],
      backgroundColor: 'rgba(75, 192, 192, 0.7)'
    },
    {
      label: 'Bacteriodetes',
      data: [20, 22, 18, 24],
      backgroundColor: 'rgba(255, 159, 64, 0.7)'
    }
  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding : {
        top: 0
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 10
        }
      },
      tooltip: {
        enabled: true
      }
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 30
      }
    }
  },
  plugins: [{
    afterDatasetsDraw(chart) {
      const {ctx, chartArea: {top, right, bottom, left}, scales: {x, y}} = chart;

      // Draw CLD letters as before
      const cldLetters = {
        'Firmicutes': ['a', 'a', 'b', 'b'],
        'Bacteriodetes': ['ab', 'a', 'b', 'a']
      };

      chart.data.datasets.forEach((dataset, datasetIndex) => {
        chart.getDatasetMeta(datasetIndex).data.forEach((bar, index) => {
          const value = dataset.data[index];
          const cld = cldLetters[dataset.label][index];

          ctx.save();
          ctx.fillStyle = 'black';
          ctx.font = '14px Patrick Hand';
          ctx.textAlign = 'center';
          ctx.fillText(cld, bar.x, y.getPixelForValue(value) - 10);
          ctx.restore();
        });
      });

      // 💬 Add handwriting-style annotations
      ctx.save();
      ctx.fillStyle = 'black';
      ctx.font = '18px Patrick Hand';
      ctx.textAlign = 'left';

      // Example annotation near Group C
      ctx.fillText('Testing annotation on figs', x.getPixelForValue(2) + 20, y.getPixelForValue(25) + 100);

      // Example annotation near Group B
      ctx.fillText('Test', x.getPixelForValue(1) - 40, y.getPixelForValue(22) + 60);

      ctx.restore();
    }
  }]
};

const myChart = new Chart(ctx, config);
