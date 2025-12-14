import React from "react";

const SlotSelector = ({ slots = [], selectedSlot, onSelectSlot, slotData = {}, seatsRequired }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {slots.map((slot) => {
        const seatsLeft = slotData[slot] ?? 10;  // default fallback
        const isDisabled = seatsLeft < seatsRequired;
        const isSelected = selectedSlot === slot;

        return (
          <div key={slot} className="flex flex-col items-center">
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelectSlot(slot)}
              className={`
                px-4 py-2 rounded-xl font-medium transition-all duration-300
                ${
                  isSelected
                    ? "bg-[#d4a017] text-white shadow-lg scale-105"
                    : isDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#f7ebe8] text-[#3e2c2c] hover:bg-[#6b4f4f] hover:text-white border-2 border-[#6b4f4f]"
                }
              `}
            >
              {slot}
            </button>

            {/* Seats Left Display */}
            <p className="text-xs text-[#3e2c2c] mt-1">
              Seats left: {seatsLeft}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SlotSelector;
