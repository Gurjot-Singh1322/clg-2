import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  discount: Number
});

export default mongoose.model("MenuItems", menuSchema);
