import React, { useState } from "react";
import '../styles/PricingSuggestion.css';

import PageBackground from "../components/PageBackground";

const API_BASE = "http://127.0.0.1:5000";

export default function PricingSuggestion() {
  const [productName, setProductName] = useState("");
  const [material, setMaterial] = useState("");
  const [location, setLocation] = useState("");
  const [artisanName, setArtisanName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    setError("");
    setPrice("");
    if (!productName.trim() || !material.trim() || !location.trim()) {
      setError("Product name, material and location are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/suggest-price`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: productName,
          material,
          location,
          artisan_name: artisanName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setPrice(data.price_range || "No price returned");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageBackground role="admin">
    <div className="pricing-suggestion-container">
      <h2>AI Pricing Suggestion</h2>

      <input
        type="text"
        placeholder="Product Name (e.g. Bamboo Basket)"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="input-field"
      />

      <input
        type="text"
        placeholder="Material (e.g. Bamboo)"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        className="input-field"
      />

      <input
        type="text"
        placeholder="Location (e.g. Kolkata)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="input-field"
      />

      <input
        type="text"
        placeholder="Artisan Name (optional)"
        value={artisanName}
        onChange={(e) => setArtisanName(e.target.value)}
        className="input-field"
      />

      <button
        onClick={handleSuggest}
        className="suggest-btn"
        disabled={loading}
      >
        {loading ? "Suggesting..." : "Suggest Price"}
      </button>

      {error && <p className="error-text">{error}</p>}

      {price && (
        <div className="result-box">
          <h3>Suggested Price Range</h3>
          <p>{price}</p>
        </div>
      )}
    </div>
    </PageBackground>
  );
}
