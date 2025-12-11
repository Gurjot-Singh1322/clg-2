import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UtensilsCrossed, Percent, Calendar, MessageCircle, LogOut } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

//   React.useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/admin');
//     }
//   }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const adminMenuItems = [
    {
      title: 'Manage Menu',
      description: 'Add, edit, or delete menu items',
      icon: UtensilsCrossed,
      path: '/admin/manage-menu',
      color: 'from-[#d4a017] to-[#6b4f4f]'
    },
    {
      title: 'Manage Discounts',
      description: 'Create and manage discount offers',
      icon: Percent,
      path: '/admin/manage-discounts',
      color: 'from-green-500 to-green-700'
    },
    {
      title: 'View Bookings',
      description: 'See all table reservations',
      icon: Calendar,
      path: '/admin/view-bookings',
      color: 'from-blue-500 to-blue-700'
    },
    {
      title: 'View Feedback',
      description: 'Read customer reviews and ratings',
      icon: MessageCircle,
      path: '/admin/view-feedback',
      color: 'from-purple-500 to-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7ebe8]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3e2c2c] to-[#6b4f4f] text-[#f7ebe8] py-8 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-poppins">Admin Dashboard</h1>
            <p className="text-lg mt-2">Sardaar Ji Café Management</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Dashboard Menu */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="group"
            >
              <div className={`bg-gradient-to-br ${item.color} rounded-xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300`}>
                <div className="flex items-start space-x-4">
                  <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                    <item.icon size={32} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 font-poppins">
                      {item.title}
                    </h2>
                    <p className="text-white text-opacity-90">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;