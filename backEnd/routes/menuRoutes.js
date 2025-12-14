import express from "express";
import MenuItems from "../models/MenuItems.js";

const router = express.Router();

// Get all menu items
router.get("/", async (req, res) => {
  const items = await MenuItems.find();
  res.json(items);
});

// Add menu item
router.post("/", async (req, res) => {
  try {
    const item = new MenuItems(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update item
router.put("/:id", async (req, res) => {
  try {
    const updated = await MenuItems.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete item
router.delete("/:id", async (req, res) => {
  await MenuItems.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
