import React, { useState, useEffect } from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { authService } from "../../services/authService";
import { Clock, History, Check, MapPin, Calendar, BedDouble, Users, X, CheckCircle } from "lucide-react";

const MyReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [activeTab, setActiveTab] = useState("activas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await authService.myReservationUser();
      
      const reservationsArray = Array.isArray(data) ? data : data?.data ? data.data : [];
      
      if (reservationsArray.length === 0) {
        setReservations([]);
        return;
      }

      const reservationsWithDetails = await Promise.all(
        reservationsArray.map(async (res) => {
          let roomInfo = null;
          try {
            const baseRoomArray = await authService.getRooms(res.uuidRoom);
            roomInfo = Array.isArray(baseRoomArray) ? baseRoomArray[0] : baseRoomArray;
          } catch (error) {
            console.error("Error al obtener la habitación:", error);
          }

          return { ...res, roomInfo };
        })
      );

      setReservations(reservationsWithDetails);
    } catch (error) {
      console.error("Error general cargando las reservas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (uuid) => {
    try {
      await authService.cancelMyReservation(uuid);
      setReservations(reservations.map(res => 
        res.uuidReservation === uuid ? { ...res, statusReservation: "Cancelled" } : res
      ));
    } catch (error) {
      console.error("Error al cancelar la reserva", error);
    }
  };

  const getStatusConfig = (status) => {
    const s = status ? status.toLowerCase() : "";
    switch (s) {
      case "confirmed":
        return { text: "Confirmada", color: "text-green-500", bg: "bg-green-500/10", icon: <Check size={14} className="mr-1.5" /> };
      case "pending":
        return { text: "Pendiente", color: "text-yellow-500", bg: "bg-yellow-500/10", icon: <Clock size={14} className="mr-1.5" /> };
      case "completed":
        return { text: "Completada", color: "text-blue-500", bg: "bg-blue-500/10", icon: <CheckCircle size={14} className="mr-1.5" /> };
      case "cancelled":
        return { text: "Cancelada", color: "text-red-500", bg: "bg-red-500/10", icon: <X size={14} className="mr-1.5" /> };
      default:
        return { text: status || "Desconocido", color: "text-gray-500", bg: "bg-gray-500/10", icon: null };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const parts = dateString.split("/");
    if (parts.length < 2) return dateString;
    const [day, month] = parts;
    const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    return `${parseInt(day)} ${months[parseInt(month) - 1]}`;
  };

  const activeReservations = reservations.filter(r => {
    const s = r.statusReservation ? r.statusReservation.toLowerCase() : "";
    return s === "pending" || s === "confirmed";
  });
  
  const historyReservations = reservations.filter(r => {
    const s = r.statusReservation ? r.statusReservation.toLowerCase() : "";
    return s === "cancelled" || s === "completed";
  });
  
  const displayReservations = activeTab === "activas" ? activeReservations : historyReservations;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      <div className="sticky top-0 z-50 w-full bg-black min-h-24 flex items-center border-b border-gray-900">
        <Navbar />
      </div>

      <div className="grow w-full max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mis Reservas</h1>
          <p className="text-gray-400 text-sm">Gestiona tus reservas activas y consulta el historial</p>
        </div>

        <div className="flex bg-gray-950 p-1 rounded-xl w-fit mb-10 border border-gray-900">
          <button
            onClick={() => setActiveTab("activas")}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "activas" ? "bg-black border border-gray-800 text-white" : "text-gray-500 hover:text-white"
            }`}
          >
            <Clock size={16} />
            <span>Activas ({activeReservations.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("historial")}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === "historial" ? "bg-black border border-gray-800 text-white" : "text-gray-500 hover:text-white"
            }`}
          >
            <History size={16} />
            <span>Historial ({historyReservations.length})</span>
          </button>
        </div>

        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-32 text-yellow-400 font-medium animate-pulse">
               Cargando reservas...
            </div>
          ) : displayReservations.length === 0 ? (
            <div className="text-center py-20 border border-gray-900 border-dashed rounded-2xl">
              <span className="text-gray-600 font-medium">No hay reservas en esta sección</span>
            </div>
          ) : (
            displayReservations.map((res) => {
              const status = getStatusConfig(res.statusReservation);
              const isActiveTab = activeTab === "activas";
              
              const imageUrl = res.roomInfo?.photos?.[0]; 
              const typeTitle = res.type || res.roomInfo?.type; 
              const guestsCount = res.roomInfo?.capacity || "-";
              const cityName = res.roomInfo?.city;
              const accommodationName = res.nameAccommodation;
              
              return (
                <div key={res.uuidReservation} className="flex flex-col md:flex-row bg-black border border-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                  
                  <div className="w-full md:w-64 h-48 md:h-auto shrink-0 bg-gray-950 flex items-center justify-center">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt="Alojamiento" 
                        className="w-full h-full object-cover brightness-90"
                      />
                    ) : (
                      <span className="text-gray-700 font-medium text-xs">Sin Imagen</span>
                    )}
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start w-full">
                      <div className={`flex items-center px-2.5 py-1 rounded text-[11px] font-medium border ${status.color.replace('text-', 'border-').replace('500', '500/20')} ${status.bg} ${status.color}`}>
                        {status.icon}
                        {status.text}
                      </div>
                      <div className="text-right flex flex-col items-end justify-start">
                        <div className="flex items-end gap-1">
                          <p className="text-yellow-500 text-2xl font-bold leading-none">{res.price ? res.price : "---"}</p>
                          <span className="text-yellow-500 text-lg font-bold leading-none mb-0.5">€</span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">total</p>
                      </div>
                    </div>

                    <div className="mt-2 mb-6">
                      <h2 className="text-xl font-bold text-white mb-1.5">
                        {accommodationName || "Alojamiento"}
                      </h2>
                      <div className="flex items-center gap-1.5 text-yellow-500">
                        <MapPin size={14} strokeWidth={2.5} />
                        <span className="text-sm text-gray-400">
                          {cityName ? `${cityName}, España` : "-"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-gray-900/60">
                      <div className="flex flex-col">
                        <div className="flex items-center text-gray-500 text-xs mb-1">
                          <Calendar size={14} className="mr-1.5 text-yellow-500" /> Check-in
                        </div>
                        <p className="text-gray-200 font-medium text-sm">{formatDate(res.checkIn)}</p>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center text-gray-500 text-xs mb-1">
                          <Calendar size={14} className="mr-1.5 text-yellow-500" /> Check-out
                        </div>
                        <p className="text-gray-200 font-medium text-sm">{formatDate(res.checkOut)}</p>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center text-gray-500 text-xs mb-1">
                          <BedDouble size={14} className="mr-1.5 text-yellow-500" /> Habitación
                        </div>
                        <p className="text-gray-200 font-medium text-sm">{typeTitle}</p>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center text-gray-500 text-xs mb-1">
                          <Users size={14} className="mr-1.5 text-yellow-500" /> Huéspedes
                        </div>
                        <p className="text-gray-200 font-medium text-sm">{guestsCount}</p>
                      </div>
                    </div>

                    {isActiveTab && (
                      <div className="border-t border-gray-900/60 mt-2 pt-4 flex justify-start">
                        <button 
                          onClick={() => handleCancelReservation(res.uuidReservation)}
                          className="flex items-center text-red-500/80 hover:text-red-500 transition-colors text-sm font-medium cursor-pointer"
                        >
                          <X size={16} className="mr-1.5" />
                          Cancelar reserva
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="w-full bg-black flex items-center justify-center mt-auto border-t border-gray-900">
        <Footer />
      </div>
    </div>
  );
};

export default MyReservation;