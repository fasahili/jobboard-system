import React from "react";
import "../style/StatusProgress.css";

export default function StatusProgress({ accepted, rejected, pending }) {
  const total = accepted + rejected + pending;

  const getPercentage = (count) => {
    if (total === 0) return "0%";
    return `${Math.round((count / total) * 100)}%`;
  };

  return (
    <div className="status-wrapper">
      <h6>Status Distribution</h6>
      <div className="vertical-bar">
        <div
          className="bar-segment accepted"
          style={{ flex: accepted, height: `${(accepted / total) * 100}%` }}
          title={` Accepted: ${getPercentage(accepted)}`}
        >
          {getPercentage(accepted)}
        </div>
        <div
          className="bar-segment rejected"
          style={{ flex: rejected, height: `${(rejected / total) * 100}%` }}
          title={` Rejected: ${getPercentage(rejected)}`}
        >
           {getPercentage(rejected)}
        </div>
        <div
          className="bar-segment pending"
          style={{ flex: pending, height: `${(pending / total) * 100}%` }}
          title={` Pending: ${getPercentage(pending)}`}
        >
           {getPercentage(pending)}
        </div>
      </div>
    </div>
  );
}
