
import React, { useState } from "react";
import '../styles/MarketplaceRecommender.css';
import PageBackground from "../components/PageBackground";

const API_BASE = "http://127.0.0.1:5000";

const MarketplaceRecommender = () => {
  const [productName, setProductName] = useState("");
  const [material, setMaterial] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  const handleRecommend = async () => {
    if (!productName.trim()) {
      setError("Please enter a product name");
      return;
    }

    setError("");
    try {
      const res = await fetch(`${API_BASE}/recommend-marketplace`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_name: productName, material }),
      });

      const data = await res.json();

      if (res.ok) {
        setRecommendations(data.marketplaces || []);
      } else {
        setError(data.error || "Something went wrong");
        setRecommendations([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations");
      setRecommendations([]);
    }
  };

  return (
    <PageBackground role="admin">
    <div className="marketplace-container">
      <h2>Marketplace Recommender</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="input-field"
      />

      <input
        type="text"
        placeholder="Material (e.g. bamboo, cotton)"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        className="input-field"
      />

      <button onClick={handleRecommend} className="recommend-btn">
        Recommend Marketplaces
      </button>

      {error && <p className="error-text">{error}</p>}

      {recommendations.length > 0 && (
        <div className="recommendation-box">
          <h3>Recommended Marketplaces:</h3>
          <ul>
            {recommendations.map((marketplace, index) => (
              <li key={index}>
                <a
                  href={marketplace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {marketplace.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </PageBackground>
  );
};

export default MarketplaceRecommender;
