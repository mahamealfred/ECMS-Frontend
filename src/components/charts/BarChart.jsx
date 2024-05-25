import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


// Define the options for the bar chart
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Number of Complaints by Status',
    },
  },
};

// Create the BarChart component
const BarChart = (complaintData) => {
  
// Sample response data
const responseData = {
  "responseCode": 200,
  "responseDescription": "Complaints",
  "data": [
    {
      "id": "0c11ff23-7205-4bad-b3b4-95113896b31a",
      "date": "2024-03-05",
      "time": "23:39",
      "status": "canceled"
    },
    {
      "id": "ee59099a-494f-4b52-b306-bf02b4614907",
      "date": "2024-03-12",
      "time": "14:20",
      "status": "approved"
    },
    {
      "id": "09a415e6-87aa-49cc-88f5-5a65e40bc88f",
      "date": "2024-03-07",
      "time": "14:47",
      "status": "canceled"
    },
  ]
};

// Process the data to count complaints by status
const statusCounts = complaintData?.complaintData?.reduce((acc, complaint) => {
  acc[complaint.status] = (acc[complaint.status] || 0) + 1;
  return acc;
}, {});

const labels = Object.keys(statusCounts);
const data = Object.values(statusCounts);

// Define the data for the bar chart
const chartData = {
  labels: labels,
  datasets: [
    {
      label: 'Number of Complaints',
      data: data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
    },
  ],
};
  return (
    <div style={{ width: '600px', height: '350px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

// Export the BarChart component
export default BarChart;
