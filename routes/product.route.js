const express = require("express");
const { getFilteredProducts } = require("../controllers/product.controller");

const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.get("/filter", getFilteredProducts);

module.exports = router;
