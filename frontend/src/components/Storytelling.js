
import React, { useState } from "react";
import '../styles/Storytelling.css';
import PageBackground from "../components/PageBackground";

const API_BASE = "http://127.0.0.1:5000";

const Storytelling = () => {
  const [productName, setProductName] = useState("");
  const [material, setMaterial] = useState("");
  const [artisanName, setArtisanName] = useState("");
  const [location, setLocation] = useState("");
  const [useCase, setUseCase] = useState("");

  const [storyData, setStoryData] = useState(null);

  const handleGenerateStory = async () => {
    const res = await fetch(`${API_BASE}/generate-story`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        product_name: productName, 
        material,
        artisan_name: artisanName,
        location,
        use_case: useCase 
      }),
    });
    const data = await res.json();
    setStoryData(data);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <PageBackground role="admin">
    <div className="storytelling-container">
      <h2>Storytelling Assistant</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Material"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Artisan Name (optional)"
        value={artisanName}
        onChange={(e) => setArtisanName(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Location (optional)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Use Case (optional, e.g., gifting)"
        value={useCase}
        onChange={(e) => setUseCase(e.target.value)}
        className="input-field"
      />

      <button onClick={handleGenerateStory} className="generate-btn">
        Generate Story
      </button>

      {storyData && (
        <div className="story-result">
          <div className="story-section">
            <h3>Story:</h3>
            <p>{storyData.story}</p>
            <button onClick={() => copyToClipboard(storyData.story)} className="copy-btn">
              Copy Story
            </button>
          </div>

          <div className="story-section">
            <h3>Caption:</h3>
            <p>{storyData.caption}</p>
            <button onClick={() => copyToClipboard(storyData.caption)} className="copy-btn">
              Copy Caption
            </button>
          </div>
        </div>
      )}
    </div>
    </PageBackground>
  );
};

export default Storytelling;
