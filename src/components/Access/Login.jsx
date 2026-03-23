import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const Login = ({ toggleScreen }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intentado acceder con: " + { email, password });
    alert("Enviando a java: " + email);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-5 p-4">
      <div className="max-w-md w-full bg-black rounded-2xl shadow-xl p-8 transition-all hover:scale-[1.02] ">
        <div className="flex items-center w-full justify-center mb-1">
          <h2 className="text-3xl text-white uppercase font-bold border-black">
            St{" "}
          </h2>
          <MapPin size={25} className="text-yellow-500" />
          <h2 className="text-3xl text-white uppercase font-bold">yHub</h2>
        </div>
        <div className="justify-center flex items-center w-full mb-6">
          <p className="text- text-white">Bienvenido de nuevo, Inicia sesion</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-white block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-white rounded-xl shadow-2xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all placeholder-gray-400/50 caret-white"
              placeholder="StayHub@gmail.com"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-white block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              required  
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-white rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all placeholder-gray-400/50 caret-white"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black ring ring-yellow-400 text-yellow-400 font-bold py-3 rounded-xl active:scale-95 hover:scale-[1.03]"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
      <div className="max-w-md w-full bg-black rounded-2xl shadow-xl p-8 transition-all hover:scale-[1.02]">
        <p className="text-white text-center mb-8">¿Aun no tienes cuenta?</p>
        <button
          type="button"
          onClick={() => navigate("/Register")}
          className="w-full bg-black text-yellow ring ring-yellow-400 font-bold py-3 rounded-xl active:scale-95 hover:scale-[1.03] text-yellow-400"
        >
          Registrate
        </button>
      </div>
    </div>
  );
};

export default Login;
