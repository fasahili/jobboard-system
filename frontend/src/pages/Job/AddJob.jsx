import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import { createJob } from "../../api/jobApi";

export default function AddJob() {
  const [formData, setFormData] = useState({
    title: "",
    field: "",
    location: "",
    employment_type: "",
    experience_level: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await createJob(formData);
      setSuccess("Job posted successfully!");
      setTimeout(() => navigate("/company/jobs"), 1500);
    } catch (err) {
      setError("Failed to post job. Please check the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="add-job-container d-flex justify-content-center align-items-start min-vh-100 pt-5">

      <Card className="neumorphic">
        <h3 className="form-title">Post a New Job</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#ddd' }} className="form-label">Job Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add job title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#ddd' }} className="form-label">Field</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add field"
              name="field"
              value={formData.field}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#ddd' }} className="form-label">Employment Type</Form.Label>
            <Form.Select
              name="employment_type"
              value={formData.employment_type}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#ddd' }} className="form-label">Experience Level</Form.Label>
            <Form.Select
              name="experience_level"
              value={formData.experience_level}
              onChange={handleChange}
              required
            >
              <option value="">Select level</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#ddd' }} className="form-label">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Write job description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ color: '#ddd' }} className="form-label">Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Add location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <div className="text-center">
            <Button type="submit" className="add-job-btn-sub" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Post Job"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
