import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, X } from "lucide-react";
import { authService } from "../../services/authService";
import { useAuth } from "../../context/authContext";

const UpgradeOwner = ({ isOpen, onClose, onOpenRegister, onOpenLogin }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    city: "",
    phoneNumber: "",
  });

  const [error, setError] = useState("");

  if (!isOpen) return null;

  const isFormValid =
    formData.city.trim() !== "" && 
    formData.phoneNumber.length === 12;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isFormValid) {
      try {
        const payload = {
          ...formData,
          uuidUser: user?.uuid
        };

        await authService.signUpOwner(payload);
        onClose();
        if (onOpenLogin) {
          onOpenLogin();
        } else {
          navigate("/login"); 
        }
      } catch (error) {
        console.log("Error en registro como propietario", error);
        setError("Fallo interno");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-md max-h-[95vh] overflow-y-auto no-scrollbar space-y-4">
        <div className="bg-black rounded-2xl shadow-xl p-8 border border-gray-900 transition-all relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white cursor-pointer z-50">
            <X size={24} />
          </button>

          <div className="flex items-center w-full justify-center mb-1">
            <h2 className="text-3xl text-white uppercase font-bold">St </h2>
            <MapPin size={25} className="text-yellow-500" />
            <h2 className="text-3xl text-white uppercase font-bold">yHub</h2>
          </div>
          
          <div className="justify-center flex flex-col items-center w-full mb-6 text-center">
            <p className="text-sm text-white">Registra tu alojamiento y recibe reservas hoy mismo</p>
            {error && (
              <p className="bg-red-500/50 text-red-500 border border-red-500/20 p-3 rounded-xl text-xs mt-4 w-full">
                {error}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-bold text-white block mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border text-white border-white rounded-xl shadow-2xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all placeholder-gray-400 caret-white bg-transparent"
                placeholder="Santa Cruz de Tenerife"
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-white block mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 border text-white border-white rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all placeholder-gray-400 caret-white bg-transparent"
                placeholder="+34 ••• •• •• ••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full font-bold py-3 rounded-xl transition-all ring ${
                isFormValid 
                  ? "bg-black text-green-400 ring-green-400 cursor-pointer" 
                  : "bg-transparent text-red-500/50 ring-red-600 cursor-not-allowed opacity-50"
              }`}
            >
              Registrarme como propietario
            </button>
          </form>
        </div>

        <div className="bg-black rounded-2xl shadow-xl p-8 transition-all border border-gray-900">
          <p className="text-white text-center mb-8">¿Aun no tienes cuenta?</p>
          <button
            type="button"
            onClick={onOpenRegister}
            className="w-full bg-black text-yellow-400 ring hover:scale-[1.02] ring-yellow-400 font-bold py-3 rounded-xl cursor-pointer"
          >
            Registrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeOwner;