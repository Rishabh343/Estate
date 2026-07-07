import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { propertiesRouter } from "./routes/propertiesRoutes.js";
import { bookingRouter } from "./routes/bookingRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
connectDb();
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Comming from backend");
});
app.use("/api/user", userRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/booking", bookingRouter);
app.listen(port, () => {
  console.log("server is running ");
});
