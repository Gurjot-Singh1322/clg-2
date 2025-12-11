import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram , X } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#3e2c2c] text-[#f7ebe8] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold text-[#d4a017] mb-4 font-poppins">
              Sardaar Ji Café
            </h3>
            <p className="text-sm leading-relaxed">
              Experience authentic Punjabi cuisine in a warm and welcoming atmosphere.
              Where tradition meets taste!
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold text-[#d4a017] mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="text-[#d4a017] mt-1 flex-shrink-0" />
                <span className="text-sm">Shop No. 168, Civil Lines, Ludhiana 141001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} className="text-[#d4a017] flex-shrink-0" />
                <span className="text-sm">+91 89689 52688</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-[#d4a017] flex-shrink-0" />
                <span className="text-sm">info@sardaarjicafe.com</span>
              </div>
            </div>
          </div>

          {/* Social & Admin Section */}
          <div>
            <h4 className="text-lg font-semibold text-[#d4a017] mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="p-2 bg-[#6b4f4f] rounded-lg hover:bg-[#d4a017] hover:text-[#3e2c2c] transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#6b4f4f] rounded-lg hover:bg-[#d4a017] hover:text-[#3e2c2c] transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#6b4f4f] rounded-lg hover:bg-[#d4a017] hover:text-[#3e2c2c] transition-all duration-300"
              >
                <X size={20} />
              </a>
            </div>
            <Link to="/admin/login" className="inline-block text-sm text-[#d4a017] hover:underline" >
              Admin Login
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[#6b4f4f] text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Sardaar Ji Café. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;