import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Container, Spinner, Alert } from "react-bootstrap";
import DashboardCard from "../components/DashboardCard";
import PieChart from "../components/PieChart";
import StatusProgress from "../components/StatusProgress";
import JobSeekerDashboard from "./JobSeekerDashboard";
import "../style/Dashboard.css";

import { FaUserTie, FaBriefcase, FaFileAlt } from "react-icons/fa";

import {
  fetchCompanyJobs,
  fetchApplications,
  fetchMyCompanyId,
  fetchMyApplications,
} from "../api/jobApi";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [numJobs, setNumJobs] = useState(0);
  const [numApplications, setNumApplications] = useState(0);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState(null);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const getStatsAndSummary = async () => {
      try {
        let apps = [];

        if (role === "company") {
          const allApps = await fetchApplications();
          const companyId = await fetchMyCompanyId();
          apps = allApps.data.filter((app) => app.job_company_id === companyId);
        } else if (role === "job_seeker") {
          const myApps = await fetchMyApplications();
          apps = myApps.data;
        }

        const accepted = apps.filter((app) => app.status === "accepted").length;
        const rejected = apps.filter((app) => app.status === "rejected").length;
        const pending = apps.filter((app) => app.status === "pending").length;

        setStats({ accepted, rejected, pending });

        const summaryMap = {};
        apps.forEach((app) => {
          const comp = app.company_name || app.company || "Unknown";
          if (!summaryMap[comp]) {
            summaryMap[comp] = {
              company: comp,
              accepted: 0,
              rejected: 0,
              pending: 0,
            };
          }
          summaryMap[comp][app.status]++;
        });

        setSummary(Object.values(summaryMap));
      } catch (err) {
        console.error("Failed to fetch stats");
      }
    };

    if (role) {
      getStatsAndSummary();
    }
  }, [role]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username || decoded.name || "");
        setRole(decoded.role);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  useEffect(() => {
    const loadCompanyData = async () => {
      setLoading(true);
      try {
        const companyId = await fetchMyCompanyId();
        const jobs = await fetchCompanyJobs();
        const applications = await fetchApplications();
        setCompanyName(jobs[0]?.company_name || "");
        setNumJobs(jobs.length);
        setNumApplications(
          applications.data.filter((app) => app.job_company_id === companyId)
            .length
        );
      } catch (err) {
        console.error("Error loading company dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    const loadJobSeekerData = async () => {
      setLoading(true);
      try {
        const applications = await fetchMyApplications();
        setNumApplications(applications.data.length);
      } catch (err) {
        console.error("Error loading job seeker dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (role === "company") {
      loadCompanyData();
    } else if (role === "job_seeker") {
      loadJobSeekerData();
    }
  }, [role]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container fluid className="mt-3 px-3">
      <h2 className="dashboard-title title-db text-white mb-2">
        👋 Welcome back, <span className="text-gradient">{username}</span>
      </h2>
      <br />
      {role === "company" && companyName && (
        <p className="dashboard-subtext">
          Company: <strong className="text-info">{companyName}</strong>
        </p>
      )}

      {role === "job_seeker" && stats && summary && (
        <JobSeekerDashboard
          username={username}
          stats={stats}
          summary={summary}
        />
      )}

      {role === "company" && (
        <div className="dashboard-grid">
          <div className="card-group">
            <DashboardCard
              icon={<FaUserTie />}
              title="Role"
              value={role.replace("_", " ").toUpperCase()}
            />
            <DashboardCard
              icon={<FaBriefcase />}
              title="Jobs Posted"
              value={numJobs}
            />
            <DashboardCard
              icon={<FaFileAlt />}
              title="Applications"
              value={numApplications}
            />
          </div>

          {stats && (
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
          )}

          {!companyName && role === "company" && (
            <Alert variant="warning" className="mt-4">
              🚨 You haven't created a company profile yet.{" "}
              <a href="/company/create" className="text-primary fw-bold">
                Create Company
              </a>{" "}
              to get started.
            </Alert>
          )}

          {companyName && numJobs === 0 && (
            <Alert variant="warning" className="mt-4">
              🚨 You haven't posted any jobs yet.{" "}
              <a href="/company/jobs/new" className="text-primary fw-bold">
                Add Job
              </a>{" "}
              to let job seekers find you.
            </Alert>
          )}
        </div>
      )}
    </Container>
  );
}
