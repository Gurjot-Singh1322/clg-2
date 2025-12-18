import React, { useState, useEffect } from 'react';
import MenuCard from '../Components/MenuCard';
import { getMenu, getDiscounts } from '../utils/api';


const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [discounts, setDiscounts] = useState([]);


  // Fetch menu items from backend
  useEffect(() => {
  const loadData = async () => {
    try {
      const menuRes = await getMenu();       // GET /api/menu
      const discountRes = await getDiscounts(); // GET /api/discounts

      setMenuItems(menuRes);
      setFilteredItems(menuRes);

      setDiscounts(discountRes.discounts || []);
    } catch (err) {
      console.log("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);

const applyDiscount = (item) => {
  let finalPrice = item.price;
  let discountValue = 0;

  discounts.forEach(d => {
    if (d.type === "flat") {
      discountValue = Math.max(discountValue, d.value);
    }

    if (d.type === "category" && d.category === item.category) {
      discountValue = Math.max(discountValue, d.value);
    }

    if (d.type === "day") {
      const today = new Date().toLocaleString("en-US", { weekday: "long" });
      if (d.validOn.includes(today)) {
        discountValue = Math.max(discountValue, d.value);
      }
    }
  });

  // if (discountValue > 0) {
  //   finalPrice = item.price - (item.price * discountValue) / 100;
  // }

  return { finalPrice, discountValue };
};




  // Handle category filtering
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, menuItems]);

  // Generate category buttons dynamically
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#3e2c2c]">Loading menu...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7ebe8] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#3e2c2c] mb-8 font-montserrat">
          Our Menu
        </h1>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-2 rounded-xl font-medium transition-all duration-300
                ${selectedCategory === category
                  ? 'bg-[#d4a017] text-white shadow-lg'
                  : 'bg-white text-[#3e2c2c] hover:bg-[#6b4f4f] hover:text-white border-2 border-[#6b4f4f]'
                }
              `}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center text-xl text-[#3e2c2c] py-12">
            No items found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item) => {
            const { finalPrice, discountValue } = applyDiscount(item);

            return (
              <MenuCard
                key={item._id}
                name={item.name}
                price={finalPrice}
                originalPrice={item.price}
                discount={discountValue}
                image={item.image}
                category={item.category}
              />
            );
          })}

          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
