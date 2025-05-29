import { useEffect, useState } from "react";
import { Container, Spinner, Row, Col, Alert, Button } from "react-bootstrap";
import { fetchMyApplications } from "../api/jobApi";
import JobCard from "../components/JobCard";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await fetchMyApplications();
        setApplications(res.data);
      } catch (err) {
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <>
      <PageHeader
        title="Your Job Applications"
        subtitle="See the status of every job you’ve applied to"
      />
      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>}

        {applications.length === 0 ? (
          <p>You haven't applied to any jobs yet.</p>
        ) : (
          <Row xs={1} md={2} className="g-4">
            {applications.map((app) => (
              <Col key={app.id}>
                <JobCard
                  title={app.job_title}
                  company={app.job_company_name}
                  status={app.status}
                  appliedAt={app.applied_at}
                  message={app.message}
                  applicant={app.applicant_username}
                  cvLink={app.cv}
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
