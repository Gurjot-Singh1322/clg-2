import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// ---------------------------------------
// POST - Submit Feedback
// ---------------------------------------
router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();

    res.json({ success: true, feedback });
  } catch (err) {
    console.error("Error saving feedback:", err);
    res.status(500).json({ success: false, error: "Failed to submit feedback" });
  }
});

// ---------------------------------------
// GET - All Feedback (Admin)
// ---------------------------------------
router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 }); // newest first
    res.json({ success: true, feedback });
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).json({ success: false, error: "Failed to load feedback" });
  }
});

// ---------------------------------------
// DELETE - Remove Feedback by ID (Admin)
// ---------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Feedback not found" });
    }

    res.json({ success: true, message: "Feedback deleted" });
  } catch (err) {
    console.error("Error deleting feedback:", err);
    res.status(500).json({ success: false, error: "Failed to delete feedback" });
  }
});

export default router;

