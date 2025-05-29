import { useEffect, useState } from "react";
import { Container, Button, Spinner, Row, Col, Alert } from "react-bootstrap";
import JobCard from "../../components/JobCard";
import { fetchCompanyJobs } from "../../api/jobApi";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import '../../style/btn.css'

export default function CompanyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobList = await fetchCompanyJobs();
        setJobs(jobList);
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    getJobs();
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
        title="My Job Listings"
        subtitle="Manage and track all the jobs your company has posted"
      />
      <Container className="mt-5">
        <Button href="/company/jobs/new" className="add-job-btn mb-4">
          + Add Job
        </Button>

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
                  experience={job.experience_level}
                  employmentType={job.employment_type}
                  actions={
                    <Button
                      variant="outline-primary"
                      href={`/company/applications?job=${job.id}`}
                    >
                      View Applications
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
