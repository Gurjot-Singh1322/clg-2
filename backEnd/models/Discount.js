import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  type: { type: String, required: true },    // flat / category / day
  value: { type: Number, required: true },   // percentage
  category: { type: String, default: null }, // only for category
  validOn: { type: [String], default: [] },  // list of days
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Discount", discountSchema);
