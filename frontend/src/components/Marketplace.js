

import React, { useState, useEffect } from 'react';
import { getUser, logout } from '../auth';
import '../styles/Marketplace.css';
import UserNavbar from "./UserNavbar";
import PageBackground from "../components/PageBackground";
import { useNavigate } from "react-router-dom";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]); // ✅ backend wishlist
  const [reviews, setReviews] = useState({});
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const user = getUser();
  const navigate = useNavigate();


  // const handleLogout = () => {
  //   logout();
  //   window.location.href = '/';
  // };

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/get-products');
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
        const uniqueCategories = ["All", ...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  // ✅ Fetch wishlist from backend
  const fetchWishlist = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`http://127.0.0.1:5000/wishlist/${user.email}`);
      const data = await res.json();
      setWishlist(data.wishlist || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  // ✅ Toggle wishlist item
  const toggleWishlist = async (productName) => {
    if (!user?.email) {
      alert("Please log in to use wishlist!");
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/wishlist/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: user.email,
          product_name: productName
        })
      });
      const data = await res.json();

      if (data.status === "added") {
        setWishlist(prev => [...prev, productName]);
      } else if (data.status === "removed") {
        setWishlist(prev => prev.filter(name => name !== productName));
      }
    } catch (err) {
      console.error("Failed to toggle wishlist:", err);
    }
  };

  // ✅ Fetch reviews for all products
  const fetchReviews = async () => {
    const newReviews = {};
    for (let p of products) {
      try {
        const res = await fetch(`http://127.0.0.1:5000/get-reviews/${encodeURIComponent(p.name)}`);
        const data = await res.json();
        if (data.reviews) newReviews[p.name] = data.reviews;
      } catch (err) {
        console.error('Failed to fetch reviews for', p.name, err);
      }
    }
    setReviews(newReviews);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length) fetchReviews();
  }, [products]);

 

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser?.email) {
    fetchWishlist(storedUser.email);
  }
}, []);

  const allCategories = [...new Set(products.map(p => p.category))];
  const materials = [...new Set(products.map(p => p.material))];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterials(prev =>
      prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]
    );
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategoryBar =
      activeCategory === "All" || p.category === activeCategory;
    const matchesCategorySidebar =
      selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesMaterial =
      selectedMaterials.length === 0 || selectedMaterials.includes(p.material);
    const matchesPrice =
      (!priceRange.min || Number(p.price) >= Number(priceRange.min)) &&
      (!priceRange.max || Number(p.price) <= Number(priceRange.max));

    return matchesSearch && matchesCategoryBar && matchesCategorySidebar && matchesMaterial && matchesPrice;
  });

  return (
    <PageBackground role="customer">
         {/* ✅ Add Navbar at the top */}
    <UserNavbar />
    
      <div className="marketplace-container">
        {/* Header */}
        <div className="marketplace-header">
          <div className="header-center">
            <h2>Marketplace</h2>
            <p>Welcome {user ? user.email : 'guest'}. Browse and purchase handmade products.</p>
          </div>
          {/* <button className="logout-btn" onClick={handleLogout}>Logout</button> */}
        </div>

        {/* Category Bar */}
        <div className="category-bar">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`category-item ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              <div className="category-icon">{cat[0].toUpperCase()}</div>
              <p>{cat}</p>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="marketplace-filters">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="search-bar"
          />
          <button className="filter-toggle-btn" onClick={() => setShowFilter(prev => !prev)}>
            {showFilter ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="marketplace-main">
          {/* Sidebar Filters */}
          <div className={`filter-sidebar ${showFilter ? 'active' : ''}`}>
            <h4>Category</h4>
            {allCategories.map(c => (
              <div key={c}>
                <input
                  type="checkbox"
                  id={`cat-${c}`}
                  checked={selectedCategories.includes(c)}
                  onChange={() => handleCategoryChange(c)}
                />
                <label htmlFor={`cat-${c}`}>{c}</label>
              </div>
            ))}

            <h4>Material</h4>
            {materials.map(m => (
              <div key={m}>
                <input
                  type="checkbox"
                  id={`mat-${m}`}
                  checked={selectedMaterials.includes(m)}
                  onChange={() => handleMaterialChange(m)}
                />
                <label htmlFor={`mat-${m}`}>{m}</label>
              </div>
            ))}

            <h4>Price</h4>
            <div className="price-filter">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={e => setPriceRange({ ...priceRange, min: e.target.value })}
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={e => setPriceRange({ ...priceRange, max: e.target.value })}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="marketplace-grid">
            {filteredProducts.map((p) => {
              const productReviews = reviews[p.name] || [];
              const avgRating = productReviews.length
                ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
                : 0;

              const isWishlisted = wishlist.includes(p.name);

              return (
                <div
                  key={p.name}
                  className="marketplace-item animate-item"
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  {/* ❤️ Wishlist Icon */}
                  <div
                    className={`wishlist-heart ${isWishlisted ? "active" : ""}`}
                    onClick={() => toggleWishlist(p.name)}
                  >
                    {isWishlisted ? "💚" : "🤍"}
                  </div>

                  {p.image_url && (
                    <img
                      src={`http://127.0.0.1:5000${p.image_url}`}
                      alt={p.name}
                      className="product-image"
                      onClick={() => navigate(`/marketplace/product/${encodeURIComponent(p.name)}`)}
                    />
                  )}
                  <h4>{p.name}</h4>
                  <p>{p.description}</p>
                  <p>₹{p.price}</p>
                  <p>⭐ {avgRating} ({productReviews.length} reviews)</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageBackground>
  );
}
