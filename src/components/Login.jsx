import React, { useState } from "react";

const Login = ({toggleScreen}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intentado acceder con: " + { email, password });
    alert("Enviando a java: " + email);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 space-y-5 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transition-all hover:scale-[1.01]">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800">StayHub</h2>
          <p className="text-gray-800 mt-2">
            Bienvenido de nuevo, inicia sesión
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-xl shadow-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="StayHub@gmail.com"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl active:scale-95 hover:scale-[1.01]"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transition-all hover:scale-[1.01]">
        <p className="text-gray-500 text-center mb-8">¿Aun no tienes cuenta?</p>
        <button
          type="button"
          onClick={toggleScreen}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl active:scale-95 hover:scale-[1.01]"
        >
          Registrate
        </button>
      </div>
    </div>
  );
};

export default Login;
