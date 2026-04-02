import React, { useState, useEffect } from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { 
  Clock, CheckCircle, Archive, User, MapPin, 
  Calendar, Moon, Users, X, Check, Filter 
} from "lucide-react";
import { authService } from "../../services/authService";

const OwnerReservation = () => {
  const [activeTab, setActiveTab] = useState("pendientes");
  const [filterAcc, setFilterAcc] = useState("all");
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchOwnerReservations();
  }, []);

  const fetchOwnerReservations = async () => {
    try {
      setLoading(true);
      const data = await authService.myReservationOwner();
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

          let nights = 1;
          if (res.checkIn && res.checkOut) {
            const parseDate = (dateStr) => {
              const parts = dateStr.split("/");
              return new Date(parts[2], parts[1] - 1, parts[0]);
            };
            const diff = Math.ceil((parseDate(res.checkOut) - parseDate(res.checkIn)) / (1000 * 60 * 60 * 24));
            nights = diff > 0 ? diff : 1;
          }

          return { ...res, roomInfo, nights };
        })
      );
      setReservations(reservationsWithDetails);
    } catch (error) {
      console.error("Error cargando las reservas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (uuid) => {
    try {
      await authService.cancelMyReservation(uuid);
      setReservations(reservations.map(res => 
        res.uuidReservation === uuid ? { ...res, statusReservation: "Cancelled" } : res
      ));
    } catch (error) {
      console.error("Error al rechazar reserva", error);
    }
  };

  const handleConfirm = async (uuid) => {
    console.log("Confirmar reserva (falta endpoint):", uuid);

  };

  const uniqueAccommodations = reservations.reduce((acc, current) => {
    if (!acc.find(item => item.uuidAccommodation === current.uuidAccommodation)) {
      acc.push({ uuidAccommodation: current.uuidAccommodation, nameAccommodation: current.nameAccommodation });
    }
    return acc;
  }, []);

  const filteredByAcc = filterAcc === "all" ? reservations : reservations.filter(r => r.uuidAccommodation === filterAcc);

  const pending = filteredByAcc.filter(r => r.statusReservation.toLowerCase() === "pending");
  const confirmed = filteredByAcc.filter(r => r.statusReservation.toLowerCase() === "confirmed");
  const history = filteredByAcc.filter(r => ["completed", "cancelled"].includes(r.statusReservation.toLowerCase()));

  const displayReservations = activeTab === "pendientes" ? pending : activeTab === "confirmadas" ? confirmed : history;

  const getStatusUI = (status) => {
    const s = status.toLowerCase();
    if (s === 'pending') return { color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20', icon: <Clock size={14} />, text: 'Pendiente' };
    if (s === 'confirmed') return { color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/20', icon: <CheckCircle size={14} />, text: 'Confirmada' };
    if (s === 'cancelled') return { color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20', icon: <X size={14} />, text: 'Cancelada' };
    return { color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20', icon: <CheckCircle size={14} />, text: 'Completada' };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const parts = dateString.split("/");
    if (parts.length < 2) return dateString;
    const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    return `${parseInt(parts[0])} ${months[parseInt(parts[1]) - 1]}`;
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans flex flex-col">
      <div className="sticky top-0 z-50 w-full bg-black min-h-24 flex items-center border-b border-gray-900">
        <Navbar />
      </div>

      <div className="grow max-w-6xl mx-auto w-full py-12 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reservas Recibidas</h1>
            <p className="text-gray-400 text-sm font-medium">Gestiona las reservas de tus alojamientos</p>
          </div>
          
          <div className="flex items-center gap-3 bg-black p-2 rounded-xl border border-gray-900">
            <Filter size={16} className="text-gray-500 ml-2" />
            <select
              className="bg-transparent text-gray-300 text-sm font-medium rounded-lg p-1.5 focus:outline-none cursor-pointer"
              value={filterAcc}
              onChange={(e) => setFilterAcc(e.target.value)}
            >
              <option value="all" className="bg-gray-900">Todos los alojamientos</option>
              {uniqueAccommodations.map(acc => (
                <option key={acc.uuidAccommodation} value={acc.uuidAccommodation} className="bg-gray-900">
                  {acc.nameAccommodation}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div 
            onClick={() => setActiveTab("pendientes")}
            className={`rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all border ${activeTab === 'pendientes' ? 'bg-black border-orange-500/50 shadow-lg' : 'bg-black border-gray-900 hover:border-gray-700 opacity-60 hover:opacity-100'}`}
          >
            <Clock size={28} className="text-orange-500" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white leading-none">{pending.length}</span>
              <span className="text-sm text-gray-400 font-medium mt-1">Pendientes</span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab("confirmadas")}
            className={`rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all border ${activeTab === 'confirmadas' ? 'bg-black border-green-500/50 shadow-lg' : 'bg-black border-gray-900 hover:border-gray-700 opacity-60 hover:opacity-100'}`}
          >
            <CheckCircle size={28} className="text-green-500" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white leading-none">{confirmed.length}</span>
              <span className="text-sm text-gray-400 font-medium mt-1">Confirmadas</span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab("historial")}
            className={`rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all border ${activeTab === 'historial' ? 'bg-bg-black border-gray-600 shadow-lg' : 'bg-black border-gray-900 hover:border-gray-700 opacity-60 hover:opacity-100'}`}
          >
            <Archive size={28} className="text-gray-400" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white leading-none">{history.length}</span>
              <span className="text-sm text-gray-400 font-medium mt-1">Historial</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-yellow-500 font-medium animate-pulse">
            Cargando reservas...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayReservations.length === 0 ? (
              <div className="col-span-full text-center py-20 border border-gray-900 border-dashed rounded-2xl">
                <span className="text-gray-500 font-medium">No hay reservas en esta sección</span>
              </div>
            ) : (
              displayReservations.map((res) => {
                const statusUI = getStatusUI(res.statusReservation);

                return (
                  <div key={res.uuidReservation} className="bg-black border border-gray-900 rounded-2xl p-6 shadow-2xl transition-all hover:border-gray-800">
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-yellow-500/10 p-3 rounded-full border border-yellow-500/20 shrink-0">
                          <User size={24} className="text-yellow-500" />
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="text-white font-bold truncate">
                            {res.userName ? `${res.userName} ${res.userLastName}` : "Cargando..."}
                          </h3>
                          <p className="text-gray-500 text-xs truncate">
                            {res.userEmail || `ID: ${res.uuidUser}`}
                          </p>
                        </div>
                      </div>
                      <div className={`border px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shrink-0 ${statusUI.bg} ${statusUI.color}`}>
                        {statusUI.icon} {statusUI.text}
                      </div>
                    </div>

                    <div className="bg-black border border-gray-900 rounded-xl p-4 flex gap-4 mb-6">
                      {res.roomInfo?.photos?.[0] ? (
                        <img src={res.roomInfo.photos[0]} alt="room" className="w-24 h-16 object-cover rounded-lg shrink-0" />
                      ) : (
                        <div className="w-24 h-16 bg-gray-900 rounded-lg shrink-0 flex items-center justify-center text-[10px] text-gray-600 font-medium">Sin foto</div>
                      )}
                      <div className="flex-1 flex justify-between overflow-hidden">
                        <div className="truncate pr-2">
                          <h4 className="text-white font-bold text-sm mb-1 truncate">{res.nameAccommodation}</h4>
                          <p className="text-gray-500 text-xs mb-1 truncate">{res.type}</p>
                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <MapPin size={12} className="text-yellow-500 shrink-0" /> <span className="truncate">{res.roomInfo?.city}</span>
                          </div>
                        </div>
                        <div className="text-right flex flex-col justify-end shrink-0">
                          <span className="text-xl font-bold text-yellow-500 leading-none">{res.price} €</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 py-4 border-y border-gray-900/60 mb-6 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <Calendar size={16} className="text-yellow-500" />
                        <span className="text-xs text-gray-500">Check-in</span>
                        <span className="text-sm font-medium text-gray-200">{formatDate(res.checkIn)}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 border-l border-gray-900/60">
                        <Calendar size={16} className="text-yellow-500" />
                        <span className="text-xs text-gray-500">Check-out</span>
                        <span className="text-sm font-medium text-gray-200">{formatDate(res.checkOut)}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 border-l border-gray-900/60">
                        <Moon size={16} className="text-yellow-500" />
                        <span className="text-xs text-gray-500">Noches</span>
                        <span className="text-sm font-medium text-gray-200">{res.nights}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 border-l border-gray-900/60">
                        <Users size={16} className="text-yellow-500" />
                        <span className="text-xs text-gray-500">Huéspedes</span>
                        <span className="text-sm font-medium text-gray-200">{res.roomInfo?.capacity || "-"}</span>
                      </div>
                    </div>

                    {res.statusReservation.toLowerCase() === "pending" && (
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleReject(res.uuidReservation)}
                          className="w-full border border-red-900/50 hover:bg-red-900/20 text-red-500 font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <X size={16} /> Rechazar
                        </button>
                      </div>
                    )}

                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      <div className="w-full min-h-25 bg-black border-t border-gray-900 flex items-center justify-center mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default OwnerReservation;