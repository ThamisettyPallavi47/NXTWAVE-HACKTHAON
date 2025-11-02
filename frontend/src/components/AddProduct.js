


import React, { useState, useEffect } from "react";
import '../styles/AddProduct.css';
import { getUser } from "../auth"; // ✅ import your user data (update path if needed)

const API_BASE = "http://127.0.0.1:5000";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [artisan, setArtisan] = useState("");
  const [email, setEmail] = useState(""); // ✅ admin email
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  // ✅ Fetch user email once when component loads
  useEffect(() => {
    const user = getUser();
    if (user && user.email) {
      setEmail(user.email);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setMessage("Only JPG and PNG image formats are allowed.");
        e.target.value = "";
        setImage(null);
        return;
      }
      setImage(file);
      setMessage("");
    }
  };
// const handleImageChange = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const validTypes = ["image/jpeg", "image/png"];
//   if (!validTypes.includes(file.type)) {
//     setMessage("Only JPG and PNG image formats are allowed.");
//     e.target.value = "";
//     setImage(null);
//     return;
//   }

//   setImage(file);
//   setMessage("Analyzing image... Please wait ⏳");

//   try {
//     const formData = new FormData();
//     formData.append("image", file);

//     const res = await fetch(`${API_BASE}/predict-product-name`, {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     if (res.ok && data.predicted_name) {
//       setName(data.predicted_name); // ✅ Auto-fill product name
//       setMessage(`✅ Predicted Product Name: ${data.predicted_name}`);
//     } else {
//       setMessage("Couldn't predict product name. Please enter manually.");
//     }
//   } catch (err) {
//     console.error(err);
//     setMessage("Error analyzing image.");
//   }
// };


  const handleSubmit = async () => {
    setMessage("");
    if (!name || !description || !price || !category || !material || !artisan) {
      setMessage("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("material", material);
    formData.append("artisan_name", artisan);
    formData.append("admin_email", email); // ✅ add email
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${API_BASE}/add-product`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Product added successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setMaterial("");
        setArtisan("");
        setImage(null);
        document.getElementById("imageInput").value = "";
      } else {
        setMessage(data.error || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>

      <input type="text" placeholder="Product Name" value={name} onChange={e=>setName(e.target.value)} className="input-field" />
      <input type="text" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="input-field" />
      <input type="text" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} className="input-field" />
      <input type="text" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} className="input-field" />
      <input type="text" placeholder="Material" value={material} onChange={e=>setMaterial(e.target.value)} className="input-field" />
      <input type="text" placeholder="Artisan Name" value={artisan} onChange={e=>setArtisan(e.target.value)} className="input-field" />

      {/* ✅ Auto-filled email (readonly) */}
      <input type="text" placeholder="Admin Email" value={email} readOnly className="input-field readonly" />

      <input
        type="file"
        id="imageInput"
        accept=".jpg,.jpeg,.png"
        onChange={handleImageChange}
        className="input-field"
      />

      <button onClick={handleSubmit} className="submit-btn">Add Product</button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
