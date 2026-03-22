import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpgradeOwner = ({ toggleScreen }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Intentado acceder con: " + { city: city, phoneNumber: phoneNumber },
    );
    alert("Enviando a java: " + city);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 space-y-5 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transition-all hover:scale-[1.01]">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800">StayHub</h2>
          <p className="text-gray-800 mt-2">
            Registra tu alojamiento y recibe reservas hoy mismo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-xl shadow-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Santa Cruz de Tenerife"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="+34 ••• •• •• ••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-950 text-white font-bold py-3 rounded-xl active:scale-95 hover:scale-[1.01]"
          >
            Registrarme como propietario
          </button>
        </form>
      </div>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transition-all hover:scale-[1.01]">
        <p className="text-gray-500 text-center mb-8">¿Aun no tienes cuenta?</p>
        <button
          type="button"
          onClick={() => navigate("/Register")}
          className="w-full bg-blue-950 text-white font-bold py-3 rounded-xl active:scale-95 hover:scale-[1.01]"
        >
          Registrate
        </button>
      </div>
    </div>
  );
};

export default UpgradeOwner;
