import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { search } from "../controllers/search.controller.js";

const searchRouter = express.Router();

// GET /api/search?query=pizza&city=Mumbai
searchRouter.get("/", isAuth, search);

export default searchRouter;