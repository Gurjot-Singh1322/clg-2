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
import Dashboard from './pages/Dashboard'
import BookingConfirmed from './Components/BookingConfirmed'
import ViewBookings from './pages/ViewBookings'
import ViewFeedback from './pages/ViewFeedback'
import ManageMenu from './pages/ManageMenu'
import ManageDiscounts from './pages/ManageDiscounts'
import CancelBooking from "./pages/CancelBooking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/tablebook' element={
          <ProtectedRoute>
            <TableBook />
            </ProtectedRoute>
            } />
        <Route path='/feedback' element={
            <ProtectedRoute>
            <Feedback />
            </ProtectedRoute>
            } />
        <Route path='/about' element={<About />} />
        <Route path="/booking-confirmed/:bookingId" element={<BookingConfirmed />} />



        <Route path='/admin/dashboard' element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/view-bookings" element={<AdminRoute><ViewBookings /></AdminRoute>} />
        <Route path="/admin/view-feedback" element={<AdminRoute><ViewFeedback /></AdminRoute>} /> 
       <Route path="/admin/manage-menu" element={ <AdminRoute><ManageMenu /></AdminRoute>} />
         <Route path="/admin/manage-discounts" element={<AdminRoute><ManageDiscounts /></AdminRoute>}/> 

        <Route path="/cancel-booking" element={<CancelBooking />} />
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />   
      </Routes>
      <Footer />
    </div>

  )
}

export default App
