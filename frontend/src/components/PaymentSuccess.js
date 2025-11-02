import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentSuccess.css";

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { message, payment_id } = location.state || {};

  return (
    <div className="success-container">
      <h2>{message || "Payment status unknown"}</h2>
      {payment_id && <p>Payment ID: {payment_id}</p>}
      <button className="back-btn" onClick={() => navigate("/cart")}>
        Go Back to Cart
      </button>
    </div>
  );
}
