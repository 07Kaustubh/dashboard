// src/components/Chart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.time),
    datasets: [
      {
        label: 'Battery Level',
        data: data.map(item => item.batteryLevel),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default Chart;
