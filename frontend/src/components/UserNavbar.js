import React, { useState } from "react";
import {
  
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/UserNavbar.css";

export default function UserNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setSearchText("");
    setIsMobileMenuOpen(false); // close menu if search is open
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchText.trim() !== "") {
      navigate(`/marketplace?search=${encodeURIComponent(searchText.trim())}`);
      setShowSearch(false);
    }
  };

  return (
    <>
      {/* Search bar overlay */}
      {showSearch && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleSearch}
            className="search-bar"
            autoFocus
          />
        </div>
      )}

      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-text">ArtisanHub.</span>
        </div>

        {/* Links (hidden when searching) */}
        {!showSearch && (
          <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/skin-care">Skin Care</a></li>
            <li><a href="/makeup">Makeup</a></li>
            <li><a href="/hair-care">Hair Care</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/blogs">Blogs</a></li>
          </ul>
        )}

        {/* Right-side icons */}
        <div className="navbar-icons">
          {/* <FiSearch className="icon" onClick={toggleSearch} title="Search" /> */}
          <FiHeart
            className="icon"
            onClick={() => navigate("/wishlist")}
            title="Wishlist"
          />
          <FiShoppingCart
            className="icon"
            onClick={() => navigate("/cart")}
            title="Cart"
          />
          <FiUser
            className="icon"
            onClick={() => navigate("/profile")}
            title="Profile"
          />
        </div>

        {/* Mobile menu toggle */}
        <div className="menu-toggle" onClick={toggleMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </div>
      </nav>
    </>
  );
}
