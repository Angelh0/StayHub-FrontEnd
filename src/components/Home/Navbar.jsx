import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); 
  return (
    <nav className="w-full h-full flex items-center justify-between px-6 md:px-12 shadow-md">

      <div className="flex items-center cursor-pointer select-none">
        <h2 className="text-white uppercase text-2xl font-bold">St</h2>
        <MapPin size={19} className="text-yellow-400  drop-shadow-[0_0_8px_rgba(250,204,21,0.4)] strokeWidth={2}"/>
        <h2 className="text-white uppercase text-2xl font-bold">yHub</h2>
      </div>

      <div className="hidden lg:flex items-center gap-8 font-bold text-yellow-500 text-sm">
        <a href="#" className="hover:text-white transition-colors uppercase">Inicio</a>
        <a href="#" className="hover:text-white transition-colors uppercase">Reservar</a>
        <a href="#" className="hover:text-white transition-colors uppercase">Mis reservas</a>
      </div>

      <div className="flex items-center gap-6 ">
        <a href="#" className="text-yellow-500 font-bold hover:text-white transition-colors uppercase">¿Tienes un alojamiento?</a>
        <button type="button" onClick={() => navigate("/AccessContainer")} className="bg-black rounded-full border-2 cursor-pointer text-yellow-500 uppercase px-6 py-1 hover:text-blue-950 transition-colors hover:bg-yellow-500 hover:scale-[1.01] ">Acceder</button>

      </div>

    </nav>
  );
};

export default Navbar;
