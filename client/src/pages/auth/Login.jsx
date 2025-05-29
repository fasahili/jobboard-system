import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { loginUser } from '../../api/jobApi';
import '../../style/auth.css'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      const decoded = jwtDecode(access);
      if (decoded.role === 'company') {
        window.location.href = '/company/jobs';
      } else if (decoded.role === 'job_seeker') {
        window.location.href = '/';
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container className="d-flex justify-content-center min-vh-100 pt-5">

      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <Card className="p-4 shadow neumorphic">
            <h3 className="text-center light mb-4 text-gradient title-card-auth">Sign in to your account</h3>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label className="text-white">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}

              <Button type="submit" className="w-100" variant="primary">
                Sign In
              </Button>
            </Form>

            <div className="mt-3 text-center">
              <span className="text-white">Not a member?</span> <a href="/register">Register here</a>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}