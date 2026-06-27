import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

const API = import.meta.env.VITE_API_URL || "";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("shop"); // shop | checkout | success
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => setError("Could not load products. Check API connection."))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      return existing
        ? prev.map((i) => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => i._id === id ? { ...i, quantity: i.quantity + delta } : i)
        .filter((i) => i.quantity > 0)
    );
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const handleOrderSuccess = (id) => {
    setOrderId(id);
    setCart([]);
    setView("success");
  };

  return (
    <div>
      {/* Header */}
      <header style={{ background: "var(--primary)", color: "#fff", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
        <h1 style={{ fontSize: "1.3rem", cursor: "pointer" }} onClick={() => setView("shop")}>🛒 ICNL Store <span style={{ fontSize: "0.75rem", opacity: 0.7, fontWeight: 400 }}>POC</span></h1>
        {view === "shop" && (
          <button
            onClick={() => setView("checkout")}
            disabled={cartCount === 0}
            style={{ background: cartCount > 0 ? "#fff" : "rgba(255,255,255,0.3)", color: "var(--primary)", padding: "0.5rem 1.2rem" }}
          >
            Checkout {cartCount > 0 && `(${cartCount})`}
          </button>
        )}
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1rem" }}>
        {view === "success" && (
          <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <div style={{ fontSize: "3rem" }}>✅</div>
            <h2 style={{ margin: "1rem 0 0.5rem" }}>Order Confirmed!</h2>
            <p style={{ color: "var(--muted)" }}>Order ID: <code>{orderId}</code></p>
            <button onClick={() => setView("shop")} style={{ marginTop: "1.5rem", background: "var(--primary)", color: "#fff" }}>
              Back to Shop
            </button>
          </div>
        )}

        {view === "checkout" && (
          <Checkout cart={cart} updateQty={updateQty} onSuccess={handleOrderSuccess} onBack={() => setView("shop")} apiUrl={API} />
        )}

        {view === "shop" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2>Products</h2>
              {cartCount > 0 && <Cart cart={cart} updateQty={updateQty} />}
            </div>

            {loading && <p>Loading products…</p>}
            {error && <p style={{ color: "var(--accent)" }}>{error}</p>}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.2rem" }}>
              {products.map((p) => (
                <ProductCard key={p._id} product={p} onAdd={addToCart} cartQty={cart.find((i) => i._id === p._id)?.quantity || 0} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
