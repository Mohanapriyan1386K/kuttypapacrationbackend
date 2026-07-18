import express from "express";
import {upload} from "../middleware/upload.js";

import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../Controller/CategoryController.js";

const router = express.Router();

router.post("/", upload.single("image"), createCategory);

router.get("/", getCategories);

router.get("/:id", getCategory);

router.put("/:id", upload.single("image"), updateCategory);

router.delete("/:id", deleteCategory);

export default router;