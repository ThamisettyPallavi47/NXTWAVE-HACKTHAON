import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import "../styles/AdminHome.css";
import { getUser } from "../auth"; // ✅ your existing function

export default function AdminHome() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Pallavi");

  useEffect(() => {
    const user = getUser();
    if (user && user.full_name) setAdminName(user.full_name);
  }, []);

  const summaryCards = [
    { title: "Total Products", value: 125, icon: "🧺", color: "#38bdf8" },
    { title: "Total Orders", value: 89, icon: "📦", color: "#10b981" },
    { title: "Total Users", value: 240, icon: "👥", color: "#818cf8" },
    { title: "Revenue", value: "₹56,000", icon: "💰", color: "#facc15" },
  ];

  const data = [
    { month: "Jan", sales: 10 },
    { month: "Feb", sales: 20 },
    { month: "Mar", sales: 35 },
    { month: "Apr", sales: 45 },
    { month: "May", sales: 25 },
    { month: "Jun", sales: 50 },
  ];

  const recentProducts = [
    {
      name: "Clay Pot",
      price: "₹350",
      category: "Pots",
      image: "https://cdn-icons-png.flaticon.com/512/3076/3076388.png",
    },
    {
      name: "Wooden Spoon Set",
      price: "₹499",
      category: "Kitchenware",
      image: "https://cdn-icons-png.flaticon.com/512/1709/1709523.png",
    },
    {
      name: "Handmade Basket",
      price: "₹299",
      category: "Crafts",
      image: "https://cdn-icons-png.flaticon.com/512/4210/4210810.png",
    },
  ];

  return (
    <div className="admin-home">
      {/* ---------- Header ---------- */}
      <div className="admin-header">
        <h2>Welcome back, {adminName} 👋</h2>
        <div className="quick-buttons">
          <button onClick={() => navigate("/admin/add-product")}>➕ Add Product</button>
          <button onClick={() => navigate("/admin/manage-categories")}>🗂️ Manage Categories</button>
          <button onClick={() => navigate("/admin/list-products")}>📋 View All</button>
        </div>
      </div>

      {/* ---------- Summary Cards ---------- */}
      <div className="summary-section">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="summary-card"
            style={{ borderTop: `4px solid ${card.color}` }}
          >
            <span className="icon">{card.icon}</span>
            <h4>{card.title}</h4>
            <p>{card.value}</p>
          </div>
        ))}
      </div>

      {/* ---------- Analytics Chart ---------- */}
      <div className="chart-section">
        <h3>📊 Monthly Sales Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#3b82f6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ---------- Recently Added Products ---------- */}
      <div className="recent-products">
        <h3>🆕 Recently Added Products</h3>
        <div className="product-grid">
          {recentProducts.map((p, index) => (
            <div key={index} className="product-card">
              <img src={p.image} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.category}</p>
              <span>{p.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Quick Actions Below ---------- */}
      <div className="quick-actions">
        <h3>⚡ Quick Actions</h3>
        <div className="action-buttons">
          <button onClick={() => navigate("/admin/add-product")}>➕ Add Product</button>
          <button onClick={() => navigate("/admin/manage-categories")}>🗂️ Manage Categories</button>
          <button onClick={() => navigate("/admin/list-products")}>📋 View All Products</button>
        </div>
      </div>
    </div>
  );
}
