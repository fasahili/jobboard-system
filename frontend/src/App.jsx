import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import NavigationBar from "./components/Navbar";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./pages/auth/PrivateRoute";

import Dashboard from "./pages/Dashboard";

import CompanyJobs from "./pages/Company/CompanyJobs";
import CompanyApplications from "./pages/Company/CompanyApplications";
import CreateCompany from "./pages/Company/CreateCompany";

import MyApplications from "./pages/MyApplications";

import ApplyJob from "./pages/Job/ApplyJob";
import JobsList from "./pages/Job/JobList";
import AddJob from "./pages/Job/AddJob";
import AllJobs from "./pages/Job/ViewAllJobs";
import "./index.css";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container className="py-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/company/jobs"
            element={
              <PrivateRoute>
                <CompanyJobs />
              </PrivateRoute>
            }
          />
          <Route
            path="/company/applications"
            element={
              <PrivateRoute>
                <CompanyApplications />
              </PrivateRoute>
            }
          />
          <Route
            path="/apply/:id"
            element={
              <PrivateRoute>
                <ApplyJob />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-applications"
            element={
              <PrivateRoute>
                <MyApplications />
              </PrivateRoute>
            }
          />
          <Route
            path="/apply"
            element={
              <PrivateRoute>
                <JobsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/company/jobs/new"
            element={
              <PrivateRoute>
                <AddJob />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <AllJobs />
              </PrivateRoute>
            }
          />
          <Route
            path="/company/create"
            element={
              <PrivateRoute>
                <CreateCompany />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
