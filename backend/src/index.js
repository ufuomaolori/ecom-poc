const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Health check — Coolify uses this
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
