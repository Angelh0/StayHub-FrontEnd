import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OwnerBanner = () => {
   const navigate = useNavigate(); 
  return (
    <div className="w-full bg-white py-20 px-6 md:px-12 font-sans">
        <div className="translate-y-0 hover:-translate-y-1 duration-500 max-w-7xl mx-auto flex flex-col items-center md:flex-row text-center rounded-2xl mb-16 justify-between  overflow-hidden relative p-10 bg-black gap-10 md:p-16">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r bg-black from-blue-900/20 to-transparent pointer-events-none"></div>

            <div className="max-w-2xl text-center md:text-left z-10">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-serif">¿Tienes un alojamiento?</h2>
                <p className="text-gray-400 text-base md-text-lg leading-relaxed">Unete a la comunidad de propietarios de StayHub y comienza a generar ingresos</p>
            </div>

            <div className="z-10 shrink">
                <button onClick={() => navigate("/OwnerContainer")} className="bg-yellow-400 font-bold py-4 px-8 rounded-2xl hover:scale-[1.08] cursor-pointer duration-500">
                Publica tu alojamiento</button>
            </div>
        </div>
        
    </div>
  );
};

export default OwnerBanner;
