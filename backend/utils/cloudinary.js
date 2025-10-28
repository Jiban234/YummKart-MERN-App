import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!file) {
      throw new Error("No file provided for upload");
    }

    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder: "restaurants", // Optional: organize uploads
    });

    // Delete local file after successful upload
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    return result.secure_url;
  } catch (error) {
    // Clean up local file even on error
    if (file && fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

export default uploadOnCloudinary;
