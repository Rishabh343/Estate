import express from "express";
import {
  addProperties,
  approveProperty,
  deleteProperty,
  filterProperties,
  getAllProperties,
  getPropertyById,
  RejectProperty,
  searchProperties,
  updateProperty,
} from "../controllers/propertiesController.js";
import { auth } from "../middleware/auth.js";
import { isOwner } from "../middleware/isOwner.js";
import upload from "../middleware/uploads.js";
const propertiesRouter = express.Router();

propertiesRouter.post(
  "/",
  auth,
  isOwner,
  upload.array("images", 10),
  addProperties,
);
propertiesRouter.get("/", getAllProperties);
propertiesRouter.get("/search", searchProperties);
propertiesRouter.get("/filter", filterProperties);
propertiesRouter.get("/approveProperty/:id", auth, isOwner, approveProperty);
propertiesRouter.get("/rejectProperty/:id", auth, isOwner, RejectProperty);
propertiesRouter.get("/:id", getPropertyById);
propertiesRouter.delete("/:id", auth, isOwner, deleteProperty);
propertiesRouter.put(
  "/:id",
  auth,
  isOwner,
  upload.array("images", 10),
  updateProperty,
);

export { propertiesRouter };
