import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AccesoOwner1 from "../../assets/accesoOwner-1.jpg";

const OwnerContainer = () => {
    const navigate = useNavigate();

  return (
    /* Contenedor principal */
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">

      {/* Contenedor secundario (blanco) */}
      <div className="max-w-md w-full flex-col bg-gray-100 rounded-2xl p-4 py-8  shadow-2xl transition-all hover:scale-[1.01]">

        {/* Titulo superior */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <span className="text-2xl">🔑</span>
          <h1 className="text-2xl font-semibold">StayHub</h1>
        </div>

        {/*Contenedor de imagenes*/}
        <div className="flex gap-3 h-150">

          {/*Contenedor Comenzar ahora */}
          <div
            className="bg-white relative w-full rounded-3xl overflow-hidden bg-cover bg-center flex items-end justify-end p-3 transition-all hover:scale-[1.01]"
            style={{ backgroundImage: `url(${AccesoOwner1})` }}
          >
            <div className="flex-col flex justify-end w-full absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-blue-950 via-blue-900/60 to-transparent opacity-95">
              <h2 className="text-2xl text-left p-5 font-bold text-white">

                Bienvenido a la zona propietarios <br /> ¿Tienes un alojamiento?
              </h2>
              <button
                type="submit"
                onClick={() => navigate("/UpgradeOwner")}
                className="bg-blue-950 w-full px-8 py-3 rounded-xl text-white font-bold p-8 transition-all hover:scale-[1.01]"
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
