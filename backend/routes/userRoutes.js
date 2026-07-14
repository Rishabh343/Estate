import express from "express";
import {
  deleteProfile,
  filterUser,
  forgotPassword,
  getAllUsers,
  getProfile,
  login,
  logout,
  Register,
  searchUser,
  updateProfile,
} from "../controllers/userController.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { auth } from "../middleware/auth.js";
import upload from "../middleware/uploads.js";
const userRouter = express.Router();
userRouter.post("/register", Register);
userRouter.post("/login", login);

userRouter.get("/users", auth, isAdmin, getAllUsers);
userRouter.get("/profile", auth, getProfile);
userRouter.put("/profile", auth, upload.single("profileImage"), updateProfile);
userRouter.put("/forgot-password", forgotPassword);
userRouter.delete("/:id", deleteProfile);
userRouter.get("/search", searchUser);
userRouter.get("/filter", filterUser);
userRouter.post("/logout", logout);
export { userRouter };
