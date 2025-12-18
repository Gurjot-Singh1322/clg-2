import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SlotSelector from '../Components/SlotSelector';
import { getAvailableSlots, createBooking } from '../utils/api';



const TableBook = () => {

  const allTimeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    slot: '',
    seats: 1
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: today }));
  }, []);

  useEffect(() => {
    if (formData.date) {
      fetchSlots();
    }
  }, [formData.date]);

  const fetchSlots = async () => {
  try {
    const result = await getAvailableSlots(formData.date);

    // result is an OBJECT like { "09:00": 10, "10:00": 4 }
    setAvailableSlots(result); 
  } catch (error) {
    console.error("Error fetching slots:", error);
    setAvailableSlots({});
  }
};



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSlotSelect = (slot) => {
    setFormData({
      ...formData,
      slot
    });
    setError('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  setLoading(true);

  if (!formData.name || !formData.phone || !formData.date || !formData.slot || !formData.seats) {
    setError('Please fill in all fields');
    setLoading(false);
    return;
  }

  try {
    const response = await createBooking(formData);

        if (response.success && response.bookingId) {
      navigate(`/booking-confirmed/${response.bookingId}`, {
        state: {
          bookingId: response.bookingId,
          booking: response.booking
        }
      });
    } else {
      setError("Booking failed. Try again.");
    }


  } catch (error) {
    console.error(error);
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-[#f7ebe8] py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#3e2c2c] mb-8 font-montserrat">
          Book a Table
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#3e2c2c] mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-[#6b4f4f] rounded-xl focus:outline-none focus:border-[#d4a017] transition-all duration-300"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#3e2c2c] mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-[#6b4f4f] rounded-xl focus:outline-none focus:border-[#d4a017] transition-all duration-300"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-[#3e2c2c] mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full px-4 py-2 border-2 border-[#6b4f4f] rounded-xl focus:outline-none focus:border-[#d4a017] transition-all duration-300"
              />
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-sm font-medium text-[#3e2c2c] mb-2">
                Select Time Slot *
              </label>
             <SlotSelector
                slots={allTimeSlots}
                selectedSlot={formData.slot}
                onSelectSlot={handleSlotSelect}
                slotData={availableSlots}   // NEW LINE 
                seatsRequired={formData.seats}
              />


              {/* <SlotSelector
              slots={availableSlots}
              selectedSlot={formData.slot}
              onSelectSlot={handleSlotSelect}
              disabledSlots={availableSlots.filter(slot => !availableSlots.includes(slot))}
              /> */}

              {formData.slot && (
                <p className="mt-2 text-sm text-[#6b4f4f]">Selected: {formData.slot}</p>
              )}
            </div>

            {/* Seats */}
            <div>
              <label className="block text-sm font-medium text-[#3e2c2c] mb-2">
                Number of Seats *
              </label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                min="1"
                max="10"
                required
                className="w-full px-4 py-2 border-2 border-[#6b4f4f] rounded-xl focus:outline-none focus:border-[#d4a017] transition-all duration-300"
              />
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d4a017] text-white py-3 rounded-xl font-semibold hover:bg-[#b89015] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : 'Book Table'}
            </button>
            {/* <Link to="/cancel-booking" className="block text-center text-sm text-[#6b4f4f] hover:underline mt-4">
              Cancel Booking
            </Link> */}
            <Link
              to="/cancel-booking"
              className="block text-center mt-4 text-red-500 underline"
            >
              Cancel a Booking
            </Link>


          </form>
        </div>
      </div>
    </div>
  );
};

export default TableBook;

