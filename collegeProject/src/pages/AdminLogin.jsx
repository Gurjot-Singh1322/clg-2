import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, LogIn } from 'lucide-react';
import { login } from '../utils/auth';


const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulate API call - Mock authentication
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        const mockToken = 'mock-jwt-token-' + Date.now();
        login(mockToken);
        navigate('/admin/dashboard');

        // login(mockToken);
        // navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
      }
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3e2c2c] via-[#6b4f4f] to-[#3e2c2c] flex items-center justify-center py-12 px-4">
      <div className="bg-[#f7ebe8] rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-[#d4a017] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-[#3e2c2c]" />
          </div>
          <h1 className="text-3xl font-bold text-[#3e2c2c] font-poppins">
            Admin Login
          </h1>
          <p className="text-[#6b4f4f] mt-2">Sardaar Ji Café</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="flex items-center space-x-2 text-[#3e2c2c] font-semibold mb-2">
              <User size={20} className="text-[#d4a017]" />
              <span>Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              required
              placeholder="Enter username"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#6b4f4f] focus:border-[#d4a017] focus:outline-none transition-all duration-300 bg-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center space-x-2 text-[#3e2c2c] font-semibold mb-2">
              <Lock size={20} className="text-[#d4a017]" />
              <span>Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#6b4f4f] focus:border-[#d4a017] focus:outline-none transition-all duration-300 bg-white"
            />
          </div>

          {/* Demo Credentials Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              <strong>Demo Credentials:</strong><br />
              Username: admin<br />
              Password: admin123
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#d4a017] text-[#3e2c2c] py-4 rounded-lg font-bold text-lg hover:bg-[#3e2c2c] hover:text-[#d4a017] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <LogIn size={20} />
            <span>{isSubmitting ? 'Logging in...' : 'Login'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;