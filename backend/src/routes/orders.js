const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");

// POST create order
router.post("/", async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ error: "Customer info and items are required" });
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = new Order({ customer, items, total });
    await order.save();

    res.status(201).json({ message: "Order placed successfully", orderId: order._id, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
