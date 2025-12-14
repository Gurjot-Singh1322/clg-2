import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Plus, Trash2, ArrowLeft, Percent } from "lucide-react";
import { 
  getDiscounts, 
  addDiscount, 
  deleteDiscount 
} from "../utils/api";

const ManageDiscounts = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [discounts, setDiscounts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    type: "flat",
    value: "",
    category: "Starters",
    description: "",
    validOn: []
  });

  const categories = ["Starters", "Main Course", "Breads", "Beverages", "Desserts"];
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // ---------------------------
  // FETCH DISCOUNTS FROM API
  // ---------------------------
  const loadDiscounts = async () => {
    try {
      const res = await getDiscounts();
      if (res.success) {
        setDiscounts(res.discounts);
      }
    } catch (err) {
      console.error("Failed to load discounts:", err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    } else {
      loadDiscounts();
    }
  }, [isAuthenticated, navigate]);

  // ---------------------------
  // INPUT HANDLERS
  // ---------------------------
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      validOn: prev.validOn.includes(day)
        ? prev.validOn.filter((d) => d !== day)
        : [...prev.validOn, day]
    }));
  };

  // ---------------------------
  // SUBMIT DISCOUNT
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDiscount = {
      ...formData,
      value: Number(formData.value)
    };

    try {
      const res = await addDiscount(newDiscount);
      if (res.success) {
        loadDiscounts(); // refresh list
        resetForm();
      }
    } catch (err) {
      console.error("Failed to add discount:", err);
    }
  };

  // ---------------------------
  // DELETE DISCOUNT
  // ---------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this discount?")) return;

    try {
      const res = await deleteDiscount(id);
      if (res.success) {
        loadDiscounts(); // refresh list
      }
    } catch (err) {
      console.error("Failed to delete discount:", err);
    }
  };

  // ---------------------------
  // RESET FORM
  // ---------------------------
  const resetForm = () => {
    setFormData({
      type: "flat",
      value: "",
      category: "Starters",
      description: "",
      validOn: []
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#f7ebe8] py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center space-x-2 text-[#6b4f4f] hover:text-[#d4a017] mb-2"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-[#3e2c2c]">
              Manage Discounts
            </h1>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-[#d4a017] text-[#3e2c2c] px-6 py-3 rounded-lg font-bold 
              hover:bg-[#3e2c2c] hover:text-[#d4a017] transition-all"
          >
            <Plus size={20} />
            <span>Add Discount</span>
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-[#3e2c2c] mb-4">Add New Discount</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Type */}
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 rounded-lg border-[#6b4f4f]"
              >
                <option value="flat">Flat Discount (%)</option>
                <option value="category">Category-Based Discount</option>
                <option value="day">Day-Based Discount</option>
              </select>

              {/* Value */}
              <input
                type="number"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                placeholder="Discount %"
                required
                min="1"
                max="100"
                className="w-full px-4 py-3 border-2 rounded-lg border-[#6b4f4f]"
              />

              {/* Category */}
              {formData.type === "category" && (
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg border-[#6b4f4f]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              )}

              {/* Days */}
              {(formData.type === "day" || formData.type === "flat") && (
                <div>
                  <p className="text-[#3e2c2c] font-semibold mb-2">Valid On:</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {daysOfWeek.map((day) => (
                      <button
                        type="button"
                        key={day}
                        onClick={() => handleDayToggle(day)}
                        className={`px-4 py-2 rounded-lg 
                        ${formData.validOn.includes(day)
                          ? "bg-[#d4a017] text-[#3e2c2c]"
                          : "bg-gray-200 text-gray-700"}
                        `}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Description"
                required
                className="w-full px-4 py-3 border-2 rounded-lg border-[#6b4f4f]"
              />

              {/* Buttons */}
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#d4a017] text-[#3e2c2c] py-3 rounded-lg font-bold"
                >
                  Add Discount
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* LIST OF DISCOUNTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {discounts.map((discount) => (
            <div key={discount._id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#d4a017] p-3 rounded-lg">
                    <Percent size={24} className="text-[#3e2c2c]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#3e2c2c]">
                      {discount.value}% OFF
                    </h3>
                    <span className="text-sm text-[#6b4f4f]">{discount.type}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(discount._id)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <p className="text-[#6b4f4f] mt-3">{discount.description}</p>

              {discount.category && (
                <p className="text-sm text-[#3e2c2c] mt-2">
                  <strong>Category:</strong> {discount.category}
                </p>
              )}

              {discount.validOn?.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-semibold text-[#3e2c2c] mb-1">Valid On:</p>
                  <div className="flex flex-wrap gap-2">
                    {discount.validOn.map((day) => (
                      <span key={day} className="px-2 py-1 bg-[#f7ebe8] rounded text-xs text-[#3e2c2c]">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {discounts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <p className="text-lg text-[#6b4f4f]">No discounts available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageDiscounts;
