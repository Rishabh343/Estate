import express from "express";
import {
  addFavorite,
  getMyFavorites,
  removeFavorite,
} from "../controllers/favoriteController.js";
import { auth } from "../middleware/auth.js";
import { isBuyer } from "../middleware/isBuyer.js";

const favoriteRouter = express.Router();
favoriteRouter.post("/:propertyId", auth, isBuyer, addFavorite);
favoriteRouter.get("/", auth, isBuyer, getMyFavorites);

favoriteRouter.delete("/:propertyId", auth, isBuyer, removeFavorite);

export default favoriteRouter;
