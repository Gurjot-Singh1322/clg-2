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
    email: '',
    phone: '',
    date: '',
    slot: '',
    seats: 1
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: today }));
  }, []);

  useEffect(() => {
    if (formData.date) {
      fetchSlots();
    }
  }, [formData.date]);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/menu");
        const data = await res.json();
        setMenuItems(data);
      } catch (err) {
        console.error("Menu load error", err);
      }
    };

    loadMenu();
  }, []);

  const fetchSlots = async () => {
    try {
      const result = await getAvailableSlots(formData.date);

      // result is an OBJECT lidke { "09:00": 10, "10:00": 4 }
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

  const updateCart = (item, type) => {
    const existing = cart.find(i => i.itemId === item._id);

    if (existing) {
      if (type === "inc") {
        setCart(cart.map(i =>
          i.itemId === item._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ));
      } else {
        if (existing.quantity === 1) {
          setCart(cart.filter(i => i.itemId !== item._id));
        } else {
          setCart(cart.map(i =>
            i.itemId === item._id
              ? { ...i, quantity: i.quantity - 1 }
              : i
          ));
        }
      }
    } else {
      setCart([
        ...cart,
        {
          itemId: item._id,
          name: item.name,
          price: item.price,
          quantity: 1,
        },
      ]);
    }
  };

  const BOOKING_FEE = 50;
  const totalAmount = formData.seats * BOOKING_FEE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.name || !formData.phone || !formData.date || !formData.slot || !formData.seats) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      //Create Razorpay order
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const order = await res.json();

      if (!order.id) {
        setError("Order creation failed");
        return;
      }
      //Open Razorpay
      const options = {
        key: "rzp_test_Si53WOFtaYrtTn",
        currency: "INR",
        name: "Sardaar Ji Café",
        description: "Table Booking",
        order_id: order.id,

        prefill: {
          name: formData.name,
          contact: formData.phone,
          email: "test@gmail.com",

          method: {
            netbanking: true,
            card: false,
            upi: false,
            wallet: false
          },
        },

        handler: async function (response) {
          console.log("CART DATA:", cart);   // 🔥 ADD THIS

          //Save booking AFTER payment
          const bookingData = {
            ...formData,
            items: cart,
            amountPaid: totalAmount,
            paymentId: response.razorpay_payment_id,
          };
          console.log("BOOKING DATA:", bookingData); // 🔥 ADD THIS

          const result = await createBooking(bookingData);

          if (result.success && result.bookingId) {
            navigate(`/booking-confirmed/${result.bookingId}`, {
              state: {
                bookingId: result.bookingId,
                booking: result.booking
              }
            });
          } else {
            setError("Booking failed after payment.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      setError('Payment error. Try again.');
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
            <div>
              <label className="block text-sm font-medium text-[#3e2c2c] mb-2">
                Email *
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-[#6b4f4f] rounded-xl"
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

            <h2 className="text-xl font-bold mt-6 text-[#3e2c2c]">
              🍽️ Select Menu (Optional)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {menuItems.map((item) => {
                const existing = cart.find(i => i.itemId === item._id);

                return (
                  <div
                    key={item._id}
                    className="bg-[#fff8f5] border border-[#e6cfc7] rounded-xl p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-[#3e2c2c]">{item.name}</p>
                        <p className="text-sm text-[#6b4f4f]">₹{item.price}</p>
                      </div>

                      {!existing ? (
                        <button
                          type="button"
                          onClick={() => updateCart(item, "inc")}
                          className="bg-[#d4a017] text-white px-3 py-1 rounded-lg"
                        >
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => updateCart(item, "dec")}
                            className="bg-red-400 text-white px-2 rounded"
                          >
                            -
                          </button>

                          <span className="font-semibold">{existing.quantity}</span>

                          <button
                            type="button"
                            onClick={() => updateCart(item, "inc")}
                            className="bg-green-500 text-white px-2 rounded"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <h3 className="mt-4 font-semibold">Selected Items</h3>

            <div className="bg-[#fff8f5] rounded-xl p-4 mt-2">
              {cart.length === 0 ? (
                <p className="text-[#6b4f4f]">No items selected</p>
              ) : (
                cart.map((item) => (
                  <div key={item.itemId} className="flex justify-between py-1">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d4a017] text-white py-3 rounded-xl font-semibold hover:bg-[#b89015] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : `Pay ₹${totalAmount} & Book`}
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

