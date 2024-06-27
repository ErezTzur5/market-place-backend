const mongoose = require("mongoose");

// Create a schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Static method to find products by price range
productSchema.statics.findProductsByPriceRange = async function (
  minPrice,
  maxPrice
) {
  try {
    const products = await this.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
    return products;
  } catch (error) {
    throw new Error("Error finding products by price range: " + error.message);
  }
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
