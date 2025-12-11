import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#3e2c2c] text-[#f7ebe8] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold font-montserrat">Sardaar Ji Café</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-[#d4a017] transition-all duration-300 font-medium">
              Home
            </Link>
            <Link to="/menu" className="hover:text-[#d4a017] transition-all duration-300 font-medium">
              Menu
            </Link>
            <Link to="/tablebook" className="hover:text-[#d4a017] transition-all duration-300 font-medium">
              Book Table
            </Link>
            <Link to="/feedback" className="hover:text-[#d4a017] transition-all duration-300 font-medium">
              Feedback
            </Link>
            <Link to="/about" className="hover:text-[#d4a017] transition-all duration-300 font-medium">
              About Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#f7ebe8] hover:text-[#d4a017] transition-all duration-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block hover:text-[#d4a017] transition-all duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/menu"
              onClick={() => setIsOpen(false)}
              className="block hover:text-[#d4a017] transition-all duration-300 font-medium"
            >
              Menu
            </Link>
            <Link
              to="/tablebook"
              onClick={() => setIsOpen(false)}
              className="block hover:text-[#d4a017] transition-all duration-300 font-medium"
            >
              Book Table
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block hover:text-[#d4a017] transition-all duration-300 font-medium"
            >
              About Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

