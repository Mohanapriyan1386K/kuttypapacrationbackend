import express from "express";
import {upload} from "../middleware/upload.js";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  updateProductStatus
} from "../Controller/ProductController.js";

const router = express.Router();

router.post("/", upload.single("image"), createProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/:id", upload.single("image"), updateProduct);

router.put("/status/:id", updateProductStatus);

router.delete("/:id", deleteProduct);

export default router;