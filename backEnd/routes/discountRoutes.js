import express from "express";
import Discount from "../models/Discount.js";

const router = express.Router();

// GET all discounts
router.get("/", async (req, res) => {
  try {
    const discounts = await Discount.find().sort({ createdAt: -1 });
    res.json({ success: true, discounts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch discounts" });
  }
});

// ADD discount
router.post("/", async (req, res) => {
  try {
    const discount = new Discount(req.body);
    await discount.save();

    res.json({ success: true, discount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to add discount" });
  }
});

// DELETE discount
router.delete("/:id", async (req, res) => {
  try {
    await Discount.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to delete discount" });
  }
});

export default router;
