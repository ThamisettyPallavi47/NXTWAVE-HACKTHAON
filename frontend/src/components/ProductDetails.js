import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";

// Temporary sample data (you can replace with backend API later)
import product1 from "../assets/images/basket.jpg";
import product2 from "../assets/images/saree.jpg";
import product3 from "../assets/images/jhumar.jpg";
import product4 from "../assets/images/peacock image.jpg";
import product5 from "../assets/images/bangles.jpg";
import product6 from "../assets/images/pots.jpg";

const allProducts = [
  {
    id: 1,
    img: product1,
    title: "Handcrafted Clay Pot",
    desc: "This eco-friendly clay pot is handcrafted by local artisans using natural clay. Perfect for sustainable living and traditional decor.",
  },
  {
    id: 2,
    img: product2,
    title: "Organic Coconut Soap",
    desc: "A gentle, moisturizing soap made from pure coconut oil and essential oils. Keeps your skin soft and refreshed all day.",
  },
  {
    id: 3,
    img: product3,
    title: "Jute Handbag",
    desc: "A sustainable and stylish jute handbag, perfect for everyday outings. Lightweight, durable, and eco-conscious.",
  },
  {
    id: 4,
    img: product4,
    title: "Wooden Home Decor",
    desc: "Beautifully hand-carved wooden decor piece that adds a rustic, natural touch to your home interior.",
  },
  {
    id: 5,
    img: product5,
    title: "Natural Scented Candle",
    desc: "Hand-poured soy wax candle blended with essential oils to create a soothing aroma for your living space.",
  },
  {
    id: 6,
    img: product6,
    title: "Handwoven Basket",
    desc: "A beautiful handwoven basket crafted from natural fibers, ideal for both storage and decoration.",
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-details not-found">
        <h2>Product Not Found</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="details-container">
        <div className="details-image">
          <img src={product.img} alt={product.title} />
        </div>
        <div className="details-text">
          <h2>{product.title}</h2>
          <p>{product.desc}</p>
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
