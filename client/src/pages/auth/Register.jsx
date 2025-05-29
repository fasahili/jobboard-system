import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { registerUser } from '../../api/jobApi';
import '../../style/auth.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'job_seeker',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      window.location.href = '/login';
    } catch (err) {
      setError('Registration failed. Please check your input.');
    }
  };

  return (
    <Container className="d-flex justify-content-center min-vh-100 pt-5">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <Card className="p-4 shadow neumorphic">
            <h3>Create a new account</h3>
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Control
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select name="role" value={formData.role} onChange={handleChange}>
                  <option value="job_seeker">Job Seeker</option>
                  <option value="company">Company</option>
                </Form.Select>
              </Form.Group>

              <Button type="submit" className="w-100" variant="success">
                Register
              </Button>

              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>

            <div className="mt-3 text-center">
              <span className="text-white">Already have an account?</span> <a href="/login">Sign in here</a>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
