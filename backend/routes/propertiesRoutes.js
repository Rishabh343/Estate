import express from "express";
import {
  addProperties,
  deleteProperty,
  getAllProperties,
  updateProperty,
} from "../controllers/propertiesController.js";
const propertiesRouter = express.Router();

propertiesRouter.post("/", addProperties);
propertiesRouter.get("/", getAllProperties);
propertiesRouter.get("/:id", getAllProperties);
propertiesRouter.delete("/:id", deleteProperty);
propertiesRouter.put("/:id", updateProperty);
export { propertiesRouter };
