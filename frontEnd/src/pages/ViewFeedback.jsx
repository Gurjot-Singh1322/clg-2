import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getFeedbackList, deleteFeedback } from "../utils/api";
import { ArrowLeft, Star, Mail, Calendar, Trash2 } from "lucide-react";

const ViewFeedback = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [filterRating, setFilterRating] = useState(0);

  // ---------------------------
  // LOAD FEEDBACK FROM BACKEND
  // ---------------------------
  const loadFeedback = async () => {
    try {
      const res = await getFeedbackList();
      if (res.success) {
        // Sort newest → oldest
        const sorted = res.feedback.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setFeedbackList(sorted);
        setFilteredFeedback(sorted);
      }
    } catch (err) {
      console.error("Error loading feedback:", err);
    }
  };

  useEffect(() => {
  const loadFeedback = async () => {
    try {
      const res = await getFeedbackList();
      if (res.success) {
        setFeedbackList(res.feedback);
        setFilteredFeedback(res.feedback);
      }
    } catch (err) {
      console.error("Error loading feedback:", err);
    }
  };

  loadFeedback();
}, []);

//Delete Feedback



  // ---------------------------
  // FILTER FEEDBACK BY RATING
  // ---------------------------
  useEffect(() => {
    if (filterRating > 0) {
      setFilteredFeedback(
        feedbackList.filter((fb) => fb.rating === filterRating)
      );
    } else {
      setFilteredFeedback(feedbackList);
    }
  }, [filterRating, feedbackList]);

  // ---------------------------
  // DELETE FEEDBACK
  // ---------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;

    const res = await deleteFeedback(id);

    if (res.success) {
      setFeedbackList((prev) => prev.filter((fb) => fb._id !== id));
      setFilteredFeedback((prev) => prev.filter((fb) => fb._id !== id));
    }
  };

  // ---------------------------
  // RENDER STAR RATING
  // ---------------------------
  const renderStars = (rating) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          className={
            star <= rating ? "fill-[#d4a017] text-[#d4a017]" : "text-gray-300"
          }
        />
      ))}
    </div>
  );

  // ---------------------------
  // CALCULATE AVG RATING
  // ---------------------------
  const averageRating =
    feedbackList.length > 0
      ? (
          feedbackList.reduce((sum, fb) => sum + fb.rating, 0) /
          feedbackList.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-[#f7ebe8] py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center space-x-2 text-[#6b4f4f] hover:text-[#d4a017] mb-2 transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-[#3e2c2c] font-poppins">
            Customer Feedback
          </h1>
        </div>

        {/* Stats Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#d4a017] to-[#6b4f4f] text-white rounded-xl p-6 shadow-lg">
            <p className="text-4xl font-bold mb-2">{feedbackList.length}</p>
            <p className="text-sm">Total Reviews</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-xl p-6 shadow-lg">
            <p className="text-4xl font-bold mb-2">{averageRating}</p>
            <p className="text-sm">Average Rating</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-6 shadow-lg">
            <p className="text-4xl font-bold mb-2">
              {feedbackList.filter((fb) => fb.rating === 5).length}
            </p>
            <p className="text-sm">5-Star Reviews</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <label className="flex items-center space-x-2 text-[#3e2c2c] font-semibold">
              <Star size={20} className="text-[#d4a017]" />
              <span>Filter by Rating:</span>
            </label>

            <div className="flex space-x-2">
              <button
                onClick={() => setFilterRating(0)}
                className={`px-4 py-2 rounded-lg ${
                  filterRating === 0
                    ? "bg-[#d4a017] text-[#3e2c2c]"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                All
              </button>

              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilterRating(rating)}
                  className={`px-4 py-2 rounded-lg ${
                    filterRating === rating
                      ? "bg-[#d4a017] text-[#3e2c2c]"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {rating} ★
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="space-y-6">
          {filteredFeedback.map((fb) => (
            <div
              key={fb._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">

                {/* User details */}
                <div>
                  <h3 className="text-xl font-bold text-[#3e2c2c] mb-2">
                    {fb.name}
                  </h3>

                  <div className="flex items-center space-x-2 text-[#6b4f4f]">
                    <Mail size={16} />
                    <span>{fb.email}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-[#6b4f4f] mt-1">
                    <Calendar size={16} />
                    <span>{new Date(fb.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Stars */}
                {renderStars(fb.rating)}
              </div>

              {/* Feedback Message */}
              <div className="bg-[#f7ebe8] rounded-lg p-4 mb-4">
                <p className="text-[#3e2c2c] leading-relaxed">{fb.message}</p>
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(fb._id)}
                className="flex items-center space-x-2 text-red-600 hover:text-red-800 font-semibold"
              >
                <Trash2 size={18} />
                <span>Delete Feedback</span>
              </button>
            </div>
          ))}
        </div>

        {filteredFeedback.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg mt-6">
            <p className="text-lg text-[#6b4f4f]">
              No feedback found for this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewFeedback;
