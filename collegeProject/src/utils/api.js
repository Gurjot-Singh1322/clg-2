export const getMenu = async () => {
  return [
    {
      id: 1,
      name: "Margherita Pizza",
      price: 299,
      category: "Pizza",
      image: "https://imgs.search.brave.com/hbcHq4l50hWA6YzbElxFo26jh8h-GIV6FC8GxMAKYqk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ1/NDQ3NTUwMS9waG90/by9zZXJ2aW5nLXBp/enphLXdpdGgtYS1n/bGFzcy1vZi1yZWQt/d2luZS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9WW82QTBa/RW81cm9FUktZcy1s/N3lXUUh2VlRkMkF1/Z19YSGQ0X2JNMmJZ/ND0"
    },
    {
      id: 2,
      name: "Chocolate Shake",
      price: 150,
      category: "Beverage",
      image: "https://imgs.search.brave.com/rq2q69D-Deec9aBJtTDiSH6KGBnGWm5T4_wouHRekic/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2hhcm1pc3Bhc3Np/b25zLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxMi8wNy9j/aG9jb2xhdGUtbWls/a3NoYWtlLXN0ZXAx/MC5qcGc"
    },
    {
      id: 3,
      name: "Pasta Alfredo",
      price: 349,
      category: "Pasta",
      image: "https://i.pinimg.com/736x/04/f4/9e/04f49ee67da37e9632d74daf3aa8b0e8.jpg"
    },
    {
      id: 4,
      name: "Veg Pizza",
      price: 349,
      category: "Pizza",
      image: "https://i.pinimg.com/1200x/48/46/63/4846631505e7980bc256bb4938027372.jpg"
    },
    {
      id: 5,
      name: "Chai",
      price: 349,
      category: "Beverage",
      image: "https://i.pinimg.com/736x/1a/ad/74/1aad744890154a9ce05ab8445f9a132f.jpg"
    },
    {
      id: 6,
      name: "Pasta Penne",
      price: 360,
      category: "Pasta",
      image: "https://i.pinimg.com/1200x/d4/af/ae/d4afaea8a8793de367d324501f016638.jpg"
    },
    {
      id: 7,
      name: "Hot Coffee",
      price: 200,
      category: "Beverage",
      image: "https://i.pinimg.com/736x/ae/80/26/ae8026473870d2202838a03cbb23cb32.jpg"
    },
  ];
};

export const getTodayDiscount = async () => {
  return {
    type: "flat",      // options: "flat" or "category"
    percentage: 20,    // 20% off
    category: null     // if type == "category", specify category name
  };
};


// Temporary Fake Backend using localStorage

export function getAvailableSlots(date) {
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  const allSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM", "6:00 PM",
    "7:00 PM", "8:00 PM", "9:00 PM"
  ];

  const bookedSlots = bookings
    .filter(b => b.date === date)
    .map(b => b.slot);

  return allSlots.filter(slot => !bookedSlots.includes(slot));
}

export function createBooking(data) {
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  // Check already booked
  const exists = bookings.some(
    (b) => b.date === data.date && b.slot === data.slot
  );
  if (exists) {
    return { success: false, message: "This slot is already booked!" };
  }

  const newBooking = {
    ...data,
    id: Date.now()
  };

  bookings.push(newBooking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  return { success: true, id: newBooking.id };
}
