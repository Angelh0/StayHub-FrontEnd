import React from "react";
import { MapPin, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log("Datos del usuario en Navbar:", user);

  const role = user?.role || "GUEST";

  const logOut = () => {
    localStorage.removeItem("stayhub_token");
    window.location.href = "/";
  };

  return (
    <nav className="w-full h-full flex items-center justify-between px-6 md:px-12 shadow-md">

      <div className="flex items-center cursor-pointer select-none">
        <h2 className="text-white uppercase text-2xl font-bold">St</h2>
        <MapPin size={19} className="text-yellow-400   strokeWidth={2}"/>
        <h2 className="text-white uppercase text-2xl font-bold">yHub</h2>
      </div>

      <div className="hidden lg:flex items-center gap-8 font-bold text-yellow-500 text-sm">
        <button onClick={() => navigate("/")} className="hover:text-white transition-colors uppercase cursor-pointer">Inicio</button>
        <button onClick={() => navigate("/reservas")} className="hover:text-white transition-colors uppercase cursor-pointer">Reservar</button>
        <button 
          onClick={() => role === "GUEST" ? navigate("/AccessContainer") : navigate("/#")} 
          className="hover:text-white transition-colors uppercase cursor-pointer"
        >
          Mis reservas
        </button>
        {role === "OWNER" && (
          <button onClick={() => navigate("/#")} className="text-yellow-400 hover:text-white transition-colors uppercase cursor-pointer">
            Reservas Recibidas
          </button>
        )}
      </div>

      <div className="flex items-center gap-6">
        {role !== "OWNER" && (
          <button 
            onClick={() => navigate("/OwnerContainer")} 
            className="text-yellow-500 cursor-pointer text-xs font-bold hover:text-white transition-colors uppercase"
          >
            ¿Tienes un alojamiento?
          </button>
        )}

        {role === "GUEST" ? (
          <button 
            type="button" 
            onClick={() => navigate("/AccessContainer")} 
            className="bg-black rounded-full border-2 border-yellow-500 cursor-pointer text-yellow-500 uppercase px-6 py-1 hover:text-black transition-all hover:bg-yellow-500 hover:scale-[1.03]"
          >
            Acceder
          </button>
        ) : (
          <div className="flex items-center gap-4 border-l border-gray-700 pl-6 text-white">
            {role === "OWNER" && (
              <div className="relative group">
                <button className="flex items-center gap-1 bg-yellow-500 text-black px-4 py-1 rounded-full font-bold text-[10px] hover:bg-yellow-400 uppercase tracking-tighter cursor-pointer">
                  Gestionar <ChevronDown size={14} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden border border-gray-200 cursor-pointer">
                  <button onClick={() => navigate("/#")} className="w-full text-left px-4 py-3 text-xs border-b uppercase cursor-pointer">Añadir Alojamiento</button>
                  <button onClick={() => navigate("/#")} className="w-full text-left px-4 py-3 text-xs uppercase cursor-pointer">Mis Alojamientos</button>
                </div>
              </div>
            )}
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-gray-400 uppercase leading-none italic">Bienvenido,</p>
              <p className="text-sm font-bold uppercase">{user?.firstName || "Usuario"}</p>
            </div>
            <button 
              onClick={logOut} 
              className=" text-red-500 transition-colors cursor-pointer p-2"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
