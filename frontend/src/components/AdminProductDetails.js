// src/components/AdminProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/AdminProductDetails.css";
import { Pencil, Trash2, X } from "lucide-react";

export default function AdminProductDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // 'save' or 'delete'
  const [formData, setFormData] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success or error

  // Fetch product details
  useEffect(() => {
    if (!name) return;

    fetch(`http://localhost:5000/get-product/${encodeURIComponent(name)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        if (data.product) {
          setProduct(data.product);
          setFormData(data.product);
        }
      })
      .catch((err) => console.error("Error fetching product details:", err));
  }, [name]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // Save edited product
  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (newImage) formDataToSend.append("image", newImage);

      const res = await fetch(
        `http://localhost:5000/update-product/${encodeURIComponent(product.name)}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      const data = await res.json();

      if (res.ok) {
        setProduct(data.product || formData);
        setIsEditing(false);
        setShowDialog(false);
        setMessage("✅ Product updated successfully!");
        setMessageType("success");
      } else {
        setMessage(`⚠️ ${data.error || "Failed to update product."}`);
        setMessageType("error");
      }

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error updating product:", err);
      setMessage("⚠️ Server error while updating product.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Delete product
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/delete-product/${encodeURIComponent(product.name)}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setMessage("🗑️ Product deleted successfully!");
        setMessageType("success");
        setTimeout(() => navigate(-1), 1500);
      } else {
        setMessage("⚠️ Failed to delete product.");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      setMessage("⚠️ Server error while deleting product.");
      setMessageType("error");
    } finally {
      setShowDialog(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (!product)
    return (
      <div className="product-details-page">
        <p>Loading product details...</p>
      </div>
    );

  return (
    <div className="product-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* ✅ Message displayed above the card */}
      {message && <div className={`message-box ${messageType}`}>{message}</div>}

      <div className="product-details-card">
        {/* Delete Button (Top Left) */}
        <Trash2
          className="icon-btn delete"
          onClick={() => {
            setDialogType("delete");
            setShowDialog(true);
          }}
        />

        {/* Edit Button (Top Right) */}
        {!isEditing ? (
          <Pencil className="icon-btn edit" onClick={() => setIsEditing(true)} />
        ) : (
          <X className="icon-btn edit cancel" onClick={() => setIsEditing(false)} />
        )}

        <img
          src={
            newImage
              ? URL.createObjectURL(newImage)
              : `http://localhost:5000${product.image_url}`
          }
          alt={product.name}
          className="product-details-image"
        />

        <div className="product-details-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="edit-input"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="edit-textarea"
              />
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="edit-input"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="edit-input"
              />
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="edit-input"
              />

              {/* Image Upload */}
              <label className="image-upload-label">Change Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="edit-input"
              />

              <button
                className="save-btn"
                onClick={() => {
                  setDialogType("save");
                  setShowDialog(true);
                }}
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <h2>{product.name}</h2>
              <p className="description">{product.description}</p>
              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Material:</strong> {product.material}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <p>
              {dialogType === "save"
                ? "Do you want to save changes?"
                : "Are you sure you want to delete this product?"}
            </p>
            <div className="dialog-actions">
              {dialogType === "save" ? (
                <>
                  <button className="dialog-btn confirm" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="dialog-btn cancel"
                    onClick={() => setShowDialog(false)}
                  >
                    Discard
                  </button>
                </>
              ) : (
                <>
                  <button className="dialog-btn confirm delete" onClick={handleDelete}>
                    Delete
                  </button>
                  <button
                    className="dialog-btn cancel"
                    onClick={() => setShowDialog(false)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
