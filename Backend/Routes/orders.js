const express = require("express");
const { OrderModel } = require("../Models/order");

const orderRouter = express.Router();

// Create a new product
orderRouter.post("/orders", async (req, res) => {
  try {
    const newProduct = await OrderModel.insertMany([
      {
        customerName: "Alice",
        status: "Pending",
        products: [{ product: "65f09f6975e3e6dc1a4e8dc5", quantity: 2 }],
      },
      {
        customerName: "Bob",
        status: "Pending",
        products: [
          { product: "65f09f6975e3e6dc1a4e8dc6", quantity: 1 },
          { product: "65f09f6975e3e6dc1a4e8dca", quantity: 3 },
        ],
      },
      {
        customerName: "Charlie",
        status: "Pending",
        products: [
          { product: "65f09f6975e3e6dc1a4e8dc7", quantity: 2 },
          { product: "65f09f6975e3e6dc1a4e8dc9", quantity: 1 },
        ],
      },
      {
        customerName: "David",
        status: "Pending",
        products: [{ product: "65f09f6975e3e6dc1a4e8dcb", quantity: 4 }],
      },
      {
        customerName: "Eva",
        status: "Pending",
        products: [{ product: "65f09f6975e3e6dc1a4e8dcd", quantity: 2 }],
      },
      {
        customerName: "Frank",
        status: "Pending",
        products: [
          { product: "65f09f6975e3e6dc1a4e8dce", quantity: 3 },
          { product: "65f09f6975e3e6dc1a4e8dcc", quantity: 1 },
        ],
      },
      {
        customerName: "Grace",
        status: "Pending",
        products: [
          { product: "65f09f6975e3e6dc1a4e8dcc", quantity: 2 },
          { product: "65f09f6975e3e6dc1a4e8dc8", quantity: 1 },
        ],
      },
      {
        customerName: "Harry",
        status: "Pending",
        products: [
          { product: "65f09f6975e3e6dc1a4e8dc8", quantity: 1 },
          { product: "65f09f6975e3e6dc1a4e8dcb", quantity: 1 },
          { product: "65f09f6975e3e6dc1a4e8dca", quantity: 2 },
        ],
      },
      {
        customerName: "Ivy",
        status: "Pending",
        products: [
          { product: "65f09f6975e3e6dc1a4e8dc6", quantity: 1 },
          { product: "65f09f6975e3e6dc1a4e8dc7", quantity: 1 },
          { product: "65f09f6975e3e6dc1a4e8dc8", quantity: 1 },
          { product: "65f09f6975e3e6dc1a4e8dc9", quantity: 1 },
        ],
      },
      {
        customerName: "Jack",
        status: "Pending",
        products: [
          { product: "65f09f6975e3e6dc1a4e8dcc", quantity: 3 },
          { product: "65f09f6975e3e6dc1a4e8dcd", quantity: 1 },
        ],
      },
    ]);
    res.status(201).json({ message: "Order Created Success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all orders
orderRouter.get("/orders", async (req, res) => {
  try {
    const orders = await OrderModel.find({}).populate("products.product");
    res.status(200).json({ data: orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

orderRouter.get("/orders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await OrderModel.findById({ _id: id }).populate(
      "products.product"
    );
    res.status(200).json({ data: orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update any orders
orderRouter.patch("/orders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await OrderModel.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "Product Updated Success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete any product

orderRouter.delete("/orders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await OrderModel.findByIdAndDelete(id);
    res.status(204).json({ message: "Product Deleted Success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { orderRouter };
