import { Card } from "react-bootstrap";
import "../style/JobCard.css";

export default function JobCard({
  title,
  company,
  location,
  experience,
  employmentType,
  description,
  status,
  appliedAt,
  message,
  applicant,
  cvLink,
  actions,
}) {
  return (
    <Card className="job-card elegant-shadow">
      <Card.Body className="job-card-body">
        <div className="job-header">
          <Card.Title className="job-title">{title}</Card.Title>
          <br />

          {status && typeof status === "string" && (
            <>
              <strong className="status-title">Status:</strong>{" "}
              <span
                className={`status-badge ${
                  status.toLowerCase() === "accepted"
                    ? "accepted"
                    : status.toLowerCase() === "rejected"
                    ? "rejected"
                    : "pending"
                }`}
              >
                {status}
              </span>
              <br />
            </>
          )}
        </div>

        <Card.Text className="job-details">
          {company && (
            <p>
              <strong>🏢 Company:</strong> {company}
            </p>
          )}
          {location && (
            <p>
              <strong>📍 Location:</strong> {location}
            </p>
          )}
          {description && (
            <p>
              <strong>📝 Description:</strong> {description}
            </p>
          )}
          {experience && (
            <p>
              <strong>🧠 Experience:</strong> {experience}
            </p>
          )}
          {employmentType && (
            <p>
              <strong>🕒 Employment:</strong> {employmentType}
            </p>
          )}
          {appliedAt && (
            <p>
              <strong>📅 Applied At:</strong> {appliedAt}
            </p>
          )}
          {message && (
            <p>
              <strong>💬 Message:</strong> {message}
            </p>
          )}
          {applicant && (
            <p>
              <strong>🙍 Name:</strong> {applicant}
            </p>
          )}
        </Card.Text>

        <div className="job-footer mt-3 d-flex flex-wrap gap-2">
          {cvLink && (
            <a href={cvLink} target="_blank" rel="noopener noreferrer">
              <button className="btn btn-outline-dark">📥 Download CV</button>
            </a>
          )}
          {actions}
        </div>
      </Card.Body>
    </Card>
  );
}
