import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">ArtisanHub</div>

        <ul className="nav-links">
          <li><Link to="/" className="nav-item">Home</Link></li>
          <li><Link to="/about" className="nav-item">About</Link></li>
          <li><Link to="/products" className="nav-item">Products</Link></li>
          <li><Link to="/contact" className="nav-item">Contact</Link></li>
        </ul>

        <div className="nav-auth">
          <Link to="/login" className="login-btn">Login / Register</Link>
        </div>
      </div>
    </nav>
  );
}
