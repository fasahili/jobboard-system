import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../style/Navbar.css";

export default function NavigationBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (e) {
      console.error("Invalid token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="custom-navbar sticky-top shadow-sm px-3">
      <Container fluid>
        <Navbar.Brand href="/" className="brand fw-bold">JobBoard</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {!token && (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            )}
            {role === "job_seeker" && (
              <>
                <Nav.Link href="/apply">Apply Jobs</Nav.Link>
                <Nav.Link href="/my-applications">My Applications</Nav.Link>
              </>
            )}
            {role === "company" && (
              <>
                <Nav.Link href="/company/jobs">My Jobs</Nav.Link>
                <Nav.Link href="/company/applications">Applications</Nav.Link>
                <Nav.Link href="/jobs">All Jobs</Nav.Link>
              </>
            )}
            {role === "admin" && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
          </Nav>

          {token && (
            <Button variant="outline-danger" onClick={handleLogout} className="logout-btn">
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
