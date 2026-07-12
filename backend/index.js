import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { propertiesRouter } from "./routes/propertiesRoutes.js";
import { bookingRouter } from "./routes/bookingRoutes.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
connectDb();
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Comming from backend");
});
app.use("/api/user", userRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/booking", bookingRouter);
app.use("/uploads", express.static("uploads"));
app.listen(port, () => {
  console.log("server is running ");
});
