

// // // // // import React, { useEffect } from "react";
// // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // import "../styles/PaymentPage.css";

// // // // // export default function PaymentPage() {
// // // // //   const location = useLocation();
// // // // //   const navigate = useNavigate();
// // // // //   const { amount, user_email, products } = location.state || {};

// // // // //   useEffect(() => {
// // // // //     if (!amount) return;

// // // // //     // Dynamically load Razorpay script
// // // // //     const loadRazorpay = () => {
// // // // //       const script = document.createElement("script");
// // // // //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // // //       script.onload = handlePayment;
// // // // //       document.body.appendChild(script);
// // // // //     };

// // // // //     const handlePayment = async () => {
// // // // //       try {
// // // // //         const res = await fetch("http://127.0.0.1:5000/create-payment", {
// // // // //           method: "POST",
// // // // //           headers: { "Content-Type": "application/json" },
// // // // //           body: JSON.stringify({
// // // // //             amount,
// // // // //             currency: "INR",
// // // // //             user_email,
// // // // //             products,
// // // // //           }),
// // // // //         });

// // // // //         const data = await res.json();
// // // // //         if (!data.order_id) return alert("Failed to create Razorpay order!");

// // // // //         const options = {
// // // // //           key: data.razorpay_key, // from backend
// // // // //           amount: data.amount,
// // // // //           currency: "INR",
// // // // //           name: "Local Artisan Store",
// // // // //           description: "Test Payment",
// // // // //           order_id: data.order_id,
// // // // //           handler: function (response) {
// // // // //             navigate("/payment-success", {
// // // // //               state: {
// // // // //                 message: "Payment successful 🎉",
// // // // //                 payment_id: response.razorpay_payment_id,
// // // // //               },
// // // // //             });
// // // // //           },
// // // // //           prefill: {
// // // // //             email: user_email,
// // // // //           },
// // // // //           theme: {
// // // // //             color: "#3399cc",
// // // // //           },
// // // // //         };

// // // // //         const rzp = new window.Razorpay(options);
// // // // //         rzp.open();
// // // // //       } catch (error) {
// // // // //         console.error("Payment failed:", error);
// // // // //         alert("Something went wrong. Try again later.");
// // // // //       }
// // // // //     };

// // // // //     loadRazorpay();
// // // // //   }, [amount, navigate, user_email, products]);

// // // // //   return (
// // // // //     <div className="payment-container">
// // // // //       <h2>Processing payment of ₹{amount}...</h2>
// // // // //       <p>Please wait while we open the Razorpay payment gateway.</p>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // src/components/PaymentPage.js
// // // // import React, { useEffect, useState } from "react";
// // // // import "../styles/PaymentPage.css";

// // // // export default function PaymentPage() {
// // // //   const [loading, setLoading] = useState(false);

// // // //   // Call backend to create Razorpay order
// // // //   const createOrder = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await fetch("http://127.0.0.1:5000/create-payment", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ amount: 400 }), // Replace with dynamic cart total
// // // //       });
// // // //       const data = await response.json();

// // // //       if (!data.key || !data.order_id) {
// // // //         alert("Server error: missing key or order ID");
// // // //         setLoading(false);
// // // //         return;
// // // //       }

// // // //       const options = {
// // // //         key: data.key, // ✅ from backend
// // // //         amount: data.amount,
// // // //         currency: data.currency,
// // // //         name: "Local Artisan Store",
// // // //         description: "Order Payment",
// // // //         order_id: data.order_id,
// // // //         handler: function (response) {
// // // //           alert("Payment Successful! ✅");
// // // //           console.log("Payment Success:", response);
// // // //         },
// // // //         prefill: {
// // // //           name: "Customer Name",
// // // //           email: "customer@example.com",
// // // //           contact: "9999999999",
// // // //         },
// // // //         theme: {
// // // //           color: "#ff6600",
// // // //         },
// // // //       };

// // // //       const rzp = new window.Razorpay(options);
// // // //       rzp.open();
// // // //     } catch (error) {
// // // //       console.error("Payment failed:", error);
// // // //       alert("Payment initialization failed!");
// // // //     }
// // // //     setLoading(false);
// // // //   };

// // // //   useEffect(() => {
// // // //     const script = document.createElement("script");
// // // //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // // //     script.async = true;
// // // //     document.body.appendChild(script);
// // // //   }, []);

// // // //   return (
// // // //     <div className="payment-container">
// // // //       <h2>Secure Payment</h2>
// // // //       <p>Click the button below to proceed with your payment.</p>
// // // //       <button className="pay-button" onClick={createOrder} disabled={loading}>
// // // //         {loading ? "Processing..." : "Pay Now"}
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // }

// // // // src/components/PaymentPage.js
// // // import React, { useEffect, useState } from "react";
// // // import "../styles/PaymentPage.css";

// // // export default function PaymentPage() {
// // //   const [amount, setAmount] = useState(0);
// // //   const [loading, setLoading] = useState(false);

// // //   useEffect(() => {
// // //     // ✅ Load total amount from localStorage or context
// // //     const total = localStorage.getItem("cartTotal");
// // //     setAmount(total ? parseFloat(total) : 0);

// // //     // ✅ Load Razorpay SDK script
// // //     const script = document.createElement("script");
// // //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
// // //     script.async = true;
// // //     document.body.appendChild(script);
// // //   }, []);

// // //   const createOrder = async () => {
// // //     if (!amount || amount <= 0) {
// // //       alert("Invalid amount!");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     try {
// // //       // ✅ Call backend to create Razorpay order
// // //       const response = await fetch("http://127.0.0.1:5000/create_order", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ amount: amount * 100 }), // Razorpay works in paise
// // //       });

// // //       const data = await response.json();
// // //       console.log("Backend response:", data);

// // //       if (!data.order_id || !data.key) {
// // //         alert("Server error: missing key or order ID!");
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       const options = {
// // //         key: data.key,
// // //         amount: data.amount,
// // //         currency: "INR",
// // //         name: "Local Artisan Store",
// // //         description: "Order Payment",
// // //         order_id: data.order_id,
// // //         handler: async function (response) {
// // //           console.log("Payment Success:", response);

// // //           // ✅ Submit details to your backend /success route
// // //           const verify = await fetch("http://127.0.0.1:5000/success", {
// // //             method: "POST",
// // //             headers: { "Content-Type": "application/json" },
// // //             body: JSON.stringify(response),
// // //           });

// // //           const result = await verify.json();
// // //           if (result.status === "success") {
// // //             alert("Payment Successful! ✅");
// // //             localStorage.removeItem("cartItems");
// // //             localStorage.removeItem("cartTotal");
// // //           } else {
// // //             alert("Payment verification failed!");
// // //           }
// // //         },
// // //         prefill: {
// // //           name: "Customer Name",
// // //           email: "customer@example.com",
// // //           contact: "9999999999",
// // //         },
// // //         theme: {
// // //           color: "#3399cc",
// // //         },
// // //       };

// // //       const rzp1 = new window.Razorpay(options);
// // //       rzp1.open();
// // //     } catch (err) {
// // //       console.error("Payment Error:", err);
// // //       alert("Error creating Razorpay order!");
// // //     }
// // //     setLoading(false);
// // //   };

// // //   return (
// // //     <div className="payment-container">
// // //       <h2>Razorpay Payment Gateway (Test Mode)</h2>

// // //       <div className="amount-box">
// // //         <label>Amount (INR)</label>
// // //         <input
// // //           type="number"
// // //           value={amount}
// // //           onChange={(e) => setAmount(e.target.value)}
// // //         />
// // //       </div>

// // //       <button className="pay-button" onClick={createOrder} disabled={loading}>
// // //         {loading ? "Processing..." : `Pay ₹${amount}`}
// // //       </button>
// // //     </div>
// // //   );
// // // }

// // import React, { useEffect, useState } from "react";
// // import "../styles/PaymentPage.css";

// // export default function PaymentPage() {
// //   const [amount, setAmount] = useState(0);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     // ✅ Load total from cart
// //     const total = localStorage.getItem("cartTotal");
// //     setAmount(total ? parseFloat(total) : 0);

// //     // ✅ Load Razorpay SDK
// //     const script = document.createElement("script");
// //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //     script.async = true;
// //     document.body.appendChild(script);
// //   }, []);

// //   const createOrder = async () => {
// //     if (!amount || amount <= 0) {
// //       alert("Invalid amount!");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       // ✅ Call backend to create order
// //       const response = await fetch("http://127.0.0.1:5000/create-payment", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           amount: amount,
// //           currency: "INR",
// //           user_email: localStorage.getItem("userEmail") || "test@example.com",
// //           products: JSON.parse(localStorage.getItem("cartItems") || "[]"),
// //         }),
// //       });

// //       const data = await response.json();
// //       console.log("Backend response:", data);

// //       if (!data.order_id || !data.key) {
// //         alert("Server error: missing key or order ID!");
// //         setLoading(false);
// //         return;
// //       }

// //       const options = {
// //         key: data.key,
// //         amount: data.amount,
// //         currency: "INR",
// //         name: "Local Artisan Store",
// //         description: "Secure Payment",
// //         order_id: data.order_id,
// //         handler: async function (response) {
// //           console.log("Payment success:", response);

// //           // ✅ Verify the payment
// //           const verify = await fetch("http://127.0.0.1:5000/verify-payment", {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify(response),
// //           });

// //           const result = await verify.json();
// //           if (result.message) {
// //             alert("Payment Successful ✅");
// //             localStorage.removeItem("cartItems");
// //             localStorage.removeItem("cartTotal");
// //           } else {
// //             alert("Payment verification failed!");
// //           }
// //         },
// //         prefill: {
// //           name: "Customer",
// //           email: "customer@example.com",
// //           contact: "9999999999",
// //         },
// //         theme: {
// //           color: "#0e7490",
// //         },
// //       };

// //       const rzp1 = new window.Razorpay(options);
// //       rzp1.open();
// //     } catch (err) {
// //       console.error("Payment Error:", err);
// //       alert("Error creating Razorpay order!");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="payment-container">
// //       <h2>Payment Gateway</h2>
// //       <p>Secure your payment via Razorpay</p>

// //       <div className="amount-box">
// //         <label>Amount (INR)</label>
// //         <input
// //           type="number"
// //           value={amount}
// //           onChange={(e) => setAmount(e.target.value)}
// //         />
// //       </div>

// //       <button className="pay-button" onClick={createOrder} disabled={loading}>
// //         {loading ? "Processing..." : `Pay ₹${amount}`}
// //       </button>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom"; // ✅ import this
// import "../styles/PaymentPage.css";

// export default function PaymentPage() {
//   const location = useLocation(); // ✅ to access navigate() data
//   const { amount: stateAmount, product } = location.state || {};
//   const [amount, setAmount] = useState(stateAmount || 0);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // ✅ Load Razorpay SDK once
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   const createOrder = async () => {
//     if (!amount || amount <= 0) {
//       alert("Invalid amount!");
//       return;
//     }

//     setLoading(true);
//     try {
//       // ✅ Call backend to create Razorpay order
//       const response = await fetch("http://127.0.0.1:5000/create-payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: amount,
//           currency: "INR",
//           user_email: localStorage.getItem("userEmail") || "test@example.com",
//           products: [{ product_name: product, price: amount }],
//         }),
//       });

//       const data = await response.json();
//       console.log("Backend response:", data);

//       if (!data.order_id || !data.key) {
//         alert("Server error: missing key or order ID!");
//         setLoading(false);
//         return;
//       }

//       const options = {
//         key: data.key,
//         amount: data.amount,
//         currency: "INR",
//         name: "Local Artisan Store",
//         description: product ? `Payment for ${product}` : "Secure Payment",
//         order_id: data.order_id,
//         handler: async function (response) {
//           console.log("Payment success:", response);

//           // ✅ Verify payment
//           const verify = await fetch("http://127.0.0.1:5000/verify-payment", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(response),
//           });

//           const result = await verify.json();
//           if (result.message) {
//             alert("Payment Successful ✅");
//           } else {
//             alert("Payment verification failed!");
//           }
//         },
//         prefill: {
//           name: "Customer",
//           email: "customer@example.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#0e7490",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (err) {
//       console.error("Payment Error:", err);
//       alert("Error creating Razorpay order!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="payment-container">
//       <h2>Payment Gateway</h2>
//       {product && <p>Product: <strong>{product}</strong></p>}
//       <p>Secure your payment via Razorpay</p>

//       <div className="amount-box">
//         <label>Amount (INR)</label>
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           readOnly // ✅ user can’t edit
//         />
//       </div>

//       <button className="pay-button" onClick={createOrder} disabled={loading}>
//         {loading ? "Processing..." : `Pay ₹${amount}`}
//       </button>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentPage.css";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount: stateAmount, product } = location.state || {};
  const [amount, setAmount] = useState(stateAmount || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ✅ Load Razorpay SDK once
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const createOrder = async () => {
    if (!amount || amount <= 0) {
      alert("Invalid amount!");
      return;
    }

    setLoading(true);
    try {
      // ✅ Call backend to create Razorpay order
      const response = await fetch("http://127.0.0.1:5000/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          currency: "INR",
          user_email: localStorage.getItem("userEmail") || "test@example.com",
          products: [{ product_name: product, price: amount }],
        }),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (!data.order_id || !data.key) {
        alert("Server error: missing key or order ID!");
        setLoading(false);
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "Local Artisan Store",
        description: product ? `Payment for ${product}` : "Secure Payment",
        order_id: data.order_id,
        handler: async function (response) {
          console.log("Payment success:", response);

          // ✅ Verify payment
          const verify = await fetch("http://127.0.0.1:5000/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const result = await verify.json();

          if (result.message) {
            // ✅ Redirect to CartPage with message
            navigate("/cart", {
              state: { successMessage: "Payment successful! 🎉" },
            });
          } else {
            navigate("/cart", {
              state: { successMessage: "Payment verification failed ❌" },
            });
          }
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0e7490",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Error creating Razorpay order!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Gateway</h2>
      {product && <p>Product: <strong>{product}</strong></p>}
      <p>Secure your payment via Razorpay</p>

      <div className="amount-box">
        <label>Amount (INR)</label>
        <input
          type="number"
          value={amount}
          readOnly
        />
      </div>

      <button className="pay-button" onClick={createOrder} disabled={loading}>
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </div>
  );
}
