import React from "react";
import "./Footer.css";

function Footer(props) {
  return (
    <footer className="footer">
      <span>
        <span>About Us</span>
        <span>Connect with us</span>
      </span>
      <span style={{ marginTop: "20px" }}>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-linkedin-in"></i>
      </span>
    </footer>
  );
}

export default Footer;
