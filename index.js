import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import supermarketRoutes from "./routes/supermarketRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/auth.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import orderRoutes from "./routes/orders.js";
import customerAuthRoutes from "./routes/customerAuth.js";
dotenv.config();
const app = express();

// ✅ Enable CORS for frontend connection
app.use(
  cors({
    origin: "http://localhost:5173", // React (Vite) frontend URL
    credentials: true, // allow cookies/JWT to be sent
  })
);

// ✅ Middleware setup
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
// Routes
app.use("/api/supermarkets", supermarketRoutes);
app.use("/api/products", productRoutes); // Products
app.use("/api/users", userRoutes); // Users
app.use("/api/auth", authRoutes); // Auth
app.use("/api/customer", customerAuthRoutes); // customer login/signup
app.use("/api/applications", applicationRoutes);
// ✅ Default route for testing

app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.use("/api/orders", orderRoutes);
// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
