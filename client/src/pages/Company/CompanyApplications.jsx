import { useEffect, useState } from "react";
import {
  Container,
  Spinner,
  Alert,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";
import {
  fetchApplications,
  fetchMyCompanyId,
  updateApplicationStatus,
} from "../../api/jobApi";
import JobCard from "../../components/JobCard";
import PageHeader from "../../components/PageHeader";
import  Footer  from "../../components/Footer";
        import '../../style/btn.css'



export default function CompanyApplications() {
  const [applications, setApplications] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyID = await fetchMyCompanyId();
        setCompanyId(companyID);

        const res = await fetchApplications();
        setApplications(res.data);
      } catch (err) {
        setError("Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );
    } catch (err) {
      alert("Failed to update application.");
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <>
      {" "}
      <PageHeader
        title="Applications for My Jobs"
        subtitle="Review and respond to candidates who applied to your job postings"
      />
      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>}
        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <Row xs={1} md={2} className="g-4">
            {applications.map((app) => (
              <Col key={app.id}>
                <JobCard
                  title={app.job_title}
                  applicant={app.applicant_username}
                  appliedAt={app.applied_at}
                  status={app.status} 
                  message={app.message}
                  cvLink={app.cv}
                  actions={
                    app.job_company_id === companyId &&
                    app.status === "pending" && (
                      <>
                        <Button
                          variant="success"
                          className="add-job-btn mb-4"
                          onClick={() => handleUpdate(app.id, "accepted")}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="danger"
                          className="add-job-btn-rej mb-4"
                          onClick={() => handleUpdate(app.id, "rejected")}
                        >
                          Reject
                        </Button>
                      </>
                    )
                  }
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
       <Footer />
    </>
  );
}


