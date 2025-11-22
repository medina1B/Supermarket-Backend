import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import supermarketRoutes from "./routes/supermarketRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/auth.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import orderRoutes from "./routes/orders.js";
import customerAuthRoutes from "./routes/customerAuth.js";

dotenv.config();
const app = express();

// ✅ Enable CORS for local dev and Vercel frontend
const allowedOrigins = [
  "http://localhost:5173", // local Vite dev
  "https://admin-v2-dgnv-c501pnkal-medina1bs-projects.vercel.app", // exact deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman or server-side)
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // allow cookies/JWT
  })
);

// ✅ Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use("/api/supermarkets", supermarketRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/customer", customerAuthRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
