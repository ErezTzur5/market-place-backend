const Product = require("../models/products.model");

async function filterProducts({ name, category, minPrice, maxPrice }) {
  const result = {};

  if (name) {
    result.name = { $regex: name, $options: "i" }; // Case-insensitive search
  }

  if (category) {
    result.category = { $regex: category, $options: "i" }; // Case-insensitive search
  }

  if (minPrice !== undefined) {
    result.price = { ...result.price, $gte: minPrice };
  }

  if (maxPrice !== undefined) {
    result.price = { ...result.price, $lte: maxPrice };
  }

  try {
    const products = await Product.find(result);
    return products;
  } catch (err) {
    console.error("Error filtering products:", err);
    throw err;
  }
}

module.exports = {
  filterProducts,
};
