import React, { useState } from "react";
import { cancelBookingByCustomer } from "../utils/api";

const CancelBooking = () => {
  const [bookingId, setBookingId] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCancel = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await cancelBookingByCustomer(bookingId, phone);

      if (res.success) {
        setSuccess(res.message);
      } else {
        setError(res.message || "Cancellation failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7ebe8]">
      <form
        onSubmit={handleCancel}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Cancel Booking
        </h2>

        <input
          type="text"
          placeholder="Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          Cancel Booking
        </button>
      </form>
    </div>
  );
};

export default CancelBooking;
