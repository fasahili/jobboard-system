import React from "react";
import { Container } from "react-bootstrap";
import "../style/PageHeader.css";

export default function PageHeader({ title, subtitle, icon, rightAction }) {
  return (
    <div className="page-header-wrapper">
      <Container className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div className="page-header-left d-flex align-items-center gap-3">
          {icon && <span className="page-header-icon">{icon}</span>}
          <div>
            <h2 className="page-header-title">{title}</h2>
            {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
          </div>
        </div>
        {rightAction && <div className="page-header-action">{rightAction}</div>}
      </Container>
    </div>
  );
}
