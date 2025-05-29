import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Alert, Spinner } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { createCompany } from "../../api/jobApi";
import "../../style/btn.css"

export default function CreateCompany() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    website: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const role = token ? jwtDecode(token).role : null;

  if (role !== "company") {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Only company users can access this page.</Alert>
      </Container>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await createCompany(formData);
      setSuccess("Company profile created successfully!");
      setTimeout(() => navigate("/company/jobs"), 1500);
    } catch (err) {
      setError("Failed to create company profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-start min-vh-100 pt-5">
      <div className="neumorphic" style={{ width: "100%", maxWidth: 600 }}>
        <h3 className="form-title">Create Your Company Profile</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#ddd' }} className="form-label">Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add company Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#ddd' }} className="form-label">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Add description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#ddd' }} className="form-label">Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#ddd' }} className="form-label">Website</Form.Label>
            <Form.Control
              type="url"
              placeholder="Add website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <button type="submit" className="add-job-btn" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Create Company"}
          </button>
        </Form>
      </div>
    </div>
  );
}
