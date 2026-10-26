
import { useMemo, useState } from "react";
import "./ShopPage.css";
import Cart from "./Cart";
import Checkout from "./Checkout";

const products = [
  { id: 1, name: "MacBook Air M2", category: "Laptops", brand: "Apple", price: 999, oldPrice: 1199, rating: 4.8, reviews: 120, emoji: "💻", badge: "Best Seller" },
  { id: 2, name: "Sony WH-1000XM5", category: "Headphones", brand: "Sony", price: 279, oldPrice: 349, rating: 4.7, reviews: 98, emoji: "🎧", badge: "-20%" },
  { id: 3, name: "iPhone 15 Pro", category: "Phones", brand: "Apple", price: 999, oldPrice: 1099, rating: 4.8, reviews: 200, emoji: "📱", badge: "New" },
  { id: 4, name: "Apple Watch Series 9", category: "Smart Watches", brand: "Apple", price: 399, oldPrice: 449, rating: 4.6, reviews: 85, emoji: "⌚" },
  { id: 5, name: "Dell XPS 13", category: "Laptops", brand: "Dell", price: 899, oldPrice: 1099, rating: 4.5, reviews: 67, emoji: "💻" },
  { id: 6, name: "AirPods Pro", category: "Headphones", brand: "Apple", price: 249, oldPrice: 279, rating: 4.8, reviews: 142, emoji: "🎧" },
  { id: 7, name: "Samsung Galaxy S23", category: "Phones", brand: "Samsung", price: 799, oldPrice: 899, rating: 4.6, reviews: 110, emoji: "📱" },
  { id: 8, name: "Laptop Backpack", category: "Accessories", brand: "Other", price: 49, oldPrice: 69, rating: 4.4, reviews: 56, emoji: "🎒" },
  { id: 9, name: "Samsung Galaxy Watch", category: "Smart Watches", brand: "Samsung", price: 199, oldPrice: 249, rating: 4.5, reviews: 72, emoji: "⌚" },
  { id: 10, name: "Wireless Earbuds", category: "Headphones", brand: "Sony", price: 89, oldPrice: 119, rating: 4.4, reviews: 65, emoji: "🎧" },
  { id: 11, name: "Samsung Galaxy Book", category: "Laptops", brand: "Samsung", price: 749, oldPrice: 899, rating: 4.5, reviews: 43, emoji: "💻" },
  { id: 12, name: "Phone Accessories", category: "Accessories", brand: "Other", price: 29, oldPrice: 39, rating: 4.2, reviews: 31, emoji: "🎁" },
];

const categories = [
  ["All Products", "🛍️"],
  ["Laptops", "💻"],
  ["Phones", "📱"],
  ["Headphones", "🎧"],
  ["Smart Watches", "⌚"],
  ["Accessories", "🎒"],
];

export default function ShopPage({ onHome }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Products");
  const [brand, setBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sort, setSort] = useState("popular");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
const [orderDetails, setOrderDetails] = useState(null);


  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "All Products" || p.category === category;
      const matchesBrand = brand === "All" || p.brand === brand;
      return matchesSearch && matchesCategory &&
        matchesBrand && p.price <= maxPrice;
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [search, category, brand, maxPrice, sort]);

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  

function addToCart(product) {
  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id);

    if (existing) {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...prev, { id: product.id, quantity: 1 }];
  });
}

function updateQuantity(id, change) {
  setCart((prev) =>
    prev
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + change }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}

function removeFromCart(id) {
  setCart((prev) => prev.filter((item) => item.id !== id));
}

const cartCount = cart.reduce(
  (total, item) => total + item.quantity,
  0
);


if (orderDetails) {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Thank you, {orderDetails.customer.name}!</p>
      <p>
        Your order total is ₹
        {orderDetails.total.toLocaleString("en-IN")}
      </p>
      <p>Delivery Address: {orderDetails.customer.address}, {orderDetails.customer.city}</p>

      <button
        onClick={() => {
          setOrderDetails(null);
          setShowCheckout(false);
          setShowCart(false);
          setCart([]);
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
}

if (showCheckout) {
  return (
    <Checkout
      cart={cart}
      products={products}
      onBack={() => setShowCheckout(false)}
      onPlaceOrder={(order) => setOrderDetails(order)}
    />
  );
}

if (showCart) {
  return (
    <Cart
      cart={cart}
      products={products}
      onUpdateQuantity={updateQuantity}
      onRemove={removeFromCart}
      onContinueShopping={() => setShowCart(false)}
      onHome={onHome}
      onCheckout={() => setShowCheckout(true)}
    />
  );
}

  return (
    <div className="catalog-page">
      <header className="catalog-navbar">
        <a className="catalog-logo" href="#home" onClick={(e) => {
          e.preventDefault();
          onHome();
        }}>
          <span>🛍️</span>
          <span>ShopEase<small>Better Products. Happier You.</small></span>
        </a>

        <nav className="catalog-links">
          <a href="#home" onClick={(e) => {
            e.preventDefault();
            onHome();
          }}>Home</a>
          <a className="selected" href="#products">Shop</a>
          <a href="#catalog-footer">About</a>
        </nav>

        <div className="catalog-actions">
          <input
            aria-label="Search products"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
         
<button
  aria-label="Shopping cart"
  className="catalog-cart"
  onClick={() => setShowCart(true)}
>
  🛒 <span>{cartCount}</span>
</button>

        </div>
      </header>

      <section className="catalog-hero">
        <div>
          <span className="catalog-eyebrow">OUR PRODUCTS</span>
          <h1>Discover Our <span>Best Collection</span></h1>
          <p>Explore quality products designed to make your life easier and more stylish.</p>
        </div>
        <div className="catalog-hero-art" aria-hidden="true">
          <span>💻</span><span>🎧</span><span>📱</span><span>⌚</span>
        </div>
      </section>

      <main className="catalog-layout" id="products">
        <aside className="catalog-sidebar">
          <h3>▦ Categories</h3>
          {categories.map(([name, icon]) => (
            <button
              key={name}
              className={`category-option ${category === name ? "chosen" : ""}`}
              onClick={() => setCategory(name)}
            >
              <span>{icon} &nbsp; {name}</span>
            </button>
          ))}

          <h3 className="filter-title">Price Range</h3>
          <input
            className="price-slider"
            type="range"
            min="0"
            max="2000"
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            aria-label="Maximum price"
          />
          <div className="price-labels">
            <span>$0</span><span>${maxPrice}</span>
          </div>

          <h3 className="filter-title">Brand</h3>
          {["All", "Apple", "Samsung", "Dell", "Sony", "Other"].map((item) => (
            <label className="brand-option" key={item}>
              <input
                type="radio"
                name="brand"
                checked={brand === item}
                onChange={() => setBrand(item)}
              />
              {item}
            </label>
          ))}

          <button className="clear-filters" onClick={() => {
            setSearch("");
            setCategory("All Products");
            setBrand("All");
            setMaxPrice(2000);
            setSort("popular");
          }}>
            Clear all filters
          </button>
        </aside>

        <section className="catalog-results">
          <div className="catalog-toolbar">
            <h2>All Products <span>({filteredProducts.length})</span></h2>
            <label>
              <span className="sort-label">Sort:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="popular">Popular</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </label>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="catalog-empty">
              <span>🔎</span>
              <h3>No products found</h3>
              <p>Try another search or clear your filters.</p>
            </div>
          ) : (
            <div className="catalog-grid">
              {filteredProducts.map((product) => (
                <article className="catalog-card" key={product.id}>
                  {product.badge && (
                    <span className={`product-badge ${product.badge === "New" ? "new-badge" : ""}`}>
                      {product.badge}
                    </span>
                  )}

                  <button
                    className={`favorite-btn ${favorites.includes(product.id) ? "is-favorite" : ""}`}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Toggle favorite"
                  >
                    {favorites.includes(product.id) ? "♥" : "♡"}
                  </button>

                  <div className="catalog-product-art">{product.emoji}</div>
                  <h3>{product.name}</h3>
                  <p className="product-rating">
                    <span>★</span> {product.rating} <small>({product.reviews})</small>
                  </p>
                  <p className="product-price">
                    ${product.price} <del>${product.oldPrice}</del>
                  </p>
                 <button
  className="add-cart-btn"
  onClick={() => addToCart(product)}
>
  🛒 &nbsp; Add to Cart
</button>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

     <footer className="catalog-footer" id="catalog-footer">
  ShopEase — Better Products. Happier You. · {cartCount} item(s) in cart
</footer>
    </div>
  );
}
