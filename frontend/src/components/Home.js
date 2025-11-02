


import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // ✅ Added import
// import heroImage from "../assets/images/homedecor.jpg";
import heroVideo from "../assets/videos/herovideo.webm";

import welcomeImg from "../assets/images/home2.jpg";
import product1 from "../assets/images/basket.jpg";
import product2 from "../assets/images/saree.jpg";
import product3 from "../assets/images/jhumar.jpg";
import product4 from "../assets/images/peacock image.jpg";
import product5 from "../assets/images/bangles.jpg";
import product6 from "../assets/images/pots.jpg";

export default function Home() {
  const [ctaText, setCtaText] = useState("Shop Now");
  const navigate = useNavigate(); // ✅ Added navigation hook

  const products = [
    {
      id: 1,
      img: product1,
      title: "Handcrafted Clay Pot",
      desc: "Eco-friendly and handmade from natural clay with traditional design.",
    },
    {
      id: 2,
      img: product2,
      title: "Organic Coconut Soap",
      desc: "Made with pure coconut oil — gentle and moisturizing on skin.",
    },
    {
      id: 3,
      img: product3,
      title: "Jute Handbag",
      desc: "Stylish and sustainable — perfect for casual outings.",
    },
    {
      id: 4,
      img: product4,
      title: "Wooden Home Decor",
      desc: "Hand-carved decorative piece bringing rustic charm to your home.",
    },
    {
      id: 5,
      img: product5,
      title: "Natural Scented Candle",
      desc: "Crafted with soy wax and essential oils for a calming aroma.",
    },
    {
      id: 6,
      img: product6,
      title: "Handwoven Basket",
      desc: "Made by skilled artisans — perfect for storage or decoration.",
    },
  ];

  useEffect(() => {
    const texts = ["Shop Now", "Join as Artisan"];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setCtaText(texts[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <Navbar />

      {/* HERO SECTION */}
      {/* <section id="home" className="hero" style={{ backgroundImage: `url(${heroImage})` }}> 
      */}
    <section id="home" className="hero">
  <video
    className="hero-video"
    src={heroVideo}
    autoPlay
    loop
    muted
    playsInline
  ></video>

  <div className="hero-overlay">
    <h1 className="hero-title">Discover Pure, Natural, Handmade Creations</h1>
    <button className="hero-btn">{ctaText}</button>
  </div>
</section>

        

      {/* WELCOME SECTION */}
      <section id="about" className="welcome-section">
        <div className="welcome-image">
          <img src={welcomeImg} alt="Welcome" />
        </div>
        <div className="welcome-text">
          <h2>Empowering Local Artisans</h2>
          <p>
            We connect passionate artisans with customers who value true craftsmanship
            and authenticity. Every product tells a story — made with love, care, and creativity.
          </p>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="products" className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {products.map((product, i) => (
            <div key={i} className="product-card">
              <img src={product.img} alt={product.title} />
              <div className="product-info">
                <h3>{product.title}</h3>
                <p>{product.desc}</p>
                <button
                  className="view-btn"
                  onClick={() => navigate(`/product/${product.id}`)} // ✅ Redirect to product page
                >
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATISTICS BAR */}
      <section className="stats-section">
        <div className="stat">200+ <span>Artisans</span></div>
        <div className="stat">1000+ <span>Products</span></div>
        <div className="stat">5000+ <span>Happy Customers</span></div>
      </section>

      {/* FOOTER */}
      {/* FOOTER */}
<footer id="contact" className="footer">
  <h2>Connect With Us</h2>
  <div className="social-icons">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-facebook-f"></i>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-twitter"></i>
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-linkedin-in"></i>
    </a>
  </div>
  <p>© 2025 ArtisanHub. All rights reserved.</p>
</footer>

    </div>
  );
}
