import Chart from 'react-apexcharts';

const Statistic = ({title, data}) => {
    const chartOptions = {
        series: data.map(item => item.value),
        
        options: {
          chart: { type: "donut" },
          labels: data.map(item => item.label),
          dataLabels: { enabled: false },
          tooltip: { enabled: false },
          legend: { show: false },
          fill: { colors: data.map(item => item.color) },
          stroke: { width: 0 },
          plotOptions: {
            dataLabels: {
              style: {
                colors: data.map(item => item.color)
              },
              offsetX: 30
            },
            pie: {
              donut: {
                size: "65%",
                labels: {
                  show: true,
                  name: {
                    color: '#000000',
                    show: true,
                  },
                  total: {
                    show: true,
                    label: title,
                    color: '#000000',
                  },
                }
              }
            },
          }
        }
    };

    return (
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="donut"
        />
    );
}


export default Statistic;