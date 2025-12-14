import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import menuRoutes from "./routes/menuRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import discountRoutes from "./routes/discountRoutes.js";


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/discounts", discountRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
