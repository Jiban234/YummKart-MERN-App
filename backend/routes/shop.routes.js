import express from "express";
import {
  createAndEditShop,
  getMyShop,
} from "../controllers/shop.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";

const shopRouter = express.Router();

shopRouter.get(
  "/create-edit",
  isAuth,
  upload.single("image"),
  createAndEditShop
);
shopRouter.post("/get-my-shop", isAuth, getMyShop);

export default shopRouter;
