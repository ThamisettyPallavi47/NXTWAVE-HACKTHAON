
import React, { useState } from "react";
import '../styles/ProductGenerator.css';
import PageBackground from "../components/PageBackground";

const API_BASE = "http://127.0.0.1:5000";


const ProductGenerator = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [lang, setLang] = useState("en");
  const [result, setResult] = useState(null);
  const [social, setSocial] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [predictions, setPredictions] = useState(null);

  // Generate product description
  const handleGenerate = async () => {
    const response = await fetch(`${API_BASE}/generate-description`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, material, price, lang }),
    });
    const data = await response.json();
    setResult(data);
  };

  // Generate social media caption
  const handleSocialPost = async () => {
    const response = await fetch(`${API_BASE}/generate-social-post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, material, lang }),
    });
    const data = await response.json();
    setSocial(data);
  };

  // Mock publish handler
  const handlePublish = async (platform) => {
    if (!social?.caption) return alert("Generate a social caption first!");

    const payload = {
      caption: social.caption,
      image_url: imageUrl || "",
      platform: platform,
    };

    try {
      const response = await fetch(`${API_BASE}/publish-social`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      alert(data.message); // show mock success message
    } catch (err) {
      console.error(err);
      alert("Failed to publish (mock).");
    }
  };

  // Generate AI product image
  // const handleGenerateImage = async () => {
  //   const prompt = imagePrompt || `${name} made from ${material}`;
  //   if (!prompt) return alert("Enter a product description or prompt!");
  //   setLoadingImage(true);
  //   try {
  //     const response = await fetch(`${API_BASE}/generate-image`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ prompt }),
  //     });
  //     const data = await response.json();
  //     if (data.image_url) setImageUrl(data.image_url);
  //     else alert(`Image generation failed: ${data.error || "Unknown error"}`);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to generate image.");
  //   }
  //   setLoadingImage(false);
  // };
// Replace your existing handleGenerateImage with this:

const handleGenerateImage = () => {
  // // List of demo images (your Craiyon URLs)
  // const sampleImages = [
  //   "https://www.craiyon.com/en/image/1TjaMGY9QAm2CasctTZkfg",
  //   "https://www.craiyon.com/en/image/aTnJKyEgT--9qgW6j6mZBA",
  //   "https://www.craiyon.com/en/image/xYiwXdz_Tuydx6t_CI8MiQ"
  // ];

 
  const sampleImages = [
    // "http://127.0.0.1:5000/static/images/parse.png",
    // "http://127.0.0.1:5000/static/images/cup.png",
    "http://127.0.0.1:5000/static/images/basket.png"
  ];
  // Pick a random image from the list
  const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];

  // Update state to show the image
  setImageUrl(randomImage);
};

  // Predict customer interest
  const handlePredictInterest = async () => {
    if (!name || !category || !material)
      return alert("Enter product name, category, and material!");
    try {
      const response = await fetch(`${API_BASE}/predict-interest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, material }),
      });
      const data = await response.json();
      if (data.predictions) setPredictions(data.predictions);
      else alert("Prediction failed: " + data.error);
    } catch (err) {
      console.error(err);
      alert("Failed to predict customer interest.");
    }
  };

  return (
    <PageBackground role="admin">
    <div className="product-generator-container">
      <h2 className="text-xl font-bold mb-4">Product Listing Generator</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />

      <input
        type="text"
        placeholder="Material"
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />

      <input
        type="text"
        placeholder="Price Range"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />

      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="te">Telugu</option>
        <option value="ta">Tamil</option>
      </select>

      <button
        onClick={handleGenerate}
        className="generate-btn"
      >
        Generate Description
      </button>

      <button
        onClick={handleSocialPost}
        className="generate-btn"
      >
        Generate Social Media Caption
      </button>

      <input
        type="text"
        placeholder="Enter prompt for AI image (optional)"
        value={imagePrompt}
        onChange={(e) => setImagePrompt(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <button
        onClick={handleGenerateImage}
        className="generate-btn"
      >
        {loadingImage ? "Generating Image..." : "Generate Product Image"}
      </button>

      <button
        onClick={handlePredictInterest}
        className="generate-btn"
      >
        Predict Customer Interest
      </button>

      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <h3 className="font-semibold">AI Generated Description:</h3>
          <p>{result.description}</p>
          <h4 className="font-semibold mt-2">Keywords:</h4>
          <p>{result.keywords.join(", ")}</p>
        </div>
      )}

      {social && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <h3 className="font-semibold">Social Media Caption:</h3>
          <p>{social.caption}</p>
          <h4 className="font-semibold mt-2">Hashtags:</h4>
          <p>{social.hashtags.join(" ")}</p>

          {/* Mock social publisher buttons */}
          <h4 className="font-semibold mt-2">Publish to:</h4>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => handlePublish("Instagram")}
              className="bg-pink-500 text-white px-3 py-1 rounded"
            >
              Instagram
            </button>
            <button
              onClick={() => handlePublish("Facebook")}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Facebook
            </button>
            <button
              onClick={() => handlePublish("WhatsApp")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              WhatsApp
            </button>
          </div>
        </div>
      )}

      {imageUrl && (
        <div className="mt-4 p-3 border rounded bg-gray-50 text-center">
          <h3 className="font-semibold">Generated Product Image:</h3>
          <img
            src={imageUrl}
            alt="AI Generated Product"
            className="mx-auto mt-2"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}

      {predictions && (
        <div className="mt-4 p-3 border rounded bg-yellow-50">
          <h3 className="font-semibold">Predicted Sales by Region:</h3>
          <ul>
            {Object.entries(predictions).map(([region, sales]) => (
              <li key={region}>
                {region}: {sales}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </PageBackground>
  );
};

export default ProductGenerator;


