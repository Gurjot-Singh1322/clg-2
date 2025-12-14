import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../utils/api";

import { Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";

const ManageMenu = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const categories = [
    "Starters",
    "Main Course",
    "Breads",
    "Beverages",
    "Desserts",
  ];

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Starters",
    image: "",
    discount: 0,
  });

  // ---------------------------
  //  FETCH MENU FROM DATABASE
  // ---------------------------
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
      return;
    }
    fetchMenuItems();
  }, [isAuthenticated]);

  const fetchMenuItems = async () => {
    try {
      const data = await getMenu();
      setMenuItems(data);
    } catch (error) {
      console.error("Error loading menu:", error);
    }
  };

  // ---------------------------
  //  HANDLE FORM INPUT
  // ---------------------------
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------------------
  //  ADD / UPDATE ITEM
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      price: Number(formData.price),
      discount: Number(formData.discount),
    };

    try {
      if (editingItem) {
        // UPDATE
        await updateMenuItem(editingItem._id, formattedData);
      } else {
        // CREATE
        await addMenuItem(formattedData);
      }

      fetchMenuItems(); // refresh list
      resetForm();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  // ---------------------------
  //  EDIT ITEM
  // ---------------------------
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      discount: item.discount || 0,
    });
    setShowForm(true);
  };

  // ---------------------------
  //  DELETE ITEM
  // ---------------------------
  const handleDeleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteMenuItem(id);
      fetchMenuItems();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ---------------------------
  //  RESET FORM
  // ---------------------------
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "Starters",
      image: "",
      discount: 0,
    });
    setEditingItem(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#f7ebe8] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center space-x-2 text-[#6b4f4f] hover:text-[#d4a017]"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>

            <h1 className="text-3xl font-bold text-[#3e2c2c] font-poppins">
              Manage Menu
            </h1>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-[#d4a017] text-[#3e2c2c] px-6 py-3 rounded-lg font-bold hover:bg-[#3e2c2c] hover:text-[#d4a017]"
          >
            <Plus size={20} />
            <span>{showForm ? "Close" : "Add New Item"}</span>
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#3e2c2c]">
              {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Item Name"
                required
                className="px-4 py-3 rounded-lg border-2 border-[#6b4f4f]"
              />

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price"
                required
                className="px-4 py-3 rounded-lg border-2 border-[#6b4f4f]"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="px-4 py-3 rounded-lg border-2 border-[#6b4f4f]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                placeholder="Discount (%)"
                className="px-4 py-3 rounded-lg border-2 border-[#6b4f4f]"
              />

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                required
                className="px-4 py-3 rounded-lg border-2 border-[#6b4f4f] md:col-span-2"
              />

              <div className="md:col-span-2 flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#d4a017] text-[#3e2c2c] py-3 rounded-lg font-bold"
                >
                  {editingItem ? "Update Item" : "Add Item"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-300 rounded-lg font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MENU TABLE */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#3e2c2c] text-[#f7ebe8]">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Discount</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {menuItems.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="px-6 py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 font-bold">{item.name}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">₹{item.price}</td>
                    <td className="px-6 py-4 text-[#d4a017]">
                      {item.discount || 0}%
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 bg-blue-500 text-white rounded-lg"
                        >
                          <Edit2 size={18} />
                        </button>

                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          className="p-2 bg-red-500 text-white rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {menuItems.length === 0 && (
              <p className="text-center py-6 text-[#6b4f4f]">
                No menu items found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMenu;
