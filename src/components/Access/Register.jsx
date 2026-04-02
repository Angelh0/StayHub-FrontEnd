import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, X } from "lucide-react";
import { authService } from "../../services/authService";

const Register = ({ isOpen, onClose, onOpenLogin }) => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  if (!isOpen) return null;

  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.includes("@") &&
    formData.password.length >= 6;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isFormValid) {
      try {
        localStorage.removeItem("stayhub_token");
        await authService.register(formData);
        onOpenLogin();
      } catch (error) {
        console.log("Error al registrar: " + error);
        setError("Ese correo ya esta registrado");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4 overflow-hidden select-none">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-md flex flex-col gap-4 overflow-hidden">
        
        <div className="bg-black rounded-2xl shadow-xl p-8 border border-gray-900 relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white cursor-pointer z-50 transition-colors">
            <X size={24} />
          </button>

          <div className="flex items-center w-full justify-center mb-1">
            <h2 className="text-3xl text-white uppercase font-bold border-black">St </h2>
            <MapPin size={25} className="text-yellow-500" />
            <h2 className="text-3xl text-white uppercase font-bold">yHub</h2>
          </div>

          <div className="justify-center flex flex-col items-center w-full mb-6 text-center">
            <p className="text-white text-sm">Bienvenido de nuevo, Inicia sesion</p>
            {error && (
              <p className="bg-red-500/50 text-red-500 border border-red-500/20 p-3 rounded-xl text-xs mt-4 w-full">
                {error}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-bold text-white block mb-2">Nombre</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 border text-white border-white rounded-xl shadow-2xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all placeholder-gray-400 caret-white bg-transparent"
                placeholder="Nombre"
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-white block mb-2">Apellidos</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 border text-white border-white rounded-xl shadow-2xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all placeholder-gray-400 caret-white bg-transparent"
                placeholder="Apellidos"
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-white block mb-2">Correo</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border text-white border-white rounded-xl shadow-2xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all placeholder-gray-400 caret-white bg-transparent"
                placeholder="StayHub@gmail.com"
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-white block mb-2">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 text-white border border-white rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all placeholder-gray-400 caret-white bg-transparent"
                placeholder="••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full font-bold py-3 rounded-xl transition-all ring ${
                isFormValid
                  ? "bg-black text-green-400 ring-green-400 hover:scale-[1.02] cursor-pointer"
                  : "bg-transparent text-red-500/50 ring-red-600 cursor-not-allowed opacity-50"
              }`}
            >
              Registrate
            </button>
          </form>
        </div>

        <div className="bg-black rounded-2xl shadow-xl p-8 border border-gray-900">
          <p className="text-white text-center mb-6 text-sm">¿Ya tienes cuenta?</p>
          <button
            type="button"
            onClick={onOpenLogin}
            className="w-full bg-black text-yellow-400 ring ring-yellow-400 font-bold py-3 rounded-xl active:scale-95 hover:scale-[1.02] cursor-pointer"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;