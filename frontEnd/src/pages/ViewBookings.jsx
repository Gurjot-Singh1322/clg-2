import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Calendar, Clock, Users, Phone, Hash } from 'lucide-react';
import { deleteBooking } from "../utils/api";


const API_URL = "http://localhost:5000/api/bookings";

const ViewBookings = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin');
        } else {
            fetchBookings(); // now works
        }
    }, [isAuthenticated]);


    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [filterDate, setFilterDate] = useState("");


    // --------------------------
    // Fetch Bookings From Backend
    // --------------------------
    const fetchBookings = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();

            if (data.success) {
                setBookings(data.bookings);
                setFilteredBookings(data.bookings);
            } else {
                console.error("Failed to load bookings");
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/admin");
            return;
        }
        fetchBookings();
    }, [isAuthenticated, navigate]);

    // --------------------------
    // Filter Bookings By Date
    // --------------------------
    useEffect(() => {
        if (filterDate) {
            setFilteredBookings(bookings.filter((b) => b.date === filterDate));
        } else {
            setFilteredBookings(bookings);
        }
    }, [filterDate, bookings]);

    return (
        <div className="min-h-screen bg-[#f7ebe8] py-8 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center space-x-2 text-[#6b4f4f] hover:text-[#d4a017] mb-2 transition-colors duration-300"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Dashboard</span>
                    </button>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#3e2c2c] font-poppins">
                        View Bookings
                    </h1>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                        <label className="flex items-center space-x-2 text-[#3e2c2c] font-semibold">
                            <Calendar size={20} className="text-[#d4a017]" />
                            <span>Filter by Date:</span>
                        </label>

                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="px-4 py-2 rounded-lg border-2 border-[#6b4f4f] focus:border-[#d4a017] focus:outline-none"
                        />

                        {filterDate && (
                            <button
                                onClick={() => setFilterDate("")}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300"
                            >
                                Clear Filter
                            </button>
                        )}
                    </div>
                </div>

                {/* Bookings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Booking ID */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-[#d4a017] px-3 py-1 rounded-full flex justify-between items-center space-x-4">
                                    <span className="text-[#3e2c2c] font-bold text-sm">
                                        {booking.bookingId}
                                    </span>
                                    <button
                                        onClick={async () => {
                                            if (window.confirm("Are you sure you want to delete this booking?")) {

                                                const res = await deleteBooking(booking._id);   // FIX HERE

                                                if (res.success) {
                                                    setBookings(prev => prev.filter(b => b._id !== booking._id));
                                                    setFilteredBookings(prev => prev.filter(b => b._id !== booking._id));
                                                } else {
                                                    alert("Failed to delete booking");
                                                }
                                            }
                                        }}
                                        className="px-3 py-1 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-all duration-300"
                                    >
                                        Delete
                                    </button>

                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                    Confirmed
                                </span>
                            </div>

                            {/* Customer Details */}
                            <div className="space-y-3">

                                <div className="flex items-center space-x-2">
                                    <Hash size={18} className="text-[#6b4f4f]" />
                                    <span className="text-[#3e2c2c] font-semibold text-lg">
                                        {booking.name}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Phone size={18} className="text-[#6b4f4f]" />
                                    <span className="text-[#6b4f4f]">{booking.phone}</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Calendar size={18} className="text-[#6b4f4f]" />
                                    <span className="text-[#6b4f4f]">{booking.date}</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Clock size={18} className="text-[#6b4f4f]" />
                                    <span className="text-[#6b4f4f]">{booking.slot}</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Users size={18} className="text-[#6b4f4f]" />
                                    <span className="text-[#6b4f4f]">
                                        {booking.seats} guests
                                    </span>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredBookings.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                        <p className="text-lg text-[#6b4f4f]">
                            {filterDate
                                ? "No bookings found for the selected date."
                                : "No bookings available."}
                        </p>
                    </div>
                )}

                {/* Summary */}
                <div className="mt-8 bg-gradient-to-r from-[#3e2c2c] to-[#6b4f4f] text-[#f7ebe8] rounded-xl p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-3xl font-bold">{filteredBookings.length}</p>
                            <p className="text-sm mt-1">Total Bookings</p>
                        </div>

                        <div>
                            <p className="text-3xl font-bold">
                                {filteredBookings.reduce((sum, b) => sum + b.seats, 0)}
                            </p>
                            <p className="text-sm mt-1">Total Guests</p>
                        </div>

                        <div>
                            <p className="text-3xl font-bold">{filteredBookings.length}</p>
                            <p className="text-sm mt-1">Confirmed</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ViewBookings;
