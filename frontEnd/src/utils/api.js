const BASE_URL = "http://localhost:5000/api";
const API_URL = "http://localhost:5000/api";

// -------------------------------
// MENU API
// -------------------------------

// GET ALL MENU ITEMS
export const getMenu = async () => {
  const res = await fetch(`${BASE_URL}/menu`);
  return res.json();
};

// ADD NEW MENU ITEM
export const addMenuItem = async (itemData) => {
  const res = await fetch(`${BASE_URL}/menu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });
  return res.json();
};

// UPDATE MENU ITEM
export const updateMenuItem = async (id, itemData) => {
  const res = await fetch(`${BASE_URL}/menu/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });
  return res.json();
};

// DELETE MENU ITEM
export const deleteMenuItem = async (id) => {
  const res = await fetch(`${BASE_URL}/menu/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

// -------------------------------
// BOOKING API
// -------------------------------


// ---- Get Available Slots ----
export const getAvailableSlots = async (date) => {
  const res = await fetch(`${API_URL}/bookings/slots?date=${date}`);
  return res.json(); // returns [{slot, remainingSeats}]
};


// ---- Create New Booking ----
export const createBooking = async (data) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

// Delete Booking (Admin)
export const deleteBooking = async (id) => {
  const res = await fetch(`${API_URL}/bookings/${id}`, {
    method: "DELETE",
  });
  return res.json();
};


// -------------------------------
// FEEDBACK API
// -------------------------------

// SUBMIT FEEDBACK
export const submitFeedback = async (data) => {
  const res = await fetch(`${BASE_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// GET FEEDBACK (Admin)
export const getFeedbackList = async () => {
  const res = await fetch(`${BASE_URL}/feedback`);
  return res.json();
};

//Delete Feedback (Admin)
export const deleteFeedback = async (id) => {
  const res = await fetch(`${BASE_URL}/feedback/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

// -------------------------------
// ADMIN LOGIN
// -------------------------------

export const adminLogin = async (username, password) => {
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};


// DISCOUNTS API
export const getDiscounts = async () => {
  const res = await fetch(`${API_URL}/discounts`);
  return res.json();
};

export const addDiscount = async (data) => {
  const res = await fetch(`${API_URL}/discounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteDiscount = async (id) => {
  const res = await fetch(`${API_URL}/discounts/${id}`, {
    method: "DELETE"
  });
  return res.json();
};

// CANCEL BOOKING (Customer)
export const cancelBookingByCustomer = async (bookingId, phone) => {
  const res = await fetch(`${API_URL}/cancel-booking`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ bookingId, phone })
  });

  return res.json();
};






