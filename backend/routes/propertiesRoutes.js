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
import { isAdmin } from "../middleware/isAdmin.js";
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
propertiesRouter.put("/approveProperty/:id", auth, isAdmin, approveProperty);
propertiesRouter.put("/rejectProperty/:id", auth, isAdmin, RejectProperty);
propertiesRouter.get("/:id", getPropertyById);
propertiesRouter.delete("/:id", auth, deleteProperty);
propertiesRouter.put(
  "/:id",
  auth,
  isOwner,
  upload.array("images", 10),
  updateProperty,
);

export { propertiesRouter };
