import express from "express";
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../Controller/enquiryController.js";

const router = express.Router();

router.post("/", createEnquiry);

router.get("/", getEnquiries);

router.get("/:id", getEnquiryById);

router.put("/:id", updateEnquiryStatus);

router.delete("/:id", deleteEnquiry);

export default router;