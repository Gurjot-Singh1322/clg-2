import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTodayDiscount } from '../utils/api';

const Home = () => {
  const [discount, setDiscount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const data = await getTodayDiscount();
        setDiscount(data);
      } catch (error) {
        console.error('Error fetching discount:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDiscount();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-linear-to-r from-[#3e2c2c] to-[#6b4f4f]">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-[#f7ebe8] mb-6 font-montserrat">
            Welcome to{' '}
            <span className="text-[#d4a017]">Sardaar Ji Café</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#f7ebe8] mb-8 max-w-2xl mx-auto">
            Experience authentic flavors and warm hospitality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="bg-[#d4a017] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#b89015] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Menu
            </Link>
            <Link
              to="/tablebook"
              className="bg-transparent border-2 border-[#d4a017] text-[#d4a017] px-8 py-3 rounded-xl font-semibold hover:bg-[#d4a017] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-[#3e2c2c] mb-12 font-poppins">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className=" text-center bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="bg-[#f7ebe8] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[#d4a017]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#3e2c2c] mb-2 font-montserrat">Premium Quality</h3>
              <p className="text-gray-600">Fresh ingredients and authentic recipes</p>
            </div>
            <div className=" text-center bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="bg-[#f7ebe8] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[#d4a017]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#3e2c2c] mb-2 font-montserrat">Quick Service</h3>
              <p className="text-gray-600">Fast and efficient service guaranteed</p>
            </div>
            <div className=" text-center bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="bg-[#f7ebe8] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[#d4a017]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#3e2c2c] mb-2 font-montserrat">Best Prices</h3>
              <p className="text-gray-600">Affordable prices with great value</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#3e2c2c] text-[#f7ebe8] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">
            Ready to Experience the Best?
          </h2>
          <p className="text-lg mb-8">
            Visit us today or book your table in advance to avoid waiting
          </p>
          <Link
            to="/tablebook"
            className="inline-block bg-[#d4a017] text-[#3e2c2c] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#f7ebe8] hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Book Now
          </Link>
        </div>
      </section>
      
    </div>
  );
};

export default Home;