import { useEffect, useState } from "react";
import { Container, Spinner, Row, Col, Alert, Button } from "react-bootstrap";
import { fetchJobs, fetchMyCompanyId } from "../../api/jobApi";
import JobCard from "../../components/JobCard";
import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";

export default function AllJobsForCompanies() {
  const [jobs, setJobs] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [jobList, companyID] = await Promise.all([
          fetchJobs(),
          fetchMyCompanyId(),
        ]);
        setJobs(jobList.data);
        setCompanyId(companyID);
      } catch (err) {
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
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
          <p>No jobs available.</p>
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
                    job.company === companyId && (
                      <Button
                        variant="outline-primary"
                        href={`/company/applications?job=${job.id}`}
                      >
                        View Applications
                      </Button>
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
