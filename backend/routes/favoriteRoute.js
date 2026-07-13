import express from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favoriteController.js";
import { auth } from "../middleware/auth.js";
import { isBuyer } from "../middleware/isBuyer.js";



const favoriteRouter = express.Router();

favoriteRouter.get("/", auth, isBuyer, getFavorites);

favoriteRouter.post("/:propertyId", auth, isBuyer, addFavorite);

favoriteRouter.delete("/:propertyId", auth, isBuyer, removeFavorite);

export default favoriteRouter;
