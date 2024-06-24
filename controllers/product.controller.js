// controllers/productsController.js
const Product = require("../models/products.model");
const { filterProducts } = require("../helpers/products.helper");
// Get products count
async function getProductsCount(req, res) {
  const name = req.query.name || "";
  try {
    const count = await Product.countDocuments({
      name: { $regex: name, $options: "i" }, // "i" for case-insensitive
    });
    res.json({ count });
  } catch (err) {
    console.log(
      "products.controller, getProductsCount. Error while getting products count",
      err
    );
    res.status(500).json({ message: err.message });
  }
}

async function getFilteredProducts(req, res) {
  const { name, category, minPrice, maxPrice } = req.query;

  try {
    const products = await filterProducts({
      name,
      category,
      minPrice,
      maxPrice,
    });
    res.json(products);
  } catch (err) {
    console.error("Error getting filtered products:", err);
    res.status(500).json({ message: err.message });
  }
}

// Get all products
async function getProducts(req, res) {
  const name = req.query.name || "";

  try {
    const products = await Product.find({
      name: { $regex: name, $options: "i" }, // "i" for case-insensitive
    });

    res.json(products);
  } catch (err) {
    console.log(
      "products.controller, getProducts. Error while getting products",
      err
    );
    res.status(500).json({ message: err.message });
  }
}

// Get single product
async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      console.log(
        `products.controller, getProductById. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `products.controller, getProductById. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(
      `products.controller, getProductById. Error while getting product with id: ${id}`,
      err
    );
    res.status(500).json({ message: err.message });
  }
}

// Delete product
async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      console.log(
        `products.controller, deleteProduct. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.log(
      `products.controller, deleteProduct. Error while deleting product with id: ${id}`,
      err
    );
    res.status(500).json({ message: err.message });
  }
}

// Create new product
async function createProduct(req, res) {
  const productToAdd = req.body;
  const newProduct = new Product(productToAdd);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.log(
      "products.controller, createProduct. Error while creating product",
      err
    );

    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`products.controller, createProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`products.controller, createProduct. ${err.message}`);
      res.status(500).json({ message: "Server error while creating product" });
    }
  }
}

// Update product
async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, price, quantity, category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, quantity, category },
      { new: true, runValidators: true } // validate before updating
    );

    if (!updatedProduct) {
      console.log(
        `products.controller, updateProduct. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.log(
      `products.controller, updateProduct. Error while updating product with id: ${id}`,
      err
    );

    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`products.controller, updateProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`products.controller, updateProduct. ${err.message}`);
      res.status(500).json({ message: "Server error while updating product" });
    }
  }
}

module.exports = {
  getProductsCount,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFilteredProducts,
};
