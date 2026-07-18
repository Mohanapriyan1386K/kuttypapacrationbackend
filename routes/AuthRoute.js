import express from "express"
const router = express.Router();

import {
  signup,
  login,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
}   from "../Controller/AuthController.js"
// import { authMiddleware } from "../middleware/authMiddleware.js";

router.post("/signup", signup);
router.post("/login", login);

router.get("/", getAdmins);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

export default router;