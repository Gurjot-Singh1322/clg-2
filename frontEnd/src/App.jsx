import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import TableBook from './pages/TableBook'
import About from './pages/About'
import Feedback from './pages/Feedback'
import './index.css'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import BookingConfirmed from './Components/BookingConfirmed'
import ViewBookings from './pages/ViewBookings'
import ViewFeedback from './pages/ViewFeedback'
import ManageMenu from './pages/ManageMenu'
import ManageDiscounts from './pages/ManageDiscounts'
import CancelBooking from "./pages/CancelBooking";


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/tablebook' element={<TableBook />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/about' element={<About />} />
        <Route path="/booking-confirmed/:bookingId" element={<BookingConfirmed />} />


        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/view-bookings" element={<ViewBookings />} />

         <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path="/admin/view-feedback" element={<ViewFeedback />} /> 
       <Route path="/admin/manage-menu" element={ <ManageMenu />} />
         <Route path="/admin/manage-discounts" element={<ManageDiscounts />}/> 

        <Route path="/cancel-booking" element={<CancelBooking />} />

      </Routes>
      <Footer />
    </div>

  )
}

export default App
