const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");
const Cart = require("../models/cart");
const Products = require("../models/products");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// add new order details when user pay the bill
router.post("/checkout", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("products.product")
      .select("_id total products");

    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    // Check if all products are in stock
    const outOfStock = cart.products.filter(
      (item) => item.quantity > item.product.stock
    );
    if (outOfStock.length > 0) {
      return res
        .status(400)
        .json({ message: "One or more products are out of stock" });
    }

    const products = cart.products.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    const order = new Order({
      user: req.user._id,
      products,
      total: cart.total,
      status: "paid",
    });

    // Save order
    await order.save();

    // Reduce stock numbers for purchased products
    for (const item of cart.products) {
      const product = await Products.findById(item.product._id);
      product.stock -= item.quantity;
      await product.save();
    }

    // Remove current cart
    const deleteCart = await Cart.findByIdAndDelete(cart._id);

    res.json({ message: "Order placed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// get users oders
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate({
      path: "products.product",
      select: "posterImage title _id price",
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// change status to shipped by admin
router.patch("/shipped/:id", auth, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "paid") {
      return res.status(400).json({
        message: "Order must be paid before it can be shipped",
      });
    }

    order.status = "shipped";
    await order.save();

    return res.json({ message: "Order status changed to shipped" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
