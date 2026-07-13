import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { propertiesRouter } from "./routes/propertiesRoutes.js";
import { bookingRouter } from "./routes/bookingRoutes.js";
import cors from "cors";
import favoriteRouter from "./routes/favoriteRoute.js";
dotenv.config();
const app = express();
connectDb();
const allowedOrigins = [
  "http://localhost:5173",
  "https://estate-liart-kappa.vercel.app",
];
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Keep this if you pass cookies/tokens
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// 3. Apply the middleware before your routes
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Comming from backend");
});
app.use("/api/user", userRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/favorite", favoriteRouter);
app.use("/uploads", express.static("uploads"));
app.listen(port, () => {
  console.log("server is running ");
});
