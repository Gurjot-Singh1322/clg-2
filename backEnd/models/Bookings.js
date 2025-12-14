import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },  // stored as "YYYY-MM-DD"
  slot: { type: String, required: true },  // e.g. "11:00", "17:00"
  seats: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Bookings", bookingSchema);
