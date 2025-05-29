import React from "react";
import "../style/DashboardCard.css";

export default function DashboardCard({ icon, title, value }) {
  return (
    <div className="dashboard-card neumorphic-card">
      <div className="dashboard-icon">{icon}</div>
      <div className="dashboard-info">
        <h6 className="dashboard-title">{title}</h6>
        <h3 className="dashboard-value">{value}</h3>
      </div>
    </div>
  );
}
