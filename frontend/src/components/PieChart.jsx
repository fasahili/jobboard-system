import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "../style/PieChart.css";

Chart.register(ArcElement, Tooltip, Legend);

export default function PieChart({ accepted, rejected, pending }) {
  const data = {
    labels: ["Accepted", "Rejected", "Pending"],
    datasets: [
      {
        data: [accepted, rejected, pending],
        backgroundColor: ["#43cea2", "#ff4b5c", "#f9d423"],
        borderColor: "#1e1e1e",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ddd",
          font: {
            size: 13,
            weight: 500,
          },
          padding: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart-container">
      <h6>Application Status</h6>
      <div className="pie-chart-wrapper">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
