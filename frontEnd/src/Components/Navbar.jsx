import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useAuth(); // ✅ ONLY SOURCE

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#3e2c2c] text-[#f7ebe8] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            Sardaar Ji Café
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/tablebook">Book Table</Link>
            <Link to="/feedback">Feedback</Link>
            <Link to="/about">About</Link>

            {user ? (
              <>
                <span>Hi, {user.name}</span>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}

            {user?.role === "admin" && (
              <Link to="/admin/dashboard">Admin Panel</Link>
            )}
          </div>

          {/* Mobile Button */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#f7ebe8] hover:text-[#d4a017]">
            ☰
          </button>
        </div>

        {/* Mobile */}
        {isOpen && (
          <div className="md:hidden space-y-3">
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/tablebook">Book Table</Link>
            <Link to="/feedback">Feedback</Link>

            {user ? (
              <>
                <p>Hi, {user.name}</p>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;