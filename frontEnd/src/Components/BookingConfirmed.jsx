import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";

const BookingConfirmed = () => {
  const { state } = useLocation();
  const { bookingId } = useParams();

  const booking = state?.booking || {};

  return (
    <div className="min-h-screen bg-[#f7ebe8] py-12 flex justify-center items-center">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-xl p-12 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-6 rounded-full">
            <span className="text-green-600 text-5xl">✔</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-[#3e2c2c] mb-2">
          Booking Confirmed!
        </h1>

        <p className="text-[#6b4f4f] mb-8">
          Your table has been successfully reserved.
        </p>

        {/* Booking Details Box */}
        <div className="bg-[#f3e1d8] rounded-xl text-left p-6 mb-8">
          <p className="text-sm font-semibold text-[#6b4f4f]">Booking ID</p>
          <p className="text-2xl font-bold text-[#d4a017] mb-4">{bookingId}</p>

          <p><strong>Name:</strong> {booking.name || "—"}</p>
          <p><strong>Date:</strong> {booking.date || "—"}</p>
          <p><strong>Time:</strong> {booking.slot || "—"}</p>
          <p><strong>Guests:</strong> {booking.seats || "—"}</p>
        </div>

        <p className="text-[#6b4f4f] mb-6">
          Please save your Booking ID for future reference.
        </p>

        <Link
          to="/tablebook"
          className="bg-[#d4a017] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#b89015] transition"
        >
          Make Another Booking
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmed;
