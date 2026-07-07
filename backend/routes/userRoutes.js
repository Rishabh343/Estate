import express from "express";
import { login, Register } from "../controllers/userController.js";
const userRouter = express.Router();
userRouter.post("/register", Register);
userRouter.post("/login", login);
export { userRouter };
