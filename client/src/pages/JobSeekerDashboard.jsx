import StatusProgress from "../components/StatusProgress";
import PieChart from "../components/PieChart";
import "../style/Dashboard.css";

export default function JobSeekerDashboard({ stats, summary }) {
  return (
    <div className="dashboard-grid">
      <div className="card-group">
        <div className="neumorphic text-center job-seeker-card-1">
          <h6>Companies Applied To</h6>
          <h4 className="count-job-seeker-card" >{summary.length}</h4>
        </div>
        <div className="neumorphic text-center job-seeker-card-2">
          <h6>Companies Accepted You</h6>
          <h4 className="count-job-seeker-card">{summary.filter((row) => row.accepted > 0).length}</h4>
        </div>
      </div>

      <div className="chart-row">
        <div className="neumorphic">
          <StatusProgress
            accepted={stats.accepted}
            rejected={stats.rejected}
            pending={stats.pending}
          />
        </div>
        <div className="neumorphic">
          <PieChart
            accepted={stats.accepted}
            rejected={stats.rejected}
            pending={stats.pending}
          />
        </div>
      </div>
    </div>
  );
}
