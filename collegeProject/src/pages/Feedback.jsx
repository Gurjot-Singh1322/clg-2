import React, { useState } from 'react';
import { User, Mail, MessageCircle, Star, CheckCircle } from 'lucide-react';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitSuccess(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleNewFeedback = () => {
    setFormData({ name: '', email: '', message: '' });
    setRating(0);
    setSubmitSuccess(false);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[#f7ebe8] flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-[#3e2c2c] mb-4 font-poppins">
            Thank You!
          </h2>
          <p className="text-[#6b4f4f] mb-6">
            Your feedback has been submitted successfully. We appreciate your time and input!
          </p>
          <button
            onClick={handleNewFeedback}
            className="w-full bg-[#d4a017] text-[#3e2c2c] py-3 rounded-lg font-bold hover:bg-[#3e2c2c] hover:text-[#d4a017] transition-all duration-300"
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7ebe8] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#3e2c2c] mb-2 font-poppins">
            Share Your Feedback
          </h1>
          <p className="text-[#6b4f4f] mb-8">
            We'd love to hear about your experience at Sardaar Ji Café
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="flex items-center space-x-2 text-[#3e2c2c] font-semibold mb-2">
                <User size={20} className="text-[#d4a017]" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#6b4f4f] focus:border-[#d4a017] focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center space-x-2 text-[#3e2c2c] font-semibold mb-2">
                <Mail size={20} className="text-[#d4a017]" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#6b4f4f] focus:border-[#d4a017] focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="flex items-center space-x-2 text-[#3e2c2c] font-semibold mb-3">
                <Star size={20} className="text-[#d4a017]" />
                <span>Rate Your Experience</span>
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform duration-200 hover:scale-110"
                  >
                    <Star
                      size={40}
                      className={`${
                        star <= (hoveredRating || rating)
                          ? 'fill-[#d4a017] text-[#d4a017]'
                          : 'text-gray-300'
                      } transition-colors duration-200`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center space-x-2 text-[#3e2c2c] font-semibold mb-2">
                <MessageCircle size={20} className="text-[#d4a017]" />
                <span>Your Message</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                placeholder="Tell us about your experience..."
                className="w-full px-4 py-3 rounded-lg border-2 border-[#6b4f4f] focus:border-[#d4a017] focus:outline-none transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#d4a017] text-[#3e2c2c] py-4 rounded-lg font-bold text-lg hover:bg-[#3e2c2c] hover:text-[#d4a017] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;