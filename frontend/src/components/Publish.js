import React, { useState, useEffect } from "react";
import "../styles/Publish.css";
import PageBackground from "../components/PageBackground";

export default function Publish() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    material: "",
    image_url: "",
  });

  // 🌐 Adjust this to your deployed backend when online
  const BASE_URL = "http://localhost:5000";

  // 🔹 Fetch products from backend
  useEffect(() => {
    fetch(`${BASE_URL}/get-products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // 🔍 Search product
  const handleSearch = () => {
    const found = products.find(
      (p) => p.name.toLowerCase() === searchTerm.toLowerCase()
    );
    setSelectedProduct(found || null);
  };

  // 🖼️ Safe image handler — ensures full URL
  const getImage = (url) => {
    if (!url) return "https://via.placeholder.com/220x220.png?text=No+Image";
    if (url.startsWith("http")) return url;
    return `${BASE_URL}${url}`; // ✅ converts "/uploads/saree.jpg" → "http://localhost:5000/uploads/saree.jpg"
  };

  // 📲 Share on WhatsApp (artisan manually types number)
  const handleWhatsAppShare = (product) => {
    const fullImageUrl = getImage(product.image_url);

    // ✅ WhatsApp message with clickable full image link
    const message = `🪔 *${product.name}*\n${product.description}\n\n💰 *Price:* ${product.price}\n🧵 *Material:* ${product.material}\n📸 *Image:* ${fullImageUrl}\n\nSupport our local artisans ❤️`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <PageBackground role="admin">
    <div className="publish-container">
      <h3>Publish / Social</h3>
      <p>Search existing products or add new ones and share via WhatsApp.</p>

      {/* 🔍 Search Section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search for a product..."
          className="input-field"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>

      {/* 🧾 Found Product */}
      {selectedProduct && (
        <div className="product-preview">
          <img
            src={getImage(selectedProduct.image_url)}
            alt={selectedProduct.name}
          />
          <h4>{selectedProduct.name}</h4>
          <p>{selectedProduct.description}</p>
          <p>
            <b>Price:</b> {selectedProduct.price}
          </p>
          <p>
            <b>Material:</b> {selectedProduct.material}
          </p>
          <button
            onClick={() => handleWhatsAppShare(selectedProduct)}
            className="share-btn"
          >
            Share on WhatsApp
          </button>
        </div>
      )}

      {/* ➕ If not found — add manually */}
      {!selectedProduct && searchTerm && (
        <div className="manual-add">
          <h4>Add Product Details</h4>
          {["name", "description", "price", "material", "image_url"].map(
            (field) => (
              <input
                key={field}
                type="text"
                placeholder={`Enter ${field}`}
                className="input-field"
                value={newProduct[field]}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, [field]: e.target.value })
                }
              />
            )
          )}

          {newProduct.image_url && (
            <img
              src={getImage(newProduct.image_url)}
              alt="preview"
              className="preview-img"
            />
          )}

          <button
            onClick={() => handleWhatsAppShare(newProduct)}
            className="share-btn"
          >
            Share on WhatsApp
          </button>
        </div>
      )}
    </div>
    </PageBackground>
  );
}
