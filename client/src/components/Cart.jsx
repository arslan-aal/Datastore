
import "./Cart.css";

export default function Cart({
  cart,
  products,
  onUpdateQuantity,
  onRemove,
  onContinueShopping,
  onHome,
  onCheckout,
}) {
  const cartProducts = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);

      return product
        ? { ...product, quantity: item.quantity }
        : null;
    })
    .filter(Boolean);

  const cartCount = cartProducts.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <header className="cart-navbar">
        <a
          className="cart-logo"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onHome();
          }}
        >
          <span>🛍️</span>
          <span>
            ShopEase
            <small>Better Products. Happier You.</small>
          </span>
        </a>

        <nav className="cart-nav-links">
          <button onClick={onHome}>Home</button>
          <button onClick={onContinueShopping}>Shop</button>
          <button className="active">Cart ({cartCount})</button>
        </nav>
      </header>

      <main className="cart-container">
        <button
          className="cart-back-btn"
          onClick={onContinueShopping}
        >
          ← Continue Shopping
        </button>

        <h1>Shopping Cart</h1>
        <p className="cart-description">
          Review your items before checkout.
        </p>

        {cartProducts.length === 0 ? (
          <section className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet.</p>

            <button
              className="cart-primary-btn"
              onClick={onContinueShopping}
            >
              Explore Products
            </button>
          </section>
        ) : (
          <div className="cart-content">
            <section className="cart-product-list">
              {cartProducts.map((item) => (
                <article className="cart-product" key={item.id}>
                  <div className="cart-product-image">
                    {item.emoji}
                  </div>

                  <div className="cart-product-details">
                    <h3>{item.name}</h3>
                    <p>{item.brand}</p>
                    <strong>${item.price.toFixed(2)}</strong>

                    <div className="cart-quantity">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() =>
                          onUpdateQuantity(item.id, -1)
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        aria-label="Increase quantity"
                        onClick={() =>
                          onUpdateQuantity(item.id, 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-product-actions">
                    <strong>
                      ${(item.price * item.quantity).toFixed(2)}
                    </strong>

                    <button
                      className="cart-remove-btn"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="cart-order-summary">
              <h2>Order Summary</h2>

              <div className="cart-summary-row">
                <span>Items ({cartCount})</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <div className="cart-summary-row">
                <span>Shipping</span>
                <span className="cart-free">FREE</span>
              </div>

              <div className="cart-summary-total">
                <span>Total</span>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>

            
<button
  className="cart-primary-btn"
  onClick={onCheckout}
>
  Proceed to Checkout →
</button>


              <p className="cart-security-note">
                🔒 Secure checkout coming soon
              </p>
            </aside>
          </div>
        )}
      </main>

      <footer className="cart-footer">
        ShopEase — Better Products. Happier You.
      </footer>
    </div>
  );
}
