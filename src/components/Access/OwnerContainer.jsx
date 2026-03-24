import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

import AccesoOwner1 from "../../assets/accesoOwner-1.jpg";

const OwnerContainer = () => {
  const navigate = useNavigate();

  return (
    /* Contenedor principal */
    <div className="min-h-screen bg-white flex items-center justify-center p-6">

      {/* Contenedor secundario (blanco) */}
      <div className="max-w-md w-full flex-col bg-black rounded-2xl p-4 py-8  shadow-2xl transition-all hover:scale-[1.01]">

        {/* Titulo superior */}
        <div className="flex items-center w-full justify-center mb-3">
          <h2 className="text-3xl text-white uppercase font-bold border-black">
            St{" "}
          </h2>
          <MapPin size={25} className="text-yellow-500 " />
          <h2 className="text-3xl text-white uppercase font-bold">yHub</h2>
        </div>

        {/*Contenedor de imagenes*/}
        <div className="flex gap-3 h-150">
          {/*Contenedor Comenzar ahora */}
          <div
            className="bg-white relative w-full rounded-3xl overflow-hidden bg-cover bg-center flex items-end justify-end p-3 transition-all hover:scale-[1.02]"
            style={{ backgroundImage: `url(${AccesoOwner1})` }}
          >
            <div className="flex-col flex justify-end w-full absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-black via-black/30 to-transparent opacity-95">
              <h2 className="text-xl text-left p-5 font-bold text-white">
                Bienvenido a tu zona propietario <br /> ¿Tienes un alojamiento?
              </h2>
              <button
                type="submit"
                onClick={() => navigate("/UpgradeOwner")}
                className="bg-black w-full px-8 py-3 rounded-xl text-yellow-400 ring ring-yellow-400 font-bold p-8 transition-all hover:scale-[1.03]"
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
