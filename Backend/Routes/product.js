const express = require("express");
const { ProductModel } = require("../Models/product");
const productRouter = express.Router();

// Create a new product
productRouter.post("/products", async (req, res) => {
  try {
    const newProduct = ProductModel(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product Added Succesfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all products
productRouter.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update any products
productRouter.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ProductModel.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "Product Updated Success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

productRouter.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let products = await ProductModel.find({ id });
    res.status(200).json({ product: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete any product

productRouter.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ProductModel.findByIdAndDelete(id);
    res.status(204).json({ message: "Product Deleted Success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = { productRouter };
