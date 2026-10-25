
import { useState } from "react";
import axios from "axios";
import "./EcommerceHome.css";

export default function EcommerceHome() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://datastore-vgys.onrender.com/api/messages",
        form
      );

      setStatus(
        response.data.message || "Message sent successfully!"
      );

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus(
        error.response?.data?.message ||
          "Message send nahi hua. Backend check karein."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="shop-page">
      <header className="shop-navbar">
        <a className="shop-logo" href="#home">
          <span className="logo-icon">🛍️</span>
          <span>
            ShopEase
            <small>Better Products. Happier You.</small>
          </span>
        </a>

        <nav className="shop-nav-links">
          <a href="#home">Home</a>
          <a href="#benefits">Benefits</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="nav-contact" href="#contact">
          Get in Touch <span>↗</span>
        </a>
      </header>

      <main>
        <section className="shop-hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              YOUR EVERYDAY SHOPPING DESTINATION
            </span>

            <h1>
              Shop Smart,
              <br />
              <span>Live Better.</span>
            </h1>

            <p>
              Discover amazing products, great prices and a
              shopping experience designed around you.
            </p>

            <div className="hero-actions">
              <a className="primary-btn" href="#benefits">
                Explore More <span>→</span>
              </a>
              <a className="secondary-btn" href="#contact">
                Contact Us
              </a>
            </div>

            <div className="hero-trust">
              <span>✓ Quality Products</span>
              <span>✓ Secure Experience</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-circle"></div>
            <div className="floating-tag tag-top">
              ✨ Great deals, every day
            </div>

            <div className="product-showcase">
              <div className="product product-laptop">💻</div>
              <div className="product product-headphone">🎧</div>
              <div className="product product-phone">📱</div>
              <div className="product product-watch">⌚</div>
              <div className="product product-box">🎁</div>
            </div>

            <div className="floating-tag tag-bottom">
              <span>✦</span> Your happy shopping starts here
            </div>
          </div>
        </section>

        <section className="benefits-section" id="benefits">
          <div className="benefit-card">
            <div className="benefit-icon">🚚</div>
            <div>
              <h3>Easy Shopping</h3>
              <p>A smooth and simple experience.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">🔒</div>
            <div>
              <h3>Secure Experience</h3>
              <p>Your trust matters to us.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">💬</div>
            <div>
              <h3>Friendly Support</h3>
              <p>We are here whenever you need us.</p>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <span className="eyebrow">A LITTLE ABOUT US</span>
          <h2>Shopping should feel <span>special.</span></h2>
          <p>
            At ShopEase, we believe finding great products
            should be easy, enjoyable and stress-free.
            We are building a better shopping experience,
            one customer at a time.
          </p>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-info">
            <span className="eyebrow">LET'S CONNECT</span>
            <h2>
              We'd love to
              <br />
              hear from <span>you.</span>
            </h2>

            <p className="contact-description">
              Have a question, feedback, or need help?
              Send us a message. Our team would love to
              hear from you.
            </p>

            <div className="contact-detail">
              <div className="detail-icon">✉</div>
              <div>
                <h4>Email Support</h4>
                <p>support@shopease.com</p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="detail-icon">◷</div>
              <div>
                <h4>We're Here for You</h4>
                <p>Monday – Saturday</p>
              </div>
            </div>

            <div className="support-note">
              <span>💜</span>
              <p>
                Every message matters. We look forward
                to helping you!
              </p>
            </div>
          </div>

          <div className="contact-form-card">
            <div className="form-heading">
              <div>
                <span className="eyebrow">CONTACT FORM</span>
                <h3>Send us a message</h3>
              </div>
              <div className="form-heading-icon">✉</div>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />

              <button
                type="submit"
                className="send-message-btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message  →"}
              </button>

              {status && (
                <p className="form-status" role="status">
                  {status}
                </p>
              )}

              <p className="privacy-note">
                🔒 Your information is handled with care.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="shop-footer">
        <a className="shop-logo footer-logo" href="#home">
          <span className="logo-icon">🛍️</span>
          <span>
            ShopEase
            <small>Better Products. Happier You.</small>
          </span>
        </a>

        <p>Making everyday shopping a little more special.</p>

        <a href="#contact">Need help? Contact us ↗</a>

        <div className="footer-bottom">
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
