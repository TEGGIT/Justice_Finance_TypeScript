import React from 'react';
import ReactApexChart from 'react-apexcharts'
import './Charts.moduel.scss'

const Chart = () => {

  const series = [{
    name: `19 May`,
    data: [82, 83, 82.75, 83.50, 82.70, 84, 82.95, 83.50]
  }]

  const options = {

    chart: {
      height: 350,
      type: 'area'
    },

    fill: {
      type: 'gradient',
      gradient: {
        background: 'linear-gradient(180deg, rgba(132, 165, 0, 0.2) 0%, rgba(132, 165, 0, 0) 100%)'
      },

    },

    colors: ['#84A500'],

    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["2022-09-19T00:00:00.00Z", "2022-09-19T01:00:00.00Z", "2022-09-19T04:00:00.00Z", "2022-09-19T05:00:00.00Z", "2022-09-19T09:00:00.00Z", "2022-09-19T13:00:00.00Z", "2022-09-19T17:00:00.00Z", "2022-09-19T24:00.0Z",]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    }
  }
  return (
    <div>
      <ReactApexChart options={options} series={series} type="area" height={350}/>
    </div>
  );
};

export default Chart;