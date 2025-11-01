import express from "express";
import { getOwnerOrders, placeOrder } from "../controllers/order.controller.js";
import isAuth from "../middlewares/isAuth.js";
const orderRouter = express.Router();

orderRouter.post(
  "/place-order",
  isAuth,placeOrder
);
orderRouter.get(
  "/user-orders",
  isAuth,getOwnerOrders
);
orderRouter.post(
  "/owner-orders",
  isAuth,getOwnerOrders
);

export default orderRouter;
