// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PageBackground from "../components/PageBackground";
// import "../styles/MarketProductDetails.css";

// export default function MarketProductDetails() {
//   const { id } = useParams(); // product name in URL
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const navigate = useNavigate();

//   const userEmail = localStorage.getItem("userEmail") || "pallavi@gmail.com"; // temporary user identity

//   useEffect(() => {
//     // Fetch product details
//     fetch(`http://127.0.0.1:5000/get-products`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.products) {
//           const found = data.products.find((p) => p.name === decodeURIComponent(id));
//           setProduct(found);
//         }
//       });

//     // Fetch reviews
//     fetch(`http://127.0.0.1:5000/get-reviews/${encodeURIComponent(id)}`)
//       .then((res) => res.json())
//       .then((data) => setReviews(data.reviews || []))
//       .catch((err) => console.error("Failed to fetch reviews:", err));
//   }, [id]);

//   if (!product) return <div className="loading">Loading product details...</div>;

//   const avgRating = reviews.length
//     ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
//     : "No ratings yet";

//   // ✅ Add to Cart (Backend)
//   const handleAddToCart = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/add-to-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: userEmail,
//           product: {
//             name: product.name,
//             price: product.price,
//             image_url: product.image_url,
//             quantity: 1,
//           },
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         alert("✅ Added to cart!");
//         navigate("/cart");
//       } else {
//         alert(data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error("Add to cart error:", err);
//     }
//   };

//   return (
//     <PageBackground role="customer">
//       <div className="product-details-container">
//         <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

//         <div className="product-details-card">
//           <img
//             src={`http://127.0.0.1:5000${product.image_url}`}
//             alt={product.name}
//             className="detail-image"
//           />
//           <div className="details-content">
//             <h2>{product.name}</h2>
//             <p className="price">₹{product.price}</p>
//             <p>{product.description}</p>
//             <p><strong>Category:</strong> {product.category}</p>
//             <p><strong>Material:</strong> {product.material}</p>
//             <p><strong>Average Rating:</strong> ⭐ {avgRating}</p>

//             <div className="button-row">
//               <button className="buy-btn">Buy Now</button>
//               <button className="addcart-btn" onClick={handleAddToCart}>
//                 🛒 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="review-section">
//           <h3>Customer Reviews</h3>
//           {reviews.length === 0 ? (
//             <p>No reviews yet.</p>
//           ) : (
//             reviews.map((r, i) => (
//               <div key={i} className="review-item">
//                 <strong>{r.username || "Anonymous"}</strong> — ⭐ {r.rating}
//                 <p>{r.comment}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </PageBackground>
//   );
// }

// src/components/MarketProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageBackground from "../components/PageBackground";
import "../styles/MarketProductDetails.css";

export default function MarketProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "pallavi@gmail.com";

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/get-products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          const found = data.products.find((p) => p.name === decodeURIComponent(id));
          setProduct(found);
        }
      });

    fetch(`http://127.0.0.1:5000/get-reviews/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews || []))
      .catch((err) => console.error("Failed to fetch reviews:", err));
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "No ratings yet";


  const handleAddToCart = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/cart/add", {  // ✅ corrected endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email: userEmail,              // ✅ match Flask’s expected key
        product_name: product.name,         // ✅ match Flask’s expected key
        price: product.price,
        image_url: product.image_url,
        quantity: 1,
      }),
    });

    const data = await res.json();
    console.log("Cart response:", data); // for debugging

    if (res.ok) {
      alert("✅ Product added to cart!");
      navigate("/cart"); // ✅ redirect to cart page
    } else {
      alert(`⚠️ Failed: ${data.error || data.message}`);
    }
  } catch (err) {
    console.error("❌ Add to cart error:", err);
    alert("Server connection failed!");
  }
};


  // const handleAddToCart = async () => {
  //   try {
  //     const res = await fetch("http://127.0.0.1:5000/add-to-cart", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         email: userEmail,
  //         product: {
  //           name: product.name,
  //           price: product.price,
  //           image_url: product.image_url,
  //           quantity: 1,
  //         },
  //       }),
  //     });

  //     const data = await res.json();
  //     if (data.success) {
  //       alert("✅ Product added to cart!");
  //       navigate("/cart");
  //     } else {
  //       alert("⚠️ Failed to add product.");
  //     }
  //   } catch (err) {
  //     console.error("Add to cart error:", err);
  //   }
  // };

  return (
    <PageBackground role="customer">
      <div className="product-details-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="product-details-card">
          <img
            src={`http://127.0.0.1:5000${product.image_url}`}
            alt={product.name}
            className="detail-image"
          />
          <div className="details-content">
            <h2>{product.name}</h2>
            <p className="price">₹{product.price}</p>
            <p>{product.description}</p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Material:</strong> {product.material}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {avgRating}
            </p>

            <div className="button-row">
              {/* <button className="buy-btn">Buy Now</button> */}
              <button className="addcart-btn" onClick={handleAddToCart}>
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* <div className="review-section">
          <h3>Customer Reviews</h3>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((r, i) => (
              <div key={i} className="review-item">
                <strong>{r.username || "Anonymous"}</strong> — ⭐ {r.rating}
                <p>{r.comment}</p>
              </div>
            ))
          )}
        </div> */}
      </div>
    </PageBackground>
  );
}
