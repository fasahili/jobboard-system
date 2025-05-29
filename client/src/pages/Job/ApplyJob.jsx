import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { submitApplication } from '../../api/jobApi'; 
import "../../style/btn.css"

export default function ApplyJob() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [cv, setCv] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!cv) {
      return setError('Please upload your CV.');
    }

    const formData = new FormData();
    formData.append('message', message);
    formData.append('cv', cv);
    formData.append('job', id); 
    

    try {
      setLoading(true);
      await submitApplication(formData); 
      setSuccess('Application submitted successfully!');
      setError('');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError('Failed to submit application. Try again.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="apply-form-container neumorphic">
      <h3>Apply for Job #{id}</h3>

      <Form onSubmit={handleApply}>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: '#ddd' }} >Cover Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ color: '#ddd' }} >Upload CV (PDF, DOC)</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setCv(e.target.files[0])}
            required
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Button type="submit" className="add-job-btn-sub mt-3" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : 'Submit Application'}
        </Button>
      </Form>
    </Container>
  );
}
