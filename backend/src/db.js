const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Seed products if collection is empty
    const Product = require("./models/Product");
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany([
        { name: "Wireless Headphones", price: 89.99, stock: 15, description: "Noise-cancelling over-ear headphones", category: "Electronics" },
        { name: "Mechanical Keyboard", price: 129.99, stock: 8, description: "TKL layout with RGB backlight", category: "Electronics" },
        { name: "Standing Desk Mat", price: 49.99, stock: 30, description: "Anti-fatigue ergonomic mat", category: "Office" },
        { name: "USB-C Hub 7-in-1", price: 39.99, stock: 22, description: "HDMI, SD, USB-A, PD charging", category: "Electronics" },
        { name: "Laptop Backpack", price: 64.99, stock: 12, description: "Water-resistant, fits 15.6\" laptop", category: "Bags" },
        { name: "Desk Lamp LED", price: 34.99, stock: 18, description: "Adjustable colour temperature", category: "Office" },
      ]);
      console.log("Sample products seeded");
    }
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
