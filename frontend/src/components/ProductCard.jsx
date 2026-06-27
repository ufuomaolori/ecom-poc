export default function ProductCard({ product, onAdd, cartQty }) {
  const { name, price, stock, description, category } = product;

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: "1.2rem",
      boxShadow: "var(--shadow)",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    }}>
      <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {category}
      </span>
      <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>{name}</h3>
      <p style={{ fontSize: "0.85rem", color: "var(--muted)", flexGrow: 1 }}>{description}</p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
        <span style={{ fontSize: "1.2rem", fontWeight: 700 }}>${price.toFixed(2)}</span>
        <span style={{ fontSize: "0.75rem", color: stock > 0 ? "green" : "var(--accent)" }}>
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </span>
      </div>

      <button
        onClick={() => onAdd(product)}
        disabled={stock === 0}
        style={{
          background: stock === 0 ? "var(--border)" : "var(--primary)",
          color: stock === 0 ? "var(--muted)" : "#fff",
          width: "100%",
          padding: "0.6rem",
        }}
      >
        {cartQty > 0 ? `Add more (${cartQty} in cart)` : "Add to Cart"}
      </button>
    </div>
  );
}
