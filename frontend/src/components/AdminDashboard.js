

import React from "react";
import { useNavigate } from "react-router-dom";
import { logout, getUser } from "../auth";
import "../styles/AdminDashboard.css";
import PageBackground from "../components/PageBackground";

export default function AdminDashboard() {
  const user = getUser();
  const navigate = useNavigate();

  const cards = [
    {
      title: "Product Generator",
      // image: "/images/product-generator.jpg",
      image: `${process.env.PUBLIC_URL}/images/product-generator.jpg`,
      link: "/admin/product-generator",
    },
    {
      title: "Storytelling",
      // image: "/images/storytelling.jpg",
        image: `${process.env.PUBLIC_URL}/images/storytelling.jpg`,
      link: "/admin/storytelling",
    },
    {
      title: "Product Recommender",
      // image: "/images/recommend.jpg",
          image: `${process.env.PUBLIC_URL}/images/recommend.jpg`,
      link: "/admin/marketplace-recommender",
    },
    {
      title: "Pricing Suggestion",
      // image: "/images/price.jpg",
       image: `${process.env.PUBLIC_URL}/images/price.jpg`,
      link: "/admin/pricing-suggestion",
    },
    {
      title: "Publish / Social",
      // image: "/images/publish.jpg",
      image: `${process.env.PUBLIC_URL}/images/publish.jpg`,
      link: "/admin/publish",
    },
    {
      title: "Add Product",
      // image: "/images/addproduct.jpg",
      image: `${process.env.PUBLIC_URL}/images/addproduct.jpg`,
      link: "/admin/addproduct",
    },
    {
      title: "List Products",
      // image: "/images/list.jpg",
      image: `${process.env.PUBLIC_URL}/images/list.jpg`,
      link: "/admin/list-products",
    },
  ];

  return (
    <PageBackground role="admin">
      <div className="admin-dashboard-container">
        {/* Header Section */}
        <div className="admin-header">
          <div className="header-center">
            <h2>Admin Dashboard</h2>
            <p>Welcome, {user ? user.email : "Admin"}</p>
          </div>
          <button
            className="logout-btn"
            onClick={() => {
              logout();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
          <div className="admin-info">
          <h3>Welcome to Artisan Hub Admin Panel</h3>
          <p>
            Manage your products, generate ideas, set prices, and publish to the marketplace
            using the tools above.
          </p>
        </div>
        {/* Dashboard Cards Section */}
        <div className="admin-card-grid">
          {cards.map((card, index) => (
            <div
              key={index}
              className="admin-card"
              onClick={() => navigate(card.link)}
            >
              <img src={card.image} alt={card.title} className="admin-card-img" />
              <h4>{card.title}</h4>
            </div>
          ))}
        </div>

        {/* Info Section */}
        {/* <div className="admin-info">
          <h3>Welcome to Artisan Hub Admin Panel</h3>
          <p>
            Manage your products, generate ideas, set prices, and publish to the marketplace
            using the tools above.
          </p>
        </div> */}
      </div>
    </PageBackground>
  );
}
