import express from "express";
import {DashboardData} from "../Controller/DashboardControllers.js";
const router = express.Router();
router.get("/",DashboardData)
export default router;