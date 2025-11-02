// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { logout, getUser } from "../auth";
// import "../styles/AdminDashboard.css";
// import PageBackground from "../components/PageBackground";


// export default function AdminDashboard() {
//   const user = getUser();
//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     material: "",
//   });

//   // ✅ Fetch only products added by this admin
//   useEffect(() => {
//     if (user?.email) {
//       fetch(
//         `http://localhost:5000/get-products?admin_email=${encodeURIComponent(
//           user.email
//         )}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.products) {
//             setProducts(data.products);
//           }
//         })
//         .catch((err) => console.error("Error fetching products:", err));
//     }
//   }, [user]);

//   const handleDelete = async (name) => {
//     if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
//     try {
//       const res = await fetch(`http://localhost:5000/delete-product/${name}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       alert(data.message || "Deleted");
//       if (user?.email) {
//         // Re-fetch after deletion
//         fetch(
//           `http://localhost:5000/get-products?admin_email=${encodeURIComponent(
//             user.email
//           )}`
//         )
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.products) setProducts(data.products);
//           });
//       }
//     } catch (err) {
//       console.error("Error deleting product:", err);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       category: product.category,
//       material: product.material,
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:5000/update-product/${editingProduct.name}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );
//       const data = await res.json();
//       alert(data.message || "Updated");
//       setEditingProduct(null);

//       // Re-fetch products after update
//       if (user?.email) {
//         fetch(
//           `http://localhost:5000/get-products?admin_email=${encodeURIComponent(
//             user.email
//           )}`
//         )
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.products) setProducts(data.products);
//           });
//       }
//     } catch (err) {
//       console.error("Error updating product:", err);
//     }
//   };

//   return (
//     <PageBackground role="admin">
//     <div className="admin-dashboard-container">
//       {/* Header Section */}
//       <div className="admin-header">
//         <div className="header-center">
//           <h2>Admin Dashboard</h2>
//           <p>Welcome, {user ? user.email : "Admin"}</p>
//         </div>
//         <button
//           className="logout-btn"
//           onClick={() => {
//             logout();
//             window.location.href = "/";
//           }}
//         >
//           Logout
//         </button>
//       </div>

//       {/* Navbar Section */}
//       <nav className="admin-nav">
//         <Link to="/admin/product-generator">Product Generator</Link>
//         <Link to="/admin/storytelling">Storytelling</Link>
//         <Link to="/admin/marketplace-recommender">Marketplace Recommender</Link>
//         <Link to="/admin/pricing-suggestion">Pricing Suggestion</Link>
//         <Link to="/admin/publish">Publish / Social</Link>
//         <Link to="/admin/addproduct">Add Product</Link>
//       </nav>

//       {/* Product List Section */}
//       <div className="product-list-section">
//         <h3>Products Added by You</h3>
//         {products.length > 0 ? (
//           <div className="product-grid">
//             {products.map((product, index) => (
//               <div className="product-card" key={index}>
//                 {product.image_url && (
//                   <img
//                     src={`http://localhost:5000${product.image_url}`}
//                     alt={product.name}
//                     className="product-img"
//                   />
//                 )}
//                 <h4>{product.name}</h4>
//                 <p>{product.description}</p>
//                 <p>
//                   <strong>Price:</strong> ₹{product.price}
//                 </p>
//                 <p>
//                   <strong>Category:</strong> {product.category}
//                 </p>
//                 <p>
//                   <strong>Material:</strong> {product.material}
//                 </p>
//                 <div className="product-actions">
//                   <button
//                     className="edit-btn"
//                     onClick={() => handleEdit(product)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => handleDelete(product.name)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="no-products">No products added by you yet.</p>
//         )}
//       </div>

//       {/* Edit Modal */}
//       {editingProduct && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Edit Product</h3>
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Name"
//             />
//             <input
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Description"
//             />
//             <input
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               placeholder="Price"
//             />
//             <input
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               placeholder="Category"
//             />
//             <input
//               name="material"
//               value={formData.material}
//               onChange={handleChange}
//               placeholder="Material"
//             />

//             <div className="modal-buttons">
//               <button onClick={handleUpdate} className="save-btn">
//                 Save
//               </button>
//               <button
//                 onClick={() => setEditingProduct(null)}
//                 className="cancel-btn"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   </PageBackground>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";
import { logout, getUser } from "../auth";
import "../styles/AdminDashboard.css";
import PageBackground from "../components/PageBackground";

export default function AdminDashboard() {
const user = getUser();

return ( <PageBackground role="admin"> <div className="admin-dashboard-container">
{/* Header Section */} <div className="admin-header"> <div className="header-center"> <h2>Admin Dashboard</h2> <p>Welcome, {user ? user.email : "Admin"}</p> </div>
<button
className="logout-btn"
onClick={() => {
logout();
window.location.href = "/";
}}
>
Logout </button> </div>

```
    {/* Navbar Section */}
    <nav className="admin-nav">
      <Link to="/admin/product-generator">Product Generator</Link>
      <Link to="/admin/storytelling">Storytelling</Link>
      <Link to="/admin/marketplace-recommender">Marketplace Recommender</Link>
      <Link to="/admin/pricing-suggestion">Pricing Suggestion</Link>
      <Link to="/admin/publish">Publish / Social</Link>
      <Link to="/admin/addproduct">Add Product</Link>
      <Link to="/admin/list-products">List Products</Link>
    </nav>

    {/* Info Section */}
    <div className="admin-info">
      <h3>Welcome to Artisan Hub Admin Panel</h3>
      <p>
        Use the navigation above to manage your products, generate ideas, set prices, and publish
        to the marketplace. Click on <strong>“List Products”</strong> to view or edit your added items.
      </p>
    </div>
  </div>
</PageBackground>


);
}
