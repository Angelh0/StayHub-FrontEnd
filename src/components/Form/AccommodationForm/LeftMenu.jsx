import React from "react";

const LeftMenu = ({ stepMenu, step }) => {
  return (
    <div className="hidden md:flex flex-col w-1/4 space-y-2">
      {stepMenu.map((item, index) => {
        const isActive = step === index + 1;

        return (
          <button
            key={index}
            disabled={true}
            className={`text-left p-4 rounded-lg font-bold border-l-4 transition-all duration-300 ${
              isActive
                ? "bg-gray-900 border-yellow-400 shadow-lg text-white"
                : "border-transparent text-gray-600/50 cursor-default bg-transparent"
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