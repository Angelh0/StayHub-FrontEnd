import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, X } from "lucide-react";
import { authService } from "../../services/authService";
import { useAuth } from "../../context/authContext";

const Login = ({ isOpen, onClose, onOpenRegister }) => {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      setError("");
      localStorage.removeItem("stayhub_token");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isFormValid =
    formData.email.includes("@") &&
    formData.password.length >= 6;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isFormValid) {
      try {
        localStorage.removeItem("stayhub_token");
        const data = await authService.login(formData);
        
        if (data) {
          saveAuth(data);
          onClose();
          setTimeout(() => {
            navigate("/");
          }, 50);
        }
      } catch (error) {
        setError("Correo o contraseña incorrectos");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-md space-y-5">
        <div className="bg-black rounded-2xl shadow-xl p-8 border border-gray-900 transition-all">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white cursor-pointer z-50">
            <X size={24} />
          </button>
          
          <div className="flex items-center w-full justify-center mb-1">
            <h2 className="text-3xl text-white uppercase font-bold">St </h2>
            <MapPin size={25} className="text-yellow-500" />
            <h2 className="text-3xl text-white uppercase font-bold">yHub</h2>
          </div>

          <div className="justify-center flex flex-col items-center w-full mb-6 text-center">
            <p className="text-white text-sm opacity-80">Bienvenido de nuevo, Inicia sesión</p>
            {error && (
              <p className="bg-red-500/10 text-red-500 border border-red-500/20 p-3 rounded-xl text-xs mt-4 w-full">
                {error}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              className={`w-full font-bold py-3 rounded-xl transition-all border ${
                isFormValid 
                  ? "bg-black text-green-400 ring-green-400 hover:scale-[1.02] cursor-pointer"
                  : "bg-transparent text-red-500/50 ring-red-600 cursor-not-allowed opacity-50"
              }`}
            >
              Iniciar sesión
            </button>
          </form>
        </div>

        <div className="bg-black rounded-2xl shadow-xl p-8 border border-gray-900 transition-all">
          <p className="text-white text-center mb-8 text-sm opacity-80">¿Aún no tienes cuenta?</p>
          <button
            type="button"
            onClick={onOpenRegister}
            className="w-full bg-black text-yellow-400 ring ring-yellow-400 font-bold py-3 rounded-xl active:scale-95 hover:scale-[1.02] cursor-pointer"
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;