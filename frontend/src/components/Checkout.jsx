import { useState } from "react";

export default function Checkout({ cart, updateQty, onSuccess, onBack, apiUrl }) {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.address) {
      setError("Please fill in all fields.");
      return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: cart.map((i) => ({ productId: i._id, name: i.name, price: i.price, quantity: i.quantity })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");
      onSuccess(data.orderId);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <button onClick={onBack} style={{ background: "transparent", color: "var(--primary)", marginBottom: "1rem", padding: "0.4rem 0.8rem", border: "1px solid var(--primary)" }}>
        ← Back to Shop
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Order Summary */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>Order Summary</h3>
          {cart.map((item) => (
            <div key={item._id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem", fontSize: "0.9rem" }}>
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "0.8rem", marginTop: "0.8rem", fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Customer Details */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <h3>Your Details</h3>
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.3rem" }}>Full Name</label>
            <input name="name" placeholder="Ada Okonkwo" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.3rem" }}>Email</label>
            <input name="email" type="email" placeholder="ada@example.com" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "0.3rem" }}>Delivery Address</label>
            <textarea name="address" rows={3} placeholder="12 Broad Street, Lagos" value={form.address} onChange={handleChange} style={{ resize: "vertical" }} />
          </div>

          {error && <p style={{ color: "var(--accent)", fontSize: "0.85rem" }}>{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{ background: "var(--primary)", color: "#fff", padding: "0.75rem", marginTop: "0.5rem" }}
          >
            {submitting ? "Placing Order…" : `Place Order — $${total.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
