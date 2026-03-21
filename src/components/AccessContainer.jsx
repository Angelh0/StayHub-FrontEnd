import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccesoInterior1 from "../assets/acceso-interior-1.jpg";
import AccesoExterior1 from "../assets/acceso-exterior-1.jpg";

const AccessContainer = () => {
  const navigate = useNavigate();

  return (
    /* Contenedor principal */
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">

      {/* Contenedor secundario (blanco) */}
      <div className="max-w-5xl w-full flex flex-col bg-gray-100 rounded-2xl p-4 py-8 gap-3 shadow-2xl transition-all hover:scale-[1.01]">

        {/* Titulo superior */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <span className="text-2xl">🔑</span>
          <h1 className="text-2xl font-semibold">StayHub</h1>
        </div>

        {/*Contenedor de imagenes*/}
        <div className="flex flex-row gap-3 h-150">

          {/*Contenedor Iniciar Sesion */}
          <div
            className="bg-white relative w-1/2 rounded-3xl overflow-hidden bg-cover bg-center flex items-end justify-end p-3 transition-all hover:scale-[1.01]"
            style={{ backgroundImage: `url(${AccesoInterior1})` }}
          >
            <div className="flex-col flex justify-end w-full absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-blue-950 via-blue-900/60 to-transparent opacity-95">
              <h2 className="text-3xl text-left p-5 font-bold text-white">
                {" "}
                Tu proximo destino te espera <br /> Bienvenido de nuevo
              </h2>
              <button
                type="submit"
                onClick={() => navigate("/Login")}
                className="bg-blue-950 w-full px-8 py-3 rounded-xl text-white font-bold p-8 transition-all hover:scale-[1.01]"
              >
                Iniciar sesion
              </button>
            </div>
          </div>

          {/*Contenedor Iniciar Sesion */}
          <div
            className="bg-white relative w-1/2 rounded-3xl overflow-hidden bg-cover bg-center flex items-end justify-end p-3 transition-all hover:scale-[1.01]"
            style={{ backgroundImage: `url(${AccesoExterior1})` }}
          >
            <div className="flex-col flex justify-end w-full absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-blue-950 via-blue-900/60 to-transparent opacity-95">
              <h2 className="text-3xl text-left p-5 font-bold text-white">
                {" "}
                ¿Nuevo en StayHub? <br /> Tu viaje comienza aqui
              </h2>
              <button
                type="submit"
                onClick={() => navigate("/Register")}
                className="bg-blue-950 w-full px-8 py-3 rounded-xl text-white font-bold p-8 transition-all hover:scale-[1.01]"
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
