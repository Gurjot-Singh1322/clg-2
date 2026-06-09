import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingEmail = async ({
  to,
  name,
  bookingId,
  date,
  slot,
  seats,
  items,
}) => {

  const menuText =
    items?.length > 0
      ? items.map(i => `${i.name} x ${i.quantity}`).join("\n")
      : "No menu selected";

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Booking Confirmed - Sardaar Ji Café",

    text: `
Hello ${name},

Your booking is confirmed!

Booking ID: ${bookingId}
Date: ${date}
Time: ${slot}
Seats: ${seats}

Menu:
${menuText}
    `,
  });
};