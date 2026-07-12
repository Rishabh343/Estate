import express from "express";
import {
  approvebooking,
  createBooking,
  OwnersDashboardReviewBooking,
  Pendingbooking,
  Rejectsbooking,
} from "../controllers/bookingController.js";
import { auth } from "../middleware/auth.js";
import { isBuyer } from "../middleware/isBuyer.js";
import { isOwner } from "../middleware/isOwner.js";
const bookingRouter = express.Router();

bookingRouter.post("/", auth, isBuyer, createBooking);
bookingRouter.get("/owner", auth, isOwner, OwnersDashboardReviewBooking);
bookingRouter.put("/approve/:id", auth, isOwner, approvebooking);
bookingRouter.put("/reject/:id", auth, isOwner, Rejectsbooking);
bookingRouter.get("/pending/:id", auth, isOwner, Pendingbooking);

export { bookingRouter };
