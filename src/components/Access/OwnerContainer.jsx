import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, X } from "lucide-react";

import AccesoOwner1 from "../../assets/accesoOwner-1.jpg";

const OwnerContainer = ({ isOpen, onClose, onOpenUpgrade }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative max-w-md w-full flex-col bg-black rounded-2xl p-4 py-8 shadow-2xl border border-gray-900 overflow-hidden">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white cursor-pointer z-50 transition-colors">
          <X size={24} />
        </button>

        <div className="flex items-center w-full justify-center mb-3">
          <h2 className="text-3xl text-white uppercase font-bold border-black">St </h2>
          <MapPin size={25} className="text-yellow-500 " />
          <h2 className="text-3xl text-white uppercase font-bold">yHub</h2>
        </div>

        <div className="flex gap-3 h-140">
          <div
            className="bg-white relative w-full rounded-3xl overflow-hidden bg-cover bg-center flex items-end justify-end p-3"
            style={{ backgroundImage: `url(${AccesoOwner1})` }}
          >
            <div className="flex-col flex justify-end w-full absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-black via-black/30 to-transparent opacity-95">
              <h2 className="text-xl text-left p-5 font-bold text-white">
                Bienvenido a tu zona propietario <br /> ¿Tienes un alojamiento?
              </h2>
              <button
                type="button"
                onClick={onOpenUpgrade}
                className="bg-black w-full px-8 py-3 rounded-xl text-yellow-400 ring ring-yellow-400 font-bold p-8 transition-all hover:scale-[1.03] cursor-pointer"
              >
                Comenzar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerContainer;