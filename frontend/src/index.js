

// // import React from "react";
// // import { createRoot } from "react-dom/client";
// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // import Login from "./components/Login";
// // import AdminDashboard from "./components/AdminDashboard";
// // import ProductGenerator from "./components/ProductGenerator";
// // import Storytelling from "./components/Storytelling";
// // import MarketplaceRecommender from "./components/MarketplaceRecommender";
// // import PricingSuggestion from "./components/PricingSuggestion";
// // import Publish from "./components/Publish";
// // import Marketplace from "./components/Marketplace";
// // import AddProduct from "./components/AddProduct";
// // import Home from "./components/Home";
// // import ProductDetails from "./components/ProductDetails";
// // import MarketProductDetails from "./components/MarketProductDetails";
// // import AdminProductList from "./components/AdminProductList";
// // import AdminProductDetails from "./components/AdminProductDetails";

// // import UserNavbar from "./components/UserNavbar";      // ✅ added
// // import WishlistPage from "./components/WishlistPage";  // ✅ added

// // import { getUser, logout } from "./auth";

// // // Auth guard
// // function RequireAuth({ children, adminOnly = false }) {
// //   const user = getUser();
// //   if (!user) return <Navigate to="/login" replace />;
// //   if (adminOnly && user.role !== "admin")
// //     return (
// //       <div style={{ padding: 20 }}>
// //         Access denied.{" "}
// //         <button
// //           onClick={() => {
// //             logout();
// //             window.location.href = "/login";
// //           }}
// //         >
// //           Go to login
// //         </button>
// //       </div>
// //     );
// //   return children;
// // }

// // function AppRoutes() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         {/* Public Home */}
// //         <Route path="/" element={<Home />} />

// //         {/* Product details */}
// //         <Route path="/product/:id" element={<ProductDetails />} />

// //         {/* User Routes with Navbar */}
// //         <Route
// //           path="/marketplace"
// //           element={
// //             <RequireAuth>
// //               <>
// //                 <UserNavbar />
// //                 <Marketplace />
// //               </>
// //             </RequireAuth>
// //           }
// //         />

// //         <Route
// //           path="/wishlist"
// //           element={
// //             <RequireAuth>
// //               <>
// //                 <UserNavbar />
// //                 <WishlistPage />
// //               </>
// //             </RequireAuth>
// //           }
// //         />

// //         <Route
// //           path="/marketplace/product/:id"
// //           element={
// //             <RequireAuth>
// //               <>
// //                 <UserNavbar />
// //                 <MarketProductDetails />
// //               </>
// //             </RequireAuth>
// //           }
// //         />

// //         {/* Admin Routes */}
// //         <Route
// //           path="/admin/dashboard"
// //           element={
// //             <RequireAuth adminOnly={true}>
// //               <AdminDashboard />
// //             </RequireAuth>
// //           }
// //         />
// //         <Route
// //           path="/admin/list-products"
// //           element={
// //             <RequireAuth adminOnly={true}>
// //               <AdminProductList />
// //             </RequireAuth>
// //           }
// //         />
// //         <Route
// //           path="/admin/product/:name"
// //           element={
// //             <RequireAuth adminOnly={true}>
// //               <AdminProductDetails />
// //             </RequireAuth>
// //           }
// //         />
// //         <Route
// //           path="/admin/product-generator"
// //           element={
// //             <RequireAuth adminOnly={true}>
// //               <ProductGenerator />
// //             </RequireAuth>
// //           }
// //         />
// //         <Route
// //           path="/admin/storytelling"
// //           element={
// //             <RequireAuth adminOnly={true}>
// //               <Storytelling />
// //             </RequireAuth>
// //           }
// //         />
// //         <Route
// //           path="/admin/marketplace-recommender"
// //           element={
// //             <RequireAuth adminOnly={true}>
// //               <MarketplaceRecommender />
// //             </RequireAuth>
// //           }
// //         />
// //         <Route
// //           path="/admin/pricing-suggestion"
// //           element={
// //             <RequireAuth adminOnly={true}>
// //               <PricingSuggestion />
// //             </RequireAuth>
// //           }
// //         />
// //         <Route
// //           path="/admin/publish"
// //           element={
// //             <RequireAuth adminOnly={true}>
// //               <Publish />
// //             </RequireAuth>
// //           }
// //         />
// //         <Route
// //           path="/admin/addproduct"
// //           element={
// //             <RequireAuth adminOnly={true}>
// //               <AddProduct />
// //             </RequireAuth>
// //           }
// //         />

// //         {/* Login */}
// //         <Route path="/login" element={<Login />} />

// //         {/* 404 fallback */}
// //         <Route
// //           path="*"
// //           element={<div style={{ padding: 20 }}>Page Not Found</div>}
// //         />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // const container = document.getElementById("root");
// // const root = createRoot(container);
// // root.render(<AppRoutes />);

// import React from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Login from "./components/Login";
// import AdminDashboard from "./components/AdminDashboard";
// import ProductGenerator from "./components/ProductGenerator";
// import Storytelling from "./components/Storytelling";
// import MarketplaceRecommender from "./components/MarketplaceRecommender";
// import PricingSuggestion from "./components/PricingSuggestion";
// import Publish from "./components/Publish";
// import Marketplace from "./components/Marketplace";
// import AddProduct from "./components/AddProduct";
// import Home from "./components/Home";
// import ProductDetails from "./components/ProductDetails";
// import MarketProductDetails from "./components/MarketProductDetails";
// import AdminProductList from "./components/AdminProductList";
// import AdminProductDetails from "./components/AdminProductDetails";

// import UserNavbar from "./components/UserNavbar";
// import WishlistPage from "./components/WishlistPage";
// import CartPage from "./components/CartPage"; // ✅ Added CartPage import

// import { getUser, logout } from "./auth";

// // ✅ Auth Guard
// function RequireAuth({ children, adminOnly = false }) {
//   const user = getUser();
//   if (!user) return <Navigate to="/login" replace />;

//   if (adminOnly && user.role !== "admin")
//     return (
//       <div style={{ padding: 20 }}>
//         Access denied.{" "}
//         <button
//           onClick={() => {
//             logout();
//             window.location.href = "/login";
//           }}
//         >
//           Go to login
//         </button>
//       </div>
//     );
//   return children;
// }

// // ✅ App Routes
// function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Home */}
//         <Route path="/" element={<Home />} />

//         {/* Product details */}
//         <Route path="/product/:id" element={<ProductDetails />} />

//         {/* User Routes with Navbar */}
//         <Route
//           path="/marketplace"
//           element={
//             <RequireAuth>
//               <>
//                 <UserNavbar />
//                 <Marketplace />
//               </>
//             </RequireAuth>
//           }
//         />

//         <Route
//           path="/wishlist"
//           element={
//             <RequireAuth>
//               <>
//                 <UserNavbar />
//                 <WishlistPage />
//               </>
//             </RequireAuth>
//           }
//         />

//         {/* ✅ NEW: Cart Page Route */}
//         <Route
//           path="/cart"
//           element={
//             <RequireAuth>
//               <>
//                 <UserNavbar />
//                 <CartPage />
//               </>
//             </RequireAuth>
//           }
//         />

//         <Route
//           path="/marketplace/product/:id"
//           element={
//             <RequireAuth>
//               <>
//                 <UserNavbar />
//                 <MarketProductDetails />
//               </>
//             </RequireAuth>
//           }
//         />

//         {/* Admin Routes */}
//         <Route
//           path="/admin/dashboard"
//           element={
//             <RequireAuth adminOnly={true}>
//               <AdminDashboard />
//             </RequireAuth>
//           }
//         />
//         <Route
//           path="/admin/list-products"
//           element={
//             <RequireAuth adminOnly={true}>
//               <AdminProductList />
//             </RequireAuth>
//           }
//         />
//         <Route
//           path="/admin/product/:name"
//           element={
//             <RequireAuth adminOnly={true}>
//               <AdminProductDetails />
//             </RequireAuth>
//           }
//         />
//         <Route
//           path="/admin/product-generator"
//           element={
//             <RequireAuth adminOnly={true}>
//               <ProductGenerator />
//             </RequireAuth>
//           }
//         />
//         <Route
//           path="/admin/storytelling"
//           element={
//             <RequireAuth adminOnly={true}>
//               <Storytelling />
//             </RequireAuth>
//           }
//         />
//         <Route
//           path="/admin/marketplace-recommender"
//           element={
//             <RequireAuth adminOnly={true}>
//               <MarketplaceRecommender />
//             </RequireAuth>
//           }
//         />
//         <Route
//           path="/admin/pricing-suggestion"
//           element={
//             <RequireAuth adminOnly={true}>
//               <PricingSuggestion />
//             </RequireAuth>
//           }
//         />
//         <Route
//           path="/admin/publish"
//           element={
//             <RequireAuth adminOnly={true}>
//               <Publish />
//             </RequireAuth>
//           }
//         />
//         <Route
//           path="/admin/addproduct"
//           element={
//             <RequireAuth adminOnly={true}>
//               <AddProduct />
//             </RequireAuth>
//           }
//         />

//         {/* Login */}
//         <Route path="/login" element={<Login />} />

//         {/* 404 fallback */}
//         <Route
//           path="*"
//           element={<div style={{ padding: 20 }}>Page Not Found</div>}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<AppRoutes />);


import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import ProductGenerator from "./components/ProductGenerator";
import Storytelling from "./components/Storytelling";
import MarketplaceRecommender from "./components/MarketplaceRecommender";
import PricingSuggestion from "./components/PricingSuggestion";
import Publish from "./components/Publish";
import Marketplace from "./components/Marketplace";
import AddProduct from "./components/AddProduct";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import MarketProductDetails from "./components/MarketProductDetails";
import AdminProductList from "./components/AdminProductList";
import AdminProductDetails from "./components/AdminProductDetails";

import UserNavbar from "./components/UserNavbar";
import WishlistPage from "./components/WishlistPage";
import CartPage from "./components/CartPage";

// ✅ Import Payment components
import PaymentPage from "./components/PaymentPage";
import PaymentSuccess from "./components/PaymentSuccess";

import { getUser, logout } from "./auth";

// ✅ Auth Guard
function RequireAuth({ children, adminOnly = false }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && user.role !== "admin")
    return (
      <div style={{ padding: 20 }}>
        Access denied.{" "}
        <button
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
        >
          Go to login
        </button>
      </div>
    );
  return children;
}

// ✅ App Routes
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Home */}
        <Route path="/" element={<Home />} />

        {/* Product details */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* User Routes with Navbar */}
        <Route
          path="/marketplace"
          element={
            <RequireAuth>
              <>
                <UserNavbar />
                <Marketplace />
              </>
            </RequireAuth>
          }
        />

        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <>
                <UserNavbar />
                <WishlistPage />
              </>
            </RequireAuth>
          }
        />

        {/* ✅ Cart Page */}
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <>
                <UserNavbar />
                <CartPage />
              </>
            </RequireAuth>
          }
        />

        {/* ✅ Payment Page */}
        <Route
          path="/payment"
          element={
            <RequireAuth>
              <>
                <UserNavbar />
                <PaymentPage />
              </>
            </RequireAuth>
          }
        />

        {/* ✅ Payment Success Page */}
        <Route
          path="/payment-success"
          element={
            <RequireAuth>
              <>
                <UserNavbar />
                <PaymentSuccess />
              </>
            </RequireAuth>
          }
        />

        {/* Product Details inside Marketplace */}
        <Route
          path="/marketplace/product/:id"
          element={
            <RequireAuth>
              <>
                <UserNavbar />
                <MarketProductDetails />
              </>
            </RequireAuth>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth adminOnly={true}>
              <AdminDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/list-products"
          element={
            <RequireAuth adminOnly={true}>
              <AdminProductList />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/product/:name"
          element={
            <RequireAuth adminOnly={true}>
              <AdminProductDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/product-generator"
          element={
            <RequireAuth adminOnly={true}>
              <ProductGenerator />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/storytelling"
          element={
            <RequireAuth adminOnly={true}>
              <Storytelling />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/marketplace-recommender"
          element={
            <RequireAuth adminOnly={true}>
              <MarketplaceRecommender />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/pricing-suggestion"
          element={
            <RequireAuth adminOnly={true}>
              <PricingSuggestion />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/publish"
          element={
            <RequireAuth adminOnly={true}>
              <Publish />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/addproduct"
          element={
            <RequireAuth adminOnly={true}>
              <AddProduct />
            </RequireAuth>
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* 404 fallback */}
        <Route
          path="*"
          element={<div style={{ padding: 20 }}>Page Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<AppRoutes />);
