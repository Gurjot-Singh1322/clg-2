import express from "express";
import Bookings from "../models/Bookings.js";

import { sendBookingEmail } from "../utils/sendEmail.js";


const router = express.Router();

const allSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
];

//Booking ID generator
function generateBookingId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  return (
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)] +
    "K" +
    numbers[Math.floor(Math.random() * numbers.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    letters[Math.floor(Math.random() * letters.length)]
  ).toUpperCase();
}

// ----------------------
// GET Available Slots
// ----------------------
router.get("/slots", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Date is required" });

    const MAX_SEATS = 10;
    const bookings = await Bookings.find({
      date,
      status: "confirmed"
    });

    const slotData = {};
    allSlots.forEach(slot => slotData[slot] = MAX_SEATS);

    bookings.forEach(b => {
      slotData[b.slot] -= b.seats;
      if (slotData[b.slot] < 0) slotData[b.slot] = 0;
    });

    res.json(slotData);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ---- CREATE BOOKING ----
router.post("/", async (req, res) => {
  try {
    // Generate a unique booking ID like BKG12345
    const bookingId = generateBookingId();

    // Create booking with bookingId
    const booking = new Bookings({
      bookingId,
      ...req.body,
    });

    await booking.save();

    try {
      await sendBookingEmail({
        to: req.body.email,
        name: booking.name,
        bookingId: booking.bookingId,
        date: booking.date,
        slot: booking.slot,
        seats: booking.seats,
        items: booking.items
      });
    } catch (emailErr) {
      console.error("Email failed:", emailErr);
    }

    res.json({
      success: true,
      bookingId: booking.bookingId,
      booking,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});


// ----------------------
// GET ALL BOOKINGS (Admin)
// ----------------------
router.get("/", async (req, res) => {
  try {
    const bookings = await Bookings.find().sort({ createdAt: -1 }); // NEWEST FIRST
    res.json({ success: true, bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// ----------------------
// DELETE A BOOKING
// ----------------------
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await Bookings.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Booking deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

// CANCEL BOOKING (Customer)
router.put("/cancel-booking", async (req, res) => {
  try {
    const { bookingId, phone } = req.body;

    const booking = await Bookings.findOne({ bookingId, phone });

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});



export default router;
