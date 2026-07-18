import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load env vars here to ensure they're available regardless of import order
// (ES module imports are hoisted, so dotenv.config() in server.js may run too late)
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;