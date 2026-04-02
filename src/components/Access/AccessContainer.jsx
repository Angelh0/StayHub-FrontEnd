import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccesoInterior1 from "../../assets/acceso-interior-1.jpg";
import AccesoExterior1 from "../../assets/acceso-exterior-1.jpg";
import { MapPin, X } from "lucide-react";
import Register from "./Register";

const AccessContainer = ({ isOpen, onClose, onOpenLogin, onOpenRegister }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
      
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative max-w-5xl w-full flex flex-col bg-black rounded-2xl p-4 py-8 gap-3 shadow-2xl transition-all hover:scale-[1.01] border border-gray-900">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white cursor-pointer z-50">
          <X size={24} />
        </button>

        <div className="flex items-center w-full justify-center mb-3">
          <h2 className="text-3xl text-white uppercase font-bold border-black">St </h2>
          <MapPin size={25} className="text-yellow-500 "/>
          <h2 className="text-3xl text-white uppercase font-bold">yHub</h2>
        </div>

        <div className="flex flex-row gap-3 h-150">

          <div
            className="bg-white relative w-1/2 rounded-3xl overflow-hidden bg-cover bg-center flex items-end justify-end p-3 transition-all hover:scale-[1.01]"
            style={{ backgroundImage: `url(${AccesoInterior1})` }}
          >
            <div className="flex-col flex justify-end w-full absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-black via-black-500/30 to-transparent opacity-95">
              <h2 className="text-3xl text-left p-5 font-bold text-white">
                Tu proximo destino te espera <br /> Bienvenido de nuevo
              </h2>
              <button
                type="button"
                onClick={onOpenLogin}
                className="bg-black w-full px-8 py-3 rounded-xl border text-yellow-500 font-bold p-8 transition-all hover:scale-[1.03] cursor-pointer"
              >
                Iniciar sesion
              </button>
            </div>
          </div>

          <div
            className="bg-white relative w-1/2 rounded-3xl overflow-hidden bg-cover bg-center flex items-end justify-end p-3 transition-all hover:scale-[1.02]"
            style={{ backgroundImage: `url(${AccesoExterior1})` }}
          >
            <div className="flex-col flex justify-end w-full absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-black via-black-500/30 to-transparent opacity-95">
              <h2 className="text-3xl text-left p-5 font-bold text-white">
                ¿Nuevo en StayHub? <br /> Tu viaje comienza aqui
              </h2>
              <button
                type="button"
                onClick={onOpenRegister}
                className="bg-black w-full px-8 py-3 rounded-xl border text-yellow-500 font-bold p-8 transition-all hover:scale-[1.03] cursor-pointer"
              >
                Registrate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessContainer;