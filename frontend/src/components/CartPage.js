

// import React, { useEffect, useState } from "react";
// import "../styles/CartPage.css";

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState([]);
//   const userEmail = localStorage.getItem("userEmail") || "pallavi@gmail.com";

//   // ✅ Fetch all cart items from backend
//   const fetchCart = async () => {
//     try {
//       const res = await fetch(`http://127.0.0.1:5000/cart/${userEmail}`);
//       const data = await res.json();
//       setCartItems(data.cart || []);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     }
//   };

//   // ✅ Remove a product from the cart
//   const removeFromCart = async (productName) => {
//     try {
//       const res = await fetch("http://127.0.0.1:5000/cart/remove", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_email: userEmail,
//           product_name: productName,
//         }),
//       });

//       const data = await res.json();
//       if (data.message) {
//         alert(data.message);
//         fetchCart();
//       }
//     } catch (err) {
//       console.error("Error removing item:", err);
//     }
//   };

//   // ✅ Handle Pay Now button click
//   const handlePayNow = (item) => {
//     // Here you can redirect to a payment page or integrate a payment gateway.
//     // For now, we’ll just show a message.
//     alert(`Proceeding to payment for: ${item.product_name} (₹${item.price})`);
//   };

//   // ✅ Fetch cart on component load
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <div className="cart-container">
//       <h2>Your Cart 🛒</h2>

//       {cartItems.length === 0 ? (
//         <p className="empty-cart">Your cart is empty.</p>
//       ) : (
//         cartItems.map((item, index) => (
//           <div key={index} className="cart-item">
//             <img
//               src={`http://127.0.0.1:5000${item.image_url}`}
//               alt={item.product_name}
//               className="cart-item-image"
//             />
//             <div className="cart-item-details">
//               <h4>{item.product_name}</h4>
//               <p>₹{item.price}</p>
//               <p>Qty: {item.quantity}</p>

//               <div className="cart-buttons">
//                 <button
//                   className="remove-btn"
//                   onClick={() => removeFromCart(item.product_name)}
//                 >
//                   Remove
//                 </button>

//                 <button
//                   className="pay-btn"
//                   onClick={() => handlePayNow(item)}
//                 >
//                   💳 Pay Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const userEmail = localStorage.getItem("userEmail") || "pallavi@gmail.com";
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/cart/${userEmail}`);
      const data = await res.json();
      setCartItems(data.cart || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const removeFromCart = async (productName) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: userEmail,
          product_name: productName,
        }),
      });

      const data = await res.json();
      if (data.message) {
        alert(data.message);
        fetchCart();
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // ✅ Navigate to PaymentPage
  const handlePayment = (item) => {
    navigate("/payment", { state: { amount: item.price } });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-container">
      <h2>Your Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img
              src={`http://127.0.0.1:5000${item.image_url}`}
              alt={item.product_name}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h4>{item.product_name}</h4>
              <p>₹{item.price}</p>
              <p>Qty: {item.quantity}</p>

              <div className="cart-item-actions">
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.product_name)}
                >
                  Remove
                </button>
                <button
                  className="pay-btn"
                  onClick={() => handlePayment(item)}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
