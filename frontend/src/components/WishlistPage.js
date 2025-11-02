// import React, { useEffect, useState } from "react";
// import "../styles/WishlistPage.css";

// export default function WishlistPage() {
//   const [wishlist, setWishlist] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user")); // logged-in user

//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:5000/wishlist/${user.email}`)
//         .then((res) => res.json())
//         .then((data) => setWishlist(data.wishlist))
//         .catch((err) => console.error("Error fetching wishlist:", err));
//     }
//   }, []);

//   return (
//     <div className="wishlist-page">
//       <h1>Your Wishlist 💖</h1>

//       {wishlist.length === 0 ? (
//         <p>No items in your wishlist yet.</p>
//       ) : (
//         <div className="wishlist-grid">
//           {wishlist.map((product, index) => (
//             <div className="wishlist-card" key={index}>
//               <h3>{product}</h3>
//               {/* optional: add image, price, etc. later */}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import "../styles/WishlistPage.css";

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")); // logged-in user

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Get wishlist items for this user
        const res = await fetch(`http://127.0.0.1:5000/wishlist/${user.email}`);
        const data = await res.json();

        if (!data.wishlist || data.wishlist.length === 0) {
          setWishlistProducts([]);
          setLoading(false);
          return;
        }

        // Fetch all products
        const productsRes = await fetch("http://127.0.0.1:5000/get-products");
        const productsData = await productsRes.json();

        // Filter wishlist products
        const filtered = productsData.products.filter((prod) =>
          data.wishlist.includes(prod.name)
        );

        setWishlistProducts(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error loading wishlist:", error);
        setLoading(false);
      }
    };

    if (user?.email) fetchWishlist();
  }, [user]);

  if (loading) {
    return (
      <div className="wishlist-page">
        <p>Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>Your Wishlist 💖</h1>

      {wishlistProducts.length === 0 ? (
        <p>No items in your wishlist yet.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlistProducts.map((product) => (
            <div className="wishlist-card" key={product.name}>
              <img
                src={`http://127.0.0.1:5000${product.image_url}`}
                alt={product.name}
                className="wishlist-image"
              />
              <h3>{product.name}</h3>
              <p className="wishlist-price">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
