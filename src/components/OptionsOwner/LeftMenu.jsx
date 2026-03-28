import React from "react";

const LeftMenu = ({ stepMenu, step, accommodationId, handleMenuClick }) => {
  return (
    <div className="hidden md:flex flex-col w-1/4 space-y-2">
      {stepMenu.map((item, index) => {
        const isLocked = index > 0 && !accommodationId;
        const isActive = step === index + 1;

        return (
          <button
            key={index}
            onClick={() => handleMenuClick(index + 1)}
            disabled={isLocked}
            className={`text-left p-4 rounded-lg font-bold border-l-4 transition-all duration-300 ${
              isActive
                ? `bg-gray-900 border-yellow-400 shadow-lg text-white`
                : isLocked
                ? `border-transparent text-gray-600/50 cursor-not-allowed bg-transparent`
                : `border-transparent text-gray-400 hover:text-white hover:bg-gray-900 cursor-pointer`
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default LeftMenu;