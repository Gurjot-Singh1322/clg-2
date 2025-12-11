import React from 'react';

const MenuCard = ({ name, price, category, image, discount }) => {
  const discountedPrice = discount ? (price * (1 - discount / 100)).toFixed(2) : null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image */}
      <div className="h-48 bg-[#6b4f4f] overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#f7ebe8]">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-semibold text-[#6b4f4f] uppercase tracking-wide">{category}</span>
        </div>
        <h3 className="text-lg font-bold text-[#3e2c2c] mb-2 font-montserrat">{name}</h3>
        <div className="flex items-center justify-between">
          <div>
            {discountedPrice ? (
              <div>
                <span className="text-lg font-bold text-[#d4a017]">${discountedPrice}</span>
                <span className="text-sm text-gray-500 line-through ml-2">${price.toFixed(2)}</span>
                <span className="ml-2 text-xs bg-[#d4a017] text-white px-2 py-1 rounded-full">{discount}% OFF</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-[#3e2c2c]">${price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;