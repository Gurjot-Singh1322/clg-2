import React from 'react';

const SlotSelector = ({ slots = [], selectedSlot, onSelectSlot, disabledSlots = [] }) => {
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {timeSlots.map((slot) => {
        const isDisabled = disabledSlots.includes(slot);
        const isSelected = selectedSlot === slot;

        return (
          <button
            key={slot}
            type="button"
            onClick={() => !isDisabled && onSelectSlot(slot)}
            disabled={isDisabled}
            className={`
              px-4 py-2 rounded-xl font-medium transition-all duration-300
              ${isSelected
                ? 'bg-[#d4a017] text-white shadow-lg transform scale-105'
                : isDisabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#f7ebe8] text-[#3e2c2c] hover:bg-[#6b4f4f] hover:text-white border-2 border-[#6b4f4f]'
              }
            `}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
};

export default SlotSelector;

