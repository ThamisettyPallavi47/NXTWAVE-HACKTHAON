
// src/components/AdminProductList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../auth";
import "../styles/AdminDashboard.css";
import PageBackground from "../components/PageBackground";

export default function AdminProductList() {
  const user = getUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Fetch only products added by this admin
  const fetchAdminProducts = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(
        `http://localhost:5000/get-products?admin_email=${encodeURIComponent(
          user.email
        )}`
      );
      const data = await res.json();
      if (data.products) setProducts(data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchAdminProducts();
  }, [user]);

  // Handle click on product card → navigate to full details page
  const handleCardClick = (product) => {
    navigate(`/admin/product/${encodeURIComponent(product.name)}`, {
      state: { product },
    });
  };

  return (
    <PageBackground role="admin">
      <div className="admin-dashboard-container">
        <div className="admin-header">
          <div className="header-center">
            <h2>Your Products</h2>
            <p>Click a product card to view full details.</p>
          </div>
        </div>

        <div className="product-list-section">
          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product, index) => (
                <div
                  className="product-card"
                  key={index}
                  onClick={() => handleCardClick(product)}
                  style={{ cursor: "pointer" }}
                >
                  {product.image_url && (
                    <img
                      src={`http://localhost:5000${product.image_url}`}
                      alt={product.name}
                      className="product-img"
                    />
                  )}
                  <h4>{product.name}</h4>
                  <p className="short-description">
                    {product.description?.length > 70
                      ? product.description.substring(0, 70) + "..."
                      : product.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-products">No products added yet.</p>
          )}
        </div>
      </div>
    </PageBackground>
  );
}
