export default function Cart({ cart, updateQty }) {
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1rem", minWidth: 280 }}>
      <h3 style={{ marginBottom: "0.8rem", fontSize: "0.95rem" }}>Cart Summary</h3>
      {cart.map((item) => (
        <div key={item._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", fontSize: "0.85rem" }}>
          <span>{item.name}</span>
          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
            <button onClick={() => updateQty(item._id, -1)} style={{ background: "var(--border)", color: "var(--text)", padding: "0.1rem 0.5rem" }}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQty(item._id, 1)} style={{ background: "var(--border)", color: "var(--text)", padding: "0.1rem 0.5rem" }}>+</button>
            <span style={{ minWidth: 55, textAlign: "right" }}>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      ))}
      <div style={{ borderTop: "1px solid var(--border)", marginTop: "0.8rem", paddingTop: "0.6rem", fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
        <span>Total</span><span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
