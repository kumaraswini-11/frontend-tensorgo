import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FeedbackChart = ({ feedbackList }) => {
  // Aggregate feedback counts by category
  const feedbackCounts = feedbackList?.reduce((acc, { category }) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(feedbackCounts),
    datasets: [
      {
        label: "Feedback Count",
        data: Object.values(feedbackCounts),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default FeedbackChart;
