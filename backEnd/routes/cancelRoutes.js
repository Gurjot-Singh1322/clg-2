import express from "express";
import Bookings from "../models/Bookings.js";

const router = express.Router();

/**
 * PUT /api/cancel-booking
 * body: { bookingId, phone }
 */
router.put("/", async (req, res) => {
  try {
    const { bookingId, phone } = req.body;

    if (!bookingId || !phone) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and phone are required"
      });
    }

    const booking = await Bookings.findOne({ bookingId, phone });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled"
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully"
    });

  } catch (err) {
    console.error("Cancel booking error:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

export default router;
