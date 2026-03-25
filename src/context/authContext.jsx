import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveAuth = (data) => {
    const { token } = data;
    localStorage.setItem("stayhub_token", token);

    const decoded = jwtDecode(token);
    setUser({
      uuid: decoded.userUUID,
      email: decoded.role !== "GUEST" ? decoded.sub : "GUEST",
      role: decoded.role,
      firstName: decoded.firstName,
      lastName: decoded.lastName
    });
  };

  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem("stayhub_token");
      try {
        if (!token) {
          const data = await authService.getGuestAccess();
          saveAuth(data);
        } else {
          const decoded = jwtDecode(token);
          setUser({
            uuid: decoded.userUUID,
            email: decoded.role !== "GUEST" ? decoded.sub : "GUEST",
            role: decoded.role,
          });
        }
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
        return;
      }
    };
    initialize();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, saveAuth }}>
      {loading ? (
        <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center gap-6">
          <div className="flex">
            <div className="ml-[0.8rem] bg-[#222222] shadow-[inset_2px_2px_10px_black] rounded-full h-4 w-4 animate-brighten-slow"></div>
            <div className="ml-[0.8rem] bg-[#222222] shadow-[inset_2px_2px_10px_black] rounded-full h-4 w-4 animate-brighten-slow [animation-delay:0.2s]"></div>
            <div className="ml-[0.8rem] bg-[#222222] shadow-[inset_2px_2px_10px_black] rounded-full h-4 w-4 animate-brighten-slow [animation-delay:0.4s]"></div>
          </div>
          <div className="text-center">
            <span className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase">
              Conectando StayHub
            </span>
            <p className="text-zinc-600 text-[10px] mt-2 italic">Estableciendo conexión segura...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
