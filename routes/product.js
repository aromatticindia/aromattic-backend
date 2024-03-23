const express = require("express");
const router = express.Router();

const {
  addProduct,
  allProducts,
  viewProduct,
  searchProduct,
  productsByType,
  productsByCategory,
  updateProduct,
  removeProduct,
} = require("../controllers/product");

router.post("/product", addProduct);
router.get("/products", allProducts);
router.get("/product/:slug", viewProduct);
router.delete("/product/:slug", removeProduct);
router.put("/product/:slug", updateProduct);
router.post("/products/type", productsByType);
router.post("/products/category", productsByCategory);
router.get("/products/search", searchProduct);

module.exports = router;
