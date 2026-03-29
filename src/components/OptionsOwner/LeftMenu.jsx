import React from "react";

const LeftMenu = ({ stepMenu, step, accommodationId, handleMenuClick }) => {
  return (
    <div className="hidden md:flex flex-col w-1/4 h-fit bg-black border border-gray-800 rounded-2xl p-2 shadow-2xl">
      {stepMenu.map((item, index) => {
        const isLocked = index > 0 && !accommodationId;
        const isActive = step === index + 1;
        
        const title = item.includes('. ') ? item.split('. ')[1] : item;

        return (
          <button
            key={index}
            onClick={() => handleMenuClick(index + 1)}
            disabled={isLocked}
            className={`text-left p-4 mb-1 rounded-xl font-bold border-l-4 transition-all duration-300 flex items-center gap-3 ${
              isActive
                ? `bg-gray-950 border-yellow-400 text-white`
                : isLocked
                ? `border-transparent text-gray-700 cursor-not-allowed opacity-40`
                : `border-transparent text-gray-400 hover:text-white hover:bg-gray-900 cursor-pointer`
            }`}
          >
            <span className={isActive ? "text-yellow-400" : "text-gray-600"}>
              {index + 1}.
            </span>
            <span>{title}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LeftMenu;