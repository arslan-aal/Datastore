
import { useState } from "react";
import "./Checkout.css";

export default function Checkout({
  cart,
  products,
  onBack,
  onPlaceOrder,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [error, setError] = useState("");

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal >= 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + delivery;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

    onPlaceOrder({
      customer: form,
      items: cartItems,
      subtotal,
      delivery,
      total,
    });
  }

  return (
    <main className="checkout-page">
      <button className="checkout-back" onClick={onBack}>
        ← Back to Cart
      </button>

      <h1>Checkout</h1>
      <p className="checkout-subtitle">
        Enter your delivery details to continue.
      </p>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Delivery Details</h2>

          <label>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
            placeholder="Enter your full name"
          />

          <label>Mobile Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile number"
          />

          <label>Delivery Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            minLength={5}
            placeholder="House number, street, area"
            rows={3}
          />

          <div className="checkout-fields">
            <div>
              <label>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                placeholder="City"
              />
            </div>

            <div>
              <label>PIN Code</label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                required
                inputMode="numeric"
                maxLength={6}
                placeholder="6-digit PIN"
              />
            </div>
          </div>

          {error && <p className="checkout-error">{error}</p>}

          <button type="submit" className="checkout-place-order">
            Place Order · ₹{total.toLocaleString("en-IN")}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="checkout-item" key={item.id}>
              <span>
                {item.emoji} {item.name} × {item.quantity}
              </span>
              <strong>
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </strong>
            </div>
          ))}

          <div className="checkout-total-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>

          <div className="checkout-total-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
          </div>

          <div className="checkout-grand-total">
            <strong>Total</strong>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}
