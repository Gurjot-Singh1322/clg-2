import React from 'react';
import { Award, Heart, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Customers' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Heart, value: '100+', label: 'Traditional Recipes' },
    { icon: Clock, value: '7 Days', label: 'Open Weekly' }
  ];

  const values = [
    {
      title: 'Authenticity',
      description: 'We use traditional recipes passed down through generations, ensuring every dish tastes like home.',
      icon: Award
    },
    {
      title: 'Quality',
      description: 'Only the finest ingredients make it to your plate. We source fresh produce daily.',
      icon: Heart
    },
    {
      title: 'Hospitality',
      description: 'Experience the warmth of Punjabi hospitality where every guest is treated like family.',
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7ebe8]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#3e2c2c] via-[#6b4f4f] to-[#3e2c2c] text-[#f7ebe8] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-poppins">
            About <span className="text-[#d4a017]">Sardaar Ji Café</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            A journey of flavors, tradition, and Punjabi hospitality since 2010
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-4xl font-bold text-[#3e2c2c] mb-6 font-poppins text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-[#6b4f4f] text-lg leading-relaxed">
              <p>
                Founded in 2010 by Sardar Harpreet Singh, Sardaar Ji Café began as a small family-run 
                restaurant with a simple mission: to bring the authentic taste of Punjab to food lovers 
                in the heart of Delhi. What started as a humble eatery has now become a beloved destination 
                for those seeking traditional Punjabi cuisine.
              </p>
              <p>
                Our founder, who grew up in a small village in Punjab, learned the art of cooking from 
                his grandmother. Every recipe we serve carries the essence of those cherished family 
                gatherings where food was more than just sustenance—it was love, celebration, and tradition.
              </p>
              <p>
                Over the years, we've stayed true to our roots while embracing modern hospitality. Our 
                kitchen uses traditional cooking methods, time-honored spices, and the freshest ingredients 
                to create dishes that transport you straight to the vibrant streets and warm homes of Punjab.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#3e2c2c] to-[#6b4f4f]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-[#d4a017] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={32} className="text-[#3e2c2c]" />
                </div>
                <p className="text-4xl font-bold text-[#f7ebe8] mb-2">{stat.value}</p>
                <p className="text-[#f7ebe8] text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#3e2c2c] mb-12 font-poppins text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="bg-[#d4a017] w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <value.icon size={32} className="text-[#3e2c2c]" />
                </div>
                <h3 className="text-2xl font-bold text-[#3e2c2c] mb-4 font-poppins">
                  {value.title}
                </h3>
                <p className="text-[#6b4f4f] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef's Message Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#f7ebe8] rounded-xl shadow-lg p-8 md:p-12 border-l-4 border-[#d4a017]">
            <h2 className="text-3xl font-bold text-[#3e2c2c] mb-4 font-poppins">
              A Message from Our Founder
            </h2>
            <p className="text-[#6b4f4f] text-lg leading-relaxed italic mb-4">
              "Food is not just about filling your stomach; it's about nourishing your soul. 
              Every dish we prepare is crafted with the same love and care my grandmother taught 
              me. When you dine at Sardaar Ji Café, you're not just a customer—you're family."
            </p>
            <p className="text-[#3e2c2c] font-bold text-xl">
              —  Team Gurjot Singh, Harkaran Singh, Jashanpreet Singh 
            </p>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#d4a017] to-[#6b4f4f] text-[#f7ebe8]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 font-poppins">
            Experience the Taste of Punjab
          </h2>
          <p className="text-xl mb-8">
            Visit us today and discover why we're Delhi's favorite Punjabi café
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="inline-block bg-[#f7ebe8] text-[#3e2c2c] px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
            >
              View Our Menu
            </Link>
            <Link 
              to="/tablebook"
              className="inline-block bg-[#3e2c2c] text-[#f7ebe8] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#6b4f4f] hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

