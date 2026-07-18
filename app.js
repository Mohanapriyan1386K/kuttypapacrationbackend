import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";

import ProductRoutes from "./routes/ProductRoutes.js"
import CategoryRoute from "./routes/CategoryRoutes.js";
import  EnquiryRoutes from "./routes/enquiryRoutes.js"
import DashboardRouter from "./routes/DashboardRouter.js"

dotenv.config()
connectDB();
const app=express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/Category",CategoryRoute)
app.use("/api/product",ProductRoutes)
app.use("/api/enquiry", EnquiryRoutes);
app.use("/api/dashboard",DashboardRouter)

export default app