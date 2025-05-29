import { useEffect, useState } from "react";
import { Container, Spinner, Row, Col, Alert, Button } from "react-bootstrap";
import { fetchJobs } from "../../api/jobApi";
import JobCard from "../../components/JobCard";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import "../../style/btn.css";

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetchJobs();
        setJobs(res.data);
      } catch (err) {
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
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
        title="All Available Jobs"
        subtitle="Browse every open job opportunity across all companies"
      />

      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>}

        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <Row xs={1} md={2} className="g-4">
            {jobs.map((job) => (
              <Col key={job.id}>
                <JobCard
                  title={job.title}
                  company={job.company_name}
                  location={job.location}
                  description={job.description}
                  experience={job.experience_level}
                  actions={
                    <Button
                      variant="success"
                      className="add-job-btn mb-4"
                      href={`/apply/${job.id}`}
                    >
                      Apply
                    </Button>
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
