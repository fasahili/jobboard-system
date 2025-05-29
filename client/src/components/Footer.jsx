import React from "react";
import "../style/Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      © {new Date().getFullYear()} JobBoard. Designed with ❤️ using React & Bootstrap.
    </footer>
  );
}
