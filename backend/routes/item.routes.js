import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { addItem, deleteItem, editItem, getItemByCity, getItemById, getItemsByShop } from "../controllers/item.controller.js";
import { upload } from "../middlewares/multer.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.put("/edit-item/:itemId", isAuth, upload.single("image"), editItem);
itemRouter.get("/get-item-by-id/:itemId", isAuth, getItemById);
itemRouter.delete("/delete-item/:itemId", isAuth, deleteItem); 
itemRouter.get("/get-item-by-city/:city", isAuth, getItemByCity);
itemRouter.get("/get-items-by-shop/:shopId", isAuth, getItemsByShop);

export default itemRouter;
